const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRouter = require('./routes/auth.routes')
const ratingRouter = require('./routes/rating.routes')
const userRouter = require('./routes/user.routes')
const reviewRouter = require('./routes/review.routes')
const bookmarkRouter = require('./routes/bookmark.routes')
const watchedRouter = require('./routes/watched.routes')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Server is running on port ${port}`))

app.get('/', (req, res) => {
    res.send('API IS RUNNING')
})

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/rating', ratingRouter)
app.use('/review', reviewRouter)
app.use('/bookmark', bookmarkRouter)
app.use('/watched', watchedRouter)

// test zone
