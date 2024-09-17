const { verificarToken } = require('./src/utils');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const swaggerFile = require('./src/swagger_documentation.json');
const usuarioRoutes = require('./src/routes/usuariosRoutes');
const avaliacoesRoutes = require('./src/routes/avaliacoesRoutes');
const bannersRoutes = require('./src/routes/bannersRoutes');
const imagensRoutes = require('./src/routes/imagensRoutes');
const produtosRoutes = require('./src/routes/produtosRoutes');
const marcasRoutes = require('./src/routes/marcasRoutes');
const pedidosRoutes = require('./src/routes/pedidosRoutes')
const categoriasRoutes = require('./src/routes/categoriasRoutes')
const enderecosRoutes = require('./src/routes/enderecosRoutes')
const carrinhosRoutes = require('./src/routes/carrinhosRoutes')
const cuponsRoutes = require('./src/routes/cuponsRoutes')
const colecoesRoutes = require('./src/routes/colecoesRoutes')

const port = 8000;
const app = express();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.get('/', (req, res) => {
    res.redirect('/docs');
});

app.use('/usuarios',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    usuarioRoutes);

app.use('/banners',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    verificarToken,
    bannersRoutes);

app.use('/avaliacoes',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    verificarToken,
    avaliacoesRoutes);

app.use('/imagens',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    verificarToken,
    imagensRoutes);

app.use('/produtos',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    verificarToken,
    produtosRoutes);

app.use('/pedidos',
	/* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
	verificarToken,
	pedidosRoutes)

app.use('/categorias',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    verificarToken,
    categoriasRoutes)

app.use(
    '/marcas',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    verificarToken,
    marcasRoutes
);

app.use('/enderecos',
	/* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
	verificarToken,
	enderecosRoutes)

app.use('/carrinhos',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    verificarToken,
    carrinhosRoutes)

app.use('/cupons',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    verificarToken,
    cuponsRoutes)

app.use('/colecoes',
    /* #swagger.responses[401] = {
            description: 'Não autorizado',
            schema: {
                status: 401,
                detail: 'Usuário não encontrado.',
                severity: 'warm'
            }
    } */
    verificarToken,
    colecoesRoutes())

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

module.exports = {
    port,
};
