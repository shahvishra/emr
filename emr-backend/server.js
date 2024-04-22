const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
})

const patientsRoute = require('./routes/patients');

app.use('/patients', patientsRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})