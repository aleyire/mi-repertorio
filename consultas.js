const { Pool } = require("pg")
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "alejandra", 
  port: 5432,
  database: "repertorio",
})
const insertar = async (datos) => {
  const consulta = {
    text: "INSERT INTO repertorios (cancion, artista, tono) values($1, $2, $3)",
    values: datos,
  }
  try {
    const result = await pool.query(consulta)
    return result.rows
  } catch (error) {
    console.log(error.code)
    return error
  }
}
const consultar = async () => {
  try {
    const result = await pool.query("SELECT * FROM repertorios")
    return result.rows
  } catch (error) {
    console.log(error.code)
    return error
  }
}
const editar = async (datos, id) => {
  
  const consulta = {
    text: `UPDATE repertorios SET
  cancion = $1,
  artista = $2,
  tono = $3
  WHERE id = $4 RETURNING *`,
    values: [...datos, id],
  }
  try {
    const result = await pool.query(consulta)
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}
const eliminar = async (id) => {
  try {
    const result = await pool.query(
      `DELETE FROM repertorios WHERE id = '${id}'`
    )
    return result
  } catch (error) {
    console.log(error.code)
    return error
  }
}
module.exports = { insertar, consultar, editar, eliminar }
