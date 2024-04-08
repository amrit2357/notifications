const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/notifications')
const PORT = 8080;
const app = express();
app.use(bodyParser());

app.use('/', routes);
app.listen(PORT, () =>{
    console.log('App is listening to PORT ' + PORT);
})
