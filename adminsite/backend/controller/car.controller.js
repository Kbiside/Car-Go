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
                vehiclepassport, 
                salescontract, 
                insurancepolicy, 
                carphoto, 
                registrationcertificate,
                isavailable
            } = req.body;
            
            const { data: newCar, error } = useFetch(async () => {
                const result = await db.query(
                    `INSERT INTO Car (
                        Brand, Model, Number, Comment, VehiclePassport, 
                        SalesContract, InsurancePolicy, CarPhoto, 
                        RegistrationCertificate, IsAvailable
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`, 
                    [
                        brand, model, number, comment, vehiclepassport, 
                        salescontract, insurancepolicy, carphoto, 
                        registrationcertificate, 
                        isavailable !== undefined ? isavailable : true
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
                let query = 'SELECT * FROM Car';
                const params = [];
                
                if (available === 'true') {
                    query += ' WHERE IsAvailable = $1';
                    params.push(true);
                } else if (available === 'false') {
                    query += ' WHERE IsAvailable = $1';
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
                    'SELECT * FROM Car WHERE IsAvailable = true'
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
                    'SELECT * FROM Car WHERE Id = $1', 
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
                vehiclepassport, 
                salescontract, 
                insurancepolicy, 
                carphoto, 
                registrationcertificate,
                isavailable
            } = req.body;
            
            const { data: updatedCar, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE Car SET 
                        Brand = $1, 
                        Model = $2, 
                        Number = $3, 
                        Comment = $4, 
                        VehiclePassport = $5, 
                        SalesContract = $6, 
                        InsurancePolicy = $7, 
                        CarPhoto = $8, 
                        RegistrationCertificate = $9,
                        IsAvailable = $10
                    WHERE Id = $11 RETURNING *`, 
                    [
                        brand, model, number, comment, vehiclepassport, 
                        salescontract, insurancepolicy, carphoto, 
                        registrationcertificate, isavailable, id
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
            const { isavailable } = req.body;
            
            const { data: updatedCar, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE Car SET 
                        IsAvailable = $1 
                    WHERE Id = $2 
                    RETURNING Id, Brand, Model, Number, IsAvailable`, 
                    [isavailable, id]
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
                    'DELETE FROM Car WHERE Id = $1 RETURNING *', 
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
                let query = 'SELECT * FROM Car WHERE 1=1';
                const params = [];
                let paramIndex = 1;
                
                if (brand) {
                    query += ` AND Brand ILIKE $${paramIndex}`;
                    params.push(`%${brand}%`);
                    paramIndex++;
                }
                
                if (model) {
                    query += ` AND Model ILIKE $${paramIndex}`;
                    params.push(`%${model}%`);
                    paramIndex++;
                }
                
                if (number) {
                    query += ` AND Number ILIKE $${paramIndex}`;
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
}

module.exports = new CarController();