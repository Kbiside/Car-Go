const db = require('../db');
const { useFetch } = require('@mantine/hooks');

class RequestController {
    async createRequest(req, res) {
        try {
            const { 
                employee_id,
                client_id,
                car_id,
                rental_price_id,
                start_date,
                end_date,
                child_seat,
                comment,
                total_cost,
                status
            } = req.body;
            
            const { data: newRequest, error } = useFetch(async () => {
                // Проверяем доступность автомобиля
                const carCheck = await db.query(
                    'SELECT is_available FROM cars WHERE id = $1',
                    [car_id]
                );
                
                if (carCheck.rows.length === 0 || !carCheck.rows[0].is_available) {
                    throw new Error('Car is not available');
                }

                const result = await db.query(
                    `INSERT INTO requests (
                        employee_id, client_id, car_id, rental_price_id,
                        start_date, end_date, child_seat, comment, total_cost, status
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`, 
                    [
                        employee_id, client_id, car_id, rental_price_id,
                        start_date, end_date, child_seat, comment, total_cost, status || 'pending'
                    ]
                );

                // Помечаем автомобиль как недоступный
                await db.query(
                    'UPDATE cars SET is_available = false WHERE id = $1',
                    [car_id]
                );

                return result.rows[0];
            });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(201).json(newRequest);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getRequests(req, res) {
        try {
            const { data: requests, error } = useFetch(async () => {
                const result = await db.query(`
                    SELECT r.*, 
                           c.full_name as client_name,
                           e.full_name as employee_name,
                           car.brand as car_brand,
                           car.model as car_model
                    FROM requests r
                    JOIN clients c ON r.client_id = c.id
                    JOIN employees e ON r.employee_id = e.id
                    JOIN cars car ON r.car_id = car.id
                `);
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(requests);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getOneRequest(req, res) {
        try {
            const id = req.params.id;
            
            const { data: request, error } = useFetch(async () => {
                const result = await db.query(`
                    SELECT r.*, 
                           c.full_name as client_name,
                           e.full_name as employee_name,
                           car.brand as car_brand,
                           car.model as car_model
                    FROM requests r
                    JOIN clients c ON r.client_id = c.id
                    JOIN employees e ON r.employee_id = e.id
                    JOIN cars car ON r.car_id = car.id
                    WHERE r.id = $1
                `, [id]);
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!request) {
                return res.status(404).json({ message: 'Request not found' });
            }
            
            res.json(request);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateRequest(req, res) {
        try {
            const { 
                id,
                employee_id,
                client_id,
                car_id,
                rental_price_id,
                start_date,
                end_date,
                child_seat,
                comment,
                total_cost,
                status
            } = req.body;
            
            const { data: updatedRequest, error } = useFetch(async () => {
                // Получаем текущий запрос для проверки car_id
                const currentRequest = await db.query(
                    'SELECT car_id FROM requests WHERE id = $1',
                    [id]
                );

                if (currentRequest.rows.length === 0) {
                    throw new Error('Request not found');
                }

                const oldCarId = currentRequest.rows[0].car_id;
                let carUpdateQueries = [];

                // Если изменился автомобиль, обновляем доступность
                if (oldCarId !== car_id) {
                    // Проверяем новый автомобиль
                    const newCarCheck = await db.query(
                        'SELECT is_available FROM cars WHERE id = $1',
                        [car_id]
                    );
                    
                    if (newCarCheck.rows.length === 0 || !newCarCheck.rows[0].is_available) {
                        throw new Error('New car is not available');
                    }

                    // Освобождаем старый автомобиль
                    carUpdateQueries.push(
                        db.query(
                            'UPDATE cars SET is_available = true WHERE id = $1',
                            [oldCarId]
                        )
                    );

                    // Занимаем новый автомобиль
                    carUpdateQueries.push(
                        db.query(
                            'UPDATE cars SET is_available = false WHERE id = $1',
                            [car_id]
                        )
                    );
                }

                const result = await db.query(
                    `UPDATE requests SET 
                        employee_id = $1, 
                        client_id = $2, 
                        car_id = $3, 
                        rental_price_id = $4,
                        start_date = $5, 
                        end_date = $6, 
                        child_seat = $7, 
                        comment = $8,
                        total_cost = $9,
                        status = $10,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $11 RETURNING *`, 
                    [
                        employee_id, client_id, car_id, rental_price_id,
                        start_date, end_date, child_seat, comment, 
                        total_cost, status, id
                    ]
                );

                // Выполняем обновления доступности автомобилей
                await Promise.all(carUpdateQueries);

                return result.rows[0];
            });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            if (!updatedRequest) {
                return res.status(404).json({ message: 'Request not found' });
            }
            
            res.json(updatedRequest);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteRequest(req, res) {
        try {
            const id = req.params.id;
            
            const { data: deletedRequest, error } = useFetch(async () => {
                // Получаем запрос для освобождения автомобиля
                const request = await db.query(
                    'SELECT car_id FROM requests WHERE id = $1',
                    [id]
                );

                if (request.rows.length === 0) {
                    throw new Error('Request not found');
                }

                const carId = request.rows[0].car_id;

                // Удаляем запрос
                const result = await db.query(
                    'DELETE FROM requests WHERE id = $1 RETURNING *',
                    [id]
                );

                // Освобождаем автомобиль
                await db.query(
                    'UPDATE cars SET is_available = true WHERE id = $1',
                    [carId]
                );

                return result.rows[0];
            });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            if (!deletedRequest) {
                return res.status(404).json({ message: 'Request not found' });
            }
            
            res.json(deletedRequest);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getClientRequests(req, res) {
        try {
            const clientId = req.params.clientId;
            
            const { data: requests, error } = useFetch(async () => {
                const result = await db.query(`
                    SELECT r.*, 
                           car.brand as car_brand,
                           car.model as car_model
                    FROM requests r
                    JOIN cars car ON r.car_id = car.id
                    WHERE r.client_id = $1
                    ORDER BY r.start_date DESC
                `, [clientId]);
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(requests);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getCarRequests(req, res) {
        try {
            const carId = req.params.carId;
            
            const { data: requests, error } = useFetch(async () => {
                const result = await db.query(`
                    SELECT r.*, 
                           c.full_name as client_name
                    FROM requests r
                    JOIN clients c ON r.client_id = c.id
                    WHERE r.car_id = $1
                    ORDER BY r.start_date DESC
                `, [carId]);
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(requests);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RequestController();