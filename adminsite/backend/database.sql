-- Create enum types for better data integrity
CREATE TYPE gender_enum AS ENUM ('male', 'female');
CREATE TYPE document_type_enum AS ENUM (
    'passport', 
    'driver_license', 
    'workbook', 
    'education', 
    'vehicle_passport', 
    'insurance', 
    'registration', 
    'sales_contract', 
    'photo'
);
CREATE TYPE role_enum AS ENUM ('client', 'managersotr', 'manageravto', 'managerclient', 'admin', 'director');

-- Users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role role_enum NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Clients table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    birth_date DATE NOT NULL,
    gender gender_enum NOT NULL,
    inn TEXT,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Client documents
CREATE TABLE client_documents (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    document_type document_type_enum NOT NULL,
    number TEXT,
    issue_date DATE,
    issuing_authority TEXT,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_client_document UNIQUE (client_id, document_type)
);

-- Employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    employee_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    birth_date DATE NOT NULL,
    gender gender_enum NOT NULL,
    inn TEXT,
    position TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Employee documents
CREATE TABLE employee_documents (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    document_type document_type_enum NOT NULL,
    number TEXT,
    issue_date DATE,
    issuing_authority TEXT,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_employee_document UNIQUE (employee_id, document_type)
);

-- Cars table
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    number TEXT NOT NULL UNIQUE,
    comment TEXT,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Car documents
CREATE TABLE car_documents (
    id SERIAL PRIMARY KEY,
    car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    document_type document_type_enum NOT NULL,
    number TEXT,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_car_document UNIQUE (car_id, document_type)
);

-- Rental prices
CREATE TABLE rental_prices (
    id SERIAL PRIMARY KEY,
    car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    price_per_day NUMERIC(10, 2) NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_date_range CHECK (valid_to IS NULL OR valid_to >= valid_from)
);

-- Create index for active price lookup
CREATE INDEX idx_rental_prices_active ON rental_prices (car_id) 
WHERE valid_to IS NULL OR valid_to >= CURRENT_DATE;

-- Rental requests
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE RESTRICT,
    rental_price_id INTEGER NOT NULL REFERENCES rental_prices(id) ON DELETE RESTRICT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    child_seat BOOLEAN NOT NULL DEFAULT FALSE,
    comment TEXT,
    total_cost NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_rental_period CHECK (end_date > start_date)
);

-- Create indexes for better performance
CREATE INDEX idx_requests_client ON requests(client_id);
CREATE INDEX idx_requests_car ON requests(car_id);
CREATE INDEX idx_requests_dates ON requests(start_date, end_date);