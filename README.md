# CordovaBox
##### An MVC Framework for NodeJS

### Install & Launch
```
npm install cordovabox -g
cordovabox new applicationName
cd applicationName
npm install 
cordovabox start 
```

### Run Development Server and Asset Pipelines
```
cordovabox dev
```

### Generate API (Controller, Model, Route)
```
cordovabox generate-api apiModelName
```


### Test
```
npm test
```

### Environmental Variables

`MONGO_URL` - Mongo database host url. Used for the primary data storage.
`REDIS_URL` - Redis server host url. Used for socket clustering and clustered session support
`db` - database namespace
`prefix` - Session prefix
`maxAge` - Max cookie age
`secret` - Your applications secret identifier
```
MONGO_URL="mongodb://credentials:password@yourmongodbserver.com:port/db" npm start
```
### Server Stats
**http://localhost:3000/stats

