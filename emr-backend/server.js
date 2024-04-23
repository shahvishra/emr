const express = require('express');
const cors = require('cors');

const app = express();

var corsOption = {
    origin: '*'
}

app.use(express.json());
app.use(cors(corsOption));

const patientsRoute = require('./routes/patients');

app.use('/patients', patientsRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})