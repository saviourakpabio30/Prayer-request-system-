CREATE DATABASE prayer_request_system;

USE prayer_request_system;

CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE prayer_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    request_text TEXT NOT NULL,
    confidential BOOLEAN DEFAULT FALSE,
    status ENUM('Pending', 'Prayed For', 'Closed')
        DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (member_id)
    REFERENCES members(id)
    ON DELETE CASCADE
);