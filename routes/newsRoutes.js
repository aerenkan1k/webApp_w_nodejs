const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const News = require('../models/News');
const slugify = require('slugify'); 



// Haberleri listeleme
router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.render('news/index', { news: news });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Yeni haber formunu gösterme
router.get('/new', (req, res) => {
    res.render('news/new');
});

// Yeni haber ekleme
router.post('/', async (req, res) => {
    const news = new News({
        title: req.body.title,
        content: req.body.content,
        fullcontent: req.body.fullcontent,
        image: req.body.image, // Resim yolu ekleniyor
    });

    try {
        const newNews = await news.save();
        res.redirect('/news');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Haberin tam sayfasını gösterme
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'Haber bulunamadı' });
        res.render('news/show', { news: news }); // veya JSON yanıtı döndürebilirsiniz
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// // Haberin tam sayfasını gösterme
// router.get('/:id', async (req, res) => {
//     try {
//         const newsId = new mongoose.Types.ObjectId(req.params.id);
//         const news = await News.findById(newsId);
//         // Handle missing news item
//         if (!news) return res.status(404).json({ message: 'Haber bulunamadı' });

//         // Generate slug from news title
//         const slug = slugify(news.title, { lower: true });

//         // Check if URL slug matches news title slug
//         // Check if URL slug matches news title slug
// if (req.params.id !== slug) {
//     // Redirect to correct slug if it doesn't match
//     return res.redirect(`/news/${news.slug}`);
// }


//         // Render 'news/show' template with news data
//         res.render('news/show', { news: news });
//     } catch (err) {
//         // Handle general errors
//         res.status(500).json({ message: err.message });
//     }
// });


// Haber düzenleme formunu gösterme
router.get('/:id/edit', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'Haber bulunamadı' });
        res.render('news/edit', { news: news });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Haber güncelleme
router.put('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'Haber bulunamadı' });

        news.title = req.body.title;
        news.content = req.body.content;
        news.fullcontent= req.body.fullcontent;
        news.image = req.body.image; // Resim yolu güncelleniyor

        const updatedNews = await news.save();
        res.redirect('/news');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Haber silme
router.delete('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'Haber bulunamadı' });

        await News.deleteOne({ _id: req.params.id });
        res.redirect('/news');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;




