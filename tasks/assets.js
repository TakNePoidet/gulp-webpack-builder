'use strict';


const 	gulp  			= require('gulp'),
		plumber			= require('gulp-plumber'),
		rename			= require("gulp-rename"),
		fileinclude 	= require('gulp-file-include'),
		njkRender 		= require('gulp-nunjucks-render'),
		htmlbeautify 	= require('gulp-html-beautify'),
		browserSync 	= require("browser-sync"),
		reload			= browserSync.reload;


module.exports = (options) => {
	let config = options.config;
	return () => { 
		return gulp
			.src([config.path.src.html]) 
			.pipe(plumber())
			.pipe(fileinclude({
				prefix: '@@',
				basepath: config.path.src.template
			}))
			// .pipe(njkRender({
			// 	envOptions: {
			// 		tags: {
			// 			blockStart: '<%',
			// 			blockEnd: '%>',
			// 			variableStart: '<$',
			// 			variableEnd: '$>',
			// 			commentStart: '<#',
			// 			commentEnd: '#>'
			// 		}
			// 	}
			// }))
			.pipe(htmlbeautify({
				"indent_size": 1,
				"indent_char": "	",
			}))
			// .pipe(rename({ extname: '.php' }))
			.pipe(gulp.dest(config.path.dist.html))
			.pipe(reload({stream: true}));
	};
};