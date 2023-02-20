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
    groupId?: SMGroup
    /**
     * @description 节点的基本信息
     */
    prompt?: {
        /**
         * @description 标题
         */
        title?: string
        /**
         * @description 文本
         */
        content?: string
    }
    /**
     * @description 解析得到的布局信息 不要修改
     */
    readonly layout?: {
        /**
         * @description 所处层级 (中心节点为 0)
         */
        level: number
        /**
         * @description 在轨道上的顺序 小于0 - 左侧; 大于0 右侧; 从上到下绝对值递增
         */
        trackOrder: number
        /**
         * @description 左 距离
         */
        left: number
        /**
         * @description 上 距离
         */
        top: number
    }
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
     * @description 解析得到的布局信息 不要修改
     */
    readonly layout?: {
        /**
         * @description 所处层级 (中心节点为 0)
         */
        level: number
        /**
         * @description 线条起点节点id. 根节点此值为 `null`
         */
        from: string
        /**
         * @description 线条终点节点id. 叶节点此值为 `null`
         */
        to: string
    }
}

// region 组别
/**
 * @description 组别枚举
 */
type SMGroup = 'meta' | 'author' | 'table' | 'fig' | 'reference'
    | 'title' | 'keyword' | 'abstract' | 'body' | 'conclusion' | 'support'
type SMAIResultGroup = 'OtherScientificTerm' | 'Method' | 'Material' | 'Generic' | 'Task' | 'Metric'
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
    abstract: SMAbstractNode
    body: SMBodyNode[]
    conclusion: SMConclusionNode
    support: SMSupportNode
}
/**
 * @description 子树 - 元数据
 */
type SMMetaNode = {
    // 期刊
    publication_name?: string
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
    page?: string
}
/**
 * @description 子树 - 作者
 */
type SMAuthorNode = {
    // 0 - 通讯作者; 1.. 一作
    index: number
    role?: string  // 'corresp'
    name?: string
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
    content: string
    base: string
    word?: string[]
}
/**
 * @description 子树 - 图片
 */
type SMFigNode = {
    name: string
    content: string
    base: string
    word?: string[]
}
/**
 * @description 子树 - 引用
 */
type SMReferenceNode = {
    doi?: string
    title?: string
    author?: { orcid: string, name: string }[]
    publication_name?: string
    issn?: { print_issn?: string, online_issn?: string }
    url?: string
    date?: { published_date?: string, submission?: string }
    volume?: string
    issue?: string
    page?: string
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
type SMAbstractNode = { [k in SMAIResultGroup]: string[] }
/**
 * @description 子树 - 主体
 */
type SMBodyNode = {
    name: string
    content?: { [k in SMAIResultGroup]: string[] }
}
/**
 * @description 子树 - 结论
 */
type SMConclusionNode = { [k in SMAIResultGroup]: string[] }
/**
 * @description 子树 - 科研支持
 */
type SMSupportNode = string  // todo
// endregion

export type {
    SMNode,
    SMLink,
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
