import express from 'express';
import { autocompleteCities, addCityToUser, getUserCities, removeCityFromUser, getWeatherForUserCities } from '../controllers/citiesController.js';
import { authenticateToken } from '../middleware/auth.js';


const router = express.Router();

router.use(authenticateToken);

router.get('/autocomplete', autocompleteCities);
router.post('/add', addCityToUser);
router.get('/my', getUserCities);
router.delete('/city/:cityId', removeCityFromUser);
router.get('/weather', getWeatherForUserCities);

export default router;
