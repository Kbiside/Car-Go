const db = require('../db');
const { useFetch } = require('@mantine/hooks');

class EmployeeController {
    async createEmployee(req, res) {
        try {
            const { 
                user_id,
                employee_id,
                full_name, 
                phone, 
                birth_date, 
                gender, 
                inn, 
                position
            } = req.body;
            
            const { data: newEmployee, error } = useFetch(async () => {
                const result = await db.query(
                    `INSERT INTO employees (
                        user_id, employee_id, full_name, phone, birth_date, 
                        gender, inn, position
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
                    [
                        user_id, employee_id, full_name, phone, birth_date, 
                        gender, inn, position
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.status(201).json(newEmployee);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployees(req, res) {
        try {
            const { data: employees, error } = useFetch(async () => {
                const result = await db.query(
                    'SELECT id, employee_id, full_name, phone, position FROM employees'
                );
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(employees);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getOneEmployee(req, res) {
        try {
            const id = req.params.id;
            
            const { data: employee, error } = useFetch(async () => {
                const result = await db.query('SELECT * FROM employees WHERE id = $1', [id]);
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            
            res.json(employee);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployee(req, res) {
        try {
            const { 
                id,
                employee_id,
                full_name, 
                phone, 
                birth_date, 
                gender, 
                inn, 
                position
            } = req.body;
            
            const { data: updatedEmployee, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE employees SET 
                        employee_id = $1,
                        full_name = $2, 
                        phone = $3, 
                        birth_date = $4, 
                        gender = $5, 
                        inn = $6, 
                        position = $7,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $8 RETURNING *`, 
                    [
                        employee_id, full_name, phone, birth_date, 
                        gender, inn, position, id
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!updatedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            
            res.json(updatedEmployee);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteEmployee(req, res) {
        try {
            const id = req.params.id;
            
            const { data: deletedEmployee, error } = useFetch(async () => {
                const result = await db.query(
                    'DELETE FROM employees WHERE id = $1 RETURNING *', 
                    [id]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!deletedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            
            res.json(deletedEmployee);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeDocuments(req, res) {
        try {
            const employeeId = req.params.employeeId;
            
            const { data: documents, error } = useFetch(async () => {
                const result = await db.query(
                    'SELECT * FROM employee_documents WHERE employee_id = $1',
                    [employeeId]
                );
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(documents);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EmployeeController();