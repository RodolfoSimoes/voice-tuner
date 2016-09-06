var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    cssPrefixer	= require('gulp-autoprefixer'),
    cssMinify   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    imageMin    = require('gulp-imagemin'),
    babel       = require('gulp-babel'),
    htmlmin     = require('gulp-htmlmin');

var PATH_SRC = './src/';
var PATH_DIST = './dist/';
var PATH_NODE = './node_modules/';

/* scripts */

var scriptsSrc = [
    // libs
    PATH_NODE + 'vue/vue.js'
    //,
    // PATH_SRC + 'scripts/config.js',
    // // others
    // // elements
    // PATH_SRC + 'scripts/main.js'
];

var scriptsDist = PATH_DIST + 'scripts/';

gulp.task('scripts', function() {
    return gulp
        .src(scriptsSrc)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(scriptsDist));
});

gulp.task('scripts-min', function() {
    return gulp
        .src(scriptsSrc)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename('app.js'))
        .pipe(gulp.dest(scriptsDist));
});

/* styles */

var stylesSrc = [
    PATH_SRC + 'styles/main.scss',
    PATH_SRC + 'elements/**/*.scss'
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

/* views */

var viewsSrc = [
    PATH_SRC + 'views/*.html'
];

var viewsDist = PATH_DIST;

gulp.task('views', function() {
    return gulp
        .src(viewsSrc)
        .pipe(gulp.dest(viewsDist));
});

gulp.task('views-min', function() {
    return gulp
        .src(viewsSrc)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(viewsDist));
});

/* views */

var templatesSrc = [
    PATH_SRC + 'elements/**/*.html'
];

var templatesDist = PATH_DIST + 'templates/';

gulp.task('templates', function() {
    return gulp
        .src(templatesSrc)
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(templatesDist));
});

gulp.task('templates-min', function() {
    return gulp
        .src(templatesSrc)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(templatesDist));
});

gulp.task('default', ['images', 'scripts', 'styles', 'views', 'templates']);

// gulp.task('dist', ['images-min', 'scripts-min', 'styles-min', 'views-min', 'templates-min']);

// gulp.watch('', ['default']);
