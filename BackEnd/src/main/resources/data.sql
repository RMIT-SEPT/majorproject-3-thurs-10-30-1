
INSERT INTO USER (account_type, name, username, password, Contact_Number, email) VALUES
('Admin','Greg','BigGreg','password',48777,'greg@greg.com'),
('Worker','Sandy','BigSandy','password',4877,'sandy@sandy.com'),
('Worker','Alan','BigAlan','password',477,'Alan@Alan.com'),
('Customer','Max','MaxMax','password',47,'Maximillianyoung0@gmail.com'),
('Admin','Kara','BigKara','password',4,'kara@kara.com');

INSERT INTO ADMIN(ADMIN_ID) VALUES
(1),
(5);

INSERT INTO WORKER(WORKER_ID) VALUES
(2),
(3);

INSERT INTO CUSTOMER(CUSTOMER_ID) VALUES
(1);

INSERT INTO BUSINESS (name) VALUES
('Special Hairdressing'),
('Main Street Massage');

INSERT INTO BUSINESS_ADMINS (business_id,admins_admin_id) VALUES
(1,1),
(2,5);


INSERT INTO SERVICES (name, description,business_id) VALUES
('Haircut','A great haircut service',1),
('Manicure','really cool manicure service',1),
('Massage','Very Comfy massage',2);

INSERT INTO WORKER_SERVICES(workers_worker_id,services_service_id) VALUES
(2,1),
(2,2),
(3,3);

-- make services
-- make businseses with those services
-- make users
-- make workers out of those users and those services