import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Importa a função para conectar ao banco de dados

// Chama a função conectarAoBanco para estabelecer a conexão com o banco de dados, 
// utilizando a string de conexão definida na variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Define uma função assíncrona chamada getTodosPosts
export async function getTodosPosts(){
    // Acessa o banco de dados "imersao-instabyte" através da conexão estabelecida
    const db = conexao.db("imersao-instabyte");
    // Acessa a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}
    
// Define uma função assíncrona chamada criarPost que recebe um objeto novoPost como parâmetro
export async function criarPost(novoPost){
    // Acessa o banco de dados "imersao-instabyte" através da conexão estabelecida
    const db = conexao.db("imersao-instabyte");
    // Acessa a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Insere o novoPost na coleção e retorna o resultado da operação
    return colecao.insertOne(novoPost);
}

// Define uma função assíncrona chamada criarPost que recebe um objeto novoPost como parâmetro
export async function atualizarPost(id, novoPost){
    // Acessa o banco de dados "imersao-instabyte" através da conexão estabelecida
    const db = conexao.db("imersao-instabyte");
    // Acessa a coleção "posts" dentro do banco de dados
    const objID = ObjectId.createFromHexString(id);
    const colecao = db.collection("posts");
    // Insere o novoPost na coleção e retorna o resultado da operação
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}