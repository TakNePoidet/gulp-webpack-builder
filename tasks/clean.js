'use strict'

const { config } = $

module.exports = () => {
	return () => {
		return $.del(config.path.dist.main)
	}
}
