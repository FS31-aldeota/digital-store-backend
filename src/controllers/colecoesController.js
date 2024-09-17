const { prisma } = require('../database');

async function listarColecoes() {
    return prisma.colecoes.findMany();
}

async function listarUmaColecao(id) {
    return prisma.colecoes.findUnique({
        where: { colecao_id: parseInt(id) }
    });
}

async function cadastrarColecao(data) {
    try {
        await prisma.colecoes.create({ data });
        return { status: 200, detail: 'Coleção cadastrada com sucesso.', severity: 'success' };
    } catch (error) {
        return { status: 422, detail: error.message, severity: 'danger' };
    }
}

async function editarColecao(data) {
    try {
        const { colecao_id, ...dadosParaAtualizar } = data;
        await prisma.colecoes.update({
            where: { colecao_id: parseInt(colecao_id) },
            data: dadosParaAtualizar
        });
        return { status: 200, detail: 'Coleção editada com sucesso.', severity: 'success' };
    } catch (error) {
        return { status: 422, detail: error.message, severity: 'danger' };
    }
}

async function apagarColecao(id) {
    try {
        await prisma.colecoes.delete({
            where: { colecao_id: parseInt(id) }
        });
        return { status: 200, detail: 'Coleção apagada com sucesso.', severity: 'success' };
    } catch (error) {
        return { status: 422, detail: error.message, severity: 'danger' };
    }
}

module.exports = {
    listarColecoes,
    listarUmaColecao,
    cadastrarColecao,
    editarColecao,
    apagarColecao
};