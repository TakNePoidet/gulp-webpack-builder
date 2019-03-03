const { config, gulp, browserSync, gp } = $,
	isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'

module.exports = () => {
	return () => {
		return gulp
			.src([config.path.src.js + 'not-webpack/**/*.js'])
			.pipe(gp.filter(['**/.*', '**', '!**/README.md'], { restore: true }))
			.pipe(gp.if(isDevelopment, gp.sourcemaps.init()))
			.pipe(
				gp.babel({
					presets: ['@babel/preset-env'],
					plugins: [
						"@babel/plugin-syntax-dynamic-import",
						"@babel/plugin-syntax-import-meta",
						"@babel/plugin-proposal-class-properties",
						"@babel/plugin-proposal-json-strings",
						"@babel/plugin-transform-async-to-generator"
					]
				})
			)
			.pipe(gp.if(isDevelopment, gp.sourcemaps.write('./')))
			.pipe(gulp.dest(config.path.dist.js))
			.pipe(
				browserSync.reload({
					stream: true
				})
			)
	}
}
