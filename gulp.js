const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function compressCss() {
    return gulp.src('css/style.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));
}

function trasnplieAndCompressJs() {
    return gulp.src('js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
}


function sync() {
    return browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

exports.default = function() {
    gulp.watch('src/css/*.css', compressCss);
    gulp.watch('src/js/*.js', trasnplieAndCompressJs);
    compressCss()
    trasnplieAndCompressJs()
    sync();
};