'use strict';


const 	gulp		= require('gulp'),
		browserSync = require("browser-sync"),
		reload		= browserSync.reload;

module.exports = (options) => {
	let config = options.config;
	return () => { 
		return gulp
			.src([config.path.src.fonts])
			.pipe(gulp.dest(config.path.dist.fonts))
			.pipe(reload({stream: true}));
	};
};