import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Importa a função para conectar ao banco de dados


const app = express();
app.use(express.static("uploads"));
routes(app);

// Cria uma instância do Express

app.listen(3000, ()=> {
console.log("Servidor 3000 ouvindo");
});

// Inicia o servidor na porta 3000








