module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2022": true,
        "jest": true
    },
    "extends": ["eslint:recommended"],
    "parserOptions": {
    },
    "rules": {
        "indent": ["error", 4],
        "max-len": ["error", {
            "code": 120,
            "ignoreComments": true,
            "ignoreTrailingComments": true,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }],
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
};
