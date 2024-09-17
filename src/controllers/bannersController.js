const { prisma } = require("../database");
const formi = require("formidable");
const fs = require("fs");
const path = require("path");
const util = require('util');

const copyFileAsync = util.promisify(fs.copyFile);
const unlinkAsync = util.promisify(fs.unlink);

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

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
    return new Promise((resolve, reject) => {
        const form = new formi.IncomingForm({});

        form.parse(dados, async (err, fields, files) => {
            if (err) {
                return reject({
                    status: 400,
                    message: err.message
                });
            }

            if (!files.banner_imagem) {
                return reject({
                    status: 400,
                    message: 'O arquivo é obrigatório'
                });
            }

            if (!files.banner_imagem[0].originalFilename.includes(".png") && !files.banner_imagem[0].originalFilename.includes(".jpg")) {
                return reject({
                    status: 400,
                    message: 'O arquivo precisa ser do tipo PNG ou JPG'
                });
            }
            

            const oldpath = files.banner_imagem[0].filepath;
            const filename = files.banner_imagem[0].originalFilename.split('.');
            const newFilename = `${filename[0].replaceAll(' ','-').toLowerCase()}-${Date.now()}.${filename[1]}`
            const newpath = path.join(__dirname, '../uploads/produtos_imagem', newFilename);

            try {
                await copyFileAsync(oldpath, newpath);
                await unlinkAsync(oldpath);
                await prisma.banners.create({
                    data: {
                        banner_nome: fields.banner_nome[0],
                        banner_subtitulo: fields.banner_subtitulo[0],
                        banner_titulo: fields.banner_titulo[0],
                        banner_descricao: fields.banner_descricao[0],
                        banner_link: fields.banner_link[0],
                        banner_imagem: newFilename
                    }
                })
            } catch (err) {
                return reject({
                    status: 400,
                    message: `Erro ao ler a primeira linha do arquivo: ${err.message}`
                });
            }

            resolve();
        })
    }).then(() => {
        return {
            status: 200,
            severity: 'success',
            message: 'Banner criado com sucesso'
        }
    }).catch((error) => {
        return {
            status: 200,
            severity: 'danger',
            message: error.message
        }
    });
}

async function editarBanner(dados) {
    return new Promise((resolve, reject) => {
        const form = new formi.IncomingForm({});

        form.parse(dados, async (err, fields, files) => {
            if (err) {
                return reject({
                    status: 400,
                    message: err.message
                });
            }

            if (!files.banner_imagem) {
                return reject({
                    status: 400,
                    message: 'O arquivo é obrigatório'
                });
            }

            if (!files.banner_imagem[0].originalFilename.includes(".png") && !files.banner_imagem[0].originalFilename.includes(".jpg")) {
                return reject({
                    status: 400,
                    message: 'O arquivo precisa ser do tipo PNG ou JPG'
                });
            }
            

            const oldpath = files.banner_imagem[0].filepath;
            const filename = files.banner_imagem[0].originalFilename.split('.');
            const newFilename = `${filename[0].replaceAll(' ','-').toLowerCase()}-${Date.now()}.${filename[1]}`
            const newpath = path.join(__dirname, '../uploads/produtos_imagem', newFilename);

            try {
                await copyFileAsync(oldpath, newpath);
                await unlinkAsync(oldpath);
                await prisma.banners.update({
                    where: {
                        banner_id: Number(fields.banner_id[0])
                    },
                    data: {
                        banner_nome: fields.banner_nome[0],
                        banner_subtitulo: fields.banner_subtitulo[0],
                        banner_titulo: fields.banner_titulo[0],
                        banner_descricao: fields.banner_descricao[0],
                        banner_link: fields.banner_link[0],
                        banner_imagem: newFilename
                    }
                })
            } catch (err) {
                return reject({
                    status: 400,
                    message: `Erro ao ler a primeira linha do arquivo: ${err.message}`
                });
            }

            resolve();
        })
    }).then(() => {
        return {
            status: 200,
            severity: 'success',
            message: 'Banner editado com sucesso'
        }
    }).catch((error) => {
        return {
            status: 200,
            severity: 'danger',
            message: error.message
        }
    });
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
                detail: "Banner apagado com sucesso.",
                severity: "success"
            }
        } else {
            return {
                status: 422,
                detail: "Banner não encontrado.",
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