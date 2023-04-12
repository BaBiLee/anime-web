import pool from '../configs/connectDB.js'

let getNowPlaying = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT title, name, backdrop_path, rate, (SELECT COUNT(*) FROM ticket t INNER JOIN showtime s on t.showtime_id = s.showtime_id WHERE s.film_id = film.film_id) as popularity, genres, release_date, film_id, poster, dates_minium FROM film WHERE now() != dates_minium and now() != dates_maxium;'); 
    return res.status(200).json({
        message: "Get now playing film",
        data: rows
    });
}

let getUpComing = async (req, res) => {
    const [rows] = await pool.execute('SELECT title, name, backdrop_path, rate, (SELECT COUNT(*) FROM ticket t INNER JOIN showtime s on t.showtime_id = s.showtime_id WHERE s.film_id = film.film_id) as popularity, genres, release_date, film_id, poster, dates_minium FROM film WHERE now() < dates_minium;');
    return res.status(200).json({
        message: 'Get film coming',
        data: rows
    })
}


let getFilmPopular = async (req, res) => {
    const [rows] = await pool.execute('SELECT title, name, backdrop_path, rate, (SELECT COUNT(*) FROM ticket t INNER JOIN showtime s on t.showtime_id = s.showtime_id WHERE s.film_id = film.film_id) as popularity, genres, release_date, film_id, poster, dates_minium FROM film WHERE now() > dates_minium  order by(popularity) desc;');
    return res.status(200).json({
        message: 'Get film popular',
        data: rows
    })
}

let getTopRated = async (req, res) => {
    const [rows] = await pool.execute('SELECT title, name, backdrop_path, rate, (SELECT COUNT(*) FROM ticket t INNER JOIN showtime s on t.showtime_id = s.showtime_id WHERE s.film_id = film.film_id) as popularity, genres, release_date, film_id, poster, dates_minium FROM film WHERE now() > dates_minium  order by(rate) desc;');
    return res.status(200).json({
        message: 'Get top rate',
        data: rows
    })
}

let getTrailer = async (req, res) => {
    let userId = req.params.id;
    const [rows] = await pool.execute('SELECT trailer from film where film_id = ?;', [userId]);
    return res.status(200).json({
        message: 'Get trailer of film with film_id = ' + userId,
        data: rows
    })
}

let getComment = async (req, res) => {
    let anime_id = req.params.anime_id;
    const [rows] = await pool.execute('SELECT * from comment where anime_id = ?;', [anime_id]);
    return res.status(200).json({
        message: 'Get comment of film with anime_id = ' + anime_id,
        data: rows
    })
}

module.exports = {

    getNowPlaying,
    getUpComing,
    getFilmPopular,
    getTopRated,
    getTrailer,
    getComment

}
