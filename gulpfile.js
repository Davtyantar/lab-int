import gulp from 'gulp';
import { deleteAsync } from 'del';
import fileInclude from 'gulp-file-include';
import typograf from 'gulp-typograf';
import gulpRemoveHtmlComments from 'gulp-remove-html-comments';
import htmlBeautify from 'gulp-html-beautify';
import sassGlob from 'gulp-sass-glob';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import cleanCss from 'gulp-clean-css';
import webpack from 'webpack-stream';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import svgSprite from 'gulp-svg-sprite';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);

const buildFolder = './build';
const srcFolder = './src';

const isDev = !process.argv.includes('--build');
const isBuild = process.argv.includes('--build');

const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        img: `${buildFolder}/img/`,
        resources: `${buildFolder}/`,
    },
    src: {
        html: `${srcFolder}/html/pages/*.html`,
        scss: `${srcFolder}/scss/style.scss`,
        js: `${srcFolder}/js/**/*.js`,
        img: [`${srcFolder}/img/**/*.{png,jpeg,jpg,svg,gif}`, `!${srcFolder}/img/sprites/*.svg`],
        sprite: `${srcFolder}/img/sprites/*.svg`,
        resources: `${srcFolder}/resources/**/*.*`,
    },
    watch: {
        html: `${srcFolder}/**/*.html`,
        scss: `${srcFolder}/scss/**/*.scss`,
        js: `${srcFolder}/js/**/*.js`,
        img: [`${srcFolder}/img/**/*.{png,jpeg,jpg,svg,gif}`, `!${srcFolder}/img/sprites/*.svg`],
        sprite: `${srcFolder}/img/sprites/*.svg`,
        resources: `${srcFolder}/resources/**/*.*`,
    },
    reset: buildFolder,
};

const reset = async () => {
    await deleteAsync(buildFolder);
};

const html = () => {
    return gulp
        .src(path.src.html)
        .pipe(plumber({ errorHandler: notify.onError({ title: 'HTML Error!' }) }))
        .pipe(
            fileInclude({
                prefix: '@',
            })
        )
        .pipe(gulpRemoveHtmlComments())
        .pipe(htmlBeautify())
        .pipe(
            typograf({
                locale: ['ru', 'en-US'],
            })
        )
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
};

const scss = () => {
    return gulp
        .src(path.src.scss, { sourcemaps: isDev })
        .pipe(plumber({ errorHandler: notify.onError({ title: 'SCSS Error!' }) }))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError)) // Log SASS errors correctly
        .pipe(gulpIf(isBuild, groupCssMediaQueries()))
        .pipe(gulpIf(isBuild, autoPrefixer()))
        .pipe(gulpIf(isBuild, cleanCss()))
        .pipe(gulp.dest(path.build.css, { sourcemaps: isDev }))
        .pipe(browserSync.stream());
};

const js = () => {
    return gulp
        .src(path.src.js, { sourcemaps: isDev })
        .pipe(plumber({ errorHandler: notify.onError({ title: 'JS Error!' }) }))
        .pipe(
            webpack({
                mode: isDev ? 'development' : 'production',
                output: {
                    filename: 'build.js',
                },
                module: {
                    rules: [
                        {
                            test: /\.css$/,
                            use: ['style-loader', 'css-loader'],
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest(path.build.js, { sourcemaps: isDev }))
        .pipe(browserSync.stream());
};

const img = () => {
    return gulp
        .src(path.src.img)
        .pipe(newer(path.build.img))
        .pipe(
            gulpIf(
                isBuild,
                imagemin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3,
                })
            )
        )
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.stream());
};

const sprite = () => {
    return gulp
        .src(path.src.sprite)
        .pipe(
            svgSprite({
                shape: {
                    dimension: {
                        maxWidth: 500,
                        maxHeight: 500,
                    },
                    spacing: {
                        padding: 0,
                    },
                    transform: [
                        {
                            svgo: {
                                plugins: [{ removeViewBox: false }, { removeUnusedNS: false }, { removeUselessStrokeAndFill: true }, { cleanupIDs: false }, { removeComments: true }, { removeEmptyAttrs: true }, { removeEmptyText: true }, { collapseGroups: true }, { removeAttrs: { attrs: '(fill|stroke|style)' } }],
                            },
                        },
                    ],
                },
                mode: {
                    symbol: {
                        dest: '.',
                        sprite: 'sprite.svg',
                    },
                },
            })
        )
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.stream());
};

const resources = () => {
    return gulp.src(path.src.resources).pipe(gulp.dest(path.build.resources)).pipe(browserSync.stream());
};

const watcher = (done) => {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, img);
    gulp.watch(path.watch.sprite, sprite);
    gulp.watch(path.watch.resources, resources);
    done();
};

const server = (done) => {
    browserSync.init({
        port: 5000,
        server: {
            baseDir: buildFolder,
            index: 'index.html',
        },
        notify: false,
        open: false,
    }, () => {
        done();
    });
};

// Development task
const dev = gulp.series(
    reset,
    gulp.parallel(html, scss, js, img, sprite, resources),
    gulp.parallel(watcher, server)
);

// Build task
const build = gulp.series(reset, gulp.parallel(html, scss, js, img, sprite, resources));

// Register tasks
gulp.task('default', dev);
gulp.task('build', build);
gulp.task('start', server);
