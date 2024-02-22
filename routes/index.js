var express = require("express");
var dao = require("../javascript/dao");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  dao.getAllPublicaciones().then((publicaciones) => {
    //como prueba solo muestro primera publicacion
    let publicacion = publicaciones[0];
    let comentarios = publicaciones[0].comentarios;

    res.render("index", { publicacion: publicacion, comentarios: comentarios });
  });
});

module.exports = router;
