
INSERT INTO USER (account_type, name, username, password, Contact_Number, email) VALUES
('Admin','Greg','BigGreg','password',48777,'greg@greg.com'),
('Worker','Sandy','BigSandy','password',4877,'sandy@sandy.com'),
('Worker','Alan','BigAlan','password',477,'Alan@Alan.com'),
('Customer','Max','MaxMax','password',47,'Maximillianyoung0@gmail.com'),
('Admin','Kara','BigKara','password',4,'kara@kara.com'),
('Worker','Milo','BigMilo','password',4877,'milo@milo.com');

INSERT INTO BUSINESS (name) VALUES
('Special Hairdressing'),
('Main Street Massage');

INSERT INTO ADMIN(ADMIN_ID, BUSINESS_ID) VALUES
(1, 1),
(5, 2);

INSERT INTO WORKER(WORKER_ID) VALUES
(2),
(3),
(6);

INSERT INTO CUSTOMER(CUSTOMER_ID) VALUES
(1);

INSERT INTO SERVICES (name, description,business_id) VALUES
('Haircut','A great haircut service',1),
('Manicure','really cool manicure service',1),
('Massage','Very Comfy massage',2);

INSERT INTO WORKER_SERVICES(workers_worker_id,services_service_id) VALUES
(2,1),
(2,2),
(3,3),
(6,1);

INSERT INTO BUSINESS_WORKERS(businesses_id,workers_worker_id) VALUES
(1,2),
(2,3),
(1,6);

INSERT INTO AVAILABILITY(day_of_week,hour,minute,worker_id,service_id, length) VALUES
(1,9,0,2,1,30),
(1,9,30,2,1,30),
(1,10,0,2,1,30),
(1,10,30,2,1,30),
(2,11,0,2,1,30),
(2,11,30,2,1,30),
(2,12,0,2,1,30),
(2,12,30,2,1,30),
(3,13,0,2,1,30),
(3,13,30,2,1,30),
(3,14,0,2,1,30),
(3,14,30,2,1,30),
(4,15,0,2,1,30),
(4,15,30,2,1,30),
(4,16,0,2,1,30),
(4,16,30,2,1,30),
(5,17,0,2,1,30),
-- service 2
(1,9,0,2,2,30),
(1,9,30,2,2,30),
(1,10,0,2,2,30),
(1,10,30,2,2,30),
(2,11,0,2,2,30),
(2,11,30,2,2,30),
(2,12,0,2,2,30),
(2,12,30,2,2,30),
(3,13,0,2,2,30),
(3,13,30,2,2,30),
(3,14,0,2,2,30),
(3,14,30,2,2,30),
(4,15,0,2,2,30),
(4,15,30,2,2,30),
(4,16,0,2,2,30),
(4,16,30,2,2,30),
(5,17,0,2,2,30),
-- service 3
(1,9,0,3,3,15),
(1,9,15,3,3,15),
(1,10,0,3,3,15),
(1,10,15,3,3,15),
(2,11,0,3,3,15),
(2,11,15,3,3,15),
(2,12,0,3,3,15),
(2,12,15,3,3,15),
(3,13,0,3,3,15),
(3,13,15,3,3,15),
(3,14,0,3,3,15),
(3,14,15,3,3,15),
(4,15,0,3,3,15),
(4,15,15,3,3,15),
(4,16,0,3,3,15),
(4,16,15,3,3,15),
(5,17,0,3,3,15);
-- make services
-- make businseses with those services
-- make users
-- make workers out of those users and those services

