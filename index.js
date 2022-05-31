const http = require("http")
const url = require("url")
const fs = require("fs")
const { insertar, consultar, editar, eliminar } = require("./consultas")

http
  .createServer(async (req, res) => {
    if (req.url == "/" && req.method === "GET") {
      res.setHeader("content-type", "text/html")
      const html = fs.readFileSync("index.html", "utf8")
      res.end(html)
    }
    if (req.url === "/cancion" && req.method === "POST") {
      let body = ""
      req.on("data", (chunk) => {
        body += chunk
      })
      req.on("end", async () => {
        //const datos = Object.values(JSON.parse(body))
        const bodyObject = JSON.parse(body)
        const datos = [bodyObject.cancion, bodyObject.artista, bodyObject.tono]
        const respuesta = await insertar(datos)
        if (respuesta) {
          res.writeHead(201, { "Content-Type": "application/json" })
          res.end(JSON.stringify(respuesta))
        } else {
          res.writeHead(400, { "Content-Type": "application/json" })
          res.end(
            JSON.stringify({
              message: `La canción ${bodyObject.cancion} ya existe`,
            })
          )
        }
      })
    }
    if (req.url == "/canciones" && req.method === "GET") {
      const registros = await consultar()
      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify(registros))
    }
    if (req.url.startsWith ("/cancion?") && req.method === "PUT") {
        const { id } = url.parse(req.url, true).query
      let body = ""
      req.on("data", (chunk) => {
        body += chunk
      })
      req.on("end", async () => {
        const datos = Object.values(JSON.parse(body))
        //const bodyObject = JSON.parse(body)
        //const datos = [bodyObject.id, bodyObject.cancion, bodyObject.artista, bodyObject.tono]
        const respuesta = await editar(datos, id)
        res.end(JSON.stringify(respuesta))
      })
    }
    if (req.url.startsWith("/cancion?") && req.method === "DELETE") {
      const { id } = url.parse(req.url, true).query
      const respuesta = await eliminar(id)
      res.end(JSON.stringify(respuesta))
    }
  })

  .listen(3000, console.log("server on"))
