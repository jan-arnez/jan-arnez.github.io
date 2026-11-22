import { defineConfig } from "vite-plus";

/**
 * Vite+ is used for linting, formatting and type checking (`vp check`).
 * The site itself is built by Astro (`astro.config.ts`).
 */
export default defineConfig({
  fmt: {
    ignorePatterns: ["dist/**", ".astro/**", "pnpm-lock.yaml"],
    printWidth: 100,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    arrowParens: "always",
    endOfLine: "lf",
    sortImports: true,
    sortPackageJson: true,
    sortTailwindcss: {
      stylesheet: "./src/styles.css",
      functions: ["cn", "clsx"],
    },
  },

  lint: {
    ignorePatterns: ["dist/**", ".astro/**"],
    plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "jsx-a11y", "promise", "react"],
    categories: {
      correctness: "error",
      suspicious: "error",
      perf: "error",
      pedantic: "error",
    },
    env: {
      browser: true,
      es2024: true,
    },
    options: {
      typeAware: true,
      typeCheck: true,
      reportUnusedDisableDirectives: "error",
      denyWarnings: true,
    },
    rules: {
      // --- React ---
      "react/rules-of-hooks": "error",
      "react/exhaustive-deps": "error",
      "react/jsx-key": "error",
      "react/no-array-index-key": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": "error",
      "react/jsx-curly-brace-presence": "error",
      "react/no-danger": "error",
      "react/react-in-jsx-scope": "off",

      // --- Core correctness / safety ---
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "error",
      "no-debugger": "error",
      "no-alert": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-param-reassign": "error",
      "no-nested-ternary": "error",
      "no-else-return": ["error", { allowElseIf: false }],
      "no-useless-rename": "error",
      "no-useless-computed-key": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "prefer-object-spread": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "default-case-last": "error",
      "no-unneeded-ternary": "error",
      yoda: "error",

      // --- TypeScript ---
      "typescript/no-explicit-any": "error",
      "typescript/no-non-null-assertion": "error",
      "typescript/consistent-type-imports": "error",
      "typescript/consistent-type-definitions": ["error", "interface"],
      "typescript/array-type": ["error", { default: "array" }],
      // Too noisy for DOM/event-heavy UI code; `readonly` is enforced on data types instead.
      "typescript/prefer-readonly-parameter-types": "off",
      "typescript/prefer-nullish-coalescing": "error",
      "typescript/prefer-optional-chain": "error",
      "typescript/no-floating-promises": "error",
      "typescript/no-misused-promises": "error",
      "typescript/await-thenable": "error",
      "typescript/switch-exhaustiveness-check": "error",
      "typescript/strict-boolean-expressions": "error",
      "typescript/no-unnecessary-condition": "error",
      "typescript/no-unnecessary-type-assertion": "error",
      "typescript/restrict-template-expressions": "error",
      "typescript/no-unsafe-assignment": "error",
      "typescript/no-unsafe-call": "error",
      "typescript/no-unsafe-member-access": "error",
      "typescript/no-unsafe-return": "error",
      "typescript/no-unsafe-argument": "error",
      "typescript/only-throw-error": "error",
      "typescript/prefer-readonly": "error",
      "typescript/explicit-module-boundary-types": "off",

      // --- Imports ---
      "import/no-cycle": "error",
      "import/no-self-import": "error",
      "import/no-duplicates": "error",
      "import/first": "error",
      "import/no-default-export": "error",
      "import/no-mutable-exports": "error",
      "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
      "import/extensions": ["error", "always", { ignorePackages: true }],

      // --- Unicorn tweaks ---
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "unicorn/prefer-query-selector": "error",
      "unicorn/no-null": "off",
    },
    overrides: [
      {
        // Tooling configs must use default exports.
        files: ["vite.config.ts", "astro.config.ts", "src/content.config.ts"],
        rules: {
          "import/no-default-export": "off",
        },
      },
    ],
  },
});
