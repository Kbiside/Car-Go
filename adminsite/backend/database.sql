CREATE TABLE Client (
    Id SERIAL PRIMARY KEY,
    FullName TEXT NOT NULL,
    Email TEXT UNIQUE,
    Phone TEXT,
    BirthDate DATE,
    Gender TEXT CHECK (Gender IN ('м', 'ж')),
    PassportNumber TEXT,
    IssueDate DATE,
    IssuingAuthority TEXT,
    INN TEXT,
    PassportFilePath TEXT,
    DriverLicensePath TEXT,
    Comment TEXT
);