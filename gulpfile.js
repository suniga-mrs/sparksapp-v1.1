var browserSync = require('browser-sync').create();
var gulp        = require('gulp');
var cleanCSS    = require('gulp-clean-css');
var rename      = require("gulp-rename");
var uglify      = require('gulp-uglify');

// Copy from /node_modules to /vendors
gulp.task('vendors', function() {

  // -----Bootstrap 3.3.7
  gulp.src([
    './node_modules/bootstrap/dist/**/*'
  ])
  .pipe(gulp.dest('./vendors/bootstrap'));

  // -----Font Awesome
  gulp.src([
    './node_modules/font-awesome/css/*'
  ])
  .pipe(gulp.dest('./vendors/font-awesome/css'));

  gulp.src([
    './node_modules/font-awesome/fonts/*'
  ])
  .pipe(gulp.dest('./vendors/font-awesome/fonts'));  

  // -----jQuery
  gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
  .pipe(gulp.dest('./vendors/jquery'));  

  // -----Popper
  gulp.src(['node_modules/popper.js/dist/umd/*.min.js'])
    .pipe(gulp.dest('vendors/popper.js'));

      // ----- Smooth Scroll
  gulp.src(['node_modules/smooth-scroll/dist/*.min.js'])
  .pipe(gulp.dest('vendors/smooth-scroll'));

});

// Minify CSS
gulp.task('css', function() {
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

// Minify JavaScript
gulp.task('js', function() {
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

// Default task
gulp.task('default', ['css', 'js']);

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
  gulp.watch('./css/main.css', ['css']);
  gulp.watch('./js/contact.js', ['js']);
  gulp.watch('./js/main.js', ['js']);
  gulp.watch('./js/ytplayer.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});
