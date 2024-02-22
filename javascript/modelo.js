var comunidad = class Comunidad{
    constructor(id,nombre,descripcion){
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
    }

}

var publicacion = class Publicacion{
    constructor(id,id_comunidad,titulo, texto, autor){
        this.id = id
        this.id_comunidad = id_comunidad
        this.titulo = titulo
        this.texto = texto
        this.autor = autor
        this.comentarios = []
    }
    addComentario(comentario) {
        this.comentarios.push(comentario)
    }
}

var comentario = class Comentario{
    constructor(id,texto, autor){
        this.id = id
        this.texto = texto
        this.autor = autor
    }   
}

module.exports.Comunidad = comunidad
module.exports.Publicacion = publicacion
module.exports.Comentario = comentario