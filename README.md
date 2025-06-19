# SHARITY - file trading app

## Functionalities

- Each user has their own profile, created during registration, they can register, login, reset passwords etc. The session data is handled securely using spring security
- A user can add files and create products, each file is stored in the public/uploads folder (but can be different by modyfing the StorageService) and a UserFile object in the database. Each product has a list of these user files, some files are public and others are not, all image files are public, but when a user tries to access and download a pdf file, the backend checks if he has bought a product that has this file in it.
- Transaction object in the database is created whenever a user mocks the buying of a certain product, we decided to not implement the payment functionality as this was not the goal of our project so all requests to Buy a product pass by default.
- All the necessary validations like checking if User has access to a file, checking if he is not buying his own product etc. are performed both on the backend and frontend
- Swagger documentation when running backend: http://localhost:8080/swagger-ui.html

## To run

Both frontend and backend have README.md with details how to run the whole app, if you want to run the password reset functionality you will also need to add email and app password to application.properties in the /backend folder
