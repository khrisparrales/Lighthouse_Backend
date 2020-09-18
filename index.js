const express = require("express");
const app = express();
const PORT = process.env.PORT || 3009;
const mongoose = require("mongoose");
const routePlataforma = require("./routes/Plataforma");
const routeProfesor = require("./routes/Profesor");
const routeCurso = require("./routes/Curso");
require('dotenv').config();
//connect to mongodb
mongoose
    .connect(
        process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }

    )
    .then(() => {
        console.log("Connect to mongodb success");
    })
    .catch(() => {
        console.log("Connect to mongodb faill");
    });
//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use('/api/Plataformas', routePlataforma);
app.use('/api/Profesores', routeProfesor);
app.use('/api/Cursos', routeCurso)
    //listen server express
app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
});