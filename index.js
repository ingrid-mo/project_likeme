import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { obtenerlike, AgregarLike, EditPost, deletePost  } from "./consultas.js";

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
    console.error("Error en la consulta", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerlike();
    res.json(posts);
  } catch (err) {
    console.error("Error en la consulta", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;
    await AgregarLike();
    console.log(titulo, img, descripcion, likes);
    res.send("Nuevo post agregado");
  } catch (err) {
    console.error("Error en la consulta", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
app.put("/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, img, descripcion, likes } = req.query; 
      await EditPost(titulo, img, descripcion, likes, id); 
      res.send("Post modificado con éxito");
    } catch (err) {
      console.error("Error en la consulta", err);
      if (err.code && err.message) {
        res.status(err.code).json({ error: err.message });
      } else {
        res.status(500).json({ error: "Error en el servidor" });
      }
    }
  });

app.delete("/posts/:id", async (req, res) => {
    try{
        const { id } = req.params;
        await deletePost(id);
        res.send("Post eliminado con éxito");
}
    catch (err) {
    console.error("Error en la consulta", err);
    res.status(500).json({ error: "Error en el servidor" });
  }

});
