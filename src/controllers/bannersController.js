const { prisma } = require("../database");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");


async function listarBanners() {
    try {
        return await prisma.banners.findMany()
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

async function listarUmaBanner(id) {
    try {
        return await prisma.banners.findFirst({
            where: {
                banner_id: parseInt(id)
            },

        })
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

async function cadastrarBanner(dados) {
    try {

        const form = new formidable.IncomingForm();

        if (this.headers && this.headers['content-length']) {
            // Seu código aqui
            form.parse(dados, async (err, fields, files) => {
                console.log(err);
                console.log("files", files);
                console.log("fields", fields);
            });
        } else {
            // Lidar com a ausência do content-length
        }

        // const bannerCadastrada = await prisma.banners.create({
        //     data: dados
        // })
        // if(bannerCadastrada){
        //     return {
        //         status: 200,
        //         detail: "Banner cadastrada com sucesso.",
        //         severity: "success"
        //     }
        // }
    } catch (error) {
        return {
            status: 422,
            detail: error.message,
            severity: "danger"
        }
    }
}

async function editarBanner(dados) {
    try {
        const bannerEditada = await prisma.banners.update({
            where: {
                banner_id: dados.banner_id
            }, data: dados
        })
        if (bannerEditada) {
            return {
                status: 200,
                detail: "Banner editada com sucesso.",
                severity: "success"
            }
        } else {
            return {
                status: 422,
                detail: "Banner não encontrada.",
                severity: "warn"
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

async function apagarBanner(id) {
    try {
        const bannerApagada = await prisma.banners.delete({
            where: {
                banner_id: parseInt(id)
            }
        })
        if (bannerApagada) {
            return {
                status: 200,
                detail: "Banner apagada com sucesso.",
                severity: "success"
            }
        } else {
            return {
                status: 422,
                detail: "Banner não encontrada.",
                severity: "warn"
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

module.exports = {
    listarBanners,
    listarUmaBanner,
    cadastrarBanner,
    apagarBanner,
    editarBanner
}