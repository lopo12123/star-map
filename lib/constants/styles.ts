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
    Red = '#E03131',
    Grape = '#9C36B5',
    Indigo = '#3B5BDB',
    Cyan = '#15AAB0',
    Green = '#2F9E44',
    Yellow = '#F08C00',
    Pink = '#C2255C',
    Violet = '#6741D9',
    Blue = '#1971C2',
    Teal = '#099268',
    Lime = '#66A80F',
    Orange = '#E8590C',
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
