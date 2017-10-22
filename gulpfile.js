var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    pump = require('pump'), // pass errors in the piped streams via callbacks
    uglify = require('gulp-uglify');

var jsDest = 'dist/';

gulp.task('clean', function(cb) {
  pump([
    gulp.src(jsDest),
    clean()
    ],
    cb
  );
});

gulp.task('src-minify', ['clean'], function(cb) {
  pump([
      gulp.src(['lib/cssobj.umd.js', 'js/viewport-detection.js']),
      concat('temp.js'),
      uglify(),
      gulp.dest(jsDest)
    ],
    cb
  );
});

gulp.task('concat-minify', ['src-minify'], function(cb) {
  pump([
    gulp.src(['lib/minified.js', 'dist/temp.js']),
    concat('bundle.js'),
    gulp.dest(jsDest),
    connect.reload()
  ],
    cb
  );
});

gulp.task('webserver', ['concat-minify'], function() {
  connect.server({
    root: './',
    livereload: true
  });
});


gulp.task('html', function(cb){
  pump([
    gulp.src('./*.html'),
    connect.reload()
    ],
    cb
  );
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['concat-minify']);
    gulp.watch(['./*.html'], ['html']);
})
 
gulp.task('default', ['src-minify','concat-minify', 'watch','webserver']);