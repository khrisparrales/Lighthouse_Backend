const mongoose = require('mongoose');


//Plataforma Schema
const Plataformaschema = new mongoose.Schema({
    NombrePlataforma: { type: String, required: true, minlength: 2 },
    LogoUrl: { type: String, required: true, minlength: 7 },
    BannerUrl: { type: String, required: false, minlength: 7 },
    web: { type: String, required: true, minlength: 5 },
    codigo: { type: String, required: true, minlength: 2 },
    Cursos: {
        type: ["String"],
    },
});

module.exports = new mongoose.model('Plataforma', Plataformaschema);