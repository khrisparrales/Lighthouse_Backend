const express = require('express');
const router = express.Router();
const Plataforma = require('../models/Plataforma');


router.post("/", (req, res) => {

    plataforma = new Plataforma({
        NombrePlataforma: req.body.NombrePlataforma,
        LogoUrl: req.body.LogoUrl,
        BannerUrl: req.body.BannerUrl,
        web: req.body.web,
        codigo: req.body.codigo,
        Cursos: req.body.Cursos,

    });
    plataforma.save().then(plataforma => {
        res.send(plataforma);
    }).catch(error => {
        res.status(500).send("Plataforma no agregada")
    });
});

module.exports = router;