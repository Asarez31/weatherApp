import express from 'express';
import { autocompleteCities, addCityToUser, getUserCities, removeCityFromUser, getWeatherForUserCities } from '../controllers/citiesController.js';

const router = express.Router();

router.get('/autocomplete', autocompleteCities);
router.post('/add', addCityToUser);
router.get('/user/:userId', getUserCities);
router.delete('/user/:userId/city/:cityId', removeCityFromUser);
router.get('/user/:userId/weather', getWeatherForUserCities);

export default router;
