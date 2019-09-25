'use strict'

const { config, gulp, browserSync, gp } = $,
	isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'

const autoprefixer = require('autoprefixer'),
	mqpacker = require('css-mqpacker'),
	cssnano = require('cssnano')

module.exports = () => {
	return () => {
		return (
			gulp
				.src(config.path.src.scss)
				.pipe(gp.plumber())
				.pipe(gp.filter(['**/.*', '**', '!**/README.md'], { restore: true }))
				.pipe(gp.if(isDevelopment, gp.sourcemaps.init()))
				.pipe(
					gp.sass({ outputStyle: 'expanded', includePaths: ['node_modules/'] }).on(
						'error',
						gp.notify.onError({
							message: '<%= error.message %>',
							title: 'Sass Error!'
						})
					)
				)
				.pipe(
					gp.postcss([
						autoprefixer(),
						mqpacker(),
						cssnano({
							preset: [
								'default',
								{
									discardComments: {
										removeAll: true
									}
								}
							]
						})
					])
				)
				// .pipe(gp.rename({suffix: '.min'}))
				.pipe(gp.if(isDevelopment, gp.sourcemaps.write('./')))
				.pipe(gulp.dest(config.path.dist.style))
				.pipe(
					browserSync.reload({
						stream: true
					})
				)
		)
	}
}
