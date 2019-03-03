'use strict'

const { gulp, config } = $

module.exports = () => {
	return () => {
		gulp.watch(config.path.watch.html, gulp.series(['html']))
		gulp.watch(config.path.watch.files, gulp.series(['files']))
		gulp.watch([config.path.watch.style], gulp.series(['style']))
		gulp.watch([config.path.watch.scripts], gulp.series(['scripts']))
		gulp.watch([config.path.watch.img], gulp.series(['images', 'sprite']))
		gulp.watch([config.path.watch.fonts], gulp.series(['fonts']))
	}
}
