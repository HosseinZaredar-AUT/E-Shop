const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    linceec = require('gulp-line-ending-corrector');

const css = () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('.'))
        .pipe(linceec())
        .pipe(gulp.dest("src/css"))
};

// Compile Sass & Inject Into Browser
gulp.task('sass', () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
    ])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

gulp.task('images', () => {
    return gulp.src(['src/images/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('images'))
});

// Watch sass & Server
gulp.task('serve', gulp.series('sass', function () {
    browserSync.init({
        open: 'external',
        server: "./src",
        port: 8080
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], css);
    gulp.watch(["src/**/*.html"]).on('change', browserSync.reload);
}));

// Move Fonts Folder to src/fonts
gulp.task('fonts', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("src/fonts"));
});

// Move Fonts Awesome Css to src/css
gulp.task('fa', () => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("src/css"));
});

gulp.task('default', gulp.series('js', 'images', 'fa', 'fonts', 'serve'));
