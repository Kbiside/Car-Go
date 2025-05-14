const db = require('../db');
const { useFetch } = require('@mantine/hooks');

class RequestController {
    async createRequest(req, res) {
        try {
            const { 
                employeeid,
                clientid,
                carid,
                cost,
                startdate,
                enddate,
                childseat,
                comment
            } = req.body;
            
            const { data: newRequest, error } = useFetch(async () => {
                // Проверяем доступность автомобиля
                const carCheck = await db.query(
                    'SELECT IsAvailable FROM Car WHERE Id = $1',
                    [carid]
                );
                
                if (carCheck.rows.length === 0 || !carCheck.rows[0].isavailable) {
                    throw new Error('Car is not available');
                }

                const result = await db.query(
                    `INSERT INTO Request (
                        EmployeeId, ClientId, CarId, Cost, 
                        StartDate, EndDate, ChildSeat, Comment
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
                    [
                        employeeid, clientid, carid, cost,
                        startdate, enddate, childseat, comment
                    ]
                );

                // Помечаем автомобиль как недоступный
                await db.query(
                    'UPDATE Car SET IsAvailable = false WHERE Id = $1',
                    [carid]
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
                           c.FullName as ClientName,
                           e.FullName as EmployeeName,
                           car.Brand as CarBrand,
                           car.Model as CarModel
                    FROM Request r
                    JOIN Client c ON r.ClientId = c.Id
                    JOIN Employee e ON r.EmployeeId = e.Id
                    JOIN Car car ON r.CarId = car.Id
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
                           c.FullName as ClientName,
                           e.FullName as EmployeeName,
                           car.Brand as CarBrand,
                           car.Model as CarModel
                    FROM Request r
                    JOIN Client c ON r.ClientId = c.Id
                    JOIN Employee e ON r.EmployeeId = e.Id
                    JOIN Car car ON r.CarId = car.Id
                    WHERE r.Id = $1
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
                employeeid,
                clientid,
                carid,
                cost,
                startdate,
                enddate,
                childseat,
                comment
            } = req.body;
            
            const { data: updatedRequest, error } = useFetch(async () => {
                // Получаем текущий запрос для проверки carid
                const currentRequest = await db.query(
                    'SELECT CarId FROM Request WHERE Id = $1',
                    [id]
                );

                if (currentRequest.rows.length === 0) {
                    throw new Error('Request not found');
                }

                const oldCarId = currentRequest.rows[0].carid;
                let carUpdateQueries = [];

                // Если изменился автомобиль, обновляем доступность
                if (oldCarId !== carid) {
                    // Проверяем новый автомобиль
                    const newCarCheck = await db.query(
                        'SELECT IsAvailable FROM Car WHERE Id = $1',
                        [carid]
                    );
                    
                    if (newCarCheck.rows.length === 0 || !newCarCheck.rows[0].isavailable) {
                        throw new Error('New car is not available');
                    }

                    // Освобождаем старый автомобиль
                    carUpdateQueries.push(
                        db.query(
                            'UPDATE Car SET IsAvailable = true WHERE Id = $1',
                            [oldCarId]
                        )
                    );

                    // Занимаем новый автомобиль
                    carUpdateQueries.push(
                        db.query(
                            'UPDATE Car SET IsAvailable = false WHERE Id = $1',
                            [carid]
                        )
                    );
                }

                const result = await db.query(
                    `UPDATE Request SET 
                        EmployeeId = $1, 
                        ClientId = $2, 
                        CarId = $3, 
                        Cost = $4, 
                        StartDate = $5, 
                        EndDate = $6, 
                        ChildSeat = $7, 
                        Comment = $8
                    WHERE Id = $9 RETURNING *`, 
                    [
                        employeeid, clientid, carid, cost,
                        startdate, enddate, childseat, comment, id
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
                    'SELECT CarId FROM Request WHERE Id = $1',
                    [id]
                );

                if (request.rows.length === 0) {
                    throw new Error('Request not found');
                }

                const carId = request.rows[0].carid;

                // Удаляем запрос
                const result = await db.query(
                    'DELETE FROM Request WHERE Id = $1 RETURNING *',
                    [id]
                );

                // Освобождаем автомобиль
                await db.query(
                    'UPDATE Car SET IsAvailable = true WHERE Id = $1',
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
                           car.Brand as CarBrand,
                           car.Model as CarModel
                    FROM Request r
                    JOIN Car car ON r.CarId = car.Id
                    WHERE r.ClientId = $1
                    ORDER BY r.StartDate DESC
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
                           c.FullName as ClientName
                    FROM Request r
                    JOIN Client c ON r.ClientId = c.Id
                    WHERE r.CarId = $1
                    ORDER BY r.StartDate DESC
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