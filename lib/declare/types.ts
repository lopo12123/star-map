import { SMLinkStyle, SMNodeStyle, SMPromptStyle } from "./styles";

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
     * @description 所处层级 (中心节点为 0)
     */
    readonly level?: number
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

// region 组别
/**
 * @description 组别枚举
 */
type SMGroup = 'meta' | 'author' | 'table' | 'fig' | 'reference'
    | 'title' | 'keyword' | 'abstract' | 'body' | 'conclusion' | 'support'
// endregion

// region DTO
/**
 * @description 后台返回的树结构
 */
type SMTree = {
    doi: string
    meta: SMMetaNode
    author: SMAuthorNode[]
    table: SMTableNode[]
    fig: SMFigNode[]
    reference: SMReferenceNode[]
    title: SMTitleNode
    keyword: SMKeywordsNode[]
    abstract: SMAbstractNode[]
    body: SMBodyNode[]
    conclusion: SMConclusionNode[]
    support: SMSupportNode
}
/**
 * @description 子树 - 元数据
 */
type SMMetaNode = {
    // 期刊
    publication_name?: { full?: string, short?: string }
    // issn
    issn?: { print_issn?: string, online_issn?: string }
    // url
    url?: string
    // 日期
    date?: { published_date?: string, submission?: string }
    // 卷
    volume?: string
    // 期
    issue?: string
    // 页范围
    page?: { from?: string, to?: string }
}
/**
 * @description 子树 - 作者
 */
type SMAuthorNode = {
    // 0 - 通讯作者; 1.. 一作
    level: number
    email?: string
    address?: string
    orcid?: string
    phone?: string
    // 单位
    affiliation?: {
        // todo
    }[]
}
/**
 * @description 子树 - 表格
 */
type SMTableNode = {
    name: string
    keywords: string[]
}
/**
 * @description 子树 - 图片
 */
type SMFigNode = {
    name: string
    keywords: string[]
}
/**
 * @description 子树 - 引用
 */
type SMReferenceNode = {
    doi?: string
    title?: string
    author?: string[]
    publication_name?: { full?: string, short?: string }
    issn?: { print_issn?: string, online_issn?: string }
    url?: string
    date?: { published_date?: string, submission?: string }
    volume?: string
    issue?: string
    page?: { from?: string, to?: string }
    // 直接展示不用管
    note?: string
}
/**
 * @description 子树 - 题目
 */
type SMTitleNode = string
/**
 * @description 子树 - 关键词
 */
type SMKeywordsNode = string
/**
 * @description 子树 - 摘要
 */
type SMAbstractNode = {
    name: string
    children?: string[]
}
/**
 * @description 子树 - 主体
 */
type SMBodyNode = {
    name: string
    children?: string[]
}
/**
 * @description 子树 - 结论
 */
type SMConclusionNode = string
/**
 * @description 子树 - 科研支持
 */
type SMSupportNode = never  // todo
// endregion

export type {
    SMNode,
    SMLink,
    SMPrompt,
    SMGroup,

    SMTree,
    SMMetaNode,
    SMAuthorNode,
    SMTableNode,
    SMFigNode,
    SMReferenceNode,
    SMTitleNode,
    SMKeywordsNode,
    SMAbstractNode,
    SMBodyNode,
    SMConclusionNode,
    SMSupportNode,
}
