import { SMNodeStyle, SMLinkStyle, SMPromptStyle } from "../declare/styles";

// region 节点
/**
 * @description 节点默认样式
 */
const SMNodeStyleDefault: SMNodeStyle = {}
// endregion

// region 线条
/**
 * @description 线条默认样式
 */
const SMLinkStyleDefault: SMLinkStyle = {}
// endregion

// region 文字框
/**
 * @description 文字框默认样式
 */
const SMPromptStyleDefault: SMPromptStyle = {
    width: 282,
    height: 80,
    radius: 4,
    enTextColor: '#ffffff',
    zhTextColor: '#ffffff',
    backgroundColor: '#cccccc'
}

/**
 * @description 文字框默认最大行数
 */
const SMPromptMaxLine = 1
/**
 * @description 文字框默认单行最大字符数
 */
const SMPromptMaxInLine = 10
// endregion

// region 颜色
/**
 * @description 色卡
 */
enum SMPalette {
    Red = 'red',
    Grape = 'grape',
    Indigo = 'indigo',
    Cyan = 'cyan',
    Green = 'green',
    Yellow = 'yellow',
    Pink = 'pink',
    Violet = 'violet',
    Blue = 'blue',
    Teal = 'teal',
    Lime = 'lime',
    Orange = 'orange',
}

// endregion

export {
    SMNodeStyleDefault,
    SMLinkStyleDefault,
    SMPromptStyleDefault,
    SMPromptMaxLine,
    SMPromptMaxInLine,
    SMPalette,
}
