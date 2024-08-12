const express = require('express')
const { listarProdutos,listarUmProduto,cadastrarProduto,editarProduto,apagarProduto,listarProdutosEmDestaque } = require('../controllers/produtosController')

const router = express.Router()


router.get('/', async (req,res)=>{
    res.send(await listarProdutos())
})

router.get('/destaques', async (req,res)=>{
    res.send(await listarProdutosEmDestaque())
})

router.get('/:id', async (req,res)=>{
    res.send(await listarUmProduto(req.params.id))
})

router.post('/', async (req,res)=>{
    res.send(await cadastrarProduto(req.body))
})

router.put('/', async (req,res)=>{
    res.send(await editarProduto(req.body))
})

router.delete('/:id', async (req,res)=>{
    res.send(await apagarProduto(req.params.id))
})


module.exports = router