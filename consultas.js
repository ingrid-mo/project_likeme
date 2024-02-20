import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "kataang65",
  database: "likeme",
  allowExitOnIdle: true,
});
const getDate = async () => {
  const result = await pool.query("SELECT NOW()");
  console.log(result);
};

const AgregarLike = async (
  titulo,
  img = "image.jpg",
  descripcion,
  likes = 0
) => {
  const consulta = "INSERT INTO posts VALUES (DEFAULT,$1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes];
  try {
    const result = await pool.query(consulta, values);
    console.log("Post agregado");
  } catch (err) {
    console.error("Error al agregar el post", err);
    throw err;
  }
};
const obtenerlike = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};

const EditPost = async (titulo, img, descripcion, likes,id ) => {
  const consulta = "UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5"
  const values = [titulo, img, descripcion, likes,id]
  const { rowCount } = await pool.query(consulta, values)
  
  if (rowCount === 0) {
  throw { code: 404, message: "No se consiguió ningún viaje con este id" }
 
  }
};

const deletePost = async (id) => {
  const consult = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consult, values);
};

export { obtenerlike, AgregarLike, EditPost, deletePost };
