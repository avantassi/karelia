var 
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  mincss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  path = {
      css: 'css/*.css',
      sassBuild: ['src/styles/main.scss'],
      sassWatch: ['src/styles/**/*.scss'],
      pugWatch: 'src/pages/**/*.pug',
      pugBuild: ['src/pages/*.pug'],
      jsWatch: 'src/js/**/*.js',
      jsBuild: ['src/js/*.js']
  },
  plumber = require('gulp-plumber'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  pug = require('gulp-pug'),
  watch = rename('gulp-watch'),
  csscomb = require('gulp-csscomb'),
  $ = require('gulp-load-plugins')()
;

//SCSS to CSS + prefixer
gulp.task('css', function () {
return gulp.src(path.sassBuild)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe($.csscomb())
    .pipe(mincss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('css'))
});

//Minify Js
gulp.task('js', function () {
return gulp.src(path.jsBuild)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('js'))
});

// Pug compilation
gulp.task('html', function () {
return gulp.src(path.pugBuild)
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(''))
});

gulp.task('all', ['css', 'js', 'html']);

// Gulp watch
gulp.task('watch', function () {
gulp.watch(path.sassWatch, ['css']);
gulp.watch(path.pugWatch, ['html']);
// gulp.watch(path.jsWatch, ['js']);
});
