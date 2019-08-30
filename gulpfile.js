"use strict";

// Load plugins
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require('gulp-uglify-es').default;

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
    ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %>\n',
    ' */\n',
    '\n'
].join('');

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./dist"
        },
        port: 3000
    });
    done();
}

// BrowserSync reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean dist
function clean() {
    return del(["./dist/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
    // Bootstrap
    const bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
        .pipe(gulp.dest('./dist/vendor/bootstrap'));
    // Font Awesome CSS
    const fontAwesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
        .pipe(gulp.dest('./dist/vendor/fontawesome-free/css'));
    // Font Awesome Webfonts
    const fontAwesomeWebfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
        .pipe(gulp.dest('./dist/vendor/fontawesome-free/webfonts'));
    // AOS Animation
    const aos = gulp.src('./node_modules/aos/dist/**/*')
        .pipe(gulp.dest('./dist/vendor/aos'));
    // jQuery
    const jquery = gulp.src(['./node_modules/jquery/dist/*', '!./node_modules/jquery/dist/core.js'])
        .pipe(gulp.dest('./dist/vendor/jquery'));
    return merge(bootstrap, fontAwesomeCSS, fontAwesomeWebfonts, aos, jquery);
}

// PUG task
function pugToHtml() {
    return gulp
        .src("./templates/*.pug")
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'));
}

// Image minify
function imageminify() {
    return gulp
        .src(['./img/*', './img/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
}

// CSS task
function css() {
    return gulp
        .src(["./scss/**/*.scss", "./scss/*.scss"])
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded",
            includePaths: "./node_modules",
        }))
        .on("error", sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browsersync.stream());
}

// JS task
function js() {
    return gulp
        .src([
            './js/*.js',
            '!./js/*.min.js',
            '!./js/contact_me.js',
            '!./js/jqBootstrapValidation.js'
        ])
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch(["./scss/**/*", "./scss/*"], css, browserSyncReload);
    gulp.watch(["./img/*", "./img/*/*"], imageminify);
    gulp.watch(["./templates/*", './templates/**/*', './templates/**/**/*'], pugToHtml, browserSyncReload);
    gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js, browserSyncReload);
    gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(pugToHtml, css, js, imageminify));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.pugToHtml = pugToHtml;
exports.css = css;
exports.js = js;
exports.imageminify = imageminify;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;