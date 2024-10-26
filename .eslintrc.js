export default {
    env: {
        node: true,        // Enable Node.js global variables
        es2021: true       // Use ECMAScript 2021 syntax
    },
    extends: [
        "eslint:recommended",   // Use ESLint's recommended rules
        "plugin:import/errors", // Import plugin for handling import/export issues
        "plugin:import/warnings",
        "plugin:graphql/recommended" // Add GraphQL plugin for linting GraphQL syntax
    ],
    parserOptions: {
        ecmaVersion: 12,        // Use ECMAScript 2021
        sourceType: "module"    // Enable ES Modules (import/export syntax)
    },
    plugins: [
        "import",                // Add the import plugin to manage import/export syntax
        "graphql"                // Add GraphQL plugin to handle GraphQL queries/mutations
    ],
    rules: {
        "no-console": "off", // Allow console.log statements (useful for debugging)
        "quotes": ["error", "single"], // Enforce single quotes
        "semi": ["error", "always"],  // Enforce semicolons
        "import/no-unresolved": "error", // Ensure imports point to files/modules that exist
        "import/order": ["error", {  // Enforce a specific order for imports
        "groups": ["builtin", "external", "internal"]
        }],
        "graphql/template-strings": [
        "error",
        {
            "env": "literal" // Lint template strings used in literal syntax
        }
        ]
    },
    settings: {
        "import/resolver": {
        node: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".graphql"]
        }
        }
    }
};
