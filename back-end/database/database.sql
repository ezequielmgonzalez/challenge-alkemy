CREATE USER testuser WITH PASSWORD 'pAssw0rd';

CREATE TABLE movement (
    movement_id SERIAL PRIMARY KEY,
    amount REAL NOT NULL,
    concept VARCHAR(255) NOT NULL,
    dateM DATE NOT NULL,
    typeM CHAR NOT NULL
);

ALTER TABLE movement OWNER TO testuser;
ALTER SEQUENCE movement_movement_id_seq OWNER TO testuser;