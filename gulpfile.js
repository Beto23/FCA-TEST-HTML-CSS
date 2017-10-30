const gulp          = require('gulp');
const pug           = require('gulp-pug');
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const browserSync   = require('browser-sync').create();

// Compile Sass & Inject Into Browser
gulp.task('sass', function(){
    return gulp.src('./src/app.scss')
        .pipe(sass({
            outputStyle: 'expended',
            sourceComments: true
        }))
        .pipe(autoprefixer({
            versions: ['last 2 browsers']
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());        
});

// Compile pug
gulp.task('pug', function(){
    return gulp.src('src/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// handle Images
gulp.task('images', function(){
    return gulp.src(['src/assets/images/*.{png,jpg,jpeg,gif,svg}'])
        .pipe(gulp.dest('dist/images'))
});

// Watch & serve
gulp.task('serve', ['sass', 'pug', 'images'], function(){
    browserSync.init({
        server: "dist"
    });

    gulp.watch(['src/app.scss', 'src/components/**/*.scss'], ['sass']);
    gulp.watch(['src/**/*.pug'], ['pug']);
    gulp.watch(['src/index.pug']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['serve']);
