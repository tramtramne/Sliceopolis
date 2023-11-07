const app = require('./app');

const port = process.env.PORT || 8080;

require('./routes/home.router')(app);

// app.use('/', homeRouter);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
