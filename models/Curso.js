const mongoose = require('mongoose');


//Profesores Schema
const Cursoschema = new mongoose.Schema({
    NombreCurso: {
        type: "String",
    },
    Descripcion: {
        type: "String",
    },
    Profesores: {
        type: ["String"],
    },
    Secciones: {
        type: ["Mixed"],
    },
    Plataformas: {
        type: ["String"],
    },
    Imagen: {
        type: "String",
    },
}, {
    versionKey: false,
});

module.exports = new mongoose.model("Cursos", Cursoschema);