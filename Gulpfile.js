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
    , 'static/.bower/angular-route/angular-route.js'
    , 'static/.bower/angular-resource/angular-resource.js'
    , 'static/.bower/angular-sanitize/angular-sanitize.js'
    , 'static/js/app.js'
  ],
  less: [
      'static/.bower/font-awesome/css/font-awesome.min.css'
    , 'static/.bower/normalize-css/normalize.css'
    , 'static/css/screen.less'
  ],
  fonts: [
      'static/.bower/font-awesome/fonts/fontawesome-webfont.eot'
    , 'static/.bower/font-awesome/fonts/fontawesome-webfont.svg'
    , 'static/.bower/font-awesome/fonts/fontawesome-webfont.ttf'
    , 'static/.bower/font-awesome/fonts/fontawesome-webfont.woff'
  ]
}

gulp.task('js', function() {
  return gulp.src(files.js)
    .pipe(concat('app.min.js'))
    .pipe(ngmin())
    .pipe(gulp.dest('static/js/'))
})

gulp.task('less', function() {
  return gulp.src(files.less)
    .pipe(less({
      paths: [path.join(__dirname, 'less')]
    }))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('static/css'));
})

gulp.task('fonts', function() {
  return gulp.src(files.fonts)
    .pipe(gulp.dest('static/fonts'))
})

gulp.task('watch', function() {
  gulp.watch(files.js, ['js', 'less'])
})

gulp.task('default', ['js', 'less', 'fonts'])