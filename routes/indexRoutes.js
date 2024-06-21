const express = require('express');
const router = express.Router();
const News = require('../models/News'); // News modelini dahil ediyoruz

router.get('/', async (req, res) => {
    try {
        const news = await News.find(); // Veritabanından tüm haberleri alıyoruz
        res.render('home', { news: news }); // Ana sayfaya haber listesini gönderiyoruz
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/mdata", (req, res) => {
    res.render("mdata");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});


module.exports = router;
