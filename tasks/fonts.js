'use strict';

const {config, gulp, browserSync} = $;

module.exports = (options) => {
	return () => { 
		return gulp
			.src([config.path.src.fonts])
			.pipe(gulp.dest(config.path.dist.fonts))
			.on('end',browserSync.reload);
	};
};