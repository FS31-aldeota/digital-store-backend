const { logar } = require('./src/controllers/usuariosController')
const { verificarToken } = require('./src/utils')
const usuarioRoutes = require('./src/routes/usuariosRoute')
const avaliacoesRoutes = require("./src/routes/avaliacoesRoutes");
const produtosRoutes = require("./src/routes/produtosRoutes")
const express =  require('express')
const cors =  require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

const port = 8000
const app = express()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Documentação")
});

app.use('/usuarios', verificarToken, usuarioRoutes)

app.post('/login', async(req,res)=>{
    res.send(await logar(req.body))
})

app.post('/req-recuperar-senha', async (req, res) => {
    const usuarioEmail = req.body.usuario_email
    const response = await executarSQL(`SELECT * FROM usuarios WHERE usuario_email = '${usuarioEmail}';`)[0]

    if (!0<response.length) {
        return res.status(400).json({ message: 'Email não encontrado' })
    }

    const token = jwt.encode({ usuarioEmail, exp: Date.now() + 3600000 }, process.env.SECRET)

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: usuario_email,
        subject: 'Redefinição de Senha',
        html: `<p>Para redefinir sua senha, clique no link abaixo:</p>
               <a href="http://localhost:3000/recuperar-senha/${token}">Redefinir Senha</a>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao enviar email' })
        }
        res.status(200).json({ message: 'Email de redefinição de senha enviado' })
    })
})

app.post('/recuperar-senha/:token', async (req, res) => {
    const { token } = req.params
    const { senha } = req.body

    try {
        const decoded = jwt.decode(token, process.env.SECRET)

        if (decoded.exp <= Date.now()) {
            return res.status(400).json({ message: 'Token expirado' })
        }

        const response = await executarSQL(`SELECT * FROM usuarios WHERE usuario_email = '${usuarioEmail}';`)[0]

        if (!0<response.length) {
            return res.status(400).json({ message: 'Usuário não encontrado' })
        }

        const senhaEncriptada = await bcrypt.hash(senha, 10)
        await executarSQL(`UPDATE usuarios SET usuario_senha = '${senhaEncriptada}' WHERE usuario_email = '${usuarioEmail}';`)

        return res.status(200).json({ message: 'Senha redefinida com sucesso' })
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' })
    }
})

app.use("/avaliacoes", avaliacoesRoutes);
app.use("/produtos", produtosRoutes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})