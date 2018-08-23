'use strict';


const 	gulp		= require('gulp'),
		plumber		= require('gulp-plumber'),
		imagemin	= require('gulp-imagemin'),
		pngquant	= require('imagemin-pngquant'),
		cache		= require('gulp-cache'),
		browserSync = require("browser-sync"),
		reload		= browserSync.reload;

module.exports = (options) => {
	let config = options.config;
	return () => { 
		return gulp
			.src(config.path.src.img) //Выберем наши картинки
			.pipe(cache(imagemin({ //Сожмем их
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()],
				interlaced: true
			})))
			.pipe(gulp.dest(config.path.dist.img))
			.pipe(reload({stream: true}));
	};
};