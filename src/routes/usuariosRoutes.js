const express = require('express')
const router = express.Router()
const { listarUsuarios, listarUmUsuario, cadastrarUsuario, apagarUsuario, editarUsuario, logar } = require('../controllers/usuariosController')
const { verificarToken } = require('../utils')
const { prisma } = require('../database')

router.get('/', verificarToken, async (req,res)=>{
	// #swagger.tags = ['Usuarios']
	// #swagger.description = 'Retorna lista de usuarios'
	/* #swagger.responses[200] = {
            description: 'Retorna lista de usuarios',
            schema: [{
                usuario_id: 1,
				usuario_email: "email@email.com",
				usuario_senha: "senha-encriptada",
				usuario_nome: "Nome do Usuario",
				usuario_cpf: "123.123.123-12",
				usuario_celular: "8599999-9999",
				usuario_newsletter: 1,
				usuario_avaliacoes: [],
				usuario_endereco: 1,
				carrinhos: 1,
				desejos: 1
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
    res.send(await listarUsuarios())
})

router.get('/:id', verificarToken, async (req,res)=>{
	// #swagger.tags = ['Usuarios']
	// #swagger.description = 'Retorna um usuario'
	/* #swagger.responses[200] = {
            description: 'Retorna um usuario',
            schema: {
                usuario_id: 1,
				usuario_email: "email@email.com",
				usuario_senha: "senha-encriptada",
				usuario_nome: "Nome do Usuario",
				usuario_cpf: "123.123.123-12",
				usuario_celular: "8599999-9999",
				usuario_newsletter: 1,
				usuario_avaliacoes: [],
				usuario_endereco: 1,
				carrinhos: 1,
				desejos: 1
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
    res.send(await listarUmUsuario(req.params.id))
})

router.post('/', async (req,res)=>{
	// #swagger.tags = ['Usuarios']
	// #swagger.description = 'Cria um usuario'
	/* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
					$usuario_email: "email@email.com",
					$usuario_senha: "senha-usuario",
					$usuario_nome: "Nome do Usuario",
					$usuario_cpf: "123.123.123-12",
					$usuario_celular: "8599999-9999",
					$usuario_newsletter: 1,
					$usuario_avaliacoes: [],
					$usuario_endereco: 1,
					$carrinhos: 1,
					$desejos: 1
            }
        } */
	/* #swagger.responses[200] = {
            description: 'Usuario cadastrado.',
            schema: {
                status: 200,
                detail: 'Usuario cadastrado com sucesso',
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
    res.send(await cadastrarUsuario(req.body))
})

router.put('/', verificarToken, async (req,res)=>{
	// #swagger.tags = ['Usuarios']
	// #swagger.description = 'Edita um Usuario'
	/* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                	$usuario_id: 1,
                    $usuario_email: "email@email.com",
					$usuario_senha: "senha-usuario",
					$usuario_nome: "Nome do Usuario",
					$usuario_cpf: "123.123.123-12",
					$usuario_celular: "8599999-9999",
					$usuario_newsletter: 1,
					$usuario_avaliacoes: [],
					$usuario_endereco: 1,
					$carrinhos: 1,
					$desejos: 1
                }
        } */
	/* #swagger.responses[200] = {
            description: 'Usuario atualizada',
            schema: {
                status: 200,
                detail: 'Usuario atualizado com sucesso.',
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
    res.send(await editarUsuario(req.body))
})

router.delete('/:id', verificarToken, async (req,res)=>{
	// #swagger.tags = ['Usuarios']
	// #swagger.description = 'Deleta um usuario'
	/* #swagger.responses[200] = {
            description: 'Usuario deletado',
            schema: {
                status: 200,
                detail: 'Usuario deletado com sucesso.',
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
    res.send(await apagarUsuario(req.params.id))
})

router.post('/login', async (req, res) => {
	// #swagger.tags = ['Usuarios']
	// #swagger.description = 'Autentica um usuário'
	/*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $usuario_email: 'usuario@email.com',
                    $usuario_senha: '123456'
                }
        } */
	/* #swagger.responses[200] = {
            description: 'Login efetuado',
            schema: {
                usuario_nome: 'chico moedas',
                usuario_email: 'chico@gmail.com',
                token: '...'
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
	res.send(await logar(req.body));
});

router.post('/req-recuperar-senha', async (req, res) => {
	const usuarioEmail = req.body.usuario_email;
	const resposta = await prisma.usuarios.findUnique({
		where: {
			usuario_email: usuarioEmail,
		},
	});

	if (!resposta) {
		return res.status(400).json({ message: 'Email não encontrado' });
	}

	const token = jwt.encode(
		{ usuarioEmail, exp: Date.now() + 3600000 },
		process.env.SECRET
	);

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: usuarioEmail,
		subject: 'Redefinição de Senha',
		html: `<p>Para redefinir sua senha, clique no link abaixo:</p>
               <a href="http://localhost:3000/recuperar-senha/${token}">Redefinir Senha</a>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).json({ message: 'Erro ao enviar email' });
		}
		res.status(200).json({ message: 'Email de redefinição de senha enviado' });
	});
});

router.post('/recuperar-senha/:token', async (req, res) => {
	const { token } = req.params;
	const { usuario_senha, usuarioEmail } = req.body;

	// TODO: Atribuir corretamente o Email do Usuario
	try {
		const decoded = jwt.decode(token, process.env.SECRET);

		if (decoded.exp <= Date.now()) {
			return res.status(400).json({ message: 'Token expirado' });
		}

		const resposta = await prisma.usuarios.findUnique({
			where: {
				usuario_email: usuarioEmail,
			},
		});

		if (!resposta) {
			return res.status(400).json({ message: 'Usuário não encontrado' });
		}

		const senhaEncriptada = await bcrypt.hash(usuario_senha, 10);
		await prisma.usuarios.update({
			where: {
				usuario_email: usuarioEmail,
			},
			data: {
				usuario_senha: senhaEncriptada,
			},
		});

		return res.status(200).json({ message: 'Senha redefinida com sucesso' });
	} catch (error) {
		res.status(400).json({ message: 'Token inválido' });
	}
});

module.exports = router