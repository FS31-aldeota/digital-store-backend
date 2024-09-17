const { listarCupons, listarUmCupom, cadastrarCupom, editarCupom, apagarCupom } = require('../controllers/cuponsController');
const router = require('express').Router();

router.get('/', async (req, res) => {
    // #swagger.tags = ['Cupons']
    // #swagger.description = 'Retorna lista de cupons.'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de cupons',
            schema: [{
                cupom_id: 1,
                cupom_nome: 'DESCONTO10',
                cupom_desconto: 10.0,
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
    res.send(await listarCupons());
});

router.get('/:id', async (req, res) => {
    // #swagger.tags = ['Cupons']
    // #swagger.description = 'Retorna um cupom.'
    /* #swagger.responses[200] = {
            description: 'Retorna um cupom',
            schema: {
                cupom_id: 1,
                cupom_nome: 'DESCONTO10',
                cupom_desconto: 10.0,
                criado_em: '2024-08-26 23:31:00',
                atualizado_em: '2024-08-26 23:31:00'
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
    res.send(await listarUmCupom(req.params.id));
});

router.post('/', async (req, res) => {
    // #swagger.tags = ['Cupons']
    // #swagger.description = 'Cria um cupom.'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $cupom_nome: 'DESCONTO10',
                    $cupom_desconto: 10.0
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Cupom criado',
            schema: {
                status: 200,
                detail: 'Cupom criado com sucesso.',
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
    res.send(await cadastrarCupom(req.body));
});

router.put('/', async (req, res) => {
    // #swagger.tags = ['Cupons']
    // #swagger.description = 'Edita um cupom.'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $cupom_id: 1,
                    cupom_nome: 'NOVO_DESCONTO',
                    cupom_desconto: 15.0
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Cupom atualizado',
            schema: {
                status: 200,
                detail: 'Cupom atualizado com sucesso.',
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
    res.send(await editarCupom(req.body));
});

router.delete('/:id', async (req, res) => {
    // #swagger.tags = ['Cupons']
    // #swagger.description = 'Deleta um cupom.'
    /* #swagger.responses[200] = {
            description: 'Cupom deletado',
            schema: {
                status: 200,
                detail: 'Cupom deletado com sucesso.',
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
    res.send(await apagarCupom(req.params.id));
});

module.exports = router;