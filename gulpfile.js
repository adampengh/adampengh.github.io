/**
*
* Adam Pengh Portfolio - Gulpfile
*
**/

// ----------------------------------------------------------------
// Modules
// ----------------------------------------------------------------
const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const del           = require('del');
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');


// ----------------------------------------------------------------
// Config
// ----------------------------------------------------------------
const config        = require('./gulp.config.json');

const reload        = browserSync.reload;

// ================================================================
// Clean Task
// ================================================================
function clean(done) {
  return del( config.paths.dest.css + '**/*' );
  done();
}
exports.clean = clean;




// ================================================================
// STYLES
// ================================================================
function styles(done) {
  return gulp.src( config.paths.src.scss + '/**/*.scss' )
    .pipe(sass( config.modules.sass ))
    .pipe(autoprefixer( config.modules.autoprefixer ))
    .pipe(gulp.dest( config.paths.dest.css ))
    .pipe(browserSync.stream());
  done();
}
exports.styles = styles;




// ================================================================
// SERVER
// ================================================================
// Static Server
gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
});



// ================================================================
// WATCH
// ================================================================
function watch() {
  gulp.watch(config.paths.src.scss + '/**/*.scss', styles);
  gulp.watch("*.html").on("change", reload);
}
exports.watch = watch;



// ================================================================
// Main Tasks
// ================================================================
gulp.task('build', gulp.series(clean, styles) );
gulp.task('serve', gulp.series('build', 'browser-sync', watch));
gulp.task('default', gulp.series( 'build') );
