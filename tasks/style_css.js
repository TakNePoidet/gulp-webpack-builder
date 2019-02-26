'use strict'

const { config, gulp, browserSync, gp } = $,
	isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'

module.exports = () => {
	return () => {
		return gulp
			.src(config.path.src.css)
			.pipe(gp.plumber())
			.pipe(gp.filter(['**', '!**/README.md'], { restore: true }))
			.pipe(gp.if(isDevelopment, gp.sourcemaps.init()))
			.pipe(
				gp.autoprefixer({
					browsers: [
						'> 1%',
						'last 2 versions',
						'firefox >= 4',
						'safari 7',
						'safari 8',
						'IE 8',
						'IE 9',
						'IE 10',
						'IE 11'
					]
				})
			)
			.pipe(gp.if(!isDevelopment, gp.cleanCss()))
			.pipe(gp.if(isDevelopment, gp.sourcemaps.write('./')))
			.pipe(gulp.dest(config.path.dist.style))
			.pipe(
				browserSync.reload({
					stream: true
				})
			)
	}
}
