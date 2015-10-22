var gulp = require('gulp')
var gutil = require('gulp-util')

var sync = require('browser-sync')

var browserify = require('browserify')
var source = require('vinyl-source-stream')

var vulcanize = require('gulp-vulcanize')
var sass = require('gulp-sass')

var sourcemaps = require('gulp-sourcemaps')

var CFG = {

    JS: {
        ENTRY: 'scripts/app.js',
        NAME: 'app.js'
    },

    HTML: {
        INDEX: 'index.html',
        elements_ENTRY: 'elements/elements.html',
    },

    SASS: {
        ENTRY: 'styles/main.scss'
    },

    BUILD_DEST: './build'
}

gulp.task('build:images', function () {
    gulp.src('images/**/*')
        .pipe(gulp.dest('./build/images'))
        .pipe(sync.reload({stream: true, once: true}))
})

gulp.task('build:sass', function () {
    gulp.src(CFG.SASS.ENTRY)
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CFG.BUILD_DEST))
        .pipe(sync.stream())
})

gulp.task('build:html:static', function () {
    gulp.src('index.html')
        .pipe(gulp.dest(CFG.BUILD_DEST))
        .pipe(sync.reload({stream: true, once: true}))

    gulp.src('slides/**/*.html')
        .pipe(gulp.dest(CFG.BUILD_DEST + '/slides/'))
        .pipe(sync.reload({stream: true, once: true}))
})

gulp.task('build:html:elements', function () {
    gulp.src('elements/elements.html')
        .pipe(vulcanize({
                stripComments: true,
                inlineCss: true,
                inlineScripts: true
            }).on('error', function (a,s,d) {console.log(a,s,d)}))
        .pipe(gulp.dest(CFG.BUILD_DEST))
        .pipe(sync.reload({stream: true, once: true}))
})

gulp.task('build:js', function () {    
})

gulp.task('build:deps', function () {
    gulp.src('scripts/dependencies.html')
        .pipe(vulcanize({
                stripComments: true,
                inlineCss: true,
                inlineScripts: true
            }))
        .pipe(gulp.dest(CFG.BUILD_DEST))
        .pipe(sync.reload({stream: true, once: true}))
})

gulp.task('build', ['build:deps', 'build:html:static', 'build:images', 'build:html:elements', 'build:js', 'build:sass'], function () {
})

gulp.task('serve', ['build'], function () {
    
    sync.init({
        server: CFG.BUILD_DEST
    })

    gulp.watch('index.html', ['build:html:static'])
    gulp.watch('slides/**/*.html', ['build:html:static'])
    gulp.watch(['elements/**/*.html', 'elements/**/*.css', 'elements/**/*.js'], ['build:html:elements'])

    gulp.watch('scripts/**/*.js', ['build:js'])
    gulp.watch('styles/**/*.scss', ['build:sass'])
    gulp.watch('scripts/dependencies.html', ['build:deps'])
})
