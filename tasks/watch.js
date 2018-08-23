'use strict';


const 	gulp		= require('gulp'),
		watch		= require('gulp-watch');

module.exports = (options) => {
	let config = options.config;
	return () => { 
		gulp.watch([config.path.watch.html, config.path.watch.php], gulp.series('html:build'));
		gulp.watch([config.path.watch.style], gulp.series('style:build'));
		gulp.watch([config.path.watch.img], gulp.series('image:build'));
		gulp.watch([config.path.watch.fonts], gulp.series('fonts:build'));
		gulp.watch([config.path.watch.js], gulp.series('js:build'));
	};
};