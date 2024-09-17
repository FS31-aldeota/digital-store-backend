const { listarColecoes, listarUmaColecao, cadastrarColecao, editarColecao, apagarColecao } = require('../controllers/colecoesController');
const router = require('express').Router();

router.get('/', async (req, res) => {
    // #swagger.tags = ['Coleções']
    // #swagger.description = 'Retorna lista de coleções.'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de coleções',
            schema: [{
                colecao_id: 1,
                colecao_nome: 'Coleção Verão',
                colecao_descricao: 'Coleção inspirada no verão de 2024',
                criado_em: '2024-08-26 23:31:00',
                atualizado_em: '2024-08-26 23:31:00'
            }]
    } */
    res.send(await listarColecoes());
});

router.get('/:id', async (req, res) => {
    // #swagger.tags = ['Coleções']
    // #swagger.description = 'Retorna uma coleção.'
    /* #swagger.responses[200] = {
            description: 'Retorna uma coleção',
            schema: {
                colecao_id: 1,
                colecao_nome: 'Coleção Verão',
                colecao_descricao: 'Coleção inspirada no verão de 2024',
                produtos: [],
                criado_em: '2024-08-26 23:31:00',
                atualizado_em: '2024-08-26 23:31:00'
            }
    } */
    res.send(await listarUmaColecao(req.params.id));
});

router.post('/', async (req, res) => {
    // #swagger.tags = ['Coleções']
    // #swagger.description = 'Cria uma coleção.'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $colecao_nome: 'Coleção Verão',
                    $colecao_descricao: 'Coleção inspirada no verão de 2024',
                    $produtos: []
                }
        } */
    res.send(await cadastrarColecao(req.body));
});

router.put('/', async (req, res) => {
    // #swagger.tags = ['Coleções']
    // #swagger.description = 'Edita uma coleção.'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $colecao_id: 1,
                    $colecao_nome: 'Coleção Primavera',
                    $colecao_descricao: 'Nova descrição',
                    $produtos: []
                }
        } */
    res.send(await editarColecao(req.body));
});

router.delete('/:id', async (req, res) => {
    // #swagger.tags = ['Coleções']
    // #swagger.description = 'Deleta uma coleção.'
    res.send(await apagarColecao(req.params.id));
});

module.exports = router;