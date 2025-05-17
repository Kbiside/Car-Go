const db = require('../db');
const { useFetch } = require('@mantine/hooks');

class ClientController {
    async createClient(req, res) {
        try {
            const { 
                user_id,
                full_name, 
                phone, 
                birth_date, 
                gender, 
                inn, 
                comment
            } = req.body;
            
            const { data: newClient, error } = useFetch(async () => {
                const result = await db.query(
                    `INSERT INTO clients (
                        user_id, full_name, phone, birth_date, 
                        gender, inn, comment
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
                    [
                        user_id, full_name, phone, birth_date, 
                        gender, inn, comment
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
                const result = await db.query('SELECT * FROM clients');
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
                const result = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
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
                full_name, 
                phone, 
                birth_date, 
                gender, 
                inn, 
                comment
            } = req.body;
            
            const { data: updatedClient, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE clients SET 
                        full_name = $1, 
                        phone = $2, 
                        birth_date = $3, 
                        gender = $4, 
                        inn = $5, 
                        comment = $6,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $7 RETURNING *`, 
                    [
                        full_name, phone, birth_date, 
                        gender, inn, comment, id
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
                const result = await db.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
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

    async getClientDocuments(req, res) {
        try {
            const clientId = req.params.clientId;
            
            const { data: documents, error } = useFetch(async () => {
                const result = await db.query(
                    'SELECT * FROM client_documents WHERE client_id = $1',
                    [clientId]
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

module.exports = new ClientController();