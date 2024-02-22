var { Comunidad, Publicacion, Comentario } = require("./modelo.js");

var DB_HOST = process.env.DB_HOST;

function nextIdComentario() {
  fetch(DB_HOST + "/comentarios")
    .then((response) => response.json())
    .then((comentarios) => {
      let objetoMayorId = comentarios.reduce((objetoMax, objetoActual) => {
        return objetoActual.id > objetoMax.id ? objetoActual : objetoMax;
      }, objetos[0]);
      return objetoMayorId.id;
    })
    .catch((exception) => console.log(exception));
}

function newComentario(publicacion, texto, autor) {
  let nextId = nextIdComentario();
  let nuevoComentario = new Comentario(nextId, texto, autor);

  //insertar nuevo comentario en json
  fetch(DB_HOST + "/comentarios", {
    method: "POST",
    body: JSON.stringify(nuevoComentario),
    headers: {
      "Content-type": "application/json",
    },
  });
  //modificar publicacion con nuevo comentario
  publicacion.comentarios.push(nuevoComentario.id);
  fetch(DB_HOST + `/publicaciones/${publicacion.id}`, {
    method: "PUT",
    body: JSON.stringify(publicacion),
    headers: {
      "Content-type": "application/json",
    },
  }).catch((exception) => console.log(exception));
}

function getAllPublicaciones() {
  return fetch(DB_HOST + "/publicaciones")
    .then((response) => response.json())
    .then((publicaciones) => {
      let resultado = [];
      publicaciones.forEach((publicacion) => {
        let nuevaPublicacion = new Publicacion(
          publicacion.id,
          publicacion.id_comunidad,
          publicacion.titulo,
          publicacion.texto,
          publicacion.autor
        );
        publicacion.comentarios.forEach((id_comentario) => {

            fetch(DB_HOST + `/comentarios/${id_comentario}`)
            .then((response) => response.json())
            .then((comentario) => {
                nuevaPublicacion.addComentario(
                    new Comentario(comentario.id, comentario.texto, comentario.autor)
                  );        
            });
        });
        resultado.push(nuevaPublicacion);
      });
      return resultado;
    })
    .catch((exception) => console.log(exception));
}

function getAllcomentarios(publicacion) {
  fetch(DB_HOST + "/comentarios")
    .then((response) => response.json())
    .then((comentarios) => {
      let resultado = [];
      comentarios
        .filter((comentario) =>
          publicacion.comentarios.includes(comentario.id, 0)
        )
        .forEach((comentario) => {
          resultado.push(
            new Comentario(comentario.id, comentario.texto, comentario.autor)
          );
        });

      return resultado;
    })
    .catch((exception) => console.log(exception));
}

module.exports.newComentario = newComentario;
module.exports.getAllPublicaciones = getAllPublicaciones;
module.exports.getAllcomentarios = getAllcomentarios;
