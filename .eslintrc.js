module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'xo',
		'prettier'
	],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		'class-methods-use-this': 'off',
		'no-param-reassign': 'off',
		camelcase: 'off',
		'no-unused-vars': ['error', { argsIgnorePattern: 'next' }]
	},
};
