const db = require('../db');
const { useFetch } = require('@mantine/hooks');

class EmployeeController {
    async createEmployee(req, res) {
        try {
            const { 
                employeeid,
                fullname, 
                email, 
                phone, 
                birthdate, 
                gender, 
                passportnumber, 
                issuingauthority, 
                issuedate, 
                passportcopy, 
                inn, 
                position, 
                workbook, 
                photo, 
                educationdocuments, 
                passwordhash 
            } = req.body;
            
            const { data: newEmployee, error } = useFetch(async () => {
                const result = await db.query(
                    `INSERT INTO Employee (
                        EmployeeId, FullName, Email, Phone, BirthDate, Gender, 
                        PassportNumber, IssuingAuthority, IssueDate, PassportCopy, 
                        INN, Position, WorkBook, Photo, EducationDocuments, PasswordHash
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`, 
                    [
                        employeeid, fullname, email, phone, birthdate, gender, 
                        passportnumber, issuingauthority, issuedate, passportcopy, 
                        inn, position, workbook, photo, educationdocuments, passwordhash
                    ]
                );
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            // Не возвращаем пароль в ответе
            const { PasswordHash, ...employeeData } = newEmployee;
            res.status(201).json(employeeData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployees(req, res) {
        try {
            const { data: employees, error } = useFetch(async () => {
                const result = await db.query(
                    'SELECT Id, EmployeeId, FullName, Email, Phone, Position FROM Employee'
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
                const result = await db.query('SELECT * FROM Employee WHERE Id = $1', [id]);
                return result.rows[0];
            });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            
            // Не возвращаем пароль в ответе
            const { PasswordHash, ...employeeData } = employee;
            res.json(employeeData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployee(req, res) {
        try {
            const { 
                id,
                employeeid,
                fullname, 
                email, 
                phone, 
                birthdate, 
                gender, 
                passportnumber, 
                issuingauthority, 
                issuedate, 
                passportcopy, 
                inn, 
                position, 
                workbook, 
                photo, 
                educationdocuments 
            } = req.body;
            
            const { data: updatedEmployee, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE Employee SET 
                        EmployeeId = $1,
                        FullName = $2, 
                        Email = $3, 
                        Phone = $4, 
                        BirthDate = $5, 
                        Gender = $6, 
                        PassportNumber = $7, 
                        IssuingAuthority = $8, 
                        IssueDate = $9, 
                        PassportCopy = $10, 
                        INN = $11, 
                        Position = $12, 
                        WorkBook = $13, 
                        Photo = $14, 
                        EducationDocuments = $15 
                    WHERE Id = $16 RETURNING *`, 
                    [
                        employeeid, fullname, email, phone, birthdate, gender, 
                        passportnumber, issuingauthority, issuedate, passportcopy, 
                        inn, position, workbook, photo, educationdocuments, id
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
            
            // Не возвращаем пароль в ответе
            const { PasswordHash, ...employeeData } = updatedEmployee;
            res.json(employeeData);
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
                    'DELETE FROM Employee WHERE Id = $1 RETURNING *', 
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
            
            // Не возвращаем пароль в ответе
            const { PasswordHash, ...employeeData } = deletedEmployee;
            res.json(employeeData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployeePassword(req, res) {
        try {
            const { id, newPasswordHash } = req.body;
            
            const { data: updatedEmployee, error } = useFetch(async () => {
                const result = await db.query(
                    `UPDATE Employee SET 
                        PasswordHash = $1 
                    WHERE Id = $2 
                    RETURNING Id, EmployeeId, FullName, Email, Position`, 
                    [newPasswordHash, id]
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
}

module.exports = new EmployeeController();