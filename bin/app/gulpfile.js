var gulp = require('gulp');
const { src, dest, series, parallel } = require('gulp');
var compressor = require('gulp-yuicompressor');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var del = require('del'); // rm -rf
var minifyHTML = require('gulp-minify-html');
const cleanCSS = require('gulp-clean-css');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var gzip = require('gulp-gzip');

// clean Directory
const clean = async () => {
    await del.sync(['public']);
};

const assets = async() =>  {
    await src(['assets/**/*'],{ //, 'assets/robots.txt', 'assets/favicon.ico'
        base: 'assets'
    }).pipe(dest('public/'));
};

const views = async() =>  {
    await src(['views/**/*'],{ //, 'assets/robots.txt', 'assets/favicon.ico'
        base: 'views'
    }).pipe(dest('public/views/'));
};

// html minification
const htmlMinify = async () =>  {
    await src('./assets/*.html')
        .pipe(minifyHTML({
            conditionals: true,
            spare: true
        }))
        .pipe(dest('public/'));
};

// html compressor
const htmlCompressor = async () =>  {
    await src('assets/*.html')
        .pipe(compressor({
            'remove-intertag-spaces': false,
            'simple-bool-attr': false,
            'compress-js': true,
            'compress-css': true
        }))
        .pipe(dest('public/'));
};

// js compressor
const js = async () =>  {
    await src('assets/js/**/**/*.js')
        .pipe(uglify())
        // .pipe(concat('production.min.js'))
        .pipe(dest('public/js/'));
};

// css compressor
const css = async () =>  {
    await src("assets/styles/*.css")
        .pipe(cleanCSS())
        // .pipe(concat('production.min.css'))
        .pipe(dest('public/styles/'));
};

// image compressor
const images = async () =>   {
    await src('assets/images/**/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(dest('public/images/'));
};

function jsTask(){
    return src('assets/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('public/js/'));
}


// configure which files to watch and what tasks to use on file changes
var interval = 2000;

const watch = function () {

        gulp.watch(['assets/**/**/**/*'], assets, { interval });
        // gulp.watch(['views/**/**/**/*'], views, { interval });
        // gulp.watch(['assets/styles/*.css'], css, { interval });
        // gulp.watch(['assets/js/*.js'], js, { interval });
        // gulp.watch(['assets/images/*.*'], images, { interval });

};

const build = series(clean, assets, images);
const buildDev = series(clean, assets, views);
const buildProd = series(clean, assets, views);
// const buildProd = series(clean, css);
module.exports = {
    build,
    buildDev,
    buildProd,
    clean,
    assets,
    css,
    images,
    js,
    views,
    watch
};

exports.default = parallel(watch);


