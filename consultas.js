import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'kataang65',
    database: 'likeme',
    allowExitOnIdle: true
});
const getDate = async () => {
    const result = await pool.query("SELECT NOW()")
    console.log(result)
    }
    
const AgregarLike = async (titulo, img = 'image.jpg', descripcion, likes=0) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT,$1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes]; 
    const result = await pool.query(consulta, values);
    console.log("posts agregado");
};
const obtenerlike = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
    }


export { obtenerlike, AgregarLike};
