// eslint-js 和 eslint-vue 同时存在时用jsbeautifyrc 格式化js，用 prettier 格式化vue
module.exports = {
    printWidth: 160, // 最大长度
    tabWidth: 4, // 一个tab相当于多少个空格
    useTabs: false, // 使用tab缩进
    semi: true, // 是否在每个语句的末尾添加分号
    singleQuote: true, // 使用单引号而不是双引号。
    quoteProps: 'consistent', // 对象的key是否用引号括起来,有三种选项 "as-needed"|"consistent"|"preserve"
    requirePragma: false, // 若为true，文件顶部加了 /*** @prettier */或/*** @format */的文件才会被格式化
    insertPragma: false, // 当requirePragma参数为true时,此参数为true将向@format标记后面添加一个换行符
    proseWrap: 'preserve', // 超过最大宽度是否换行 "always" - 如果超过最大宽度，请换行。 "never" - 不要换行。  "preserve" - 按原样显示。首先在v1.9.0中提供
    arrowParens: 'always', // 在单个箭头函数参数周围加上括号    avoid" - 尽可能省略parens。例：x => x  "always" - 始终包括parens。例：(x) => x
    bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    endOfLine: 'auto', //  结尾是 \n   \r   \n\r   auto
    htmlWhitespaceSensitivity: 'css', // 是否显示HTML文件中的空格。 有效选项： 'css' - 尊重CSS display属性的设置。 'strict' - 空格被认为是敏感的。 'ignore' - 空格被认为是不敏感的
    bracketSameLine: false, // 如果为true则把'>'放在末尾而不是单独放一行
    // jsxBracketSameLine: false, // 如果为true则在jsx中把'>'放在末尾而不是单独放一行 （已经弃用）
    jsxSingleQuote: false, // 在JSX中使用单引号而不是双引号
    trailingComma: 'none', // 在数组对象等末尾添加逗号  "none" - 没有尾随逗号。 "es5" - 在ES5中有效的尾随逗号（对象，数组等）  "all" - 尽可能使用尾随逗号（包括函数参数）。这需要 nodejs 8
    vueIndentScriptAndStyle: true, // 是否给vue中的 <script> <style>标签加缩进
    embeddedLanguageFormatting: 'off' // 自动识别并格式化字符串中的代码
};
