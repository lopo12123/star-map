import {SMLinkStyle, SMNodeStyle, SMPromptStyle} from "./styles";

/**
 * @description 节点
 */
type SMNode = {
    /**
     * @description 节点id. 默认为随机 uuid
     */
    id?: string
    /**
     * @description 节点所属分组id(独立维护id池, 与线条id可存在重复). 默认为 node-default
     */
    groupId?: string
    /**
     * @description 节点样式. `inherit` 继承父节点, `default` 默认样式
     * @default {@link SMNodeStyleDefault}
     */
    style?: SMNodeStyle | 'inherit' | 'default'
    /**
     * @description 节点的基本信息
     */
    prompt?: SMPrompt
    /**
     * @description 从此节点出发的线条
     */
    link?: Omit<SMLink, 'from' | 'to'>
    /**
     * @description children
     */
    children?: SMNode[]
}

/**
 * @description 线条
 */
type SMLink = {
    /**
     * @description 线条id(独立维护id池, 与节点id可存在重复). 默认为随机 uuid
     */
    id?: string
    /**
     * @description 线条所属分组id. 默认为 link-default
     */
    groupId?: string
    /**
     * @description 线条起点节点id. 根节点此值为 `null`
     */
    from: string | null
    /**
     * @description 线条终点节点id. 叶节点此值为 `null`
     */
    to: string | null
    /**
     * @description 线条样式. `default` 默认样式
     * @default {@link SMLinkStyleDefault}
     */
    style?: SMLinkStyle | 'default'
}

/**
 * @description 节点文字框
 */
type SMPrompt = {
    /**
     * @description 标题
     */
    title?: string
    /**
     * @description 文本
     */
    content?: string
    /**
     * @description 最大行数
     * @default {@link SMPromptMaxLine}
     */
    maxLine?: number
    /**
     * @description 单行最大字符数
     * @default {@link SMPromptMaxInLine}
     */
    maxInLine?: number
    /**
     * @description 文字框样式
     * @default {@link SMPromptStyleDefault}
     */
    style?: SMPromptStyle | 'default'
}

export type {
    SMNode,
    SMLink,
    SMPrompt,
}