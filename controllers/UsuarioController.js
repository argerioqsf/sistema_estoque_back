require('dotenv').config()
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

async function listar(req, res) {
    try {
        const usuarios = await Usuario.find();
        return res.status(200).json(usuarios)
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function cadastrar(req, res) {

    //Pegar informações do body
    const { nome, email, senha, confirma_senha } = req.body;
    
    //testar se os campos estão vindo corretamente
    if (!nome) {
        return res.status(422).json({message:"O campo nome é obrigatório!"})
    }
    
    if (!email) {
        return res.status(422).json({message:"O campo email é obrigatório!"})
    }
    
    if (!senha) {
        return res.status(422).json({message:"O campo senha é obrigatório!"})
    }
    
    if (confirma_senha != senha) {
        return res.status(422).json({message:"As senhas não conferem!"})
    }

    try {
        //Verificar se o usuario existe
        const usuarioExiste = await Usuario.findOne({email:email})
        
        if (usuarioExiste) {
            return res.status(422).json({message:"Email já utilizado"})
        }
        
        //Criptografar a senha
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)
        
        //Criar o usuario no banco de dados
        const usuario = new Usuario({
            nome,
            email,
            senha:senhaHash
        })
        await usuario.save()
        return res.status(201).json({message:'Usuário criado com sucesso!'})
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

async function editar(req, res) {

    //Pegar informações do body
    const { id } = req.query;

    try {

        //Verificar se o usuario existe
        const usuarioExiste = await Usuario.findById(id)
        
        if (usuarioExiste) {
            let info = req.body;
            let usuario_editado = await Usuario.findByIdAndUpdate(id,info);
            usuario_editado.senha = null;
            usuario_editado.token_auth = null;
            return res.status(201).json({message:"Usuário editado com sucesso!"});
        }else{
            return res.status(422).json({message:"Usuário não encontrado"});
        }
    
    } catch (error) {
        return res.status(500).json({message:'Ocorreu um erro inesperado no servidor, tente novamente mais tarde!',descricao:error.message})
    }
}

module.exports = {
    listar:listar,
    cadastrar:cadastrar,
    editar:editar
}