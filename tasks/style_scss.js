'use strict';


const 	gulp  		= require('gulp'),
		plumber		= require('gulp-plumber'),
		prefixer	= require('gulp-autoprefixer'),
		sass		= require('gulp-sass'),
		cleanCSS 	= require('gulp-clean-css'),
		sourcemaps	= require('gulp-sourcemaps'),
		notify		= require("gulp-notify"),
		rename		= require("gulp-rename"),
		gulpIf 		= require('gulp-if'),
		browserSync = require("browser-sync"),
		reload		= browserSync.reload;


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = (options) => {
	let config = options.config;
	return () => { 
		return gulp
			.src(config.path.src.scss)
			.pipe(plumber())
			.pipe(gulpIf(isDevelopment, sourcemaps.init()))
			.pipe(
				sass({outputStyle: 'expanded'}).on( 'error', notify.onError({
					message: "<%= error.message %>",
					title  : "Sass Error!"
				}))
			)
			.pipe(prefixer({
				browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']
			}))
			.pipe(gulpIf(!isDevelopment, cleanCSS()))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulpIf(isDevelopment, sourcemaps.write('./')))
			.pipe(gulp.dest(config.path.dist.style))
			.pipe(reload({stream: true}));
	};
};