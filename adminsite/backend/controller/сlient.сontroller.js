const db = require('../db');
const { useFetch } = require('@mantine/hooks');

class ClientController {
    async createClient(req, res) {
        try {
            const { 
                fullname, 
                email, 
                phone, 
                birthdate, 
                gender, 
                passportnumber, 
                issuedate, 
                issuingauthority, 
                inn, 
                passportfilepath, 
                driverlicensepath, 
                comment 
            } = req.body;
            
            const { data: newClient, error } = useFetch(async () => {
                const result = await db.query(
                    `INSERT INTO Client (
                        FullName, Email, Phone, BirthDate, Gender, PassportNumber, 
                        IssueDate, IssuingAuthority, INN, PassportFilePath, 
                        DriverLicensePath, Comment
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`, 
                    [
                        fullname, email, phone, birthdate, gender, passportnumber, 
                        issuedate, issuingauthority, inn, passportfilepath, 
                        driverlicensepath, comment
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.status(201).json(newClient);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getClients(req, res) {
        try {
            const { data: clients, error } = useFetch(async () => {
                const result = await db.query('SELECT * FROM Client');
                return result.rows;
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.json(clients);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getOneClient(req, res) {
        try {
            const id = req.params.id;
            
            const { data: client, error } = useFetch(async () => {
                const result = await db.query('SELECT * FROM Client WHERE Id = $1', [id]);
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }
            
            res.json(client);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateClient(req, res) {
        try {
            const { 
                id, 
                fullname, 
                email, 
                phone, 
                birthdate, 
                gender, 
                passportnumber, 
                issuedate, 
                issuingauthority, 
                inn, 
                passportfilepath, 
                driverlicensepath, 
                comment 
            } = req.body;
            
            const { data: updatedClient, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE Client SET 
                        FullName = $1, 
                        Email = $2, 
                        Phone = $3, 
                        BirthDate = $4, 
                        Gender = $5, 
                        PassportNumber = $6, 
                        IssueDate = $7, 
                        IssuingAuthority = $8, 
                        INN = $9, 
                        PassportFilePath = $10, 
                        DriverLicensePath = $11, 
                        Comment = $12 
                    WHERE Id = $13 RETURNING *`, 
                    [
                        fullname, email, phone, birthdate, gender, passportnumber, 
                        issuedate, issuingauthority, inn, passportfilepath, 
                        driverlicensepath, comment, id
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!updatedClient) {
                return res.status(404).json({ message: 'Client not found' });
            }
            
            res.json(updatedClient);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteClient(req, res) {
        try {
            const id = req.params.id;
            
            const { data: deletedClient, error } = useFetch(async () => {
                const result = await db.query('DELETE FROM Client WHERE Id = $1 RETURNING *', [id]);
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!deletedClient) {
                return res.status(404).json({ message: 'Client not found' });
            }
            
            res.json(deletedClient);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ClientController();