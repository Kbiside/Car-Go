const db = require('../db');
const { useFetch } = require('@mantine/hooks');

class DocumentController {
    async createClientDocument(req, res) {
        try {
            const { 
                client_id,
                document_type,
                number,
                issue_date,
                issuing_authority,
                file_path
            } = req.body;
            
            const { data: newDocument, error } = useFetch(async () => {
                const result = await db.query(
                    `INSERT INTO client_documents (
                        client_id, document_type, number, issue_date, 
                        issuing_authority, file_path
                    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
                    [
                        client_id, document_type, number, issue_date, 
                        issuing_authority, file_path
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.status(201).json(newDocument);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async createEmployeeDocument(req, res) {
        try {
            const { 
                employee_id,
                document_type,
                number,
                issue_date,
                issuing_authority,
                file_path
            } = req.body;
            
            const { data: newDocument, error } = useFetch(async () => {
                const result = await db.query(
                    `INSERT INTO employee_documents (
                        employee_id, document_type, number, issue_date, 
                        issuing_authority, file_path
                    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
                    [
                        employee_id, document_type, number, issue_date, 
                        issuing_authority, file_path
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.status(201).json(newDocument);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async createCarDocument(req, res) {
        try {
            const { 
                car_id,
                document_type,
                number,
                file_path
            } = req.body;
            
            const { data: newDocument, error } = useFetch(async () => {
                const result = await db.query(
                    `INSERT INTO car_documents (
                        car_id, document_type, number, file_path
                    ) VALUES ($1, $2, $3, $4) RETURNING *`, 
                    [
                        car_id, document_type, number, file_path
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            res.status(201).json(newDocument);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateDocument(req, res) {
        try {
            const { 
                id,
                document_type,
                number,
                issue_date,
                issuing_authority,
                file_path
            } = req.body;
            
            const { data: updatedDocument, error } = useFetch(async () => {
                // Определяем тип документа по таблице
                let tableName;
                if (document_type === 'vehicle_passport' || document_type === 'insurance' || 
                    document_type === 'registration' || document_type === 'sales_contract') {
                    tableName = 'car_documents';
                } else if (document_type === 'workbook' || document_type === 'education') {
                    tableName = 'employee_documents';
                } else {
                    tableName = 'client_documents';
                }

                const result = await db.query(
                    `UPDATE ${tableName} SET 
                        document_type = $1, 
                        number = $2, 
                        issue_date = $3, 
                        issuing_authority = $4, 
                        file_path = $5,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = $6 RETURNING *`, 
                    [
                        document_type, number, issue_date, 
                        issuing_authority, file_path, id
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!updatedDocument) {
                return res.status(404).json({ message: 'Document not found' });
            }
            
            res.json(updatedDocument);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteDocument(req, res) {
        try {
            const { id, document_type } = req.params;
            
            const { data: deletedDocument, error } = useFetch(async () => {
                // Определяем таблицу по типу документа
                let tableName;
                if (document_type === 'vehicle_passport' || document_type === 'insurance' || 
                    document_type === 'registration' || document_type === 'sales_contract') {
                    tableName = 'car_documents';
                } else if (document_type === 'workbook' || document_type === 'education') {
                    tableName = 'employee_documents';
                } else {
                    tableName = 'client_documents';
                }

                const result = await db.query(
                    `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`, 
                    [id]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!deletedDocument) {
                return res.status(404).json({ message: 'Document not found' });
            }
            
            res.json(deletedDocument);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DocumentController();