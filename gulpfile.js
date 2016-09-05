var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssPrefixer	= require('gulp-autoprefixer'),
    cssMinify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imageMin = require('gulp-imagemin');

var PATH_SRC = './src/';
var PATH_DIST = './dist/';

/* scripts */

gulp.task('scripts', function() {});

gulp.task('scripts-min', function() {});

/* styles */

var stylesSrc = [
    PATH_SRC + 'styles/main.scss'
];

var stylesDist = PATH_DIST + 'styles/';

gulp.task('styles', function() {
    return gulp
        .src(stylesSrc)
        .pipe(sass().on('error', gutil.log))
        .pipe(cssPrefixer({
            browsers: ['last 4 versions', 'IE 10']
        }))
        .pipe(rename('app.css'))
        .pipe(gulp.dest(stylesDist));
});

gulp.task('styles-min', function() {
    return gulp
        .src(stylesSrc)
        .pipe(sass().on('error', gutil.log))
        .pipe(cssPrefixer({
            browsers: ['last 4 versions', 'IE 10']
        }))
        .pipe(cssMinify())
        .pipe(rename('app.css'))
        .pipe(gulp.dest(stylesDist));
});

/* images */

var imagesSrc = [
    PATH_SRC + 'images/*'
];

var imagesDist = PATH_DIST + 'images';

gulp.task('images', function() {
    return gulp
        .src(imagesSrc)
        .pipe(gulp.dest(imagesDist));
});

gulp.task('images-min', function() {
    return gulp
        .src(imagesSrc)
        .pipe(imageMin({
			optimizationLevel: 7,
			progressive: true,
			interlaced: true
		}))
        .pipe(gulp.dest(imagesDist));
});

// gulp.task('views', function() {});

gulp.task('default', ['images', 'styles']);

gulp.task('dist', ['images-min', 'styles-min']);

//
// gulp.watch('', []);
