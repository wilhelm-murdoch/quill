var   gulp   = require('gulp')
    , ngmin  = require('gulp-ngmin')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , less   = require('gulp-less')
    , rename = require('gulp-rename')
    , path   = require('path')

var files = {
  js: [
      'static/.bower/moment/moment.js'
    , 'static/.bower/underscore/underscore.js'
    , 'static/.bower/angular/angular.js'
    , 'static/.bower/angular-animate/angular-animate.js'
    , 'static/.bower/angular-route/angular-route.js'
    , 'static/.bower/angular-resource/angular-resource.js'
    , 'static/.bower/angular-sanitize/angular-sanitize.js'
    , 'static/js/app.js'
  ],
  less: [
    'static/less/screen.less'
  ],
  css: [
      'static/css/screen.css'
    , 'static/.bower/font-awesome/css/font-awesome.min.css'
    , 'static/.bower/normalize-css/normalize.css'
  ],
  fonts: [
      'static/.bower/font-awesome/fonts/fontawesome-webfont.eot'
    , 'static/.bower/font-awesome/fonts/fontawesome-webfont.svg'
    , 'static/.bower/font-awesome/fonts/fontawesome-webfont.ttf'
    , 'static/.bower/font-awesome/fonts/fontawesome-webfont.woff'
  ]
}

gulp.task('js', function() {
  gulp.src(files.js)
    .pipe(concat('app.min.js'))
    .pipe(ngmin())
    .pipe(gulp.dest('static/js'))
})

gulp.task('less', function() {
  gulp.src(files.less)
    .pipe(less())
    .pipe(rename('screen.css'))
    .pipe(gulp.dest('static/css'))

  gulp.src(files.css)
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('static/css'))
})

gulp.task('fonts', function() {
  gulp.src(files.fonts)
    .pipe(gulp.dest('static/fonts'))
})

gulp.task('watch', function() {
  gulp.watch(files.js, ['js', 'less'])
})

gulp.task('default', ['js', 'less', 'fonts'])