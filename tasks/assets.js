'use strict'

const { config, gulp, browserSync, gp } = $
let isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'

const version = () => {
	return isDevelopment ? (new Date().getTime() / 1000).toString() : config.version
}

module.exports = () => {
	return () => {
		return gulp
			.src(config.path.src.html)
			.pipe(gp.plumber())
			.pipe(gp.filter(['**/.*', '**', '!**/README.md'], { restore: true }))
			.pipe(
				gp.preprocess({
					context: { NODE_ENV: isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION' }
				})
			)
			.pipe(
				gp.fileInclude({
					prefix: '@@',
					basepath: config.path.src.template
				})
			)
			.pipe(
				gp.nunjucksRender({
					envOptions: {
						tags: {
							blockStart: '<%',
							blockEnd: '%>',
							variableStart: '<$',
							variableEnd: '$>',
							commentStart: '<#',
							commentEnd: '#>'
						}
					}
				})
			)
			.pipe(
				gp.htmlBeautify({
					indent_size: 1,
					indent_char: '	'
				})
			)
			.pipe(gp.replace(/\?v=@@version/gm, '?v=' + version()))
			.pipe(gulp.dest(config.path.dist.html))
			.on('end', browserSync.reload)
	}
}
