/**
 * @description star map node
 */
export type SMNode = {
    /**
     * @description 节点id. 默认为随机 uuid
     */
    id?: string
    /**
     * @description 节点所属分组id(独立维护, 可与线条id重复). 默认为 node-default
     */
    groupId?: string
    /**
     * @description 节点样式. `inherit` 继承父节点, `default` 默认样式
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
 * @description
 */
export type SMLink = {
    /**
     * @description 线条id(独立维护, 可与节点id重复). 默认为随机 uuid
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
     */
    style?: SMLinkStyle | 'default'
}

/**
 * @description
 */
export type SMPrompt = {
    /**
     * @description title
     */
    title?: string
    /**
     * @description description
     */
    desc?: string
}

export type SMNodeStyle = {}

export type SMLinkStyle = {}

export type SMPromptStyle = {}