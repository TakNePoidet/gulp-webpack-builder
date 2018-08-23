'use strict';


const 	gulp  		= require('gulp'),
		plumber		= require('gulp-plumber'),
		prefixer	= require('gulp-autoprefixer'),
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
			.src(config.path.src.css)
			.pipe(plumber())
			.pipe(gulpIf(isDevelopment, sourcemaps.init()))
			.pipe(prefixer(['last 15 versions']))
			.pipe(gulpIf(!isDevelopment, cleanCSS()))
			.pipe(gulpIf(isDevelopment, sourcemaps.write('./')))
			.pipe(gulp.dest(config.path.dist.style))
			.pipe(reload({stream: true}));
	};
};