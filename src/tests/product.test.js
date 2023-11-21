const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const db = require('../configs/db');
const productService = require('../services/product.service');

beforeAll(async () => {
    await db.connectDB();
});
describe('Product', () => {
    it('should return a valid list of products', async () => {
        const response = await supertest(app).get('/products');

        // Check response status code
        expect(response.status).toBe(200);

        // Check response body
        expect(Array.isArray(response.body)).toBe(true);

        response.body.forEach((product) => {
            expect(product).toHaveProperty('_id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('image');
            expect(product).toHaveProperty('sizes');
            expect(product).toHaveProperty('category');
            expect(product).toHaveProperty('status');
        });
    });

    it('should handle empty product list', async () => {
        jest.spyOn(productService, 'getAllProduct').mockResolvedValue([]);

        const response = await supertest(app).get('/products');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    });

    it('should handle database query error', async () => {
        jest.spyOn(productService, 'getAllProduct').mockImplementation(() => {
            throw new Error('Database query failed');
        });

        const response = await supertest(app).get('/products');

        expect(response.status).toBe(404);
    });
});

describe('GET /products/id', () => {
    const expectedProduct = {
        _id: 'valid_id',
        name: 'Product 1',
        image: 'product_image.jpg',
        sizes: [
            { size: 'SMALL', price: 10 },
            { size: 'MEDIUM', price: 15 },
            { size: 'LARGE', price: 20 },
        ],
        category: 'PIZZA',
        status: 'STOCKING',
        description: 'Product description',
        sold: 0,
    };

    it('should handle valid product ID', async () => {
        // Assumed that 'valid_id' is a valid product ID
        jest.spyOn(productService, 'getProductById').mockResolvedValue({ expectedProduct });

        const response = await supertest(app).get('/products/valid_id');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ expectedProduct });
    });

    it('should handle invalid product ID', async () => {
        // Assumed that 'invalid_id' is an invalid product ID
        jest.spyOn(productService, 'getProductById').mockResolvedValue(null);

        const response = await supertest(app).get('/products/12');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });
});
afterAll(async () => {
    await db.closeDB();
});
