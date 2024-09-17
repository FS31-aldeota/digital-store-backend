const { prisma } = require('../database')

async function listarCarrinhos(){
    return prisma.carrinhos.findMany()
}

async function listarUmCarrinho(id){
    const carrinho = await prisma.carrinhos.findUnique({
        where: {
            carrinho_id: parseInt(id)
        },
        include: {
            itens: {
                select: {
                    carrinho_id: true,
                    produto_id: true,
                    quantidade: true,
                    preco_unitario: true,
                    criado_em: true,
                    produto: {
                        select: {
                            produto_nome: true,
                            produto_descricao: true,
                            produto_preco: true,
                            produto_peso: true
                        }
                    }

                }
            }
        }
    })
    if(carrinho){
        return carrinho
    }
    return {
        status: 200,
        detail: "Carrinho não existe.",
        severity: "success"
    }
}

async function cadastrarCarrinho(data){
    try{
        let carrinhos = JSON.parse(data.itens);
        delete data.itens;
        const carrinhoCriado = await prisma.carrinhos.create({data: data}).then(async (data) => {
            let assis = carrinhos.map(i => {
                let carrinho =  { ...i, carrinho_id: data.carrinho_id }
                return carrinho;
            });
            await prisma.carrinhoItens.createMany({
                data: assis
            })
        })

        if(carrinhoCriado){
            return {
                status: 200,
                detail: "Carrinho cadastrado com sucesso.",
                severity: "success"
            }
        }
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

async function editarCarrinho(data){
    try{
        const { carrinho_id, ...dadosParaAtualizar } = data;
        const carrinhoEditado = await prisma.carrinhos.update({
            where: {
                carrinho_id: parseInt(carrinho_id)
            }, data: dadosParaAtualizar})

        if(carrinhoEditado){
            return {
                status: 200,
                detail: "Carrinho editado com sucesso.",
                severity: "success"
            }
        }
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

async function apagarCarrinho(id){
    try{
        const carrinhoApagado = await prisma.carrinhos.delete({
            where: {
                carrinho_id: parseInt(id)
            }})
        if(carrinhoApagado){
            return {
                status: 200,
                detail: "Carrinho apagado com sucesso.",
                severity: "success"
            }
        }
    }catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

module.exports= {
    listarCarrinhos,
    listarUmCarrinho,
    cadastrarCarrinho,
    editarCarrinho,
    apagarCarrinho
}