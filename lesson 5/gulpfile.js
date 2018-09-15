const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');


const config = {
	root: './src/',
	css: {
		src: 'precss/styles.less',
        dest: 'css',
        watch: 'precss/**/*.less',
    },
    html:{
        src:"*.html",
        dest:"html",
    }
};

gulp.task("css", function(){

    gulp.src(config.root + config.css.src)
        // .pipe(sourcemaps.init())
        .pipe(less())
        // //.pipe(concat('all.min.css'))
        .pipe(gcmq())
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        // .pipe(cleanCSS())
        // .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.root + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("watch", ['browser-sync'],function(){
    gulp.watch(config.root + config.css.watch, ["css"]);
    gulp.watch(config.root + config.html.src, browserSync.reload);
    gulp.watch("./smartgrid.js", ["grid"]);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: config.root
        }
    });
});


gulp.task('grid', function(){
    delete require.cache[require.resolve("./smartgrid.js")];

    const options = require("./smartgrid.js");
    smartgrid(config.root + 'precss', options);

});