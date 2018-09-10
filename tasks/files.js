'use strict';

const {config, gulp, browserSync} = $;

module.exports = () => {
	return () => { 
		return gulp
			.src(config.path.src.files) 
			.pipe(gulp.dest(config.path.dist.html))
			.on('end',browserSync.reload);
	};
};