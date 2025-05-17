const db = require('../db');
const { useFetch } = require('@mantine/hooks');

class RentalPriceController {
    async createRentalPrice(req, res) {
        try {
            const { 
                car_id,
                price_per_day,
                valid_from,
                valid_to
            } = req.body;
            
            const { data: newPrice, error } = useFetch(async () => {
                // Проверяем существование автомобиля
                const carExists = await db.query(
                    'SELECT id FROM cars WHERE id = $1',
                    [car_id]
                );
                
                if (carExists.rows.length === 0) {
                    throw new Error('Car not found');
                }

                const result = await db.query(
                    `INSERT INTO rental_prices (
                        car_id, price_per_day, valid_from, valid_to
                    ) VALUES ($1, $2, $3, $4) RETURNING *`, 
                    [
                        car_id, price_per_day, valid_from, valid_to
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(201).json(newPrice);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getCurrentPriceForCar(req, res) {
        try {
            const carId = req.params.carId;
            
            const { data: price, error } = useFetch(async () => {
                const result = await db.query(
                    `SELECT * FROM rental_prices 
                    WHERE car_id = $1 
                    AND (valid_to IS NULL OR valid_to >= CURRENT_DATE)
                    ORDER BY valid_from DESC
                    LIMIT 1`,
                    [carId]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!price) {
                return res.status(404).json({ message: 'Price not found for this car' });
            }
            
            res.json(price);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getPricesForCar(req, res) {
        try {
            const carId = req.params.carId;
            
            const { data: prices, error } = useFetch(async () => {
                const result = await db.query(
                    `SELECT * FROM rental_prices 
                    WHERE car_id = $1
                    ORDER BY valid_from DESC`,
                    [carId]
                );
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(prices);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateRentalPrice(req, res) {
        try {
            const { 
                id,
                price_per_day,
                valid_from,
                valid_to
            } = req.body;
            
            const { data: updatedPrice, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE rental_prices SET 
                        price_per_day = $1, 
                        valid_from = $2, 
                        valid_to = $3,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $4 RETURNING *`, 
                    [
                        price_per_day, valid_from, valid_to, id
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            if (!updatedPrice) {
                return res.status(404).json({ message: 'Price not found' });
            }
            
            res.json(updatedPrice);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteRentalPrice(req, res) {
        try {
            const id = req.params.id;
            
            const { data: deletedPrice, error } = useFetch(async () => {
                const result = await db.query(
                    'DELETE FROM rental_prices WHERE id = $1 RETURNING *',
                    [id]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            if (!deletedPrice) {
                return res.status(404).json({ message: 'Price not found' });
            }
            
            res.json(deletedPrice);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RentalPriceController();