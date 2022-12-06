const watchedService = require('../services/watched.services')

exports.addWatched = async (req, res) => {
    const user = req.user
    const movie_id = req.query.movie_id
    if (!movie_id) return res.status(401).send('movie_id not found')

    const result = await watchedService.getWatchedByUserIdAndMovieId(
        user.id,
        movie_id
    )
    if (!result) {
        await watchedService.addWatched(user.id, movie_id)
        return res.send(
            `Movie with id '${movie_id}' has been added to watched list successfully`
        )
    } else {
        return res.send(`Movie with id '${movie_id}' has already existed`)
    }
}

exports.removeWatched = async (req, res) => {
    const user = req.user
    const movie_id = req.query.movie_id
    if (!movie_id) return res.status(401).send('movie_id not found')

    const result = await watchedService.getWatchedByUserIdAndMovieId(
        user.id,
        movie_id
    )
    if (!result) {
        return res.send(
            `Movie with id '${movie_id}' does not exist in watched list`
        )
    } else {
        await watchedService.deleteWatched(user.id, movie_id)
        return res.send(
            `Movie with id '${movie_id}' has been deleted from watched list`
        )
    }
}

exports.userWatched = async (req, res) => {
    const user = req.user
    const results = await watchedService.getAllWatchedsByUserId(user.id)
    const list = []
    results.forEach((element) => {
        list.push(element.movie_id)
    })
    return res.send(list)
}

exports.movieWatchedCount = async (req, res) => {
    const movie_id = req.query.movie_id
    if (!movie_id) return res.status(401).send('movie_id not found')
    const results = await watchedService.getAllWatchedsByMovieId(movie_id)
    return res.json({
        movie_id: movie_id,
        views: results.length,
    })
}
