CREATE TABLE Client (
    Id SERIAL PRIMARY KEY,
    FullName TEXT NOT NULL,
    Email TEXT,
    Phone TEXT NOT NULL,
    BirthDate DATE,
    Gender TEXT CHECK (Gender IN ('м', 'ж')),
    PassportNumber TEXT NOT NULL,
    IssueDate DATE NOT NULL,
    IssuingAuthority TEXT NOT NULL,
    INN TEXT,
    PassportFilePath TEXT,
    DriverLicensePath TEXT,
    Comment TEXT
);

CREATE TABLE Car (
    Id SERIAL PRIMARY KEY,
    Brand TEXT NOT NULL,
    Model TEXT NOT NULL,
    Number TEXT NOT NULL,
    Comment TEXT,
    VehiclePassport TEXT,
    SalesContract TEXT,
    InsurancePolicy TEXT,
    CarPhoto TEXT,
    RegistrationCertificate TEXT,
    IsAvailable BOOLEAN DEFAULT TRUE
);

CREATE TABLE Employee (
    Id SERIAL PRIMARY KEY,
    EmployeeId TEXT NOT NULL UNIQUE,
    FullName TEXT NOT NULL,
    Email TEXT NOT NULL,
    Phone TEXT NOT NULL,
    BirthDate DATE NOT NULL,
    Gender TEXT CHECK (Gender IN ('male', 'female')) NOT NULL,
    PassportNumber TEXT NOT NULL,
    IssuingAuthority TEXT NOT NULL,
    IssueDate DATE NOT NULL,
    PassportCopy TEXT,
    INN TEXT NOT NULL,
    Position TEXT NOT NULL,
    WorkBook TEXT,
    Photo TEXT,
    EducationDocuments TEXT,
    PasswordHash TEXT NOT NULL
);

CREATE TABLE Request (
    Id SERIAL PRIMARY KEY,
    EmployeeId INTEGER NOT NULL,
    ClientId INTEGER NOT NULL,
    CarId INTEGER NOT NULL,
    Cost NUMERIC(10, 2) NOT NULL,
    StartDate TIMESTAMP NOT NULL,
    EndDate TIMESTAMP NOT NULL,
    ChildSeat BOOLEAN DEFAULT FALSE,
    Comment TEXT,
    FOREIGN KEY (EmployeeId) REFERENCES Employee(Id),
    FOREIGN KEY (ClientId) REFERENCES Client(Id),
    FOREIGN KEY (CarId) REFERENCES Car(Id),
    CONSTRAINT valid_dates CHECK (EndDate > StartDate)
);
