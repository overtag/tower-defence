var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp = require('gulp');
var server = require('gulp-server-livereload');

var paths = {
  babel: ['./src/**/*.js'],
  concat: ['./dist/**/*.js']
};

gulp.task('babel',  function () {
  return gulp.src(paths.babel)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('concat',  function () {
  return gulp.src(paths.concat)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('livereload', function() {
  gulp.src('')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      derectoryListing: false,
      open: false
    }));
});

gulp.task("watch", function() {
  gulp.watch(paths.babel, ["babel"]);
  gulp.watch(paths.concat, ["concat"]);
});

gulp.task("default", ["livereload"]);


