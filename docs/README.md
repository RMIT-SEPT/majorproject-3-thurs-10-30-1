# SEPT Startup code and  project Structure documentation 
Update and info for milestone 2 submission:

Find here a Link for our notion board: https://www.notion.so/c72e827ad10a4d709a675efab3523359?v=f5dc3838c4c24611be708f186a47bbae
Notion contains:
-Meeting Minutes for each of our meetings
-Individual boards for each of our sprints, with planning, retro and reviews contained where relevant. 
-Product Backlog, with each item containing itemized tasks, a definition of done, a progress indicator and effort. Items also have an indicator for relevant user stories. 

A wiki section containing:
- A map of our databases.
-A progressive list of acceptance tests, with completes tests marked as 'passed'.
-A link to our google drive containing user stories, each with acceptance criteria.
-A testing log spreadsheet showing logging of test results. 

 -All code and tests in our project are new to this milestone.

Our Product has the following features implemented:
-account registration for new customers. Accounts can only be created with unique email addresses and usernames. 
-Login for users with some responsive errors. Either newly created or pre-loaded accounts. 
-Logout for users. 
-Different nav bar display depending on type of account logged in.
-Profile viewing and reactive text fields for editing for users. (error was discovered with put method, so editing is non-functional)
-Admin account ability to create worker accounts. 
-The beginnings of simple booking creation- displaying all businesses available in the database to users. The completion of this feature is a part of our current sprint. 
-redux session integration. 

Consistent front end design.
API mapping for a number of backend functions relating to services, businesses, users and bookings. 
Functional dockerFiles for creating and running front and back-end containers. 

CIRCLE CI AND AWS


# Quick Start
Our project requires the front and back end programs to be running. 
On startup the backend is populated by some simple testing data-
2 businesses called: 
Special Hairdressing and Main Street Massage. 

5 users are instantiated, in the format (account_type, name, username, password, Contact_Number, email):
('Admin','Greg','BigGreg','password',48777,'greg@greg.com'),
('Worker','Sandy','BigSandy','password',4877,'sandy@sandy.com'),
('Worker','Alan','BigAlan','password',477,'Alan@Alan.com'),
('Customer','Max','MaxMax','password',47,'Maximillianyoung0@gmail.com'),
('Admin','Kara','BigKara','password',4,'kara@kara.com');

