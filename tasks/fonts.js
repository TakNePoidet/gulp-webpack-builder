'use strict'

const { config, gulp, browserSync, gp } = $

module.exports = options => {
	return () => {
		return gulp
			.src([config.path.src.fonts])
			.pipe(gp.plumber())
			.pipe(gp.filter(['**', '!**/README.md'], { restore: true }))
			.pipe(gulp.dest(config.path.dist.fonts))
			.on('end', browserSync.reload)
	}
}
