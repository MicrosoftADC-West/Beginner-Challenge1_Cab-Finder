--Postgres table creation script for RideServices table

CREATE TABLE rideservice (
 rideservice_id SERIAL PRIMARY KEY,
 rideservice_name VARCHAR(100) NOT NULL,
 priceperkm DECIMAL(10, 2) NOT NULL
);


--Postgres SQl script for rideservices data

INSERT INTO rideservice (rideservice_name, priceperkm)
VALUES
('Bolt', 45),
('Uber', 50),
('O''Ride', 35),
('EasyTaxi', 42),
('Gokada', 30),
('Lagride', 55);
