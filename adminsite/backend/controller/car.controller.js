const db = require('../db');
const { useFetch } = require('@mantine/hooks');

class CarController {
    async createCar(req, res) {
        try {
            const { 
                brand, 
                model, 
                number, 
                comment, 
                is_available
            } = req.body;
            
            const { data: newCar, error } = useFetch(async () => {
                const result = await db.query(
                    `INSERT INTO cars (
                        brand, model, number, comment, is_available
                    ) VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
                    [
                        brand, model, number, comment, 
                        is_available !== undefined ? is_available : true
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.status(201).json(newCar);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getCars(req, res) {
        try {
            const { available } = req.query;
            
            const { data: cars, error } = useFetch(async () => {
                let query = 'SELECT * FROM cars';
                const params = [];
                
                if (available === 'true') {
                    query += ' WHERE is_available = $1';
                    params.push(true);
                } else if (available === 'false') {
                    query += ' WHERE is_available = $1';
                    params.push(false);
                }
                
                const result = await db.query(query, params);
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(cars);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getAvailableCars(req, res) {
        try {
            const { data: cars, error } = useFetch(async () => {
                const result = await db.query(
                    'SELECT * FROM cars WHERE is_available = true'
                );
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(cars);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getOneCar(req, res) {
        try {
            const id = req.params.id;
            
            const { data: car, error } = useFetch(async () => {
                const result = await db.query(
                    'SELECT * FROM cars WHERE id = $1', 
                    [id]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!car) {
                return res.status(404).json({ message: 'Car not found' });
            }
            
            res.json(car);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateCar(req, res) {
        try {
            const { 
                id,
                brand, 
                model, 
                number, 
                comment, 
                is_available
            } = req.body;
            
            const { data: updatedCar, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE cars SET 
                        brand = $1, 
                        model = $2, 
                        number = $3, 
                        comment = $4, 
                        is_available = $5,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $6 RETURNING *`, 
                    [
                        brand, model, number, comment, 
                        is_available, id
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!updatedCar) {
                return res.status(404).json({ message: 'Car not found' });
            }
            
            res.json(updatedCar);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateCarAvailability(req, res) {
        try {
            const { id } = req.params;
            const { is_available } = req.body;
            
            const { data: updatedCar, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE cars SET 
                        is_available = $1,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $2 
                    RETURNING id, brand, model, number, is_available`, 
                    [is_available, id]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!updatedCar) {
                return res.status(404).json({ message: 'Car not found' });
            }
            
            res.json(updatedCar);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCar(req, res) {
        try {
            const id = req.params.id;
            
            const { data: deletedCar, error } = useFetch(async () => {
                const result = await db.query(
                    'DELETE FROM cars WHERE id = $1 RETURNING *', 
                    [id]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!deletedCar) {
                return res.status(404).json({ message: 'Car not found' });
            }
            
            res.json(deletedCar);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async searchCars(req, res) {
        try {
            const { brand, model, number } = req.query;
            
            const { data: cars, error } = useFetch(async () => {
                let query = 'SELECT * FROM cars WHERE 1=1';
                const params = [];
                let paramIndex = 1;
                
                if (brand) {
                    query += ` AND brand ILIKE $${paramIndex}`;
                    params.push(`%${brand}%`);
                    paramIndex++;
                }
                
                if (model) {
                    query += ` AND model ILIKE $${paramIndex}`;
                    params.push(`%${model}%`);
                    paramIndex++;
                }
                
                if (number) {
                    query += ` AND number ILIKE $${paramIndex}`;
                    params.push(`%${number}%`);
                }
                
                const result = await db.query(query, params);
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(cars);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getCarDocuments(req, res) {
        try {
            const carId = req.params.carId;
            
            const { data: documents, error } = useFetch(async () => {
                const result = await db.query(
                    'SELECT * FROM car_documents WHERE car_id = $1',
                    [carId]
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

module.exports = new CarController();