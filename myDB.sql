CREATE TABLE public.account
(
         id SERIAL NOT NULL PRIMARY KEY,
         username VARCHAR(100) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         first_name VARCHAR(100) NOT NULL,
         last_name VARCHAR(100) NOT NULL,
         is_admin BOOLEAN NOT NULL,
         is_active BOOLEAN NOT NULL
         token VARCHAR NOT NULL -- will assist in signing up new users
);

CREATE TABLE public.area
(
         id VARCHAR(20) NOT NULL UNIQUE PRIMARY KEY,
         name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE public.location 
(
         id SERIAL NOT NULL PRIMARY KEY,
         name VARCHAR(100) NOT NULL UNIQUE,
         -- notes TEXT, --might use in a later version
         area_id VARCHAR(20) NOT NULL REFERENCES public.area(id)
);

CREATE TABLE public.device_type
(
         id VARCHAR(20) NOT NULL UNIQUE PRIMARY KEY,
         name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE public.device
(
         id SERIAL NOT NULL PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         device_id VARCHAR(20) UNIQUE,
         is_sched BOOLEAN NOT NULL,
         frequency INTEGER NOT NULL,
         type_id VARCHAR(20) NOT NULL REFERENCES public.device_type(id),
         location_id INTEGER NOT NULL REFERENCES public.location(id)
);

CREATE TABLE public.workorder
(
         id SERIAL NOT NULL PRIMARY KEY,
         create_date TIMESTAMP NOT NULL,     -- This is added for scheduled work
         start_date TIMESTAMP NOT NULL,      -- If not scheduled will be the same as create date
         end_date TIMESTAMP,
         deadline TIMESTAMP,     -- This is added for work with a deadline
         reoccurring BOOLEAN NOT NULL, 
         priority INTEGER NOT NULL,
         description TEXT NOT NULL,
         device_id INTEGER NOT NULL REFERENCES public.device(id),
         user_id INTEGER NOT NULL REFERENCES public.account(id)
);

CREATE TABLE public.wo_note 
(
   id SERIAL NOT NULL PRIMARY KEY,
   note TEXT NOT NULL,
   date TIMESTAMP NOT NULL,
   wo_id INTEGER NOT NULL REFERENCES public.workorder(id),
   user_id INTEGER NOT NULL REFERENCES public.account(id)
);

-- test data --

-- user --
INSERT INTO public.account (username, password, first_name, last_name, is_admin, is_active) VALUES ('jthompson', '$2y$10$b6VNUrxEi7L4FBFjNcF/feSmv62lRNA71zazXdg670YjUabdCtSZa', 'Jordon', 'Thompson', TRUE, TRUE);
INSERT INTO public.account (username, password, first_name, last_name, is_admin, is_active) VALUES ('sporter', '$2y$10$b6VNUrxEi7L4FBFjNcF/feSmv62lRNA71zazXdg670YjUabdCtSZa', 'Shawn', 'Porter', FALSE, TRUE);

-- Area --
INSERT INTO public.area (id, name) VALUES ('RAN', 'Randlett');
INSERT INTO public.area (id, name) VALUES ('BTR', 'Black Tail Ridge');
INSERT INTO public.area (id, name) VALUES ('ANT', 'Antelope Creek');
INSERT INTO public.area (id, name) VALUES ('FIN', 'Finley Resources');
INSERT INTO public.area (id, name) VALUES ('HOG', 'HOG');

-- Location --
INSERT INTO public.location (name, area_id) VALUES ('11-2-3-4-5W-H1', 'BTR');
INSERT INTO public.location (name, area_id) VALUES ('05-6D-45', 'BTR');
INSERT INTO public.location (name, area_id) VALUES ('09-5D-35', 'BTR');
INSERT INTO public.location (name, area_id) VALUES ('04-21-3-1E-H1', 'RAN');
INSERT INTO public.location (name, area_id) VALUES ('04-23-3-1W-H1', 'RAN');
INSERT INTO public.location (name, area_id) VALUES ('03-26-3-1E', 'RAN');
INSERT INTO public.location (name, area_id) VALUES ('11-16-4-2E', 'RAN');
INSERT INTO public.location (name, area_id) VALUES ('08-22D-45', 'ANT');
INSERT INTO public.location (name, area_id) VALUES ('08-25D-45', 'ANT');
INSERT INTO public.location (name, area_id) VALUES ('20-02 Compressor', 'ANT');
INSERT INTO public.location (name, area_id) VALUES ('12-9-9-19', 'FIN');
INSERT INTO public.location (name, area_id) VALUES ('13-13A-4-2', 'FIN');
INSERT INTO public.location (name, area_id) VALUES ('11-15A-4-2', 'FIN');
INSERT INTO public.location (name, area_id) VALUES ('04-14-6-20', 'HOG');
INSERT INTO public.location (name, area_id) VALUES ('05-29-6-21E', 'HOG');
INSERT INTO public.location (name, area_id) VALUES ('10-36-5-19', 'HOG');

-- Device Type --
INSERT INTO public.device_type (id, name) VALUES ('GAS_MTR', 'Gas Meter');
INSERT INTO public.device_type (id, name) VALUES ('LVL_SNS', 'Tank Sensor');
INSERT INTO public.device_type (id, name) VALUES ('PIT_SNS', 'Pressure Transmitter');
INSERT INTO public.device_type (id, name) VALUES ('VTX_MTR', 'Vortex Meter');
INSERT INTO public.device_type (id, name) VALUES ('COR_MTR', 'Coriolis Meter');
INSERT INTO public.device_type (id, name) VALUES ('BRN_MNG', 'Burner Management');
INSERT INTO public.device_type (id, name) VALUES ('CTR_VLV', 'Control Valve');

-- Device --
INSERT INTO public.device (name, device_id, is_sched, frequency, type_id, location_id) VALUES ('Sales', 'S123456789', TRUE, 182, 'GAS_MTR', 1);
INSERT INTO public.device (name, device_id, is_sched, frequency, type_id, location_id) VALUES ('Oil Tank 1', '1000000001', FALSE, 0, 'LVL_SNS', 1);
INSERT INTO public.device (name, device_id, is_sched, frequency, type_id, location_id) VALUES ('Oil Tank 1', '1000088899', FALSE, 182, 'LVL_SNS', 2);

-- Workorder --
INSERT INTO public.workorder (start_date, priority, description, reoccurring, device_id, user_id) VALUES (NOW(), 1, 'Calibrate Meter', FALSE, 1, 1);
INSERT INTO public.workorder (start_date, priority, description, reoccurring, device_id, user_id) VALUES (NOW(), 2, 'Check high temp on Tank sensor', FALSE, 2, 2);
INSERT INTO public.workorder (start_date, priority, description, reoccurring, device_id, user_id) VALUES (NOW(), 2, 'Replace broken board', FALSE, 3, 1);
INSERT INTO public.workorder (start_date, priority, description, reoccurring, device_id, user_id) VALUES (NOW(), 2, 'Float is stuck', FALSE, 3, 1);

-- Workorder Notes --
INSERT INTO public.wo_note (note, date, wo_id, user_id) VALUES ('This is my first test note', NOW(), 1, 1);
INSERT INTO public.wo_note (note, date, wo_id, user_id) VALUES ('This is my second test note', NOW(), 1, 1);
INSERT INTO public.wo_note (note, date, wo_id, user_id) VALUES ('Meter is full of oil and needs to be cleaned out...', NOW(), 1, 2);
INSERT INTO public.wo_note (note, date, wo_id, user_id) VALUES ('Troubleshot tank and found that the float needs to be replaced.', NOW(), 2, 1);
INSERT INTO public.wo_note (note, date, wo_id, user_id) VALUES ('Float is stuck', NOW(), 3, 2);
