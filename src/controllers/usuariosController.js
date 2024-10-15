const { prisma } = require('../database/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

async function listarUsuarios(req,res){
    return prisma.usuarios.findMany()
}

async function listarUmUsuario(id){
    return prisma.usuarios.findFirst({
        where: {
            usuario_id: parseInt(id)
        }, include: {
            pedidos: true
        }
    })
}

async function cadastrarUsuario(data){
    const saltRounds = 10;
    const senhaEncriptada = await bcrypt.hash(data.usuario_senha, saltRounds)
    try {
        const novoUsuario = await prisma.usuarios.create({
            data: {
                usuario_email: data.usuario_email,
                usuario_senha: senhaEncriptada,
                usuario_nome: data.usuario_nome,
                usuario_cpf: data.usuario_cpf,
                usuario_celular: data.usuario_celular,
                usuario_newsletter: data.usuario_newsletter
            }
        });

        if(novoUsuario){
            return {
                status: 200,
                detail: `Usuario cadastrado com sucesso.`,
                severity: "success",
                usuario_id: novoUsuario.usuario_id
            }
        }else{
            return {
                status: 422,
                detail: "Usuario já existe",
                severity: "warn"
            }
        }
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

async function apagarUsuario(id){
    try {
        const usuarioApagado = await prisma.usuarios.delete({
            where: {
                usuario_id: parseInt(id)
            }
        })
        if(usuarioApagado){
            return {
                status: 200,
                detail: "Usuario apagado.",
                severity: "success"
            }
        }
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }  
}

async function editarUsuario(data){

    const saltRounds = 10;
    const senhaEncriptada = await bcrypt.hash(data.usuario_senha, saltRounds)

    try {
        const usuarioAtualizado = await prisma.usuarios.update({
            where: {
                usuario_id: data.usuario_id
            },
            data: {
                usuario_email: data.usuario_email,
                usuario_nome: data.usuario_nome,
                usuario_cpf: data.usuario_cpf,
                usuario_celular: data.usuario_celular,
                usuario_newsletter: data.usuario_newsletter
            }
        })
        if(usuarioAtualizado){
            return {
                status: 200,
                detail: "Usuario atualizado.",
                severity: "success"
            }
        }
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

async function logar(data){
    try {
        if(data.usuario_senha == "" || !data.usuario_senha){
            throw new Error("Campo senha é obrigatório!")
        }

        const usuarioLogando = await prisma.usuarios.findFirst({
            where: {
                usuario_email: data.usuario_email
            }
        })

        if(usuarioLogando){
            const aSenhaEstaCorreta = await bcrypt.compare(data.usuario_senha, usuarioLogando.usuario_senha)
            if (aSenhaEstaCorreta) {
                const token = jwt.sign({
                    data: usuarioLogando.usuario_id
                }, process.env.SECRET, { expiresIn: '1h' })
                return {
                    usuario_nome: usuarioLogando.usuario_nome,
                    usuario_email: usuarioLogando.usuario_email,
                    token
                }
            } else {
                return {
                    status: 422,
                    detail: "Usuário ou senha incorretos.",
                    severity: "warn"
                }
            }
        }else{
            return {
                status: 422,
                detail: "Usuário não encontrado.",
                severity: "warn"
            }
        }

        
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "error"
        }
    }
}

module.exports = {
    listarUsuarios,
    listarUmUsuario,
    cadastrarUsuario,
    apagarUsuario,
    editarUsuario,
    logar
}