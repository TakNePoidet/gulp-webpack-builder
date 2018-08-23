'use strict';


const 	del = require('del');

module.exports = (options) => {
	let config = options.config;
	return () => { 
		return del(config.path.dist.main);
	};
};