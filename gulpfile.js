const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const notify = require("gulp-notify");
const sass = require('gulp-sass'); 
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

gulp.task('es6', () => {
  return gulp.src('src/js/es6.js')
    .pipe(babel().on("error", notify.onError()))
    .pipe(concat('master.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
});

gulp.task('js', ['es6'], function() {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/js/master.min.js',
	])
	.pipe(concat('master.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
});

gulp.task('pug', () => {
  gulp.src('src/*.pug')
  .pipe(pug({
    pretty: true
  }).on("error", notify.onError()))
  .pipe(gulp.dest('dist/'))
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer(['last 14 versions']))
    .pipe(cleanCSS()) 
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('imgmin', function() {
	return gulp.src('src/img/**/*')
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('default', ['es6', 'pug', 'sass', 'imgmin'], () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/sass/master.sass', ['sass']);
  gulp.watch("src/*.pug", ['pug']);
  gulp.watch("src/img/**/*", ['imgmin']);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});