// 更详细的规则请参考：https://eslint.bootcss.com/docs/rules/

// eslint-disable-next-line no-mixed-requires
const myPackage = require('./package.json');
// 得到vue版本
const vueVersions = myPackage.dependencies.vue || myPackage.devDependencies.vue;
// 转换为数字  ^3.2.20  会转换为3.2
const vueVersionsNumb = parseFloat(vueVersions.replace(/[^\d.]/g, ''));

module.exports = {
    plugins: ['prettier'],
    extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'prettier'], // 扩展
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    env: {
        es2020: true,
        es6: true,
        browser: true,
        node: true
    },
    globals: {
        defineProps: true,
        defineEmits: true,
        defineExpose: true
    },
    overrides: [
        {
            files: ['*.vue'], // 针对某文件关闭某个规则
            rules: {
                indent: 'off' //  在vue文中中关闭 indent规则，防止根 vue/script-indent 规则冲突
            }
        }
    ],
    rules: {
        // 表示被prettier标记的地方抛出错误信息 (eslint-plugin-prettier插件会调用prettier对你的代码风格进行检查如果过出现了与Eslint不一致，这个地方就会被prettier进行标记)
        'prettier/prettier': 'off',
        // 禁止使用异步函数作为 Promise executor
        'no-async-promise-executor': 'error',
        // 定义对象的set存取器属性时，强制定义get
        'accessor-pairs': ['error', { setWithoutGet: true, getWithoutSet: true }],
        // 强制数组元素间出现换行
        'array-element-newline': ['error', 'consistent'],
        // 强制数组方法的回调函数中有 return 语句
        'array-callback-return': 'error',
        // 要求箭头函数体使用大括号
        'arrow-body-style': ['off', 'as-needed'],
        // 要求箭头函数的参数使用圆括号
        'arrow-parens': ['error', 'always'],
        // 强制把变量的使用限制在其定义的作用域范围内
        'block-scoped-var': 'error',
        // require return statements after
        'callback-return': 'off',
        // 注释 大写字母开头，不推荐 注释的代码会报错
        'capitalized-comments': 'off',
        // 如果一个类方法没有使用this，它有时可以变成一个静态函数。如果将该方法转换为静态函数，那么调用该特定方法的类的实例也必须转换为静态调用
        'class-methods-use-this': 'error',
        // 限制圈复杂度，也就是类似if else能连续接多少个
        'complexity': 'off',

        /*
         * "SwitchCase" (默认：0) 强制 switch 语句中的 case 子句的缩进水平
         * 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
         */
        'computed-property-spacing': ['error', 'never'],
        // 要求 return 语句要么总是指定返回的值，要么不指定
        'consistent-return': 'error',

        /*
         * 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了
         * e.g [0,"that"] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值
         */
        'consistent-this': ['error', 'that'],
        // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
        'constructor-super': 'error',
        // 强制所有控制语句使用一致的括号风格
        'curly': ['error', 'all'],
        // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
        'default-case': 'off',
        // 文件末尾强制换行
        'eol-last': 'off',
        // 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
        'for-direction': 'error',
        // 要求函数名称与它们所分配的变量或属性的名称相匹配
        'func-name-matching': 'error',
        // 强制使用命名的 function 表达式
        'func-names': 'off',

        /*
         * 强制一致地使用函数声明或函数表达式，方法定义风格，参数：
         * declaration: 强制使用方法声明的方式，function f(){} e.g ['error', "declaration"]
         * expression：强制使用方法表达式的方式，var f = function() {} e.g ['error', "expression"]
         * allowArrowFunctions: declaration风格中允许箭头函数。 e.g ['error', "declaration", { "allowArrowFunctions": true }]
         */
        'func-style': 'off',
        // 在函数括号内强制执行一致的换行符
        'function-paren-newline': ['error', 'consistent'],
        // 强制 generator 函数中 * 号周围使用一致的空格
        'generator-star-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        // 强制在 getter 属性中出现一个 return 语句。每个 getter 都期望有返回值。
        'getter-return': 'error',
        // 要求 require() 出现在顶层模块作用域中
        'global-require': 'off',
        // 要求 for-in 循环中有一个 if 语句
        'guard-for-in': 'off',
        // 要求回调函数中有容错处理
        'handle-callback-err': ['error', '^(err|error)$'],
        // 禁止使用指定的标识符
        'id-blacklist': 'off',
        // 强制标识符的最新和最大长度 (变量名长度)
        'id-length': 'off',
        // 要求标识符匹配一个指定的正则表达式
        'id-match': 'off',
        // 强制执行箭头函数体的位置,一个箭头函数体可以包含一个隐式返回，而不是一个块体。对隐式返回的表达式执行一致的位置可能很有用。
        'implicit-arrow-linebreak': ['error', 'beside'],
        // 强制执行一致的缩进
        'indent': [
            'off',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: { var: 1, let: 1, const: 1 },
                FunctionDeclaration: { parameters: 'first' },

                flatTernaryExpressions: true
            }
        ],

        // 要求或禁止 var 声明中的初始化(初值)
        'init-declarations': 'error',
        // 强制在 JSX 属性中一致地使用双引号或单引号
        'jsx-quotes': ['error', 'prefer-single'],
        // 行注释可以位于代码上方或旁边。该规则有助于团队保持一致的风格。
        'line-comment-position': 'off',
        // 强制使用一致的换行风格
        'linebreak-style': ['error', 'windows'],
        // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
        'lines-around-comment': [
            'error',
            {
                beforeBlockComment: true, // (默认）在块注释之前需要一个空行
                allowBlockStart: true, // 允许评论出现在块语句的开始处
                allowObjectStart: true, // 允许评论出现在对象文字的开头
                allowClassStart: true, // 允许评论出现在Class开始时
                allowArrayStart: true
            }
        ],
        // 这条规则要求或禁止围绕指令序言的空白换行符。此规则不强制执行有关各个指令之间空白换行符的任何约定。另外，它不需要在指令序言前留出空行，除非它们之前有评论。如果这是您想强制执行的样式，请使用填充块规则。
        'lines-around-directive': ['error', 'always'],
        // 要求或禁止class成员之间的空行
        'lines-between-class-members': 'error',
        // 强制执行嵌套块的最大深度，以降低代码复杂度。"max"（默认为4)
        'max-depth': ['error', 8],
        'max-len': [
            'error',
            {
                code: 180,
                tabWidth: 4,
                ignoreUrls: true,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreStrings: true,
                ignoreRegExpLiterals: true,
                ignoreTemplateLiterals: true
            }
        ],
        // 强制文件的最大行数
        'max-lines': 'off',
        // 强制回调函数最大嵌套深度 5层
        'max-nested-callbacks': ['error', 5],
        // 强制 function 定义中最多允许的参数数量
        'max-params': ['error', 12],
        // 强制 function 块最多允许的的语句数量
        'max-statements': 'off',
        // 强制每一行中所允许的最大语句数量
        'max-statements-per-line': ['error', { max: 3 }],
        // 强化多行评论的特定风格。
        'multiline-comment-style': 'off',
        // 强制或禁止三元表达式的操作数之间的换行符
        'multiline-ternary': ['error', 'always-multiline'],
        // 要求构造函数首字母大写 （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
        'new-cap': 'off',
        // 不允许在字符类语法中出现由多个代码点组成的字符,  因为Unicode 包括由多个代码点组成的字符。RegExp 字符类语法 (/[abc]/) 不能处理由多个代码点组成的字符
        'no-misleading-character-class': 'error',
        // 要求调用无参构造函数时有圆括号
        'new-parens': ['off', 'always'],
        // 禁用 alert、confirm 和 prompt
        'no-alert': 'error',
        // 禁止使用 Array 构造函数
        'no-array-constructor': 'off',
        // 不允许await在循环体内使用。
        'no-await-in-loop': 'error',
        // 禁用按位运算符
        'no-bitwise': 'error',
        // 不允许调用和构造Buffer()构造函数。
        'no-buffer-constructor': 'error',
        // 禁用 arguments.caller 或 arguments.callee
        'no-caller': 'error',
        // 不允许在 case 子句中使用词法声明
        'no-case-declarations': 'error',

        // 禁止修改类声明的变量
        'no-class-assign': 'error',
        // 针对试图与-0进行比较的代码发出警告，因为这不会按预期工作。也就是说，像x === -0这样的代码将通过+0和-0。作者可能打算 Object.is（x，-0）。
        'no-compare-neg-zero': 'error',
        // 禁止条件表达式中出现赋值操作符
        'no-cond-assign': 'error',
        // 不允许箭头功能，在那里他们可以混淆的比较
        'no-confusing-arrow': 'error',
        // 禁用 console
        'no-console': 'off',
        // 禁用 debugger
        'no-debugger': 'error',
        // 禁止修改 const 声明的变量
        'no-const-assign': 'error',
        // 禁用 continue 语句
        'no-continue': 'error',
        // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
        'no-control-regex': 'error',

        /*
         * 禁用 debugger
         * 禁止删除变量
         */
        'no-delete-var': 'error',
        // 禁止除法操作符显式的出现在正则表达式开始的位置
        'no-div-regex': 'error',
        // 禁止 function 定义中出现重名参数
        'no-dupe-args': 'error',
        // 禁止类成员中出现重复的名称
        'no-dupe-class-members': 'error',
        // 禁止对象字面量中出现重复的 key
        'no-dupe-keys': 'error',
        // 禁止重复的 case 标签
        'no-duplicate-case': 'error',
        // 不允许复制模块的进口
        'no-duplicate-imports': 'error',
        // 禁止 if 语句中有 return 之后有 else
        'no-else-return': 'off',
        // 禁止空语句块
        'no-empty': ['error', { allowEmptyCatch: true }],
        // 禁止在正则表达式中使用空字符集 (/^abc[]/)
        'no-empty-character-class': 'error',
        // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
        'no-empty-function': 'error',
        // 禁用不必要的标签
        'no-extra-label': 'error',
        // 禁止在没有类型检查操作符的情况下与 null 进行比较
        'no-eq-null': 'error',
        // 禁用 eval()
        'no-eval': 'error',
        // 禁止对 catch 子句的参数重新赋值
        'no-ex-assign': 'error',
        // 禁止扩展原生类型
        'no-extend-native': ['error', { exceptions: ['Object', 'Array'] }],
        // 禁止不必要的 .bind() 调用
        'no-extra-bind': 'error',
        // 禁止不必要的布尔转换
        'no-extra-boolean-cast': 'error',
        // 禁止不必要的分号
        'no-extra-semi': 'error',
        // 禁止 case 语句落空
        'no-fallthrough': 'error',
        // 禁止数字字面量中使用前导和末尾小数点
        'no-floating-decimal': 'error',
        // 禁止对 function 声明重新赋值
        'no-func-assign': 'error',
        // 此规则不允许修改只读全局变量。
        'no-global-assign': 'error',
        // 禁止使用短符号进行类型转换(!!fOO)
        'no-implicit-coercion': 'error',
        // 禁止在全局范围内使用 var 和命名的 function 声明
        'no-implicit-globals': 'error',
        // 禁止使用类似 eval() 的方法
        'no-implied-eval': 'error',
        // 禁止在代码行后使用内联注释
        'no-inline-comments': 'off',
        // 禁止在嵌套的块中出现 function 或 var 声明
        'no-inner-declarations': ['error', 'both'],
        // 禁止 RegExp 构造函数中无效的正则表达式字符串
        'no-invalid-regexp': 'error',
        // 禁止 this 关键字出现在类和类对象之外
        'no-invalid-this': 'error',
        // 禁止在字符串和注释之外不规则的空白
        'no-irregular-whitespace': 'error',
        // 禁用 __iterator__ 属性
        'no-iterator': 'error',
        // 不允许标签与变量同名
        'no-label-var': 'error',
        // 禁用标签语句
        'no-labels': 'error',
        // 禁用不必要的嵌套块
        'no-lone-blocks': 'error',
        // 禁止 if 作为唯一的语句出现在 else 语句中
        'no-lonely-if': 'off',
        // 禁止在循环中出现 function 声明和表达式
        'no-loop-func': 'error',
        // 禁用魔术数字(3.14什么的用常量代替)
        'no-magic-numbers': 'off',
        // 禁止混合使用不同的操作符
        'no-mixed-operators': 'off',
        // 禁止混合常规 var 声明和 require 调用
        'no-mixed-requires': 'error',
        // 不允许空格和 tab 混合缩进
        'no-mixed-spaces-and-tabs': 'error',
        // 不允许在单个语句中使用多个分配。a = b = c = d;
        'no-multi-assign': 'error',
        // 禁止使用多个空格
        'no-multi-spaces': 'error',
        // 禁止使用多行字符串，在 JavaScript 中，可以在新行之前使用斜线创建多行字符串
        'no-multi-str': 'error',
        // 不允许多个空行
        'no-multiple-empty-lines': ['error', { max: 2 }],
        // 不允许否定的表达式
        'no-negated-condition': 'off',
        // 不允许使用嵌套的三元表达式 var foo = bar ? baz : qux === quxx ? bing : bam;
        'no-nested-ternary': 'off',
        // 禁止在非赋值或条件语句中使用 new 操作符
        'no-new': 'error',
        // 禁止对 Function 对象使用 new 操作符
        'no-new-func': 'error',
        // 禁止使用 Object 的构造函数
        'no-new-object': 'error',
        // 禁止调用 require 时使用 new 操作符
        'no-new-require': 'error',
        // 禁止 Symbol 的构造函数
        'no-new-symbol': 'error',
        // 禁止对 String，Number 和 Boolean 使用 new 操作符
        'no-new-wrappers': 'error',
        // 禁止把全局对象 (Math 和 JSON) 作为函数调用 错误：var math = Math();
        'no-obj-calls': 'error',
        // 禁用八进制字面量
        'no-octal': 'error',
        // 禁止在字符串中使用八进制转义序列
        'no-octal-escape': 'error',
        // 不允许对 function 的参数进行重新赋值
        'no-param-reassign': 'off',
        // 禁止对 __dirname 和 __filename进行字符串连接
        'no-path-concat': 'error',
        // 禁止使用一元操作符 ++ 和 --
        'no-plusplus': 'off',
        // 禁用 process.env
        'no-process-env': 'error',
        // 禁用 process.exit()
        'no-process-exit': 'error',
        // 禁用 __proto__ 属性
        'no-proto': 'error',
        // 禁止直接使用 Object.prototypes的内置属性 例如，foo.hasOwnProperty("bar") 应该替换为 Object.prototype.hasOwnProperty.call(foo, "bar")
        'no-prototype-builtins': 'error',
        // 禁止使用 var 多次声明同一变量
        'no-redeclare': 'error',
        // 禁止正则表达式字面量中出现多个空格
        'no-regex-spaces': 'error',
        // 禁用特定的全局变量
        'no-restricted-globals': 'error',
        // 允许指定模块加载时的进口
        'no-restricted-imports': 'off',
        // 允许你指定你不想在你的应用程序中使用的模块。
        'no-restricted-modules': 'off',
        // 对象上的某些属性可能在代码库中被禁止。这对于取消API或限制模块方法的使用很有用。例如，您可能希望使用不允许describe.only使用摩卡或者告诉人们使用时Object.assign代替_.extend。
        'no-restricted-properties': 'error',
        // 禁止使用特定的语法
        'no-restricted-syntax': 'error',
        // 禁止在返回语句中赋值 (return foo = bar + 2; 错误)
        'no-return-assign': 'error',
        // 禁止 return await ；这个规则旨在防止由于缺乏对async function语义的理解而导致的可能的常见性能危害。
        'no-return-await': 'error',
        // 禁止使用 javascript: url
        'no-script-url': 'error',
        // 禁止自我赋值
        'no-self-assign': 'error',
        // 禁止自身比较
        'no-self-compare': 'error',
        // 禁用逗号操作符
        'no-sequences': 'error',
        // 禁止变量声明与外层作用域的变量同名
        'no-shadow': 'error',
        // 禁止覆盖受限制的标识符
        'no-shadow-restricted-names': 'error',
        // 禁用同步方法
        'no-sync': 'off',
        // 不允许使用制表符
        'no-tabs': 'error',
        // 警告常规字符串包含看起来像模板字面占位符的内容。"Hello ${name}!";
        'no-template-curly-in-string': 'error',
        // 不允许使用三元操作符
        'no-ternary': 'off',
        // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        'no-this-before-super': 'error',
        // 禁止抛出非异常字面量
        'no-throw-literal': 'error',
        // 禁用行尾空格
        'no-trailing-spaces': 'error',
        // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        'no-undef': 'error',
        // 禁止将变量初始化为 undefined
        'no-undef-init': 'error',
        // 禁止将 undefined 作为标识符
        'no-undefined': 'off',
        // 禁止标识符中有悬空下划线_bar
        'no-underscore-dangle': 'off',
        // 禁止出现令人困惑的多行表达式
        'no-unexpected-multiline': 'error',
        // 禁用一成不变的循环条件
        'no-unmodified-loop-condition': 'error',
        // 禁止可以在有更简单的可替代的表达式时使用三元操作符
        'no-unneeded-ternary': 'error',
        // 禁止在return、throw、continue 和 break语句之后出现不可达代码
        'no-unreachable': 'error',
        // 禁止在 finally 语句块中出现控制流语句
        'no-unsafe-finally': 'error',
        // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
        'require-atomic-updates': ['error', { allowProperties: true }],
        // 不允许否定关系运算符的左操作数 disallow negating the left operand of relational operators
        'no-unsafe-negation': 'error',
        // 禁止出现未使用过的表达式
        'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
        // 禁用未使用过的标签
        'no-unused-labels': 'error',
        // 禁止出现未使用过的变量
        'no-unused-vars': 'error',
        // 不允许在变量定义之前使用它们
        'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
        // 禁止不必要的 .call() 和 .apply()
        'no-useless-call': 'error',
        // 禁止不必要的计算性能键对象的文字
        'no-useless-computed-key': 'error',
        // ES2015 会提供默认的类构造函数。因此，没有必要提供一个空构造函数或一个简单地委托给它的父类的构造函数，
        'no-useless-constructor': 'error',
        // 禁用不必要的转义字符
        'no-useless-escape': 'error',
        // 禁止不必要的 catch 子句
        'no-useless-catch': 'error',
        // 不允许将导入、导出和解构分配重命名为相同的名称。
        'no-useless-rename': 'error',
        // 多余的return语句。
        'no-useless-return': 'error',
        // 要求使用 let 或 const 而不是 var
        'no-var': 'error',
        // 禁用 void 操作符
        'no-void': 'error',
        // 禁止在注释中使用特定的警告术语
        'no-warning-comments': 'error',
        // 禁止属性前有空白
        'no-whitespace-before-property': 'error',
        // 禁用 with 语句
        'no-with': 'error',
        // 当写if，else，while，do-while，和for语句，身体部分可以是单个语句而不是块。为这些单一语句强制执行一个一致的位置会很有用。
        'nonblock-statement-body-position': ['error', 'below', { overrides: { if: 'any' } }],
        // 要求或禁止对象字面量中方法和属性使用简写语法
        'object-shorthand': ['error', 'always'],
        // 强制函数中的变量要么一起声明要么分开声明
        'one-var': ['error', 'never'],
        // 要求或禁止在 var 声明周围换行
        'one-var-declaration-per-line': ['error', 'initializations'],
        // 要求或禁止在可能的情况下要求使用简化的赋值操作符
        'operator-assignment': ['error', 'always'],
        // 要求或禁止块内填充
        'padded-blocks': ['error', 'never'],
        // 所有return语句之前需要空行，如换行前换行符规则。
        'padding-line-between-statements': 'off',
        // 优先使用扩展("...")而不是Object.assign
        'prefer-object-spread': 'error',
        // 要求使用箭头函数作为回调
        'prefer-arrow-callback': 'error',
        // 要求使用 const 声明那些声明后不再被修改的变量
        'prefer-const': 'error',
        // 优先使用数组和对象解构
        'prefer-destructuring': 'off',
        // 禁止调用parseInt()或Number.parseInt()使用两个参数调用：一个字符串; 和2（二进制），8（八进制）或16（十六进制）的基数选项。
        'prefer-numeric-literals': 'error',
        // 确保承诺只被Error对象拒绝。
        'prefer-promise-reject-errors': 'off',
        // Suggest using the rest parameters instead of arguments
        'prefer-rest-params': 'error',
        // 要求使用扩展运算符而非 .apply()
        'prefer-spread': 'error',
        // 要求对象字面量属性名称用引号括起来
        'quote-props': ['error', 'consistent-as-needed'],
        // 强制使用一致的反勾号、双引号或单引号
        'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        // 强制在parseInt()使用基数参数
        'radix': 'off',
        // 异步函数必须具有await表达式
        'require-await': 'error',
        // 要求generator 函数内有 yield
        'require-yield': 'error',
        // 强制剩余和扩展运算符及其表达式之间有空格
        'rest-spread-spacing': ['error', 'never'],
        // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
        'semi': ['error', 'always', { omitLastInOneLineBlock: true }],
        // 强制分号之前和之后使用一致的空格
        'semi-spacing': 'error',
        // 强制分号位于配置的位置。
        'semi-style': ['error', 'last'],
        // 强制模块内的 import 排序
        'sort-imports': 'off',
        // 所有属性定义并验证所有变量是按字母顺序排序的。
        'sort-keys': 'off',
        // 要求同一个声明块中的变量按顺序排列
        'sort-vars': 'off',
        // 强制在块之前使用一致的空格驼峰
        'space-before-blocks': ['error', 'always'],
        // 强制在 function的左括号之前使用一致的空格  always (默认) 要求在参数的 ( 前面有一个空格; never 禁止在参数的 ( 前面有空格。; ignore 忽略
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always', //  针对匿名函数表达式 (比如 function () {})。
                named: 'never', // 针对命名的函数表达式 (比如 function foo () {})。
                asyncArrow: 'always' // 针对异步的箭头函数表达式 (比如 async () => {})。
            }
        ],
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': ['error', 'always'],
        // 要求或禁止使用严格模式指令
        'strict': ['error', 'global'],
        // switch语句内的空格
        'switch-colon-spacing': 'error',
        // var foo = Symbol("some description"); 一定要有描述
        'symbol-description': 'error',
        // 模板标签函数与其模板文字之间是否有空格
        'template-tag-spacing': 'error',
        // 要求或禁止 Unicode BOM
        'unicode-bom': 'error',
        // 不允许比较"NaN"。判断数字是否是NaN，得用isNaN
        'use-isnan': 'error',
        // 强制 typeof 表达式与有效的字符串进行比较
        'valid-typeof': 'error',
        // 要求所有的 var 声明出现在它们所在的作用域顶部
        'vars-on-top': 'off',
        // 要求 IIFE 使用括号括起来
        'wrap-iife': ['error', 'inside'],
        // 要求正则表达式被括号括起来
        'wrap-regex': 'off',
        // 强制在 yield* 表达式中 * 周围使用空格
        'yield-star-spacing': 'error',

        /*
         * 此规则在标记的关闭括号之前强制执行断线
         * 要求或禁止 “Yoda” 条件
         */
        'yoda': 'error',

        'vue/comment-directive': 'error',
        // 规则将查找 JSX 中使用的变量，并将它们标记为已使用
        'vue/jsx-uses-vars': 'error',
        // 此规则将查找所使用的变量，并将其标记为已使用
        'vue/script-setup-uses-vars': 'error',
        // 此规则要求组件名称始终是多字的，但根组件除外，以及 Vue 提供的内置组件，例如或 。这可防止与现有和未来的 HTML 元素发生冲突，因为所有 HTML 元素都是一个词
        'vue/multi-word-component-names': 'off',
        // 不允许使用箭头功能来定义观察者 (watch),原因是箭头函数绑定的this不是vue实例
        'vue/no-arrow-functions-in-watch': 'error',
        // 计算属性（computed）中禁止出现异步函数 ，
        'vue/no-async-in-computed-properties': 'error',
        // 禁止出现相同的属性名（props，data，methods，computed等中不能有相同的属性名称）
        'vue/no-dupe-keys': 'error',
        // if条件中禁止出现相同的条件
        'vue/no-dupe-v-else-if': 'error',
        // 不允许重复的属性
        'vue/no-duplicate-attributes': 'error',
        // 在data中禁止访问计算属性（computed）因为data中computed的属性还没被生成
        'vue/no-computed-properties-in-data': 'error',
        // 禁止改变props中的属性
        'vue/no-mutating-props': 'error',
        // 不允许在props中使用保留字段
        'vue/no-reserved-props': 'error',
        // 禁止出现语法错误 （解析错误）
        'vue/no-parsing-error': 'error',
        // 禁止覆盖保留关键字
        'vue/no-reserved-keys': 'error',
        // 组件的data必须是一个返回函数
        'vue/no-shared-component-data': 'error',
        // 禁止修改计算属性
        'vue/no-side-effects-in-computed-properties': 'error',
        // 禁止给template添加key
        'vue/no-template-key': 'error',
        // 禁止在<textarea></textarea>使用{{aa}}  如  【<textarea>{{ message }}</textarea> 错误 】
        'vue/no-textarea-mustache': 'error',
        // 禁止出现未使用的组件
        'vue/no-unused-components': 'error',
        // 禁止 v-for中出现未使用的变量
        'vue/no-unused-vars': 'error',
        // 禁止 在同一组件或标签上同时出现v-if和v-for
        'vue/no-use-v-if-with-v-for': 'error',
        // 禁止在<template>标签上有任何无用的属性
        'vue/no-useless-template-attributes': 'error',
        // 禁止出现未绑定 v-bind:is 的 <component/>
        'vue/require-component-is': 'error',
        // 检测props中变量的的type属性是否正确
        'vue/require-prop-type-constructor': 'error',
        // vue的render(h)函数必须包含返回值
        'vue/require-render-return': 'error',
        // v-for中必须绑定key
        'vue/require-v-for-key': 'error',
        // props 中默认值为Array或者Object时必须是以函数形式返回
        'vue/require-valid-default-prop': 'error',
        // 计算属性（computed）中必须有返回值 即：必须全部 return
        'vue/return-in-computed-property': 'error',

        /**
         * 当绑定两个v-on事件是强制使用修饰器（.exact） 【 <button v-on:click.exact="foo" v-on:click.ctrl="foo"></button> 正确】 【<button v-on:click="foo" v-on:click.ctrl="foo"></button>  错误】
         *  .exact作用如下
         *    <button @click.ctrl="onClick">A</button> //即使 Alt 或 Shift 被一同按下时也会触发
         *    <button @click.ctrl.exact="onCtrlClick">A</button> //有且只有 Ctrl 被按下的时候才触发
         *    <button @click.exact="onClick">A</button> 没有任何系统修饰符被按下的时候才触发
         *
         */
        'vue/use-v-on-exact': 'error',
        // $nextTick()必须跟一个回调函数，且$nextTick()只能出现一个参数 【this.$nextTick(callback, anotherCallback);错误（不能含有两个参数）】 【this.$nextTick;错误（没有参数）】
        'vue/valid-next-tick': 'error',
        // 检查每个模板根是否有效 <template></template> (注意不能出现包含空白的根模板，除非根模板带有src路径，且带有src的根模板不能包含任何组件或标签)
        'vue/valid-template-root': 'error',
        // 强制验证v-bind的有效性
        'vue/valid-v-bind': 'error',
        // 强制验证v-cloak的有效性
        'vue/valid-v-cloak': 'error',
        // 强制验证v-else-if的有效性
        'vue/valid-v-else-if': 'error',
        // 强制验证v-else的有效性
        'vue/valid-v-else': 'error',
        // 强制验证v-for的有效性
        'vue/valid-v-for': 'error',
        // 强制验证v-html的有效性
        'vue/valid-v-html': 'error',
        // 强制验证v-if的有效性
        'vue/valid-v-if': 'error',
        // 强制验证v-model的有效性
        'vue/valid-v-model': 'error',
        // 强制验证v-on的有效性
        'vue/valid-v-on': 'error',
        // 强制验证v-once的有效性
        'vue/valid-v-once': 'error',
        // 强制验证v-pre的有效性
        'vue/valid-v-pre': 'error',
        // 强制验证v-show的有效性
        'vue/valid-v-show': 'error',
        // 强制验证v-slot的有效性
        'vue/valid-v-slot': 'error',
        // 强制验证v-text的有效性
        'vue/valid-v-text': 'error',

        /**
         * **********************************************************************************************************************
         *
         *
         * vue3.0专用规则
         * vue3.0专用规则
         *
         *
         *
         ***************************************************************************************************************************
         */
        // data 必须是以函数返回 （vue3.0）
        'vue/no-deprecated-data-object-declaration': 'error',
        // 禁止使用已经废弃的生命周期函数（vue3.0）
        'vue/no-deprecated-destroyed-lifecycle': 'error',
        //  禁止使用 $listeners 因为 $listeners 已废弃 （vue3.0）
        'vue/no-deprecated-dollar-listeners-api': 'error',
        // 禁止使用 .$scopedSlots 因为 .$scopedSlots 已废弃 （vue3.0）
        'vue/no-deprecated-dollar-scopedslots-api': 'error',
        //  禁止使用 $on,$off,$once 因为 $on,$off,$once 已废弃 （vue3.0）
        'vue/no-deprecated-events-api': 'error',
        //  禁止使用 {{ msg | filter }}  filter已废弃 （vue3.0）
        'vue/no-deprecated-filter': 'error',
        //  禁止使用 <template functional> 因为 functional声明已废弃 （vue3.0）
        'vue/no-deprecated-functional-template': 'error',
        // 禁止在非 <component>中使用 is或:is （vue3.0）
        'vue/no-deprecated-html-element-is': 'error',
        // 禁止使用 <template inline-template>   因为 inline-template 声明已废弃 （vue3.0）
        'vue/no-deprecated-inline-template': 'error',
        // 禁止在props中使用this,因为在vue3.0中props已经不能访问this了 （vue3.0）
        'vue/no-deprecated-props-default-this': 'error',
        // 禁止在 <router-link> 使用tag属性 因为在vue3.0+vueRouter4.0中tag已被弃用  （vue3.0）
        'vue/no-deprecated-router-link-tag-prop': 'error',
        // 禁止在  <template> 使用 scope 因为 vue2.5.0+中scope已被废弃 （vue3.0）
        'vue/no-deprecated-scope-attribute': 'error',
        // 禁止在  <template> 使用 slot 因为 vue2.6.0+中slot已被废弃， 可使用 v-slot （vue3.0）
        'vue/no-deprecated-slot-attribute': 'error',
        // 禁止在  <template> 使用 slot-scope 因为 vue2.6.0+中slot-scope已被废弃， 可使用 v-slot （vue3.0）
        'vue/no-deprecated-slot-scope-attribute': 'error',
        // 禁止使用.sync修饰 因为.sync修饰已废弃 （vue3.0）
        'vue/no-deprecated-v-bind-sync': 'error',
        // 禁止使用 v-is 因为v-is已废弃  可以使用 is（vue3.0）
        'vue/no-deprecated-v-is': 'error',
        // 禁止使用.native修饰 因为.native修饰已废弃 （vue3.0）
        'vue/no-deprecated-v-on-native-modifier': 'error',
        // 禁止使用KeyboardEvent.keyCode的修饰，而应该使用KeyboardEvent.key 的修饰【 @keyup.page-down 正确】 【 @keyup.34 错误 】 （vue3.0）
        'vue/no-deprecated-v-on-number-modifiers': 'error',
        // 禁止使用Vue.config.keyCodes={f1:'112'} vue3.0因为不再支持config.keyCode定义全局键码 （vue3.0）
        'vue/no-deprecated-vue-config-keycodes': 'error',
        // <script setup> 中禁止 export （vue3.0）
        'vue/no-export-in-script-setup': 'error',
        // 禁止 async setup(){} 中声生命周期函数应该出现在 await 之前（vue3.0）
        'vue/no-lifecycle-after-await': 'error',
        // ref() 定义的属性必须使用.value修改，而不能直接修改（vue3.0）
        'vue/no-ref-as-operand': 'error',
        // setup(props){} 中禁止结构或其他破坏响应的方式赋值（vue3.0）
        'vue/no-setup-props-destructure': 'error',
        // 禁止  <template v-for=""></template>  中:key必须出现在 同级（vue3.0）
        'vue/no-v-for-template-key-on-child': 'error',
        // 禁止 async setup(){} 中watch函数应该出现在 await 之前（vue3.0）
        'vue/no-watch-after-await': 'error',
        // 禁止 禁止非法使用 this.$slots.default如解构或this.$slots.default.filter()等都是非法的（vue3.0）
        'vue/require-slots-as-functions': 'error',
        // 禁止<transition>中组件没有控制显示隐藏的组件即子必须有v-if或v-show等控制显示隐藏的绑定（vue3.0）
        'vue/require-toggle-inside-transition': 'error',
        // emits中 必须返回如果带有一个条件 返回true（vue3.0）
        'vue/return-in-emits-validator': 'error',
        // 验证defineEmits()的有效性，不能出现两次不能是空函数等（vue3.0）
        'vue/valid-define-emits': 'error',
        // 验证defineProps()的有效性，不能出现两次不能是空函数等（vue3.0）
        'vue/valid-define-props': 'error',
        // 验证 v-is 的有效性（vue3.0）
        'vue/valid-v-is': 'error',
        //   验证 v-memo 的有效性（vue3.0）
        'vue/valid-v-memo': 'error',
        // emits必须声明
        'vue/require-explicit-emits': 'error',
        // v-on 名称使用驼峰命名
        'vue/v-on-event-hyphenation': ['error', 'never', { autofix: true }],

        /**
         * **********************************************************************************************************
         * vue3.0专用完
         ****************************************************************************************************************
         */

        // 禁止v-model自定义修饰器
        'vue/no-custom-modifiers-on-v-model': 'error',
        // 禁止两个根元素或根元素为字符串
        'vue/no-multiple-template-root': vueVersionsNumb >= 3 ? 'off' : 'error',
        // 禁止<template v-for="">中定义key必须在下级定义key
        'vue/no-v-for-template-key': vueVersionsNumb >= 3 ? 'off' : 'error', // 在vue2.x中禁止在<template v-for>中出现key
        // 要求组件的参数使用驼峰命名 如： <MyComponent myProp="prop" />  正确】 【<MyComponent my-prop="prop" />  错误】
        'vue/attribute-hyphenation': ['error', 'never'],
        // v-model禁止出现vue3的写法 如： 【<MyComponent v-model="foo" />  正确】 【<MyComponent v-model:aaa="foo" /> 错误】
        'vue/no-v-model-argument': vueVersionsNumb >= 3 ? 'off' : 'error',
        // 组件名称必须大驼峰命名或kebab-case 如设置成PascalCase之后： 【 export default {  name: 'MyComponent' } 或者 Vue.component('MyComponent', {}) 正确 】 【 export default {  name: 'my-component' } 或者 Vue.component('my-component', {}) 错误 】
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
        // v-bind.sync中禁止出现计算 【 <MyComponent :aaa.sync="todo.name"/>  正确】 【 <MyComponent :aaa.sync="(a?.b).c" />或者<MyComponent :aaa.sync="foo + bar" /> 错误】
        'vue/valid-v-bind-sync': 'error',
        // 组件属性换行和对齐方式 （暂未启用）
        'vue/first-attribute-linebreak': [
            'error',
            {
                singleline: 'beside', // 单行属性是不允许换行
                multiline: 'below' // 多行时对齐tab
            }
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always'
            }
        ],
        // 标签的中括号的空格
        'vue/html-closing-bracket-spacing': [
            'error',
            {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always'
            }
        ],
        // 禁止缺少结束标签
        'vue/html-end-tags': 'error',
        // 禁止
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1, // 属性缩进4个空格
                baseIndent: 1, // 顶层缩进 <template></template> <script></script> <style></style>
                closeBracket: {
                    startTag: 0, // 开始标签的>符号
                    endTag: 0, // 结束标签
                    selfClosingTag: 0 // 关闭标签
                }
            }
        ],
        // 属性使用单引号
        'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
        // 自闭合标签相关规则
        'vue/html-self-closing': [
            'error',
            {
                html: { void: 'always', normal: 'never', component: 'never' },
                svg: 'always',
                math: 'always'
            }
        ],
        // 标签内超过几个attr就换行
        'vue/max-attributes-per-line': ['off', { singleline: { max: 6 }, multiline: { max: 1 } }],
        // 多行dom换行规则
        'vue/multiline-html-element-content-newline': [
            'error',
            {
                ignoreWhenEmpty: true, // 没有子组件禁止换行 （true禁止换行，false允许换行）
                allowEmptyLines: false // 禁止周围有空行 （true允许，false禁止）
            }
        ],
        // {{ msg }} 两边空行
        'vue/mustache-interpolation-spacing': ['error', 'always'],
        // 禁止多余的空格
        'vue/no-multi-spaces': 'error',
        // 禁止属性等号两边有空格
        'vue/no-spaces-around-equal-signs-in-attribute': 'error',
        // 禁止重复的变量 主要在v-for中
        'vue/no-template-shadow': 'error',
        // 禁止重复注册同一组件
        'vue/one-component-per-file': 'error',
        //  js中prop的属性只能用小驼峰命名
        'vue/prop-name-casing': ['error', 'camelCase'],
        //  prop必须设置默认值但是布尔值除外
        'vue/require-default-prop': 'error',
        // prop 必须指定类型
        'vue/require-prop-types': 'error',
        // 换行规则
        'vue/singleline-html-element-content-newline': 'off',
        // v-bind使用简写
        'vue/v-bind-style': ['error', 'shorthand'],
        // v-on使用简写
        'vue/v-on-style': ['error', 'shorthand'],
        // v-slot使用简写
        'vue/v-slot-style': ['error', 'shorthand'],
        // 属性按顺序排列
        'vue/attributes-order': 'error',
        // <template></template> <script></script> <style></style>按顺序排列
        'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }],
        // 禁止使用除了js以外的其他语言 【<script></script>  正确】  【<script lang="ts"></script>  错误】
        'vue/block-lang': ['error', { script: { lang: 'js' } }],
        // 禁止无意义的<template></template>
        'vue/no-lone-template': 'error',
        //  this.$scopedSlots() 只能传递一个参数
        'vue/no-multiple-slot-args': 'error',
        // 禁止使用 v-html 指令
        'vue/no-v-html': 'off',
        // js中按顺序排列name，props，data等特定周期事件
        'vue/order-in-components': 'error',
        // 在<template></template> 中禁止使用this
        'vue/this-in-template': 'error',
        // 此规则在打开后和关闭块标签之前强制换行
        'vue/block-tag-newline': ['error', { singleline: 'consistent', multiline: 'always', maxEmptyLines: 0 }],
        // 只允许 script-setup 和 composition-api语法
        'vue/component-api-style': ['error', ['script-setup', 'composition']],

        // 组件必须使用大驼峰写法（除了el-开头的，即element-plus可以使用中横线写法，这样可以更好区分自定义组件和其他组件 （PascalCase写法的组件在vscode中颜色跟其他组件颜色不一样） ）【 <CoolComponent /> 正确】 【 <cool-component /> 错误】
        'vue/component-name-in-template-casing': ['error', 'PascalCase', { ignores: ['/^el-/'], registeredComponentsOnly: false }],
        // v-on 事件名称的命名规则camelCase
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        // 注释换行规则
        'vue/html-comment-content-newline': ['error', { singleline: 'never', multiline: 'always' }],
        // 注释先后不换行
        'vue/html-comment-content-spacing': ['error', 'always'],
        // v-html和v-text不允许出现子元素  【<div v-html="aa"></div> 正确】【<div v-html="aa">{{ aaa }}</div> 错误】
        'vue/no-child-content': 'error',
        // 注释强制缩进
        'vue/html-comment-indent': ['error', 2],
        // 组件名和文件一致
        'vue/match-component-file-name': ['error', { extensions: ['vue', 'jsx'], shouldMatchCase: false }],
        // nextTick只能是回调函数不能是promise
        'vue/next-tick-style': ['error', 'callback'],
        // 参数不能为字符串（在配置多国语言是强烈推荐开启）
        'vue/no-bare-strings-in-template': 'off',
        // vue inheritance 防止重复继承
        'vue/no-duplicate-attr-inheritance': 'error',
        // 禁止异步注册 expose
        'vue/no-expose-after-await': 'error',
        // 禁止在model中出现无效键
        'vue/no-invalid-model-keys': 'error',
        // 禁止出现空的template，script，style
        'vue/no-empty-component-block': 'error',
        // 标签中禁止出现不合法的 target="_blank"
        'vue/no-template-target-blank': 'error',
        // class中禁止绑定多个对象 【:class="[{'foo': isFoo}, {'bar': isBar}] 错】 【 :class="[{'foo': isFoo, 'bar': isBar}]"  对】
        'vue/no-multiple-objects-in-class': 'error',
        // 禁止出现潜在的拼写错误
        'vue/no-potential-component-option-typo': 'error',
        // 组件名不允许出现保留的名称
        'vue/no-reserved-component-names': 'error',
        // 不允许异步调用受限方法
        'vue/no-restricted-call-after-await': 'error',
        // beforeRouteEnter周期内不允许使用this
        'vue/no-this-in-before-route-enter': 'error',
        // 不允许出现未定义的属性
        'vue/no-undef-properties': 'error',
        // 不允许在指定版本上禁止不受支持的 Vue.js语法 ( 必须设置当前使用版本 )
        'vue/no-unsupported-features': ['error', { version: vueVersions }],
        // 不允许出现未使用的props
        'vue/no-unused-properties': 'error',
        // 不允许吧计算属性当作方法来调用
        'vue/no-use-computed-property-like-method': 'error',
        // 不允许未使用的ref
        'vue/no-unused-refs': 'error',
        // 禁止不必要的插值写法 如：{{'aaa'}} 应直接写aaa
        'vue/no-useless-mustaches': 'error',
        // 禁止不必要的v-bind写法 如：:foo="'aaa'" 应改为 foo="aaa"
        'vue/no-useless-v-bind': 'error',
        // <template></template> <script></script> <style></style>留空行
        'vue/padding-line-between-blocks': ['error', 'always'],
        // 全局注册组件时emits要求直接定义成函数
        'vue/require-emit-validator': 'off',
        // 必须给组件设置名称
        'vue/require-name-property': 'error',
        // 代码缩进
        'vue/script-indent': ['error', 4, { baseIndent: 1, switchCase: 1 }],
        // v-on绑定的方法没有参数时禁止添加括号
        'vue/v-on-function-call': ['error', 'never'],
        // 最大长度规则
        'vue/max-len': [
            'error',
            {
                code: 180,
                template: 180,
                ignoreUrls: true,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreStrings: true,
                ignoreRegExpLiterals: true,
                ignoreTemplateLiterals: true,
                ignoreHTMLTextContents: true,
                ignoreHTMLAttributeValues: true
            }
        ],
        // 不允许出现特殊字符
        'vue/no-irregular-whitespace': ['error', { skipRegExps: true }],
        // 不允许在插值中调用方法 【 <div> {{ foo() }} </div> 错误】 【 <div> {{ foo }} </div> 正确】
        'vue/no-restricted-syntax': 'off',

        /**
         * ********************************************************************************************************************************************
         *
         *
         *
         * 以下规则有对应的 <template> 专用的 vue规则
         *   如： array-bracket-newline 有对应的 vue/array-bracket-newline
         *
         *
         * ***********************************************************************************************************************************************
         */
        // 【对应 vue/array-bracket-newline】在数组开括号后和闭括号前强制换行
        'array-bracket-newline': ['error', 'consistent'],
        // 【对应 vue/array-bracket-spacing】 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        'array-bracket-spacing': ['error', 'never'],
        // 【对应 vue/arrow-spacing】 要求箭头函数空格
        'arrow-spacing': ['error', { before: true, after: true }],
        // 【对应 vue/block-spacing】 禁止或强制在单行代码块中使用空格(禁用)
        'block-spacing': ['error', 'always'],
        // 【对应 vue/brace-style】 缩进风格  后面的{必须与if在同一行，java风格。
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        // 【对应 vue/camelcase】双峰驼命名格式
        'camelcase': 'off',
        // 【对应 vue/comma-dangle】数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，always-multiline：多行模式必须带逗号，单行模式不能带逗号
        'comma-dangle': ['error', 'never'],
        // 【对应 vue/comma-spacing】控制逗号前后的空格
        'comma-spacing': ['error', { before: false, after: true }],
        // 【对应 vue/comma-style】控制逗号在行尾出现还是在行首出现 (默认行尾)
        'comma-style': ['error', 'last'],
        // 【对应 vue/dot-location】强制object.key 中 "."的位置;      property "."应与属性在同一行；object   "."应与对象名在同一行
        'dot-location': ['error', 'property'],
        // 【对应 vue/dot-notation】强制使用.号取属性
        'dot-notation': 'error',
        // 【对应 vue/eqeqeq】使用 === 替代 == allow-null允许null和undefined==
        'eqeqeq': ['error', 'always'],
        // 【对应 vue/func-call-spacing】要求或禁止函数标识符与其调用之间的间隔
        'func-call-spacing': ['error', 'never'],
        // 【对应 vue/key-spacing】强制在对象字面量的属性中键和值之间使用一致的间距
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        // 【对应 vue/keyword-spacing】强制在关键字前后使用一致的空格 (前后腰需要)
        'keyword-spacing': ['error', { before: true, after: true }],
        // 【对应 vue/no-constant-condition】禁止在条件中使用常量表达式  【if (false) {} 错】 【if (aa===false) {} 对】
        'no-constant-condition': 'error',
        // 【对应 vue/no-empty-pattern】禁止使用空解构模式no-empty-pattern
        'no-empty-pattern': 'error',
        // 【对应 vue/no-extra-parens】禁止不必要的括号 //(a * b) + c;//报错
        'no-extra-parens': 'off',
        // 【对应 vue/no-sparse-arrays】禁用稀疏数组
        'no-sparse-arrays': 'error',
        // 【对应 vue/no-useless-concat】禁止不必要的字符串字面量或模板字面量的连接
        'no-useless-concat': 'error',
        // 【对应 vue/object-curly-newline】强制花括号内换行符的一致性
        'object-curly-newline': ['error', { consistent: true }],
        // 【对应 vue/object-curly-spacing】强制在花括号中使用一致的空格
        'object-curly-spacing': ['error', 'always'],
        // 【对应 vue/object-property-newline】强制将对象的属性放在不同的行上
        'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        // 【对应 vue/operator-linebreak】强制操作符使用一致的换行符
        'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
        // 【对应 vue/prefer-template】要求使用模板字面量而非字符串连接
        'prefer-template': 'off',
        // 【对应 vue/space-in-parens】强制在圆括号内使用一致的空格
        'space-in-parens': ['error', 'never'],
        // 【对应 vue/space-infix-ops】要求操作符周围有空格
        'space-infix-ops': 'error',
        // 【对应 vue/space-unary-ops】强制在一元操作符前后使用一致的空格
        'space-unary-ops': 'error',
        // 【对应 vue/template-curly-spacing】要求或禁止模板字符串中的嵌入表达式周围空格的使用
        'template-curly-spacing': ['error', 'never'],
        // 不允许丢失精度的数值
        'no-loss-of-precision': 'error',

        /**
         * *****************************************************************************************************************************************
         *
         *
         *
         * 以下规则都是扩展规则具体用法参照普通规则 ，唯一区别是他们只适用在<template>中
         *   如： vue/array-bracket-newline 请参照 array-bracket-newline
         *
         *
         * ***********************************************************************************************************************************************
         */
        // 【参照 array-bracket-newline】在数组开括号后和闭括号前强制换行
        'vue/array-bracket-newline': ['error', 'consistent'],
        // 【参照 array-bracket-spacing】 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        'vue/array-bracket-spacing': ['error', 'never'],
        // 【参照 arrow-spacing】 要求箭头函数空格
        'vue/arrow-spacing': ['error', { before: true, after: true }],
        // 【参照 block-spacing】 禁止或强制在单行代码块中使用空格(禁用)
        'vue/block-spacing': ['error', 'always'],
        // 【参照 brace-style】 缩进风格  后面的{必须与if在同一行，java风格。
        'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        // 【参照 camelcase】双峰驼命名格式
        'vue/camelcase': 'off',
        // 【参照 comma-dangle】always-multiline：多行模式必须带逗号，单行模式不能带逗号
        'vue/comma-dangle': ['error', 'only-multiline'],
        // 【参照 comma-spacing】控制逗号前后的空格
        'vue/comma-spacing': ['error', { before: false, after: true }],
        // 【参照 comma-style】控制逗号在行尾出现还是在行首出现 (默认行尾)
        'vue/comma-style': ['error', 'last'],
        // 【参照 dot-location】强制object.key 中 "."的位置;      property "."应与属性在同一行；object   "."应与对象名在同一行
        'vue/dot-location': ['error', 'property'],
        // 【参照 dot-notation】强制使用.号取属性
        'vue/dot-notation': 'error',
        // 【参照 eqeqeq】使用 === 替代 == allow-null允许null和undefined==
        'vue/eqeqeq': ['error', 'always'],
        // 【参照 func-call-spacing】要求或禁止函数标识符与其调用之间的间隔
        'vue/func-call-spacing': ['error', 'never'],
        // 【参照 key-spacing】强制在对象字面量的属性中键和值之间使用一致的间距
        'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],
        // 【参照 keyword-spacing】强制在关键字前后使用一致的空格 (前后腰需要)
        'vue/keyword-spacing': ['error', { before: true, after: true }],
        // 【参照 no-constant-condition】禁止在条件中使用常量表达式  【if (false) {} 错】 【if (aa===false) {} 对】
        'vue/no-constant-condition': 'error',
        // 【参照 no-empty-pattern】禁止使用空解构模式no-empty-pattern
        'vue/no-empty-pattern': 'error',
        // 【参照 no-extra-parens】禁止不必要的括号 //(a * b) + c;//报错
        'vue/no-extra-parens': 'off',
        // 【参照 no-sparse-arrays】禁用稀疏数组
        'vue/no-sparse-arrays': 'error',
        // 【参照 no-useless-concat】禁止不必要的字符串字面量或模板字面量的连接
        'vue/no-useless-concat': 'error',
        // 【参照 object-curly-newline】强制花括号内换行符的一致性
        'vue/object-curly-newline': ['error', { consistent: true }],
        // 【参照 object-curly-spacing】强制在花括号中使用一致的空格
        'vue/object-curly-spacing': ['error', 'always'],
        // 【参照 object-property-newline】强制将对象的属性放在不同的行上
        'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        // 【参照 operator-linebreak】强制操作符使用一致的换行符
        'vue/operator-linebreak': ['error', 'before'],
        // 【参照 prefer-template】要求使用模板字面量而非字符串连接
        'vue/prefer-template': 'off',
        // 【参照 space-in-parens】强制在圆括号内使用一致的空格
        'vue/space-in-parens': ['error', 'never'],
        // 【参照 space-infix-ops】要求操作符周围有空格
        'vue/space-infix-ops': 'error',
        // 【参照 space-unary-ops】强制在一元操作符前后使用一致的空格
        'vue/space-unary-ops': 'error',
        // 【参照 template-curly-spacing】要求或禁止模板字符串中的嵌入表达式周围空格的使用
        'vue/template-curly-spacing': ['error', 'never'],
        // 不允许丢失精度的数值
        'vue/no-loss-of-precision': 'error',

        /**
         *
         * eslint-plugin-vue 8.2.0新增规则
         *
         * **/
        // 在js中引入组件只能是大驼峰命名
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        // 在js中引入组件只能是大驼峰命名
        'vue/prefer-separate-static-class': 'error',

        /**
         *
         * eslint-plugin-vue 8.4.0新增规则
         *
         * **/
        // 【参照 space-in-parens】 要求或禁止对象字面量中方法和属性使用简写语法
        'vue/object-shorthand': ['error', 'always'],
        //  此规则不允许在组件上使用 v-text / v-html。(原生组件（如div）还是可以使用)
        'vue/no-v-text-v-html-on-component': 'error',
        // 不允许出现未注册的组件  [此规则无法检查全局注册的组件和在 mixins 中注册的组件，除非您将它们添加为忽略模式的一部分。]
        'vue/no-undef-components': 'off', // 废弃vue/no-unregistered-components用此规则代替
        // 要求对象字面量属性名称用引号括起来
        'vue/quote-props': ['error', 'consistent-as-needed']
    }
};
