import Router from 'express'
import BasketController from '../api/controllers/Basket.controller'
const router = Router()

router.post('/addToBasket', BasketController.addToBasket)
router.post('/getUsersBasket', BasketController.getUserBasket)
router.post('/removeFromBasket', BasketController.removeFromBasket)

export default router