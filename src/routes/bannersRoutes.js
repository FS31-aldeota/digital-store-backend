const { listarBanners, listarUmaBanner, cadastrarBanner, editarBanner, apagarBanner } = require("../controllers/bannersController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    // #swagger.tags = ['Banner']
    // #swagger.description = 'Retorna lista de banner'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de banner',
            schema: [{
                banner_id: "id do banner",
                banner_nome: "nome do banner",
                banner_subtitulo: "subtitulo",
                banner_titulo: "titulo",
                banner_descricao: "descrição",
                banner_link: "link do botão",
                banner_imagem: "binario da imagem"
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
    // #swagger.description = 'Retorna um banner'
    /* #swagger.responses[200] = {
            description: 'Retorna um banner',
            schema: {
                banner_id: "id do banner",
                banner_nome: "nome do banner",
                banner_subtitulo: "subtitulo",
                banner_titulo: "titulo",
                banner_descricao: "descrição",
                banner_link: "link do botão",
                banner_imagem: "binario da imagem"
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
                    $banner_nome: "nome do banner",
                    $banner_subtitulo: "subtitulo",
                    $banner_titulo: "titulo",
                    $banner_descricao: "descrição",
                    $banner_link: "link do botão",
                    $banner_imagem: "binario da imagem"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Banner criado',
            schema: {
                status: 200,
                detail: 'Banner criado',
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
    res.send(await cadastrarBanner(req));
});
router.put("/", async (req, res) => {
    // #swagger.tags = ['Banner']
    // #swagger.description = 'Edita uma banner'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $banner_id: "id do banner",
                    $banner_nome: "nome do banner",
                    $banner_subtitulo: "subtitulo",
                    $banner_titulo: "titulo",
                    $banner_descricao: "descrição",
                    $banner_link: "link do botão",
                    $banner_imagem: "binario da imagem"
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
    res.send(await editarBanner(req));
});
router.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Banner']
    // #swagger.description = 'Deleta um banner.'
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