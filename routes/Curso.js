const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');

//POST CREATE NEW CURSO
router.post("/", async(req, res) => {
    //   const error = await validateMovie(req.body);
    const { NombreCurso } = req.body;
    const idtm = await Curso.findOne({ NombreCurso });
    if (idtm) {
        res.status(401).send("El Curso existe");
    } else {
        const { Descripcion } = req.body;
        const idtm = await Curso.findOne({ Descripcion });
        if (idtm) {
            res.status(401).send("Cambie la Descripcion");
        } else {
            curso = new Curso({
                NombreCurso: req.body.NombreCurso,
                Descripcion: req.body.Descripcion,
                Profesores: req.body.Profesores,
                Secciones: req.body.Secciones,
                Imagen: req.body.Imagen,
                Plataformas: req.body.Plataformas,
            });
            curso
                .save()
                .then((curso) => {
                    res.send(curso);
                })
                .catch((error) => {
                    res.status(500).send("Curso no agregada");
                });
        }
    }


});
//GET ALL CURSO
router.get("/", (req, res) => {
    Curso.find()
        .then((cursos) => res.send(cursos))
        .catch((error) => {
            res.status(500).send("Something went wrong");
        });
});

//GET THE CURSO BY ID
router.get("/:cursoid", async(req, res) => {
    const curso = await Curso.findById(req.params.cursoid);
    if (!curso) res.status(404).send("Curso not found");
    res.send(curso);
});

//UPDATE CURSO BASED ON ID
router.put("/:cursoid", async(req, res) => {
    const updatedCurso = await Curso.findByIdAndUpdate(
        req.params.cursoid, {
            NombreCurso: req.body.NombreCurso,
            Descripcion: req.body.Descripcion,
            Profesores: req.body.Profesores,
            Secciones: req.body.Secciones,
            Imagen: req.body.Imagen,
            Plataformas: req.body.Plataformas,
        }, { new: true }
    );

    if (!updatedCurso) res.status(404).send("Curso not found");
    res.send(updatedCurso);
});

//DELETE PLATAFORMA BASED ON ID
router.delete("/:cursoid", async(req, res) => {
    const curso = await Curso.findByIdAndRemove(
        req.params.cursoid
    );
    if (!curso) res.status(404).send("Curso with id not found");
    res.send(curso);
});
module.exports = router;