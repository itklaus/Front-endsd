const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('es6', () => {
  return gulp.src('src/master.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['es6'], () => {
  gulp.watch('src/master.js', ['es6'])
});