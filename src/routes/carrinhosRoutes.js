const {listarCarrinhos, listarUmCarrinho, cadastrarCarrinho, editarCarrinho, apagarCarrinho} = require("../controllers/carrinhosController");
const router = require('express').Router()


router.get('/', async (req,res)=>{
    // #swagger.tags = ['Carrinhos']
    // #swagger.description = 'Retorna lista de carrinhos.'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de carrinhos',
            schema: [{
                carrinho_id: 1,
                usuario_id: 1,
                itens: [],
                criado_em: '2024-08-26 23:31:00',
                atualizado_em: '2024-08-26 23:31:00'
            }]
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                status: 422,
                detail: 'mensagem do sistema',
                severity: 'danger'
            }
    } */
    res.send(await listarCarrinhos())
})

router.get('/:id', async (req,res)=>{
    // #swagger.tags = ['Carrinhos']
    // #swagger.description = 'Retorna um carrinho.'
    /* #swagger.responses[200] = {
            description: 'Retorna um carrinho.',
            schema: [{
                carrinho_id: 1,
                usuario_id: 1,
                itens: [],
                criado_em: '2024-08-26 23:31:00',
                atualizado_em: '2024-08-26 23:31:00'
            }]
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                status: 422,
                detail: 'mensagem do sistema',
                severity: 'danger'
            }
    } */
    res.send(await listarUmCarrinho(req.params.id))
})

router.post('/', async (req,res)=>{
    // #swagger.tags = ['Carrinhos']
    // #swagger.description = 'Cria um carrinho'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $usuario_id: 1
                    $itens: [],
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Carrinho criado',
            schema: {
                status: 200,
                detail: 'Carrinho criado',
                severity: 'success'
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                status: 422,
                detail: 'mensagem do sistema',
                severity: 'danger'
            }
    } */
    res.send(await cadastrarCarrinho(req.body))
})

router.put('/', async (req,res)=>{
    // #swagger.tags = ['Carrinhos']
    // #swagger.description = 'Edita um carrinho.'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $carrinho_id: 1,
                    $usuario_id: 1
                    $itens: [],
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Carrinho atualizado',
            schema: {
                status: 200,
                detail: 'Carrinho atualizado',
                severity: 'success'
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                status: 422,
                detail: 'mensagem do sistema',
                severity: 'danger'
            }
    } */
    res.send(await editarCarrinho(req.body))
})

router.delete('/:id', async (req,res)=>{
    // #swagger.tags = ['Carrinhos']
    // #swagger.description = 'Deleta um carrinho.'
    /* #swagger.responses[200] = {
            description: 'Carrinho deletado.',
            schema: {
                status: 200,
                detail: 'Carrinho deletado.',
                severity: 'success'
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                status: 422,
                detail: 'mensagem do sistema',
                severity: 'danger'
            }
    } */
    res.send(await apagarCarrinho(req.params.id))
})

module.exports = router