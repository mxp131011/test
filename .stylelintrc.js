module.exports = {
    overrides: [
        { files: ['**/*.scss'], customSyntax: 'postcss-scss' }, // postcss-scss 用于自动修复scss文件
        { files: ['**/*.vue', '**/*.html'], customSyntax: 'postcss-html' } // postcss-html 用于自动修复html或vue文件
    ],
    plugins: ['stylelint-order'], // 用于排序
    rules: {
        'color-hex-case': 'lower', // 颜色使用小写
        'color-hex-length': 'long', // 禁止缩写16禁止颜色 即只能是#ffffff，不能是#fff
        'color-named': 'never', // 禁止颜色使用名称 如不能 color: black ，而应该使用color: #000000
        'color-no-invalid-hex': true, // 禁止使用无效的十六进制颜色
        'font-family-no-duplicate-names': true, // 禁止使用重复的字体名称。
        // 'function-calc-no-invalid': true, // 禁止在 calc 函数中使用无效表达式
        'function-calc-no-unspaced-operator': true, // 禁止在 calc 函数中使用没有间隔的运算符。
        'function-linear-gradient-no-nonstandard-direction': true, // 禁止在 linear-gradient() 中调用不符合标准语法的无效方
        'string-no-newline': true, // 禁止字符串中的(未转义)换行符。
        'unit-no-unknown': true, // 禁止未知的单位。
        'property-no-unknown': true, // 禁止未知的属性
        'keyframe-declaration-no-important': true, // 在动画中禁止关键帧声明的 !important。
        'declaration-block-no-duplicate-properties': [true, { ignoreProperties: ['image-rendering'] }], // 禁止声明块的重复属性。
        'declaration-block-no-shorthand-property-overrides': true, // 禁止简写属性覆盖相关的扩写属性。
        'block-no-empty': true, // 禁止空块。
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep'] }], // 禁止未知的伪类选择器
        'selector-pseudo-element-no-unknown': true, // 禁止未知的伪元素选择器。
        'selector-type-no-unknown': true, // 禁止未知的类型选择器。
        'media-feature-name-no-unknown': true, // 禁止未知的媒体功能名。
        'comment-no-empty': true, // 禁止空注释。
        'no-duplicate-at-import-rules': true, // 禁止在样式表中使用重复的 @import 规则。
        'no-duplicate-selectors': true, // 禁止样式表中的重复选择器。
        'no-empty-source': true, // 禁止空源码。
        'no-extra-semicolons': true, // 禁止额外的分号（可自动修复）。
        'no-invalid-double-slash-comments': true, // 禁止 CSS 不支持并可能导致意外结果的双斜杠注释（//...）。
        'function-url-no-scheme-relative': true, // 禁止相对协议 URL。
        'number-max-precision': 4, // 限制数字中允许的小数位数
        'time-min-milliseconds': 10, // 指定时间值的最小毫秒数
        // 'unit-blacklist': ['rem', 'rpx'], // 指定禁用的单位的黑名单。
        'shorthand-property-no-redundant-values': true, // 禁止简写属性的冗余值
        'no-unknown-animations': true, // 禁止未知的动画。

        'function-comma-space-after': 'always', // 要求在函数的逗号之后必须有一个空格或不能有空白符（可自动修复）。
        'function-comma-space-before': 'never', // 要求在函数的逗号之前必须有一个空格或不能有空白符（可自动修复）。
        'function-max-empty-lines': 0, // 限制函数中相邻空行的数量（可自动修复）
        'function-name-case': 'lower', // 指定函数名的大小写（可自动修复）。
        'function-parentheses-space-inside': 'never', // 要求在函数的括号内侧必须有一个空格或不能有空白符（可自动修复）。
        'function-url-quotes': 'always', // 要求或禁止 URL 的引号。
        'function-whitespace-after': 'always', // 要求或禁止函数之后的空白符（可自动修复）。

        'number-leading-zero': 'always', // 要求或禁止小于 1 的小数有一个前导零（可自动修复）。
        'number-no-trailing-zeros': true, // 禁止数量的尾随零（可自动修复）。

        'string-quotes': 'single', // 指定字符串使用单引号或双引号（可自动修复）。
        'unit-case': 'lower', // 指定单位的大小写（可自动修复）。
        'value-keyword-case': 'lower', // 指定关键字值的大小写（可自动修复）。

        'value-list-comma-space-after': 'always', // 要求在值列表的逗号之后必须有一个空格或不能有空白符（可自动修复）。
        'value-list-comma-space-before': 'never', // 要求在值列表的逗号之前必须有一个空格或不能有空白符（可自动修复）。
        'value-list-max-empty-lines': 0, // 限制值列表中相邻空行的数量（可自动修复）
        'property-case': 'lower', // 指定属性的大小写（可自动修复）。
        'declaration-bang-space-after': 'never', // 要求在声明的叹号之后必须有一个空格或不能有空白符（可自动修复）。
        'declaration-bang-space-before': 'always', // 要求在声明的叹号之前必须有一个空格或不能有空白符（可自动修复）。
        'declaration-colon-newline-after': 'always-multi-line', // 要求在声明块的冒号之后必须有换行符或不能有空白符（可自动修复）。
        'declaration-colon-space-after': 'always', // 要求在声明块的冒号之后必须有一个空格或不能有空白符（可自动修复）。
        'declaration-colon-space-before': 'never', // 要求在声明块的冒号之前必须有一个空格或不能有空白符（可自动修复）。
        'declaration-block-semicolon-newline-after': 'always', // 要求在声明块的分号之后必须有换行符或不能有空白符（可自动修复）。
        'declaration-block-semicolon-space-after': 'always-single-line', // 要求在声明块的分号之后必须有一个空格或不能有空白符（可自动修复）。
        'declaration-block-semicolon-space-before': 'never', // 要求在声明块的分号之前必须有一个空格或不能有空白符（可自动修复）。
        'declaration-block-trailing-semicolon': null, // 要求或禁止声明块的一个尾随分号（可自动修复）。

        'block-closing-brace-empty-line-before': 'never', // 要求或禁止在块的闭大括号之前空行（可自动修复）。
        'block-closing-brace-newline-after': 'always', // 要求在块的闭大括号之后必须有换行符或不能有空白符（可自动修复）。
        'block-closing-brace-newline-before': 'always', // 要求在块的闭大括号之前必须有换行符或不能有空白符（可自动修复）。
        'block-opening-brace-newline-after': 'always', // 要求在块的开大括号之后必须有换行符（可自动修复）。
        'selector-attribute-brackets-space-inside': 'never', // 要求在属性选择器的中括号内侧必须有一个空格或不能有空白符（可自动修复）。
        'selector-attribute-operator-space-after': 'never', // 要求在属性选择器中的运算符之后必须有一个空格或不能有空白符（可自动修复）。
        'selector-attribute-operator-space-before': 'never', // 要求在属性选择器中的运算符之前必须有一个空格或不能有空白符（可自动修复）。
        'selector-attribute-quotes': 'always', // 要求或禁止属性值的引号。
        'selector-combinator-space-after': 'always', // 要求在组合选择器之后必须有一个空格或不能有空白符（可自动修复）。
        'selector-combinator-space-before': 'always', // 要求在组合选择器之前必须有一个空格或不能有空白符（可自动修复）。
        'selector-descendant-combinator-no-non-space': true, // 禁止后代选择器使用非空格字符（可自动修复）。
        'selector-pseudo-class-case': 'lower', // 指定伪类选择器的大小写（可自动修复）。
        'selector-pseudo-class-parentheses-space-inside': 'never', // 要求在伪类选择器的括号内侧必须有一个空格或不能有空白符（可自动修复）。
        'selector-pseudo-element-case': 'lower', // 指定伪元素选择器的大小写。
        'selector-pseudo-element-colon-notation': 'single', // 指定伪元素适用单冒号还是双冒号表示法（可自动修复）。
        'selector-type-case': 'lower', // 指定类型选择器的大小写（可自动修复）。

        'selector-list-comma-newline-after': 'always', // 要求在选择器列表的逗号之后必须有换行符或不能有空白符（可自动修复）。
        'selector-list-comma-newline-before': 'never-multi-line', // 要求在选择器列表的逗号之前必须有换行符或不能有空白符（可自动修复）。
        'selector-list-comma-space-after': 'always-single-line', // 要求在选择器列表的逗号之后必须有一个空格或不能有空白符（可自动修复）。
        'selector-list-comma-space-before': 'never', // 要求在选择器列表的逗号之前必须有一个空格或不能有空白符（可自动修复）。
        'rule-empty-line-before': ['always', { ignore: ['after-comment', 'first-nested'] }], // 要求或禁止在规则之前的空行（可自动修复）。

        'media-feature-colon-space-after': 'always', // 要求在媒体功能的冒号之后必须有一个空格或不能有空白符（可自动修复）。
        'media-feature-colon-space-before': 'never', // 要求在媒体功能的冒号之前必须有一个空格或不能有空白符（可自动修复）。
        'media-feature-name-case': 'lower', // 指定媒体功能名的大小写（可自动修复）。
        'media-feature-parentheses-space-inside': 'never', // 要求在媒体功能的括号内侧必须有一个空格或不能有空白符（可自动修复）。
        'media-feature-range-operator-space-after': 'always', // 要求在媒体功能的范围运算符之后必须有一个空格或不能有空白符（可自动修复）。
        'media-feature-range-operator-space-before': 'always', // 要求在媒体功能的范围运算符之前必须有一个空格或不能有空白符（可自动修复）。
        'media-query-list-comma-space-after': 'always-single-line', // 要求在媒体查询列表的逗号之后必须有一个空格或不能有空白符（可自动修复）。
        'media-query-list-comma-space-before': 'never', // 要求在媒体查询列表的逗号之前必须有一个空格或不能有空白符（可自动修复）。

        'at-rule-name-case': 'lower', // 指定@规则名的大小写（可自动修复）。
        'at-rule-name-space-after': 'always', // 要求在@规则名之后必须有一个空格（可自动修复）。
        'at-rule-semicolon-newline-after': 'always', // 要求在@规则的分号之后必须有换行符（可自动修复）。
        'at-rule-semicolon-space-before': 'never', // 要求在@规则的分号之前必须有一个空格或不能有空白符。
        'comment-empty-line-before': 'always', // 要求或禁止在注释之前的空行（可自动修复）。
        'comment-whitespace-inside': 'always', // 要求或禁止注释标记内侧的空白符（可自动修复）。
        'indentation': 4, // 指定缩进（可自动修复）。
        'max-empty-lines': 2, // 限制相邻空行的数量。

        'order/order': [
            // 排序
            'dollar-variables',
            'custom-properties',
            'at-rules',
            'declarations',
            { type: 'at-rule', name: 'supports' },
            { type: 'at-rule', name: 'media' },
            'rules'
        ],
        'order/properties-order': [
            { properties: ['all'] },
            {
                // Position.
                properties: ['position', 'inset', 'inset-block', 'inset-inline', 'top', 'right', 'bottom', 'left', 'z-index']
            },
            {
                // Display mode.
                properties: ['box-sizing', 'display']
            },
            {
                // Flexible boxes.
                properties: ['flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap']
            },
            {
                // Grid layout.
                properties: [
                    'grid',
                    'grid-area',
                    'grid-template',
                    'grid-template-areas',
                    'grid-template-rows',
                    'grid-template-columns',
                    'grid-row',
                    'grid-row-start',
                    'grid-row-end',
                    'grid-column',
                    'grid-column-start',
                    'grid-column-end',
                    'grid-auto-rows',
                    'grid-auto-columns',
                    'grid-auto-flow',
                    'grid-gap',
                    'grid-row-gap',
                    'grid-column-gap'
                ]
            },
            {
                // Gap.
                properties: ['gap', 'row-gap', 'column-gap']
            },
            {
                // Layout alignment.
                properties: [
                    'place-content',
                    'place-items',
                    'place-self',
                    'align-content',
                    'align-items',
                    'align-self',
                    'justify-content',
                    'justify-items',
                    'justify-self'
                ]
            },
            {
                // Order.
                properties: ['order']
            },
            {
                // Box model.
                properties: [
                    'float',
                    'width',
                    'min-width',
                    'max-width',
                    'height',
                    'min-height',
                    'max-height',
                    'padding',
                    'padding-top',
                    'padding-right',
                    'padding-bottom',
                    'padding-left',
                    'margin',
                    'margin-top',
                    'margin-right',
                    'margin-bottom',
                    'margin-left',
                    'overflow',
                    'overflow-x',
                    'overflow-y',
                    '-webkit-overflow-scrolling',
                    '-ms-overflow-x',
                    '-ms-overflow-y',
                    '-ms-overflow-style',
                    'overscroll-behavior',
                    'overscroll-behavior-x',
                    'overscroll-behavior-y',
                    'overscroll-behavior-inline',
                    'overscroll-behavior-block',
                    'clip',
                    'clip-path',
                    'clear'
                ]
            },
            {
                // Typography.
                properties: [
                    'font',
                    'font-family',
                    'font-size',
                    'font-style',
                    'font-weight',
                    'font-feature-settings',
                    'font-kerning',
                    'font-variant',
                    'font-variant-ligatures',
                    'font-variant-caps',
                    'font-variant-alternates',
                    'font-variant-numeric',
                    'font-variant-east-asian',
                    'font-variant-position',
                    'font-size-adjust',
                    'font-stretch',
                    'font-effect',
                    'font-emphasize',
                    'font-emphasize-position',
                    'font-emphasize-style',
                    '-webkit-font-smoothing',
                    '-moz-osx-font-smoothing',
                    'font-smooth',
                    'hyphens',
                    'line-height',
                    'color',
                    'text-align',
                    'text-align-last',
                    'text-emphasis',
                    'text-emphasis-color',
                    'text-emphasis-style',
                    'text-emphasis-position',
                    'text-decoration',
                    'text-decoration-line',
                    'text-decoration-thickness',
                    'text-decoration-style',
                    'text-decoration-color',
                    'text-underline-position',
                    'text-underline-offset',
                    'text-indent',
                    'text-justify',
                    'text-outline',
                    '-ms-text-overflow',
                    'text-overflow',
                    'text-overflow-ellipsis',
                    'text-overflow-mode',
                    'text-shadow',
                    'text-transform',
                    'text-wrap',
                    '-webkit-text-size-adjust',
                    '-ms-text-size-adjust',
                    'letter-spacing',
                    'word-break',
                    'word-spacing',
                    'word-wrap', // Legacy name for `overflow-wrap`
                    'overflow-wrap',
                    'tab-size',
                    'white-space',
                    'vertical-align',
                    'list-style',
                    'list-style-position',
                    'list-style-type',
                    'list-style-image'
                ]
            },
            {
                // Accessibility & Interactions.
                properties: [
                    'pointer-events',
                    '-ms-touch-action',
                    'touch-action',
                    'cursor',
                    'visibility',
                    'zoom',
                    'table-layout',
                    'empty-cells',
                    'caption-side',
                    'border-spacing',
                    'border-collapse',
                    'content',
                    'quotes',
                    'counter-reset',
                    'counter-increment',
                    'resize',
                    'user-select',
                    'nav-index',
                    'nav-up',
                    'nav-right',
                    'nav-down',
                    'nav-left'
                ]
            },
            {
                // Background & Borders.
                properties: [
                    'background',
                    'background-color',
                    'background-image',
                    "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
                    'filter:progid:DXImageTransform.Microsoft.gradient',
                    'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader',
                    'filter',
                    'background-repeat',
                    'background-attachment',
                    'background-position',
                    'background-position-x',
                    'background-position-y',
                    'background-clip',
                    'background-origin',
                    'background-size',
                    'background-blend-mode',
                    'isolation',
                    'border',
                    'border-color',
                    'border-style',
                    'border-width',
                    'border-top',
                    'border-top-color',
                    'border-top-style',
                    'border-top-width',
                    'border-right',
                    'border-right-color',
                    'border-right-style',
                    'border-right-width',
                    'border-bottom',
                    'border-bottom-color',
                    'border-bottom-style',
                    'border-bottom-width',
                    'border-left',
                    'border-left-color',
                    'border-left-style',
                    'border-left-width',
                    'border-radius',
                    'border-top-left-radius',
                    'border-top-right-radius',
                    'border-bottom-right-radius',
                    'border-bottom-left-radius',
                    'border-image',
                    'border-image-source',
                    'border-image-slice',
                    'border-image-width',
                    'border-image-outset',
                    'border-image-repeat',
                    'outline',
                    'outline-width',
                    'outline-style',
                    'outline-color',
                    'outline-offset',
                    'box-shadow',
                    'mix-blend-mode',
                    'filter:progid:DXImageTransform.Microsoft.Alpha(Opacity',
                    "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
                    'opacity',
                    '-ms-interpolation-mode'
                ]
            },
            {
                // SVG Presentation Attributes.
                properties: [
                    'alignment-baseline',
                    'baseline-shift',
                    'dominant-baseline',
                    'text-anchor',
                    'word-spacing',
                    'writing-mode',

                    'fill',
                    'fill-opacity',
                    'fill-rule',
                    'stroke',
                    'stroke-dasharray',
                    'stroke-dashoffset',
                    'stroke-linecap',
                    'stroke-linejoin',
                    'stroke-miterlimit',
                    'stroke-opacity',
                    'stroke-width',

                    'color-interpolation',
                    'color-interpolation-filters',
                    'color-profile',
                    'color-rendering',
                    'flood-color',
                    'flood-opacity',
                    'image-rendering',
                    'lighting-color',
                    'marker-start',
                    'marker-mid',
                    'marker-end',
                    'mask',
                    'shape-rendering',
                    'stop-color',
                    'stop-opacity'
                ]
            },
            {
                // Transitions & Animation.
                properties: [
                    'transition',
                    'transition-delay',
                    'transition-timing-function',
                    'transition-duration',
                    'transition-property',
                    'transform',
                    'transform-origin',
                    'animation',
                    'animation-name',
                    'animation-duration',
                    'animation-play-state',
                    'animation-timing-function',
                    'animation-delay',
                    'animation-iteration-count',
                    'animation-direction'
                ]
            }
        ]
    }
};
