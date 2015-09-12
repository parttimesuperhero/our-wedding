// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var streamify = require('gulp-streamify');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;
var normalize = require('node-normalize-scss').includePaths;
var imageResize = require('gulp-image-resize');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Images
gulp.task('images', function () {
  gulp.src('images/grid/*')
    .pipe(imageResize({ 
      height : 300,
      upscale : false,
      imageMagick: true,
      quality: 1
    }))
    .pipe(gulp.dest('dist/img/grid/'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [].concat(normalize, neat)
        }))
        .pipe(gulp.dest('dist/css/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'browserify']);
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('browserify', function () {
  return browserify({entries: ['js/base.js'], debug: true})
    .bundle()
    .pipe(source('all.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('dist/js/'));
});

// Default Task
gulp.task('default', ['lint', 'sass', 'browserify', 'watch']);
