'use strict';


const 	gulp  			= require('gulp');


module.exports = (options) => {


	let config = options.config;
	return () => { 
		return gulp
			.src(config.path.src.files) 
			.pipe(gulp.dest(config.path.dist.html));
	};
};