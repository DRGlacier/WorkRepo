const gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imageMin = require('gulp-imagemin'),
    pngQuant = require('imagemin-pngquant'),
    autoPrefix = require('gulp-autoprefixer'),
    mozJpeg = require('imagemin-mozjpeg'),
    svgmin = require('gulp-svgmin')

//less compile
gulp.task('less', () =>
    gulp
        .src(['source/less/*.less', '!source/less/_**.less'])
        .pipe(less())
        .pipe(
            autoPrefix(['last 15 versions', 'ie 8', 'ie 7'], { cascade: true })
        )
        .pipe(gulp.dest('source/css'))
        .pipe(browserSync.reload({ stream: true }))
)

//browser sync
gulp.task('browser-sync', function() {
    browserSync({ server: { baseDir: 'source' }, notify: false })
})

//start less and browser sync
gulp.task('dev', ['browser-sync', 'less'], function() {
    gulp.watch('source/less/**/*.less', ['less'])
    gulp.watch('source/*.html', browserSync.reload)
    gulp.watch('source/js/*.js', browserSync.reload)
})

//css libs
gulp.task('libsCss', () =>
    gulp.src('source/libs/*.css').pipe(gulp.dest('build/libs'))
)

//js libs
gulp.task('libsJs', () =>
    gulp.src('source/libs/*.js').pipe(gulp.dest('build/libs'))
)

//image.jpg
gulp.task('jpg', () =>
    gulp
        .src('source/img/*.jpg')
        .pipe(imageMin([mozJpeg({ progressive: true, quality: 70 })]))
        .pipe(gulp.dest('build/img'))
)

// image.png
gulp.task('png', () =>
    gulp
        .src('source/img/**/*.png')
        .pipe(imageMin([pngQuant({ quality: 70 })]))
        .pipe(gulp.dest('build/img'))
)

//image.svg
gulp.task('svg', () =>
    gulp
        .src('source/img/*.svg')
        .pipe(
            svgmin({
                plugins: [
                    {
                        removeDoctype: false,
                    },
                    {
                        removeComments: false,
                    },
                    {
                        cleanupAttrs: true,
                    },
                    {
                        cleanupNumericValues: {
                            floatPrecision: 2,
                        },
                    },
                    {
                        convertColors: {
                            names2hex: false,
                            rgb2hex: false,
                        },
                    },
                ],
            })
        )
        .pipe(gulp.dest('build/img'))
)

gulp.task('gif', () =>
    gulp.src('source/img/*.gif').pipe(gulp.dest('build/img'))
)

//remove old folder before build
gulp.task('clean', () => del.sync('build'))

//fonts
gulp.task('fonts', () =>
    gulp.src('source/fonts/*').pipe(gulp.dest('build/fonts'))
)
gulp.task('html', () => gulp.src('source/*.html').pipe(gulp.dest('build')))
gulp.task('css', () =>
    gulp.src('source/css/*.css').pipe(gulp.dest('build/css'))
)
gulp.task('js', () => gulp.src('source/js/*.js').pipe(gulp.dest('build/js')))
gulp.task('php', () => gulp.src('source/*.php').pipe(gulp.dest('build/')))
//build project
gulp.task('build', [
    'clean',
    'jpg',
    'png',
    'svg',
    'less',
    'html',
    'css',
    'js',
    'fonts',
    'libsCss',
    'php',
    'gif',
    'libsJs',
])
