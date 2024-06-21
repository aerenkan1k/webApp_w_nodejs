const mongoose = require('mongoose');
const slugify = require('slugify');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    fullcontent: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true // Eşsiz slug'lar sağlamak için
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Middleware kullanarak slug oluşturma
newsSchema.pre('save', function(next) {
    if (this.title && this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});
module.exports = mongoose.model('News', newsSchema);
