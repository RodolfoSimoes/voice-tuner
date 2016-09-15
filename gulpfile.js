
var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    gutil       = require('gulp-util'),
    babel       = require('gulp-babel'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssPrefixer	= require('gulp-autoprefixer'),
    gulpMerge   = require('gulp-merge'),
    webserver   = require('gulp-webserver');

var PATH_SRC  = './src/';
var PATH_DIST = './dist/';
var PATH_NODE = './node_modules/';

/* scripts */

var scriptsLibs = [
    PATH_NODE + 'vue/dist/vue.js',
];

var scriptsSrc = [
    PATH_SRC + 'scripts/config.js',
    PATH_SRC + 'scripts/elements/tuner.js',
    PATH_SRC + 'scripts/elements/tuner-header.js',
    PATH_SRC + 'scripts/elements/tuner-footer.js',
    PATH_SRC + 'scripts/main.js'
];

var scriptsDist = PATH_DIST + 'scripts/';

gulp.task('scripts', function() {
    return gulpMerge(
            gulp
                .src(scriptsLibs),
                // .pipe(concat('libs.js'))
            gulp
                .src(scriptsSrc)
                .pipe(babel({
                    presets: ['es2015']
                }))
                // .pipe(concat('src.js'))
        )
        .pipe(concat('app.js'))
        .pipe(gulp.dest(scriptsDist));
});

/* styles */

var stylesSrc = [
    PATH_SRC + 'styles/**/**/*.scss',
    PATH_SRC + 'styles/**/*.scss',
    PATH_SRC + 'styles/*.scss'
];

var stylesDist = PATH_DIST + 'styles/';

gulp.task('styles', function() {
    return gulp
        .src(stylesSrc)
        .pipe(sass().on('error', gutil.log))
        .pipe(cssPrefixer({
            browsers: ['last 4 versions', 'IE 10']
        }))
        // .pipe(rename('app.css'))
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

/* Server */

var serverPath = PATH_DIST;

gulp.task('server', function() {
  gulp
    .src(serverPath)
    .pipe(webserver({
      fallback: 'index.html'
    }));
});

/* Watch */

gulp.task('watch', function() {
    gulp.watch(scriptsSrc, ['scripts']);
	gulp.watch(stylesSrc, ['styles']);
});

gulp.task('default', ['images', 'scripts', 'styles', 'views']);

// /*
// ===============================
// MINIFIER
// ===============================
// */
//
// var gulp        = require('gulp'),
//     gutil       = require('gulp-util'),
//     sass        = require('gulp-sass'),
//     concat      = require('gulp-concat'),
//     rename      = require('gulp-rename'),
//     cssPrefixer	= require('gulp-autoprefixer'),
//     cssMinify   = require('gulp-minify-css'),
//     uglify      = require('gulp-uglify'),
//     imageMin    = require('gulp-imagemin'),
//     babel       = require('gulp-babel'),
//     htmlmin     = require('gulp-htmlmin'),
//     gulpMerge   = require('gulp-merge'),
//     webserver   = require('gulp-webserver');
//
// gulp.task('scripts-min', function() {
//     return gulpMerge(
//             gulp
//                 .src(scriptsLibs)
//                 .pipe(concat('libs.js')),
//             gulp
//                 .src(scriptsSrc)
//                 .pipe(babel({
//                     presets: ['es2015']
//                 }))
//                 .pipe(concat('src.js'))
//         )
//         .pipe(concat('app.js'))
//         .pipe(uglify())
//         .pipe(rename('app.js'))
//         .pipe(gulp.dest(scriptsDist));
// });
//
// gulp.task('styles-min', function() {
//     return gulp
//         .src(stylesSrc)
//         .pipe(sass().on('error', gutil.log))
//         .pipe(cssPrefixer({
//             browsers: ['last 4 versions', 'IE 10']
//         }))
//         .pipe(cssMinify())
//         .pipe(rename('app.css'))
//         .pipe(gulp.dest(stylesDist));
// });
//
// gulp.task('views-min', function() {
//     return gulp
//         .src(viewsSrc)
//         .pipe(htmlmin({collapseWhitespace: true}))
//         .pipe(gulp.dest(viewsDist));
// });
//
// gulp.task('images-min', function() {
//     return gulp
//         .src(imagesSrc)
//         .pipe(imageMin({
// 			optimizationLevel: 7,
// 			progressive: true,
// 			interlaced: true
// 		}))
//         .pipe(gulp.dest(imagesDist));
// });
//
//
// gulp.task('dist', ['images-min', 'scripts-min', 'styles-min', 'views-min']);
