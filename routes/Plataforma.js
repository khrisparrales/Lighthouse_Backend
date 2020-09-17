const express = require('express');
const router = express.Router();
const Plataforma = require('../models/Plataforma');

//POST CREATE NEW PLATAFORMA
router.post("/", async(req, res) => {
    //   const error = await validateMovie(req.body);
    const { NombrePlataforma } = req.body;
    const idtm = await Plataforma.findOne({ NombrePlataforma });
    if (idtm) {
        res.status(401).send("La Plataforma existe");
    } else {
        const { codigo } = req.body;
        const idtm = await Plataforma.findOne({ codigo });
        if (idtm) {
            res.status(401).send("Cambie el codigo");
        } else {
            plataforma = new Plataforma({
                NombrePlataforma: req.body.NombrePlataforma,
                LogoUrl: req.body.LogoUrl,
                BannerUrl: req.body.BannerUrl,
                web: req.body.web,
                codigo: req.body.codigo,
                Cursos: req.body.Cursos,
            });
            plataforma
                .save()
                .then((plataforma) => {
                    res.send(plataforma);
                })
                .catch((error) => {
                    res.status(500).send("Plataforma no agregada");
                });
        }
    }


});
//GET ALL PLATAFORMA
router.get("/", (req, res) => {
    Plataforma.find()
        .then((plataformas) => res.send(plataformas))
        .catch((error) => {
            res.status(500).send("Something went wrong");
        });
});

//GET THE PLATAFORMA BY ID
router.get("/:plataformaid", async(req, res) => {
    const plataforma = await Plataforma.findById(req.params.plataformaid);
    if (!plataforma) res.status(404).send("Plataforma not found");
    res.send(plataforma);
});

//UPDATE PLATAFORMA BASED ON ID
router.put("/:plataformaid", async(req, res) => {
    const updatedPlataforma = await Plataforma.findByIdAndUpdate(
        req.params.plataformaid, {
            NombrePlataforma: req.body.NombrePlataforma,
            LogoUrl: req.body.LogoUrl,
            BannerUrl: req.body.BannerUrl,
            web: req.body.web,
            codigo: req.body.codigo,
            Cursos: req.body.Cursos,
        }, { new: true }
    );

    if (!updatedPlataforma) res.status(404).send("plataforma not found");
    res.send(updatedPlataforma);
});

//DELETE PLATAFORMA BASED ON ID
router.delete("/:plataformaid", async(req, res) => {
    const plataforma = await Plataforma.findByIdAndRemove(
        req.params.plataformaid
    );
    if (!plataforma) res.status(404).send("Plataforma with id not found");
    res.send(plataforma);
});
module.exports = router;