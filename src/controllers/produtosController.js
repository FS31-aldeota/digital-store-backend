const { prisma } = require('../database/index')

async function listarProdutos(){
    try{
        return prisma.produtos.findMany()

    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

async function listarUmProduto(id){
    try{
        return prisma.produtos.findFirst({
            where: {
                produto_id: id
            }
        })
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

async function cadastrarProduto(data){
    try{
        const produtoCadastrado = await  prisma.produtos.create({
            data: {
                produto_nome: data.produto_nome,
                produto_descricao: data.produto_descricao,
                produto_preco: data.produto_preco,
                produto_status: data.produto_status,
                produto_estoque: data.produto_estoque,
                categoria_id: data.categoria_id,
                marca_id: data.marca_id,
                produto_peso: data.produto_peso,
                produto_altura: data.produto_altura,
                produto_comprimento: data.produto_comprimento,
                produto_largura: data.produto_largura,
                produto_imagem: data.produto_imagem,
                produto_em_promocao: data.produto_em_promocao,
                produto_destaque: data.produto_destaque,
                produto_tags: data.produto_tags,
            }
        })
        if(produtoCadastrado){
            return {
                status: 200,
                detail: "Produto cadastrado.",
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

async function editarProduto(data){
    try{
        const produtoEditado = await prisma.produtos.update({
            where: {
              produto_id: data.produto_id
            },
            data: {
                produto_nome: data.produto_nome,
                produto_descricao: data.produto_descricao,
                produto_preco: data.produto_preco,
                produto_status: data.produto_status,
                produto_estoque: data.produto_estoque,
                categoria_id: data.categoria_id,
                marca_id: data.marca_id,
                produto_peso: data.produto_peso,
                produto_altura: data.produto_altura,
                produto_comprimento: data.produto_comprimento,
                produto_largura: data.produto_largura,
                produto_imagem: data.produto_imagem,
                produto_em_promocao: data.produto_em_promocao,
                produto_destaque: data.produto_destaque,
                produto_tags: data.produto_tags,
            }
        })
        if(produtoEditado){
            return {
                status: 200,
                detail: "Produto atualizado.",
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

async function apagarProduto(id){
    try{
        const produtoApagado = await prisma.produtos.delete({
            where: {
                produto_id: parseInt(id)
            }
        })
        if(produtoApagado){
            return {
                status: 200,
                detail: "Produto apagado.",
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

async function listarProdutosEmDestaque(){
    try{
        return prisma.produtos.findMany({
            where: {
                produto_destaque: true
            }
        })
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

module.exports = {
    listarProdutos,
    listarUmProduto,
    cadastrarProduto,
    editarProduto,
    apagarProduto,
    listarProdutosEmDestaque
}