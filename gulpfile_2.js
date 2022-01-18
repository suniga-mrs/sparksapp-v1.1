var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
var header = require('gulp-header');
var rename = require("gulp-rename");
var pkg = require('./package.json');
var banner = ['/*! * Sati - v<%= pkg.version %> * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %> */\n', ''].join('');

// Copy from /node_modules to /vendors
gulp.task('vendors', function() {

  gulp.src(['node_modules/animate.css/animate.min.css'])
    .pipe(gulp.dest('vendors/animate.css'));

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendors/bootstrap'));

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./vendors/font-awesome'));

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendors/jquery'));

  gulp.src(['node_modules/jquery-backstretch/jquery.backstretch.min.js'])
    .pipe(gulp.dest('vendors/jquery-backstretch'));

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./vendors/jquery-easing'));

  gulp.src(['node_modules/owl.carousel/dist/owl.carousel.min.js'])
    .pipe(gulp.dest('vendors/owl.carousel'));

  gulp.src(['node_modules/owl.carousel/dist/assets/**/*'])
    .pipe(gulp.dest('vendors/owl.carousel/assets'));

  gulp.src(['node_modules/place-holder.js/place-holder.min.js'])
    .pipe(gulp.dest('vendors/place-holder.js'));

  gulp.src(['node_modules/popper.js/dist/umd/*.min.js'])
    .pipe(gulp.dest('vendors/popper.js'));


  // Smooth-scroll
  gulp.src([
      './node_modules/smooth-scroll/dist/*'
    ])
    .pipe(gulp.dest('./vendors/smooth-scroll'));
});



gulp.task('images', function() {
  gulp.src('img/*')
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest('img'));
});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendors']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    browser: ["firefox"]
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'browserSync'], function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});