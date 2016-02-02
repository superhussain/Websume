var gulp = require('gulp');

// plugins
var uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    serve = require('gulp-webserver');

// error log
function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}

// ### TASKS ###################

// scripts task
gulp.task('scripts', function() {
  gulp.src('js/*.js')
  .pipe(uglify())
  .on('error', errorLog)
  .pipe(gulp.dest('js/build'));
});

// styles task
gulp.task('styles', function() {
//  gulp.src('sass/**/*.scss')
//  .pipe(sass({
//    style: 'compressed'
//  }))
  return sass('sass/*.scss', { style: 'compressed' })
  .on('error', errorLog)
  .pipe(prefix('last 5 versions'))
  .pipe(gulp.dest('css'))
  .pipe(livereload());
});

// image task
gulp.task('image', function() {
  gulp.src('img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('img'));
});

// serve task
gulp.task('serve', function() {
  gulp.src('./')
    .pipe(serve({
      livereload: {
        enable: true,
        filter: function(fileName) {
          if (fileName.match(/.map$/)) { // exclude all source maps from livereload
            return false;
          } else {
            return true;
          }
        }
      },
      directoryListing: true,
      open: true,
      fallback: 'index.html'
    }));
});

// watch task
gulp.task('watch', function() {
  var server = livereload();

  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('sass/**/*', ['styles']);
});

// default task
gulp.task('default', ['scripts', 'styles', 'serve', 'watch']);
