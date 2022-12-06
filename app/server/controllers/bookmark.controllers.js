const bookmarkService = require('../services/bookmark.services')

exports.addBookmark = async (req, res) => {
    const user = req.user
    const movie_id = req.query.movie_id
    if (!movie_id) return res.status(401).send('movie_id not found')

    const result = await bookmarkService.getBookmarkByUserIdAndMovieId(
        user.id,
        movie_id
    )
    if (!result) {
        await bookmarkService.addBookmark(user.id, movie_id)
        return res.send('Bookmark has been added successfully')
    } else {
        res.send('Bookmark has already existed')
    }
}

exports.removeBookmark = async (req, res) => {
    const user = req.user
    const movie_id = req.query.movie_id
    if (!movie_id) return res.status(401).send('movie_id not found')

    const result = await bookmarkService.getBookmarkByUserIdAndMovieId(
        user.id,
        movie_id
    )
    if (!result) {
        res.send('Bookmark does not exist')
    } else {
        await bookmarkService.deleteBookmark(user.id, movie_id)
        res.send('Bookmark has been deleted successfully')
    }
}

exports.userBookmark = async (req, res) => {
    const user = req.user
    const results = await bookmarkService.getAllBookmarksByUserId(user.id)
    let list = []

    for (const c of results) {
        list.push(c.movie_id)
    }
    return res.send(list)
}
