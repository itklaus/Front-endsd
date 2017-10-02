const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

gulp.task('es6', () => {
  return gulp.src('src/js/es6.js')
    .pipe(babel())
    .pipe(rename('js/master.js'))
    .pipe(gulp.dest('src'));
});

gulp.task('default', ['es6'], () => {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });
  gulp.watch('src/**/*.js', ['es6']);
  gulp.watch(['src/index.html', 'src/**/*.js']).on('change', browserSync.reload);
});