const express = require('express');
const router = express.Router();
const Profesor = require('../models/Profesor');

//POST CREATE NEW Profesor
router.post("/", async(req, res) => {
    const { NombreProfesor } = req.body;
    const idtm = await Profesor.findOne({ NombreProfesor });
    if (idtm) {
        res.status(401).send("El Profesor existe");
    } else {
        profesor = new Profesor({
            NombreProfesor: req.body.NombreProfesor,
            FotoProfesor: req.body.FotoProfesor,
            Cursos: req.body.Cursos,
            Plataformas: req.body.Plataformas,
        });
        profesor
            .save()
            .then((profesor) => {
                res.send(profesor);
            })
            .catch((error) => {
                res.status(500).send("Plataforma no agregada");
            });
    }
});

//GET ALL Profesor
router.get("/", (req, res) => {
    Profesor.find()
        .then((profesores) => res.send(profesores))
        .catch((error) => {
            res.status(500).send("Something went wrong");
        });
});

//GET THE Profesor BY ID
router.get("/:profesorid", async(req, res) => {
    const profesor = await Profesor.findById(req.params.profesorid);
    if (!profesor) res.status(404).send("Profesor not found");
    res.send(profesor);
});
//UPDATE PROFESOR BASED ON ID
router.put("/:profesorid", async(req, res) => {
    const updatedProfesor = await Profesor.findByIdAndUpdate(
        req.params.profesorid, {
            NombreProfesor: req.body.NombreProfesor,
            FotoProfesor: req.body.FotoProfesor,
            Cursos: req.body.Cursos,
            Plataformas: req.body.Plataformas,
        }, { new: true }
    );

    if (!updatedProfesor) res.status(404).send("Profesor not found");
    res.send(updatedProfesor);
});

//DELETE PROFESOR BASED ON ID
router.delete("/:profesorid", async(req, res) => {
    const profesor = await Profesor.findByIdAndRemove(req.params.profesorid);
    if (!profesor) res.status(404).send("Profesor with id not found");
    res.send(profesor);
});
module.exports = router;