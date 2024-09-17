const { listarBanners, listarUmaBanner, cadastrarBanner, editarBanner, apagarBanner } = require("../controllers/bannersController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    // #swagger.tags = ['Banner']
    // #swagger.description = 'Retorna lista de banner'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de banner',
            schema: [{
                avaliacao_id: 1,
                avaliacao_opiniao: "Texto da Banner",
                avaliacao_nota: 4,
                usuario_id: 1
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
    res.send(await listarBanners());
});
router.get("/:id", async (req, res) => {
    // #swagger.tags = ['Banner']
    // #swagger.description = 'Retorna uma banner'
    /* #swagger.responses[200] = {
            description: 'Retorna uma banner',
            schema: {
                avaliacao_id: 1,
                avaliacao_opiniao: "Texto da Banner",
                avaliacao_nota: 4,
                usuario_id: 1
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
    res.send(await listarUmaBanner(req.params.id));
});
router.post("/", async (req, res) => {
    // #swagger.tags = ['Banner']
    // #swagger.description = 'Cria uma Banner'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $avaliacao_opiniao: "Texto da Banner",
                    $avaliacao_nota: 4,
                    $usuario_id: 1
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Imagem criado',
            schema: {
                status: 200,
                detail: 'Imagem criado',
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
    res.send(await cadastrarBanner(req.body));
});
router.put("/", async (req, res) => {
    // #swagger.tags = ['Banner']
    // #swagger.description = 'Edita uma banner'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $avaliacao_id: 1,
                    $avaliacao_opiniao: "Texto da Banner",
                    $avaliacao_nota: 4,
                    $usuario_id: 1
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Banner atualizado.',
            schema: {
                status: 200,
                detail: 'Banner atualizado.',
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
    res.send(await editarBanner(req.body));
});
router.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Banner']
    // #swagger.description = 'Deleta uma banner.'
    /* #swagger.responses[200] = {
            description: 'Banner deletado',
            schema: {
                status: 200,
                detail: 'Banner deletado com sucesso.',
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
    res.send(await apagarBanner(req.params.id));
});

module.exports = router;