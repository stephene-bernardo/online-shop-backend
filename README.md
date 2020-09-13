## Environment Variables
| Environment Variable | Description | Default Value|
| ---------------------|-------------|--------------|
|POSTGRES_HOST         |postgres hostname|127.0.0.1|
|POSTGRES_PORT        |database port| 5432        |
|POSTGRES_DB           |database name| postgres    |
|POSTGRES_USER         |database user| postgres|
|POSTGRES_PASSWORD     |database password| password|
|ONLINE_SHOP_FRONTEND_URL|Online Shop frontend url| http://localhost:4200|
|ENABLE_DELETION_OF_DB_DATA|Delete current Database data| true|
|ENABLE_CREATION_OF_SAMPLE_DATA|Create Sample Data|true| 
## Requirements 
postgres database must be running. You could specify different database by change its environment variable.

node must be installed preferred version would be 12.18.3

## setting up and running backend locally

#### Install dependency
```
npm install
```

#### run the application
```
node app.js
```
the application would run in localhost:3000

## You could login by using the Sample Data when enabled
|Username|Password|
|--------|--------|
|brightbats|secret|
|shrewdlyrically|hidden|
|remorsefulrebel|password|
|reassuringhug|12345|
|positiveproble|secure|
|attractivemap|superSecureP@ssword|