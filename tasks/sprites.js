'use strict'

const { config, gulp, browserSync, gp } = $

module.exports = () => {
	return () => {
		return (
			gulp
				.src(config.path.src.img + '/**.svg') //Выберем наши картинки
				.pipe(gp.filter(['**', '!**/README.md'], { restore: true }))
				.pipe(
					gp.svgmin({
						js2svg: {
							pretty: true
						}
					})
				)
				// remove all fill and style declarations in out shapes
				.pipe(
					gp.cheerio({
						run: function($) {
							$('[fill]').removeAttr('fill')
							$('[style]').removeAttr('style')
						},
						parserOptions: { xmlMode: true }
					})
				)
				// cheerio plugin create unnecessary string '>', so replace it.
				.pipe(gp.replace('&gt;', '>'))
				// build svg sprite
				.pipe(
					gp.svgSprites({
						mode: 'symbols',
						preview: false,
						selector: 'icon-%f',
						svg: {
							symbols: 'symbol-sprite.svg'
						}
					})
				)
				.pipe(gulp.dest(config.path.dist.img))
				.pipe(
					browserSync.reload({
						stream: true
					})
				)
		)
	}
}
