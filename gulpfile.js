const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const notify = require("gulp-notify");

gulp.task('es6', () => {
  return gulp.src('src/js/es6.js')
    .pipe(babel().on("error", notify.onError()))
    .pipe(rename('../dist/js/master.js'))
    .pipe(gulp.dest('src'));
});

gulp.task('pug', () => {
  gulp.src('src/*.pug')
  .pipe(pug({
    pretty: true
  }).on("error", notify.onError()))
  .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['es6', 'pug'], () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
  gulp.watch('src/**/*.js', ['es6']);
  gulp.watch("src/*.pug", ['pug']);
  gulp.watch(['dist/*.html', 'dist/js/**/*']).on('change', browserSync.reload);
});