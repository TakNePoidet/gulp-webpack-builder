'use strict';

const 	{config, browserSync} = $;

module.exports = () => {
	return () => { 
		browserSync(config.browserSync); 
	};
};