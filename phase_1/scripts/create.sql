CREATE TABLE services (
 service_id integer PRIMARY KEY,
 service_name varchar(20) NOT NULL UNIQUE,
 service_command text NOT NULL,
 service_type text NOT NULL
);
