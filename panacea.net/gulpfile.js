/* global require */
var srcPath = './src/';
var devPath = './public/';
var prodPath = './dist/';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var environments = require('gulp-environments');
var url = require('url');
var proxy = require('proxy-middleware');

// environments setup
var development = environments.development;
var production = environments.production;
/** load config file based on enviroment */
var configFile = production() ? "./src/env/prod.js" : "./src/env/dev.js";


gulp.task('lint', function () {
    return gulp.src('./src/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['copy'], function () {
    return gulp.src([
        srcPath + 'assets/**/*.js',
        './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        './bower_components/angular/angular.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/angular-route/angular-route.js',
        './bower_components/angular-messages/angular-messages.js',
        './bower_components/angular-bootstrap/ui-bootstrap.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        './bower_components/angular-sanitize/angular-sanitize.min.js',                      // added by Pavel.
        './bower_components/angular-ui-grid/ui-grid.min.js',                                // added by Pavel.
        './bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',   // added by Pavel.
        './bower_components/angular-growl-v2/build/angular-growl.min.js',                   // added by Pavel.
        './bower_components/ng-tags-input/ng-tags-input.min.js',                   // added by Pavel.
        './bower_components/angular-ui-select/dist/select.min.js',                   // added by Pavel.
        './bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js',                   // added by Pavel.
        './bower_components/angular-validation/dist/angular-validation.min.js',                   // added by Pavel.
        './bower_components/angular-validation/dist/angular-validation-rule.min.js',                   // added by Pavel.
        './bower_components/bootstrap-toggle/js/bootstrap-toggle.min.js',                   // added by Pavel.
        './bower_components/angularjs-dropdown-multiselect/dist/angularjs-dropdown-multiselect.min.js',                   // added by Pavel.
        './bower_components/lodash/dist/lodash.js',
        './bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
        configFile
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/assets/js/'));
});

gulp.task('scripts-prod', function () {
    return gulp.src([
        './src/assets/**/*.js',
        './bower/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        configFile
    ])
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(prodPath + 'assets/js/'));
});


gulp.task('copy-fonts', function () {
    gulp.src(['./src/assets/fonts/**/*'])
        .pipe(gulp.dest('./public/assets/fonts/'));
});

gulp.task('copy', ['copy-app'], function () {

    gulp.src(['./src/**/*.{html,jpg,gif,png}'])
        .pipe(gulp.dest(devPath));
    //.pipe(browserSync.stream());
    //gulp.src('./src/**/*.{html,jpg,gif,png}', {base: 'src'})
    //        .pipe(gulp.dest(devPath))
    //        .pipe(browserSync.stream());
});

gulp.task('copy-app', function () {
    gulp.src([srcPath + 'app/**/*.{html,js}'])
        .pipe(gulp.dest(devPath + '/app'))
        .pipe(browserSync.stream());
});

// conat all css libraries into one file
gulp.task('css-lib', function () {
    return gulp.src([
        './src/assets/css/*.css',
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/angular-bootstrap/ui-bootstrap-csp.css',
        './bower_components/angular-ui-grid/ui-grid.min.css',
        './bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
        './bower_components/angular-ui-select/dist/select.min.css',
        './bower_components/angular-ui-select/dist/select2.css',
        './bower_components/ng-tags-input/ng-tags-input.min.css',
        './bower_components/ng-tags-input/ng-tags-input.bootstrap.min.css',
        './bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.css',
        './bower_components/bootstrap-toggle/js/bootstrap-toggle.min.css',
        'http://ui-grid.info/release/ui-grid-unstable.css'
    ])
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('scss', function () {
    return gulp
        .src([srcPath + 'assets/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(devPath + 'assets/css/'))
        .pipe(browserSync.stream());
});


gulp.task('build', ['lint', 'css-lib', 'scss', 'copy-fonts', 'scripts']);

gulp.task('browser-sync', ['build'], function () {
    var proxyOptions = url.parse('http://localhost:3000/api');
    proxyOptions.route = '/api';

    browserSync.init({
        server: {
            open: true,
            port: 3001,
            baseDir: "./public",
            middleware: [proxy(proxyOptions)]
        },
        browser: "chrome"
    });
});


gulp.task('default', ['browser-sync'], function () {
    gulp.watch(["./src/**/*.{html,css}"], ["css-lib", "copy"]);
    gulp.watch([srcPath + "**/*.scss", srcPath + "app/**/*.scss"], ["scss"]);
    gulp.watch("./src/**/*.js", ["scripts"]);
    gulp.watch("./public/**/*").on('change', browserSync.reload);
});


// TODO: add dist tasks
// process JS files and return the stream.
// gulp.task('js-dist', function () {
//     return gulp.src('js/*js')
//         .pipe(browserify())
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });


gulp.task('deploy', ['js-dist']);