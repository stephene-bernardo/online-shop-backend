## Environment Variables
| Environment Variable | Description | Default Value|
| ---------------------|-------------|--------------|
|POSTGRES_HOST         |postgres hostname|127.0.0.1|
|POSTGRES_PORT        |database port| 5432        |
|POSTGRES_DB           |database name| postgres    |
|POSTGRES_USER         |database user| postgres|
|POSTGRES_PASSWORD     |database password| password|
|ONLINE_SHOP_FRONTEND_URL|Online Shop frontend url| http://localhost:4200|
|ENABLE_DELETION_OF_DB_DATA|Delete current Database data when set to true| false|
|ENABLE_CREATION_OF_SAMPLE_DATA|Create Sample Data when set to true|false| 
## Requirements 
**Postgres** database must be running. The preferred version would be 12. You could specify different database parameter by change the environment variable when running the application.

**Node** must be installed preferred version would be 12.18.3

## setting up and running backend locally

#### Install dependency
```
npm install
```

#### run the application
```
npm run start
```
the application would run by default in localhost:3000

## Using default Credentials when ENABLE_CREATION_OF_SAMPLE_DATA is enabled
#### Listed Credentials would be available.
|Username|Password|
|--------|--------|
|brightbats|secret|
|shrewdlyrically|hidden|
|remorsefulrebel|password|
|reassuringhug|12345|
|positiveproble|secure|
|attractivemap|superSecureP@ssword|