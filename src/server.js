const app = require('./app');

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('<h4>Hello world</h4>');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
