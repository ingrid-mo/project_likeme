import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import { obtenerlike, AgregarLike } from './consultas.js';

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

app.listen(3000, () => {
    console.log("Servidor encendido");
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerlike();
        res.json(posts);
    } catch (err) {
        console.error('Error en la consulta', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerlike(); 
        res.json(posts);
    } catch (err) {
        console.error('Error en la consulta', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body; 
   await AgregarLike()
    console.log(titulo, img, descripcion, likes); 
    res.send("Nuevo post agregado");
});

