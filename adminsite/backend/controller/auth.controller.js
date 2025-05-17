const db = require('../db');
const { useFetch } = require('@mantine/hooks');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

class AuthController {
    async register(req, res) {
        try {
            const { 
                email,
                password,
                role
            } = req.body;
            
            const { data: user, error } = useFetch(async () => {
                // Проверяем, существует ли пользователь с таким email
                const existingUser = await db.query(
                    'SELECT id FROM users WHERE email = $1',
                    [email]
                );
                
                if (existingUser.rows.length > 0) {
                    throw new Error('User with this email already exists');
                }

                // Хешируем пароль
                const hashedPassword = await bcrypt.hash(password, 10);

                const result = await db.query(
                    `INSERT INTO users (
                        email, password_hash, role
                    ) VALUES ($1, $2, $3) RETURNING *`, 
                    [
                        email, hashedPassword, role
                    ]
                );
                
                // Не возвращаем хеш пароля
                const { password_hash, ...userData } = result.rows[0];
                return userData;
            });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            const { data: token, error } = useFetch(async () => {
                // Находим пользователя по email
                const userResult = await db.query(
                    'SELECT * FROM users WHERE email = $1',
                    [email]
                );
                
                if (userResult.rows.length === 0) {
                    throw new Error('User not found');
                }

                const user = userResult.rows[0];

                // Проверяем пароль
                const isPasswordValid = await bcrypt.compare(password, user.password_hash);
                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }

                // Создаем JWT токен
                const token = jwt.sign(
                    { userId: user.id, email: user.email, role: user.role },
                    config.jwtSecret,
                    { expiresIn: '24h' }
                );

                // Обновляем время последнего входа
                await db.query(
                    'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1',
                    [user.id]
                );

                return token;
            });

            if (error) {
                return res.status(401).json({ error: error.message });
            }

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getMe(req, res) {
        try {
            // Получаем userId из middleware аутентификации
            const userId = req.user.id;
            
            const { data: user, error } = useFetch(async () => {
                const result = await db.query(
                    'SELECT id, email, role, created_at, last_login_at FROM users WHERE id = $1',
                    [userId]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updatePassword(req, res) {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;
            
            const { data: success, error } = useFetch(async () => {
                // Получаем текущий хеш пароля
                const userResult = await db.query(
                    'SELECT password_hash FROM users WHERE id = $1',
                    [userId]
                );
                
                if (userResult.rows.length === 0) {
                    throw new Error('User not found');
                }

                const currentHashedPassword = userResult.rows[0].password_hash;

                // Проверяем текущий пароль
                const isPasswordValid = await bcrypt.compare(currentPassword, currentHashedPassword);
                if (!isPasswordValid) {
                    throw new Error('Current password is incorrect');
                }

                // Хешируем новый пароль
                const newHashedPassword = await bcrypt.hash(newPassword, 10);

                // Обновляем пароль
                await db.query(
                    'UPDATE users SET password_hash = $1 WHERE id = $2',
                    [newHashedPassword, userId]
                );

                return { success: true };
            });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.json(success);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();