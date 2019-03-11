'use strict'

const { config, gulp, browserSync, gp } = $
let isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'

const version = () => {
	return isDevelopment ? (new Date().getTime() / 1000).toString() : config.version
}

module.exports = () => {
	return () => {
		return gulp
			.src([config.path.dist.html + '*.html'])
			.pipe(gp.plumber())
			.pipe(gp.filter(['**/.*', '**', '!**/README.md'], { restore: true }))
			.pipe(gp.inlineCss())
			.pipe(
				gp.htmlBeautify({
					indent_size: 1,
					indent_char: '	'
				})
			)
			.pipe(gulp.dest(config.path.dist.html + "email-html/"))
			.on('end', browserSync.reload)
	}
}
