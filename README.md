## An example of server application based on express js
#### 1. Configuration
Create file ```config.json``` in ```config/``` directory with the following structure: 
```sh
{
  "development": {
    "db": {
      "username": "your-database-user-name",
      "password": "password",
      "database": "database-name",
      "host": "localhost",
      "dialect": "postgres"
    },
    "whiteList": ["http://localhost:4300", "http://localhost:3000"]
  }
}
```
#### 2. Database
Create database and user and replace credentials in ```config.json```

```sh
npm install
npm run migrate
npm start
```
#### 3. Swagger
Open [http://localhost:4300/api-docs](http://localhost:4300/api-docs)