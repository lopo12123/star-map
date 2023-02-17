/**
 * @description 节点样式
 */
type SMNodeStyle = {}

/**
 * @description 线条样式
 */
type SMLinkStyle = {}

/**
 * @description 文字框样式
 */
type SMPromptStyle = {
    width: number
    height: number
    radius: number
    enTextColor: string
    zhTextColor: string
    backgroundColor: string
}

export type {
    SMNodeStyle,
    SMLinkStyle,
    SMPromptStyle,
}
