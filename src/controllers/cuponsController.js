const { prisma } = require('../database');

async function listarCupons() {
    return prisma.cupons.findMany();
}

async function listarUmCupom(id) {
    return prisma.cupons.findUnique({
        where: { cupom_id: parseInt(id) }
    });
}

async function cadastrarCupom(data) {
    try {
        await prisma.cupons.create({ data });
        return {
            status: 200,
            detail: 'Cupom cadastrado com sucesso.',
            severity: 'success'
        };
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: 'danger'
        };
    }
}

async function editarCupom(data) {
    try {
        const { cupom_id, ...dadosParaAtualizar } = data;
        await prisma.cupons.update({
            where: { cupom_id: parseInt(cupom_id) },
            data: dadosParaAtualizar
        });
        return {
            status: 200,
            detail: 'Cupom editado com sucesso.',
            severity: 'success'
        };
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: 'danger'
        };
    }
}

async function apagarCupom(id) {
    try {
        await prisma.cupons.delete({
            where: { cupom_id: parseInt(id) }
        });
        return {
            status: 200,
            detail: 'Cupom apagado com sucesso.',
            severity: 'success'
        };
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: 'danger'
        };
    }
}

module.exports = {
    listarCupons,
    listarUmCupom,
    cadastrarCupom,
    editarCupom,
    apagarCupom
};