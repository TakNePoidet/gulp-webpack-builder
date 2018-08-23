'use strict';


const 	gulp  		= require('gulp'),
		plumber		= require('gulp-plumber'),
		browserSync = require("browser-sync"),
		reload		= browserSync.reload;


module.exports = (options) => {
	let config = options.config;
	return () => { 
		browserSync(config.browserSync); 
	};
};