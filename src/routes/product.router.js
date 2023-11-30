const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const { verifyToken, checkRoles } = require('../middlewares/authorization');
const { uploads } = require('../utils/cloudinary');
router.get('/', asyncHandler(productsController.getAllProduct));
router.get('/:id', asyncHandler(productsController.getProductById));

// ADMIN
router.post(
    '/',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN'])),
    asyncHandler(uploads.single('image')),
    asyncHandler(productsController.createProduct),
);
router.delete(
    '/:id',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN'])),
    asyncHandler(productsController.deleteProductById),
);
module.exports = router;
