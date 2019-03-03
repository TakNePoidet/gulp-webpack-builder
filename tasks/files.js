'use strict'

const { config, gulp, browserSync, gp } = $

module.exports = () => {
	return () => {
		return gulp
			.src(config.path.src.files)
			.pipe(gp.plumber())
			.pipe(gp.filter(['**/.*', '**', '!**/README.md'], { restore: true }))
			.pipe(gulp.dest(config.path.dist.html))
			.on('end', browserSync.reload)
	}
}
