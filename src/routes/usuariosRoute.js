const express = require('express')
const router = express.Router()
const { listarUsuarios, listarUmUsuario, cadastrarUsuario, apagarUsuario, editarUsuario } = require('../controllers/usuariosController')

router.get('/', async (req,res)=>{
    res.send(await listarUsuarios())
})

router.get('/:id', async (req,res)=>{
    res.send(await listarUmUsuario(req.params.id))
})

router.post('/', async (req,res)=>{
    res.send(await cadastrarUsuario(req.body))
})

router.put('/', async (req,res)=>{
    res.send(await editarUsuario(req.body))
})

router.delete('/:id', async (req,res)=>{
    res.send(await apagarUsuario(req.params.id))
})

module.exports = router