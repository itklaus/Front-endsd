const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const pug = require('gulp-pug');

gulp.task('es6', () => {
  return gulp.src('src/js/es6.js')
    .pipe(babel())
    .pipe(rename('../dest/js/master.js'))
    .pipe(gulp.dest('src'));
});

gulp.task('pug', () => {
  gulp.src('src/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dest/'))
});

gulp.task('default', ['es6', 'pug'], () => {
  browserSync.init({
    server: {
      baseDir: 'dest'
    },
    notify: false
  });
  gulp.watch('src/**/*.js', ['es6']);
  gulp.watch("src/*.pug", ['pug']);
  gulp.watch(['dest/*.html', 'dest/js/**/*']).on('change', browserSync.reload);
});