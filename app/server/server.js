const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Server is running on port ${port}`))


app.get('/', (req, res) => {
    res.send("This is homepage");

});



