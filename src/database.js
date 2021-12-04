const mongoose = require('mongoose');
// el nombre de la db sera temporal-database
mongoose.connect('mongodb://localhost/temporal-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log('Database is connected')).catch(error => console.error(error));