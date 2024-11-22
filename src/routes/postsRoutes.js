import express from "express";
import multer from "multer";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({dest: "./uploads"}, storage);
const routes = (app) => {
// Configura o Express para analisar solicitações JSON
    app.use(express.json());
app.use(cors(corsOptions));
// Define uma rota GET para "/posts" que retorna todos os posts como JSON
app.get("/posts", listarPosts );
app.post("/posts", postarNovoPost);
app.post("/upload", upload.single("imagem"), uploadImagem);
app.put("/upload/:id", atualizarNovoPost);

}

export default routes;

   