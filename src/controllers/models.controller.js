const Product = require('../models/Product');
const Store = require('../models/Store');
const Voucher = require('../models/Voucher');
const Order = require('../models/Order');
const User = require('../models/User');
// Example Pizza
const pizza = new Product({
    name: 'Margherita',
    image: 'margherita.jpg',
    sizes: [
        { size: 'SMALL', price: 8.99 },
        { size: 'MEDIUM', price: 10.99 },
        { size: 'LARGE', price: 12.99 },
    ],
    category: 'PIZZA',
    price: 10.99,
    status: 'STOCKING',
    description: 'Classic Margherita Pizza with fresh basil and tomatoes.',
    sold: 25,
});

const newVoucher = new Voucher({
    name: 'Example Voucher',
    min_value: 50,
    value: 20,
    start_at: new Date('2023-11-01'), // Example start date
    close_at: new Date('2023-11-30'), // Example close date
    amount: 100,
    used: 50,
});

// Save the voucher to the database
newVoucher
    .save()
    .then((result) => {
        console.log('Voucher saved successfully:', result);
    })
    .catch((error) => {
        console.error('Error saving voucher:', error);
    });
pizza
    .save()
    .then((result) => {
        console.log('Object saved successfully:', result);
    })
    .catch((error) => {
        console.error('Error saving object:', error);
    });
