const mongoose = require('mongoose');


//Profesores Schema
const Profesoresschema = new mongoose.Schema({
    NombreProfesor: { type: String, required: true, minlength: 2 },
    FotoProfesor: { type: String, required: true, minlength: 7 },
    Plataformas: {
        type: ["String"],
    },
    Cursos: {
        type: ["String"],
    },
}, {
    versionKey: false,
});

module.exports = new mongoose.model("Profesores", Profesoresschema);