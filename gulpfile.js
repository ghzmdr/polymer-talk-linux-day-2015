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
        COMPONENTS_ENTRY: 'components/components.html',
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

gulp.task('build:html:index', function () {
    gulp.src('index.html')
        .pipe(gulp.dest(CFG.BUILD_DEST))
        .pipe(sync.reload({stream: true, once: true}))
})

gulp.task('build:html:components', function () {
    gulp.src('components/components.html')
        .pipe(vulcanize({
                stripComments: true,
                inlineCss: true,
                inlineScripts: true
            }))
        .pipe(gulp.dest(CFG.BUILD_DEST))
        .pipe(sync.reload({stream: true, once: true}))
})

gulp.task('build:js', function () {
    var b = browserify({
        entries: CFG.JS.ENTRY,
        debug: true
    }).on('error', gutil.log)

    return b.bundle()
        .on('error', function (err) {
            console.log(err.toString())
            this.emit("end")
        })
        .pipe(source(CFG.JS.NAME))
        .pipe(gulp.dest(CFG.BUILD_DEST))
        .pipe(sync.reload({stream: true, once: true}))
})

gulp.task('build:deps', function () {
    gulp.src('./bower_components/**/*')
        .pipe(gulp.dest(CFG.BUILD_DEST + '/libs'))
})

gulp.task('build', ['build:deps', 'build:html:index', 'build:images', 'build:html:components', 'build:js', 'build:sass'], function () {
})

gulp.task('serve', ['build'], function () {
    
    sync.init({
        server: CFG.BUILD_DEST
    })
    

    gulp.watch('index.html', ['build:html:index'])
    gulp.watch(['components/**/*.html', 'components/**/*.css', 'components/**/*.js'], ['build:html:components'])

    gulp.watch('scripts/**/*.js', ['build:js'])
    gulp.watch('styles/**/*.scss', ['build:sass'])    
})
