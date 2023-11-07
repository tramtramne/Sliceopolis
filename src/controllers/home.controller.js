exports.home = function (req, res) {
    console.log('Hello');
    res.sendFile(__dirname.replace('/controller', '') + '/server.js');
};

exports.about = function (req, res) {
    res.send('Hello');
};
