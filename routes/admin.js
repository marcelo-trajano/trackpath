// const express = require(`express`);
// const router = express.Router();
// const Categoria = require(`../models/Categoria`);

// router.get(`/categoria/add`, (req, res) => {
//     res.render("admin/addCategorias");
// });

// router.get(`/categoria`, (req, res) => {
//     Categoria.findAll()
//         .then(function(Categorias) {
//             res.render("admin/categoria", { Categorias: Categorias });
//         })
//         .catch(function(erro) {
//             req.flash("error_msg", "Erro ao incluir categoria!");
//             res.send(`ERRO` + erro);
//         });
// });

// router.post(`/categoria/novo`, (req, res) => {
//     var errors = [];

//     if (!req.body.nome ||
//         typeof req.body.nome === undefined ||
//         req.body.nome == null
//     ) {
//         errors.push({ texto: "Nome invalido!" });
//     }

//     if (!req.body.slug ||
//         typeof req.body.slug === undefined ||
//         req.body.slug == null
//     ) {
//         errors.push({ texto: "Slug invalido!" });
//     }

//     console.log(errors.length);

//     if (errors.length > 0) {
//         res.render("admin/addCategorias", { erros: errors });
//     } else {
//         Categoria.create({
//                 nome: req.body.nome,
//                 slug: req.body.slug,
//             })
//             .then(function(categoria) {
//                 req.flash("success_msg", "Categooria incluida com sucesso!");
//                 res.redirect(`/admin/categoria`);
//             })
//             .catch(function(erro) {
//                 req.flash("error_msg", "Erro ao incluir categoria!");
//                 res.send(`ERRO` + erro);
//             });
//     }
// });

// router.get(`/categoria/editar/:id`, (req, res) => {
//     var errors = [];

//     Categoria.findByPk(req.params.id)
//         .then(function(Categoria) {
//             res.render("admin/editarCategoria", {
//                 id: Categoria.id,
//                 nome: Categoria.nome,
//                 slug: Categoria.slug,
//             });
//         })
//         .catch(function(erro) {
//             req.flash("error_msg", "Erro ao editar categoria!");
//             res.send(`ERRO` + erro);
//         });
// });

// router.post(`/categoria/editar`, (req, res) => {
//     var errors = [];

//     if (!req.body.nome ||
//         typeof req.body.nome === undefined ||
//         req.body.nome == null
//     ) {
//         errors.push({ texto: "Nome invalido!" });
//     }

//     if (!req.body.slug ||
//         typeof req.body.slug === undefined ||
//         req.body.slug == null
//     ) {
//         errors.push({ texto: "Slug invalido!" });
//     }

//     console.log(errors.length);

//     if (errors.length > 0) {
//         res.render("admin/editarCategoria", { erros: errors });
//     } else {
//         Categoria.update({
//                 nome: req.body.nome,
//                 slug: req.body.slug,
//             }, {
//                 where: {
//                     id: req.body.id,
//                 },
//             })
//             .then(function(categoria) {
//                 req.flash("success_msg", "Categooria editada com sucesso!");
//                 res.redirect(`/admin/categoria`);
//             })
//             .catch(function(erro) {
//                 req.flash("error_msg", "Erro ao editar categoria!");
//                 res.send(`ERRO` + erro);
//             });
//     }
// });

// module.exports = router;