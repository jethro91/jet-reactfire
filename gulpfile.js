var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var debug = require('gulp-debug');
var minifyhtml = require('gulp-minify-html');
var inlinesource = require('gulp-inline-source');
var zopfli = require("gulp-zopfli");
var strip = require('gulp-strip-comments');


var fontsSrc = [
  'bower_components/bootstrap/dist/fonts/**/*.*',
  'bower_components/font-awesome/fonts/**/*.*',
];

var imgSrc = ['app/img/**/**/*.*'];

var bowerCssSrc = [
  'bower_components/bootstrap/dist/css/bootstrap.css',
  'bower_components/bootstrap/dist/css/bootstrap-theme.css',
  'bower_components/font-awesome/css/font-awesome.css'
];

var appCssSrc = ['app/**/**/**/*.css'];

var bowerJsSrc = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/bootstrap/dist/js/bootstrap.js',
  'bower_components/lodash/lodash.js',
  'bower_components/moment/moment.js',
  'bower_components/moment/locale/id.js',
  'bower_components/numeral/numeral.js',
  'bower_components/firebase/firebase-debug.js',
  'bower_components/react/react.js',
  'bower_components/react/react-dom.js',
  'bower_components/react-router/build/umd/ReactRouter.js',
  'bower_components/reactfire/dist/reactfire.js'

];

var appJsxSrc = ['app/0global/**/*.jsx', 'app/components/**/**/**/*.jsx', 'app/startup/**/*.jsx'];

function onError(err) {
  gutil.log(gutil.colors.red('Error:'), gutil.colors.red(err.message));
  this.end();
}

// fontSrc
gulp.task('fontBuild', function() {
  return gulp.src(fontsSrc)
    .pipe(gulp.dest('build/fonts'))
    .on('error', onError);
});

gulp.task('fontDeploy', function() {
  return gulp.src(fontsSrc)
    .pipe(gulp.dest('dist/fonts'))
    .on('error', onError);
});

// imgSrc
gulp.task('imgBuild', function() {
  return gulp.src(imgSrc)
    .pipe(gulp.dest('build/img'))
    .on('error', onError);
});
gulp.task('imgDeploy', function() {
  return gulp.src(imgSrc)
    .pipe(gulp.dest('dist/img'))
    .on('error', onError);
});


// bowerCssSrc
gulp.task('cssPluginBuild', function() {
  return gulp.src(bowerCssSrc)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(concat('plugin.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload())
    .on('error', onError);
});
gulp.task('cssPluginDeploy', function() {
  return gulp.src(bowerCssSrc)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(concat('plugin.min.css'))
    .pipe(gulp.dest('dist/css'))
    .on('error', onError);
});

// appCssSrc
gulp.task('cssAppBuild', function() {
  return gulp.src(appCssSrc)
    .pipe(debug({
      title: 'build-cssApp:'
    }))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload())
    .on('error', onError);
});
gulp.task('cssAppDeploy', function() {
  return gulp.src(appCssSrc)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/css'))
    .on('error', onError);
});

// bowerJsSrc
gulp.task('jsPluginBuild', function() {
  return gulp.src(bowerJsSrc)
    .pipe(concat('plugin.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .on('error', onError);
});

gulp.task('jsPluginDeploy', function() {
  return gulp.src(bowerJsSrc)
    .pipe(concat('plugin.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .on('error', onError);
});

// appJsxSrc
gulp.task('jsxAppBuild', function() {
  return gulp.src(appJsxSrc)
    .pipe(debug({
      title: 'buildJsxBuild:'
    }))
    .pipe(react())
    .on('error', onError)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build/js'))
    .on('error', onError)
    .pipe(connect.reload())
    .on('error', onError);
});
gulp.task('jsxAppDeploy', function() {
  return gulp.src(appJsxSrc)
    .pipe(react())
    .on('error', onError)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .on('error', onError)
    .pipe(gulp.dest('dist/js'))
    .on('error', onError)
});

// index.html
gulp.task('indexBuild', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('build'))
    .pipe(connect.reload())
    .on('error', onError);
});
gulp.task('indexDeploy', function() {
  return gulp.src('app/index.html')
    .pipe(inlinesource({
      compress: true
    }))
    .pipe(minifyhtml())
    // .pipe(zopfli())
    .pipe(gulp.dest('dist'))
    .on('error', onError);
});

gulp.task('watchHtml', function() {
  gulp.watch(['app/index.html'], ['indexBuild']);
});
gulp.task('watchCss', function() {
  gulp.watch(['app/**/*.css'], ['cssAppBuild']);
});
gulp.task('watchJsx', function() {
  gulp.watch(['app/**/**/**/**/*.jsx'], ['jsxAppBuild']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
    port: 3000
  });
});

gulp.task('default', [
  'fontBuild',
  'imgBuild',
  'cssPluginBuild',
  'cssAppBuild',
  'jsPluginBuild',
  'indexBuild',
  'jsxAppBuild',
  'watchHtml',
  'watchCss',
  'watchJsx',
  'connect'
]);

gulp.task('dist', [
  'fontDeploy',
  'imgDeploy',
  'cssPluginDeploy',
  'cssAppDeploy',
  'jsPluginDeploy',
  'indexDeploy',
  'jsxAppDeploy',
]);
