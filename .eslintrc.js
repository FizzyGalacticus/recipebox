module.exports = {
	"extends":"google",
	"parserOptions": {
		"esversion": 6,
		"ecmaVersion": 2017,
		"sourceType":"module"
	},
	"rules":{
		"indent": [2, "tab" , {"MemberExpression":"off"}],
		"no-tabs": 0,
		"ignoreComments": 0,
		"no-console": 1,
		"curly": [2, "multi-or-nest"],
		"no-trailing-spaces": ["error", {"skipBlankLines":true}],
		"brace-style": [2, "stroustrup", { "allowSingleLine": true }],
		"max-len": [1, {"code":120}],
		"new-cap": [1, {"properties":false}],
		"require-jsdoc": ["error", {
			"require": {
				"FunctionDeclaration": false,
				"MethodDefinition": false,
				"ClassDeclaration": false,
				"ArrowFunctionExpression": false
			},
		}],
		"keyword-spacing": [2, {"overrides": {
			"if": {"after": false},
			"for": {"after": false},
			"while": {"after": false},
			"catch": {"after": false}
		}}]
	},
}