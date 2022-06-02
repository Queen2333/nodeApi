# nodeApi

Offer 2 API to store and search data
1. Accept a key(string) and value(some json blob/string) {"key" : "value"} and store them. If an existing key is sent, the value should be updated
2. Accept a key and return the corresponding latest value
3. When given a key AND a timestamp, return whatever the value of the key at the time was.

## menu

├─config database's config
├─controllers 
├─models
├─routes
│ ├─index.test.js test api
│ ├─tutorial.routes.js api rout
├─server.js listen port
└─app.js entry file

## start use

```
npm i
node ./server.js
```

## test api

```
npm test
```

## technology

This project uses nodejs, Express and mysql database. I deployed this project to my Raspberry PI using PM2 to implement process daemon. Then I used Nginx to map projects on the Raspberry PI to servers on the public network. Besides, this project has a simple test for api, it used jest and supertest.
