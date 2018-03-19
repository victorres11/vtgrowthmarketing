// WARNING: BE CAREFUL, VIC - gulpfile.js was originally in /public but I moved it up a directory so that
// I could get others to make changes to files without having to run gulp locally. If something doesn't work here,
// check the original functionality in /public/gulpfile.js

// Load Plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat')

// Styles
gulp.task('styles', function () {
  return gulp.src('./public/scss/theme.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.public/'))
    .pipe(gulp.dest('./public/dist'))
})

// Scripts
gulp.task('scripts', function () {
  return gulp.src([
      './public/js/top/*.js',
      './public/js/bootstrap/*.js',
      './public/js/vendor/*.js',
      './public/js/theme.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('theme.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./public/'))
    .pipe(gulp.dest('./public/dist'))
})

// Images
gulp.task('images', function () {
  gulp.src('images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./public/dist/images'))
})

// Fonts
gulp.task('fonts', function () {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest('./public/dist/fonts'))
})

// Default task
gulp.task('default', function () {
  gulp.start('styles', 'scripts', 'images', 'fonts')
})

// Watch
gulp.task('watch', function () {
  // Watch .scss files
  gulp.watch(['./public/scss/**/*.scss'], ['styles'])

  // Watch .js files
  gulp.watch('./public/js/**/*.js', ['scripts'])
})
