var gulp = require('gulp');
var compressor = require('gulp-yuicompressor');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var del = require('del'); // rm -rf
var minifyHTML = require('gulp-minify-html');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var gzip = require('gulp-gzip');

// clean Directory
gulp.task('clean', function() {
    return del(['public']);
});

gulp.task('assets', function() {
    return gulp.src(['assets/**/*', 'assets/robots.txt', 'assets/favicon.ico'],{
        base: 'assets'
    }).pipe(gulp.dest('public/'));
});

// html compressor
gulp.task('htmlCompressor', function() {
    var opts = {
        conditionals: false,
        spare:false
    };

    return gulp.src('./assets/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('public/'));
});

// html compressor
gulp.task('htmlMinify', function () {
    return gulp.src('assets/*.html')
        .pipe(compressor({
            'remove-intertag-spaces': true,
            'simple-bool-attr': true,
            'compress-js': false,
            'compress-css': true
        }))
        .pipe(gulp.dest('public/'));
});

// js compressor
gulp.task('js', function () {
    return gulp.src('assets/js/*.js')
        .pipe(concat('production.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

// css compressor
gulp.task('css', function () {
    return gulp.src("assets/css/*.css")
        .pipe(compressor({
            type: 'css'
        }))
        .pipe(concat('css.min.css'))


        .pipe(gulp.dest('public/css/'));
});

// image compressor
gulp.task('images', function () {
    return gulp.src('assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/images/'));
});

// configure which files to watch and what tasks to use on file changes
var watchInterval = 10000;
gulp.task('watch', function() {
    gulp.watch('assets/**/*', ['assets'], { interval: watchInterval });
    gulp.watch('assets/css/*.css', ['css'], { interval: watchInterval });
    gulp.watch('assets/js/*.js', ['js'], { interval: watchInterval });
    gulp.watch('assets/images/*.*', ['images'], { interval: watchInterval });
});

gulp.task('build', ['assets', 'css', 'images', 'js'], function(){
    return;
});

gulp.task('default', ['watch']);
