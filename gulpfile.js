const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// Compile SASS
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    browserSync.init({
        server: {
          baseDir: './src'
        }
      });
      gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series(['sass']));
      gulp.watch("src/*.html").on('change', browserSync.reload);
      return
  });

// Move JS Files to SRC
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.slim.js', 'node_modules/popper.js/dist/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Move Font Awesome Fonts folder to src
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/*')
    .pipe(gulp.dest("src/fonts"));
});

// Move font awesome css file
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

gulp.task('default', gulp.series(['sass', 'js', 'fonts', 'fa', 'watch']))