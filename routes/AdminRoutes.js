const express = require('express'),
User = require('../models/user'),
passport = require("passport"),
router = express.Router(),
flash = require('express-flash'),
session = require('express-session');




let adminActions=[
    {
        actionId:1,
        actionName:"sitemap",
        displayName:"Site Map Görüntüle"
    },
    {
        actionId:2,
        actionName:"addnews",
        displayName:"Haber İşlemleri"
    },
]


router.get("/admin", (req,res)=>{
    res.render("admin/admin",{adminActions:adminActions});
});

router.get('/siteMap', function(req, res) {
    res.render('admin/siteMap'); // siteMap.ejs dosyasını render et
});

router.get("/signin", (req, res) => {
    res.render("admin/signin");
});

router.post("/signin", passport.authenticate("local", {
    successRedirect: "/", // Başarılı girişten sonra yönlendirme
    failureRedirect: "/signin", // Başarısız girişten sonra yönlendirme
    failureFlash: 'Kullanıcı adı veya parola yanlış' // Hata mesajı göstermek için
}));

router.get("/signup", (req,res)=>{
    res.render("admin/signup");
});
router.post("/signup", (req, res) => {
    const username = req.body.username; // Email olarak kullanılacak
    const password = req.body.password;
    const email = req.body.username; // Email adresini tekrar kullanmak

    // Verilerin doğru alındığını kontrol edin
    console.log("Username (Email):", username);
    console.log("Password:", password);

    if (!username || !password || !email) {
        return res.status(400).send("All fields are required");
    }

    let newUser = new User({ username: username, email: email });
    User.register(newUser, password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/");
        });
    });
});

router.get("/signout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            // Çıkış işlemi sırasında bir hata oluştuysa burada işleyebilirsiniz.
            console.error(err);
            return next(err);
        }
        // Kullanıcı başarıyla çıkış yaptığında yönlendirilecek sayfa
        res.redirect("/");
    });
});






module.exports = router;
