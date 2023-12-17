exports.home = function (req, res) {
    console.log('Hello');
    return res.render('<h1>AHIHI</h1>');
};

exports.about = function (req, res) {
    return res.send('Hello');
};
