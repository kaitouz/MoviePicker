const express = require('express')
const bodyParser = require('body-parser')

const userService = require('./services/userService')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Server is running on port ${port}`))



app.get("/get-user", (req, res) => {
    const id = req.query.id
    console.log(id)
    userService.get_user(id, (req, res) => {
        if (err) throw err
        res.send(result)
    })
}) 

app.get("/all-users", (req, res) => {
    userService.get_all_users((err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.post("/create_user", (req, res) => {
    const user = req.body

    userService.create_user(user, (err, result) => {
        if (err) throw err
        res.send(result)
    })
    
    
})

app.put("/update-user", (req, res) => {
    const user = req.body
    userService.update_user(user, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})


app.delete("/delete-user", (req, res) => {
    const userID = req.query.id
    userService.delete_user(userID, (err, result) => {
        if (err) throw err 
        res.send(result)
    })
})

app.get('/', (req, res) => {
    res.send("This is homepage");

});



