const mongoose = require("mongoose"),
      express = require("express"),
      expressSession = require("express-session"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      User = require("./models/user"),
      bodyParser = require("body-parser"),
      flash = require('express-flash'),
      methodOverride = require('method-override'),
      app = express();

// Routes
const indexRoutes = require("./routes/indexRoutes"),
      AdminRoutes = require("./routes/AdminRoutes"),
      newsRoutes = require("./routes/newsRoutes"); 

app.use(bodyParser.json());
// App Config
mongoose.connect("mongodb://localhost/WebApp", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('strictQuery', true); 

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Method-override middleware'i ekle
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport Config
app.use(require("express-session")({
    secret: "safety",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));

// Anlık kullanıcı bilgisi
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Routes using
app.use(indexRoutes);
app.use(AdminRoutes);
app.use("/news", newsRoutes); // Haber route'unu belirli bir yol ile kullan

const server = app.listen(3001, (err) => {
    if (err)
        console.log(err);
    console.log('App started. Port number  : %d', server.address().port);
});
