import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postModel.js";
import { gerarDescricaoComGemini } from "../services/geminiService.js";

// Função para listar todos os posts
export async function listarPosts(req, res) {
    // Busca todos os posts usando a função getTodosPosts do model
    const posts = await getTodosPosts();
    // Retorna os posts com status 200 (OK)
    res.status(200).json(posts);
};

// Função para criar um novo post com texto
export async function postarNovoPost(req, res) {
    // Recebe os dados do novo post do corpo da requisição
    const novoPost = req.body;
    try {
        // Tenta criar o post usando a função criarPost do model
        const postCriado = await criarPost(novoPost);
        // Retorna o post criado com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, imprime o erro no console
        console.error(erro.message);
        // Retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }

}

// Função para criar um novo post com imagem
export async function uploadImagem(req, res) {
    // Cria um objeto novoPost com a URL da imagem, descrição vazia e alt vazio
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        // Tenta criar o post usando a função criarPost do model
        const postCriado = await criarPost(novoPost);
        // Renomeia o arquivo da imagem com o ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        // Retorna o post criado com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, imprime o erro no console
        console.error(erro.message);
        // Retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }

}

// Função para atualizar um novo post com texto
export async function atualizarNovoPost(req, res) {
    // Recebe os dados do novo post do corpo da requisição
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    
    try {
        
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer); 
        // Tenta criar o post usando a função criarPost do model
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post);
        
        // Retorna o post criado com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, imprime o erro no console
        console.error(erro.message);
        // Retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(500).json({ "Erro": "Falha na requisição" });
    }

}
