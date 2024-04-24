/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

const coreRules = {
  'array-bracket-newline': [
    'error',
    {
      'minItems': 2,
    },
  ],
  'array-bracket-spacing': [
    'error',
    'never',
  ],
  'array-element-newline': [
    'error',
    'always',
  ],
  'arrow-spacing': 'error',
  'block-spacing': [
    'error',
    'always',
  ],
  'brace-style': [
    'error',
    '1tbs',
    {
      'allowSingleLine': true,
    },
  ],
  'comma-dangle': [
    'error',
    'always-multiline',
  ],
  'comma-spacing': [
    'error',
    {
      'before': false,
      'after': true,
    },
  ],
  'comma-style': [
    'error',
    'last',
  ],
  'computed-property-spacing': [
    'error',
    'never',
  ],
  'dot-location': [
    'error',
    'property',
  ],
  'dot-notation': 'error',
  'eol-last': [
    'error',
    'always',
  ],
  'eqeqeq': [
    'off',
    'always',
    {
      'null': 'ignore',
    },
  ],
  'func-call-spacing': [
    'error',
    'never',
  ],
  'key-spacing': [
    'error',
    {
      'mode': 'minimum',
    },
  ],
  'keyword-spacing': 'error',
  'linebreak-style': 'off',
  'max-len': 'off',
  'multiline-ternary': [
    'warn',
    'always-multiline',
  ],
  'no-caller': 'error',
  'no-class-assign': 'error',
  'no-cond-assign': 'error',
  'no-console': [
    process.env.NODE_ENV === 'production' ? 'error' : 'off',
    {
      'allow': [
        'warn',
        'error',
      ],
    },
  ],
  'no-control-regex': 'error',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'no-delete-var': 'error',
  'no-div-regex': 'error',
  'no-dupe-args': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-duplicate-imports': 'error',
  'no-empty': 'warn',
  'no-empty-character-class': 'warn',
  'no-empty-pattern': 'error',
  'no-eval': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-extra-parens': [
    'off',
    'functions',
  ],
  'no-floating-decimal': 'error',
  'no-func-assign': 'error',
  'no-global-assign': 'error',
  'no-implied-eval': 'error',
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': [
    'error',
    {
      'skipStrings': true,
      'skipComments': true,
      'skipRegExps': true,
      'skipTemplates': true,
    },
  ],
  'no-lonely-if': 'error',
  'no-mixed-spaces-and-tabs': 'error',
  'no-multi-spaces': 'error',
  'no-multiple-empty-lines': [
    'error',
    {
      'max': 1,
      'maxEOF': 1,
      'maxBOF': 0,
    },
  ],
  'no-new-symbol': 'error',
  'no-obj-calls': 'error',
  'no-octal': 'warn',
  'no-redeclare': 'error',
  'no-regex-spaces': 'warn',
  'no-script-url': 'error',
  'no-self-assign': 'error',
  'no-sparse-arrays': 'error',
  'no-this-before-super': 'error',
  'no-trailing-spaces': 'error',
  'no-undef': 'error',
  'no-unexpected-multiline': 'error',
  'no-unreachable': 'error',
  'no-unsafe-finally': 'error',
  'no-unused-expressions': 'off',
  'no-unused-labels': 'error',
  'no-unused-vars': [
    'warn',
    {
      'vars': 'all',
      'args': 'none',
    },
  ],
  'no-useless-computed-key': 'error',
  'no-useless-return': 'error',
  'no-var': 'error',
  'no-whitespace-before-property': 'error',
  'object-curly-newline': [
    'error',
    {
      'ObjectExpression': {
        'multiline': true,
        'minProperties': 2,
      },
      'ObjectPattern': {
        'multiline': true,
      },
      'ImportDeclaration': 'never',
      'ExportDeclaration': {
        'multiline': true,
        'minProperties': 3,
      },
    },
  ],
  'object-curly-spacing': [
    'error',
    'always',
    {
      'objectsInObjects': false,
    },
  ],
  'object-property-newline': 'error',
  'object-shorthand': 'error',
  'operator-linebreak': [
    'warn',
    'after',
    {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    },
  ],
  'padding-line-between-statements': [
    'error',
    {
      'blankLine': 'always',
      'prev': '*',
      'next': 'return',
    },
  ],
  'prefer-const': 'error',
  'prefer-template': 'error',
  'quotes': [
    'error',
    'single',
    {
      'allowTemplateLiterals': true,
    },
  ],
  'require-yield': 'error',
  'semi': 'error',
  'space-before-blocks': 'error',
  'space-infix-ops': 'error',
  'space-unary-ops': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',
};
const vueRules = {
  'vue/component-name-in-template-casing': [
    'error',
    'kebab-case',
  ],
  'vue/html-closing-bracket-newline': [
    'error',
    {
      'singleline': 'never',
      'multiline': 'always',
    },
  ],
  'vue/html-self-closing': [
    'warn',
    {
      'html': {
        'void': 'any',
        'normal': 'any',
        'component': 'always',
      },
      'svg': 'any',
      'math': 'any',
    },
  ],
  'vue/max-attributes-per-line': [
    'error',
    {
      'singleline': 1,
      'multiline': 1,
    },
  ],
  'vue/require-default-prop': 'off',
  'vue/require-prop-type-constructor': 'off',
  'vue/script-indent': [
    'error',
    2,
    {
      'baseIndent': 1,
      'switchCase': 1,
    },
  ],
};
const coreRulesExtended = {
  'array-bracket-newline': [
    'error',
    {
      'minItems': 1,
    },
  ],
  'arrow-body-style': [
    'error',
    'as-needed',
  ],
  'function-call-argument-newline': [
    'error',
    'consistent',
  ],
  'function-paren-newline': [
    'error',
    'multiline-arguments',
  ],
  'no-multiple-empty-lines': [
    'error',
    {
      'max': 1,
      'maxEOF': 0,
      'maxBOF': 0,
    },
  ],
  'no-redeclare': [
    'error',
    {
      'builtinGlobals': false,
    },
  ],
  'no-restricted-imports': [
    'error',
    {
      'name': 'lodash',
      'message': 'Please use lodash-es instead.',
    },
  ],
  'no-unused-vars': [
    'error',
    {
      'vars': 'all',
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'destructuredArrayIgnorePattern': '^_',
    },
  ],
  'no-var': 'error',
  'object-curly-newline': [
    'error',
    {
      'ObjectExpression': {
        'multiline': true,
        'minProperties': 1,
      },
    },
  ],
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: '*',
      next: [
        'block-like',
        'return',
        'export',
      ],
    },
    {
      blankLine: 'always',
      prev: [
        'block-like',
        'const',
        'let',
        'import',
      ],
      next: '*',
    },
    {
      blankLine: 'any',
      prev: [
        'const',
        'let',
      ],
      next: [
        'const',
        'let',
      ],
    },
    {
      blankLine: 'any',
      prev: [
        'import',
      ],
      next: [
        'import',
      ],
    },
    {
      blankLine: 'any',
      prev: [
        'export',
      ],
      next: [
        'export',
      ],
    },
  ],
  'prefer-rest-params': 'off',
  'prefer-spread': 'off',
  'semi-spacing': [
    'error',
    {
      'before': false,
      'after': true,
    },
  ],
  'semi-style': [
    'error',
    'last',
  ],
  'space-in-parens': [
    'error',
    'never',
  ],
  'spaced-comment': [
    'error',
    'always',
    {
      'markers': [
        '/',
      ],
    },
  ],
};
const vueRulesExtended = {
  'vue/attribute-hyphenation': [
    'error',
    'always',
  ],
  'vue/array-bracket-newline': [
    'error',
    'consistent',
  ],
  'vue/array-bracket-spacing': [
    'error',
    'never',
  ],
  'vue/arrow-spacing': 'error',
  'vue/block-spacing': [
    'error',
    'always',
  ],
  'vue/block-tag-newline': [
    'error',
    {
      'singleline': 'ignore',
      'multiline': 'always',
      'maxEmptyLines': 0,
    },
  ],
  'vue/brace-style': [
    'error',
    '1tbs',
    {
      'allowSingleLine': true,
    },
  ],
  'vue/comma-dangle': [
    'error',
    'always-multiline',
  ],
  'vue/comma-spacing': [
    'error',
    {
      'before': false,
      'after': true,
    },
  ],
  'vue/comma-style': [
    'error',
    'last',
  ],
  'vue/component-tags-order': [
    'error',
    {
      'order': [
        'template',
        'script',
        'style',
      ],
    },
  ],
  'vue/custom-event-name-casing': [
    'error',
    'kebab-case',
  ],
  'vue/define-macros-order': [
    'error',
    {
      'order': [
        'defineProps',
        'defineEmits',
      ],
    },
  ],
  'vue/dot-location': [
    'error',
    'property',
  ],
  'vue/dot-notation': 'error',
  'vue/eqeqeq': [
    'error',
    'always',
  ],
  'vue/first-attribute-linebreak': [
    'error',
    {
      'singleline': 'beside',
      'multiline': 'below',
    },
  ],
  'vue/func-call-spacing': [
    'error',
    'never',
  ],
  'indent': [
    'error',
    2,
    {
      'SwitchCase': 1,
    },
  ],
  'vue/html-button-has-type': 'error',
  'vue/html-closing-bracket-newline': [
    'error',
    {
      'singleline': 'never',
      'multiline': 'always',
    },
  ],
  'vue/html-closing-bracket-spacing': [
    'error',
    {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always',
    },
  ],
  'vue/html-comment-content-newline': [
    'error',
    {
      'singleline': 'never',
      'multiline': 'always',
    },
  ],
  'vue/html-comment-content-spacing': [
    'error',
    'always',
  ],
  'vue/html-comment-indent': 'error',
  'vue/html-indent': [
    'error',
    2,
    {
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
    },
  ],
  'vue/key-spacing': [
    'error',
    {
      'mode': 'minimum',
    },
  ],
  'vue/keyword-spacing': 'error',
  'vue/multiline-html-element-content-newline': [
    'error',
    {
      'ignoreWhenEmpty': true,
      'allowEmptyLines': false,
    },
  ],
  'vue/no-bare-strings-in-template': [
    'off',
    {
      'allowlist': [
        '(',
        ')',
        ',',
        '.',
        '&',
        '+',
        '-',
        '=',
        '*',
        '/',
        '#',
        '%',
        '!',
        '?',
        ':',
        '[',
        ']',
        '{',
        '}',
        '<',
        '>',
        '\u00b7',
        '\u2022',
        '\u2010',
        '\u2013',
        '\u2014',
        '\u2212',
        '|',
      ],
      'attributes': {
        '/.+/': [
          'title',
          'label',
          'aria-label',
          'aria-placeholder',
          'aria-roledescription',
          'aria-valuetext',
        ],
        'input': [
          'placeholder',
        ],
        'img': [
          'alt',
        ],
      },
      'directives': [
        'v-text',
      ],
    },
  ],
  'vue/no-constant-condition': 'error',
  'vue/no-empty-component-block': 'error',
  'vue/no-extra-parens': 'error',
  'vue/no-irregular-whitespace': 'error',
  'vue/no-multi-spaces': 'error',
  'vue/no-multiple-objects-in-class': 'error',
  'vue/no-potential-component-option-typo': [
    'error',
    {
      'presets': [
        'all',
      ],
    },
  ],
  'vue/no-static-inline-styles': [
    'off',
    {
      'allowBinding': true,
    },
  ],
  'vue/no-sparse-arrays': 'error',
  'vue/no-useless-concat': 'error',
  'vue/no-useless-mustaches': 'error',
  'vue/no-useless-v-bind': 'error',
  'vue/no-v-text': 'error',
  'vue/object-curly-newline': [
    'error',
    {
      'ObjectExpression': {
        'multiline': true,
        'minProperties': 2,
      },
      'ObjectPattern': {
        'multiline': true,
      },
      'ImportDeclaration': 'never',
      'ExportDeclaration': {
        'multiline': true,
        'minProperties': 3,
      },
    },
  ],
  'vue/object-curly-spacing': [
    'error',
    'always',
    {
      'objectsInObjects': false,
    },
  ],
  'vue/object-property-newline': 'error',
  'vue/object-shorthand': 'error',
  'vue/operator-linebreak': [
    'warn',
    'after',
    {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    },
  ],
  'vue/order-in-components': 'error',
  'vue/padding-line-between-blocks': [
    'error',
    'always',
  ],
  'vue/prefer-template': 'error',
  'vue/require-explicit-emits': [
    'error',
    {
      'allowProps': false,
    },
  ],
  'vue/require-name-property': 'error',
  'vue/singleline-html-element-content-newline': [
    'error',
    {
      'ignoreWhenNoAttributes': true,
      'ignoreWhenEmpty': true,
    },
  ],
  'vue/space-in-parens': [
    'error',
    'never',
  ],
  'vue/space-infix-ops': 'error',
  'vue/space-unary-ops': 'error',
  'vue/template-curly-spacing': 'error',
  'vue/v-on-event-hyphenation': [
    'error',
    'always',
    {
      'autofix': true,
    },
  ],
  'vue/v-on-function-call': [
    'error',
    'never',
  ],
  'vue/v-slot-style': [
    'error',
    'shorthand',
  ],
};
const typescriptRulesExtended = {
  '@typescript-eslint/ban-ts-comment': 'error',
  '@typescript-eslint/ban-tslint-comment': 'error',
  '@typescript-eslint/camelcase': 'off',
  '@typescript-eslint/consistent-type-definitions': [
    'error',
    'type',
  ],
  '@typescript-eslint/member-delimiter-style': [
    'error',
    {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true,
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': true,
      },
      'multilineDetection': 'brackets',
    },
  ],
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-this-alias': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-use-before-define': 'off',
  '@typescript-eslint/space-infix-ops': 'error',
  '@typescript-eslint/type-annotation-spacing': 'error',
};
const projectOverrides = {
  'vue/multi-word-component-names': 'off',
  'vue/no-reserved-component-names': 'off',
};

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  rules: {
    ...coreRules,
    ...vueRules,
    ...coreRulesExtended,
    ...vueRulesExtended,
    ...typescriptRulesExtended,
    ...projectOverrides,
  },
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}',
      ],
      'extends': [
        'plugin:cypress/recommended',
      ],
    },
    {
      'files': [
        'src/presets/**/*.js',
      ],
      'rules': {
        'eqeqeq': [
          'off',
          'allow-null',
        ],
        'no-dupe-keys': 'off',
        'no-unused-vars': 'off',
        'no-sparse-arrays': 'off',
      },
    },
    {
      'files': [
        '*.vue',
      ],
      'rules': {
        'indent': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
