module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
	// required to lint *.vue files
	plugins: ['vue', 'prettier'],
	// add your custom rules here
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		indent: [
			'error',
			'tab'
		],
		'vue/html-indent': [
			'error',
			'tab',
			{
				alignAttributesVertically: false
			}
		],
		'vue/max-attributes-per-line': [
			2,
			{
				singleline: 4,
				multiline: {
					max: 5,
					allowFirstLine: false
				}
			}
		],
	}
}
