var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concatCss = require('gulp-concat-css');
var jsConcat = require('gulp-concat');
var AP = require('gulp-autoprefixer');
var javascriptObfuscator = require('gulp-javascript-obfuscator');

gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: "./build",
            index: 'index.html'
        }
    });
    gulp.watch('./gulpfile.js', ['build']);
    gulp.watch('./src/**/*.*', ['build']);
});

gulp.task('makePugs', function () {
    return gulp.src('./src/templates/*.pug')
        .pipe(pug())
        .on('error', function showError(error) {
            console.log(error.toString());
            this.emit('end')
        })
        .pipe(gulp.dest('./build'))
});

gulp.task('makeImages', function () {
    return gulp.src('./src/images/*.*')
        .pipe(gulp.dest('./build/images'))
});

gulp.task('makeSass', function () {
    return gulp.src('./src/sass/*.sass')
        .pipe(sass()).on('error', function showError(error) {
            console.log(error.toString());
            this.emit('end')
        })
        .pipe(concatCss("style.css"))
        .pipe(AP({
            browsers: ['last 5 versions'],
            grid: true
        }))
        .pipe(gulp.dest('./build/styles/'))
});

gulp.task('makeJs', function () {
    return gulp.src('./src/scripts/*.js')
        .pipe(jsConcat('all.js'))
        // .pipe(javascriptObfuscator({
        //     compact:true,
        //     sourceMap: true
        // }))
        .pipe(gulp.dest('./build/scripts/'))
});

gulp.task('build', ['makePugs', 'makeImages', 'makeSass', 'makeJs'], function () {
    browserSync.reload();
});

