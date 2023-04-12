import express from 'express';
import APIController from '../controller/APIController.js';
let router = express.Router();

const initAPIRoute = (app) => {
  
    router.get('/nowPlaying', APIController.getNowPlaying);// method GET => read data
    router.get('/filmComing', APIController.getUpComing);
    router.get('/filmPopular', APIController.getFilmPopular);
    router.get('/topRated', APIController.getTopRated);
    router.get('/trailer/:id', APIController.getTrailer);
    router.get('/comment/:anime_id', APIController.getComment);
    return app.use('/api/v1/', router);
}

export default initAPIRoute;