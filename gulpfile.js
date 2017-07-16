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




// ================================================================
// Clean Task
// ================================================================
gulp.task('clean', function(done) {
  return del( config.paths.dest.css + '**/*' );
  done();
});




// ================================================================
// STYLES
// ================================================================
gulp.task('styles', function(done) {
  return gulp.src( config.paths.src.scss + '/**/*.scss' )
    .pipe(sass( config.modules.sass ))
    .pipe(autoprefixer( config.modules.autoprefixer ))
    .pipe(gulp.dest( config.paths.dest.css ));
  done();
});




// ================================================================
// SERVER
// ================================================================
// Static Server
gulp.task('browser-sync', function() {
  browserSync.init( "./" );
});




// ================================================================
// Main Tasks
// ================================================================
gulp.task('build', gulp.series('styles') );
gulp.task('serve', gulp.series('build', 'browser-sync'));
gulp.task('default', gulp.series( 'build') );
