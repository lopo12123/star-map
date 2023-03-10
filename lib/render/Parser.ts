import {
    SMAbstractNode,
    SMAuthorNode, SMBodyNode, SMConclusionNode,
    SMKeywordsNode,
    SMMetaNode,
    SMNode,
    SMReferenceNode, SMSupportNode,
    SMTableNode,
    SMTitleNode,
    SMTree
} from "../declare/types";
import { Generator, SMNodePrefab } from "./Generator";
import { getId } from "../utils";

const Numbers = [ '', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十' ]

/**
 * @description 解析器, 解析树生成对应的配置信息
 */
class Parser {
    /**
     * @description 节点池
     */
    private nodes = new Map<string, SMNode>()
    /**
     * @description 线条池
     */
    private links = new Map<string, SMNode>()

    // 临时存储
    private nodes_lv1 = new Map<string, SMNodePrefab>()
    private nodes_lv2 = new Map<string, SMNodePrefab>()
    private nodes_lv3 = new Map<string, SMNodePrefab>()

    /**
     * @description 节点在层级中的顺序
     */
    private levelOrder = { lv1_l: 0, lv1_r: 0, lv2_l: 0, lv2_r: 0, lv3_l: 0, lv3_r: 0 }

    /**
     * @description 解析 meta 子树
     */
    private parseMeta(meta: SMMetaNode) {
        const { publication_name, issn, url, date, volume, issue, page } = meta

        const id = getId()
        this.nodes_lv1.set(id, Generator.Node({
            id,
            group: 'meta',
            level: 1,
            trackOrder: --this.levelOrder.lv1_l,
            title: 'meta',
            content: '元数据'
        }))

        if(publication_name) {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'meta',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: '期刊',
                content: ''
            }))

            const id2 = getId()
            this.nodes_lv3.set(id2, Generator.Node({
                id: id2,
                group: 'meta',
                level: 3,
                trackOrder: --this.levelOrder.lv3_l,
                title: publication_name,
                content: ''
            }))
        }

        if(issn) {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'meta',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: 'issn',
                content: ''
            }))

            for (let key in issn) {
                // @ts-ignore
                if(!issn[key]) continue
                const id = getId()
                this.nodes_lv3.set(id, Generator.Node({
                    id,
                    group: 'meta',
                    level: 3,
                    trackOrder: --this.levelOrder.lv3_l,
                    // @ts-ignore
                    title: issn[key],
                    content: ''
                }))
            }
        }

        if(url) {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'meta',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: 'url',
                content: ''
            }))

            const id2 = getId()
            this.nodes_lv3.set(id, Generator.Node({
                id: id2,
                group: 'meta',
                level: 3,
                trackOrder: --this.levelOrder.lv3_l,
                // @ts-ignore
                title: url,
                content: ''
            }))
        }

        if(date) {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'meta',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: 'date',
                content: ''
            }))

            for (let key in date) {
                // @ts-ignore
                if(!date[key]) continue
                const id = getId()
                this.nodes_lv3.set(id, Generator.Node({
                    id,
                    group: 'meta',
                    level: 3,
                    trackOrder: --this.levelOrder.lv3_l,
                    // @ts-ignore
                    title: date[key],
                    content: ''
                }))
            }
        }

        if(volume) {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'meta',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: 'volume',
                content: ''
            }))

            const id2 = getId()
            this.nodes_lv3.set(id, Generator.Node({
                id: id2,
                group: 'meta',
                level: 3,
                trackOrder: --this.levelOrder.lv3_l,
                // @ts-ignore
                title: volume,
                content: ''
            }))
        }

        if(issue) {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'meta',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: 'volume',
                content: ''
            }))

            const id2 = getId()
            this.nodes_lv3.set(id, Generator.Node({
                id: id2,
                group: 'meta',
                level: 3,
                trackOrder: --this.levelOrder.lv3_l,
                // @ts-ignore
                title: issue,
                content: ''
            }))
        }

        if(page) {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'meta',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: 'page',
                content: ''
            }))

            const id2 = getId()
            this.nodes_lv3.set(id2, Generator.Node({
                id: id2,
                group: 'meta',
                level: 3,
                trackOrder: --this.levelOrder.lv3_l,
                // @ts-ignore
                title: page,
                content: ''
            }))
        }
    }

    /**
     * @description 解析 Body 子树
     */
    private parseBody(bodies: SMBodyNode[]) {
        if(bodies.length === 0) return

        const id = getId()
        this.nodes_lv1.set(id, Generator.Node({
            id,
            group: 'body',
            level: 1,
            trackOrder: --this.levelOrder.lv1_l,
            title: 'body',
            content: '主体'
        }))

        bodies.forEach(body => {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id: id,
                group: 'body',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: body.name,
                content: ''
            }))

            for (let body_content_item in body.content) {
                // @ts-ignore
                body.content[body_content_item]?.forEach(body_content_sub => {
                    const id = getId()
                    this.nodes_lv3.set(id, Generator.Node({
                        id: id,
                        group: 'body',
                        level: 3,
                        trackOrder: --this.levelOrder.lv3_l,
                        title: body_content_sub,
                        content: ''
                    }))
                })
            }
        })
    }

    /**
     * @description 解析 author 子树
     */
    private parseAuthor(authors: SMAuthorNode[]) {
        if(authors.length === 0) return

        const id = getId()
        this.nodes_lv1.set(id, Generator.Node({
            id,
            group: 'author',
            level: 1,
            trackOrder: ++this.levelOrder.lv1_r,
            title: 'author',
            content: '作者'
        }))

        authors.forEach(author => {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'author',
                level: 2,
                trackOrder: ++this.levelOrder.lv2_r,
                title: author.role === 'corresp' ? '通讯作者' : `第${ Numbers[author.index] }作者`,
                content: author.name ?? ''
            }))

            author.affiliation_list?.forEach(affiliation => {
                const id = getId()
                this.nodes_lv3.set(id, Generator.Node({
                    id,
                    group: 'author',
                    level: 3,
                    trackOrder: ++this.levelOrder.lv3_r,
                    title: affiliation.affiliation_type + ': ' + affiliation.affiliation,
                    content: ''
                }))
            })
        })
    }

    /**
     * @description 解析 fig 子树
     */
    private parseFig(figs: SMTableNode[]) {
        if(figs.length === 0) return

        const id = getId()
        this.nodes_lv1.set(id, Generator.Node({
            id,
            group: 'fig',
            level: 1,
            trackOrder: --this.levelOrder.lv1_l,
            title: 'fig',
            content: '图片'
        }))

        figs.forEach(fig => {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'fig',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: fig.name,
                content: fig.content
            }))

            fig.word?.forEach(w => {
                const id = getId()
                this.nodes_lv3.set(id, Generator.Node({
                    id,
                    group: 'fig',
                    level: 3,
                    trackOrder: --this.levelOrder.lv3_l,
                    title: w,
                    content: ''
                }))
            })
        })
    }

    /**
     * @description 解析 table 子树
     */
    private parseTable(tables: SMTableNode[]) {
        if(tables.length === 0) return

        const id = getId()
        this.nodes_lv1.set(id, Generator.Node({
            id,
            group: 'table',
            level: 1,
            trackOrder: --this.levelOrder.lv1_l,
            title: 'table',
            content: '图片'
        }))

        tables.forEach(table => {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id,
                group: 'table',
                level: 2,
                trackOrder: --this.levelOrder.lv2_l,
                title: table.name,
                content: table.content
            }))

            table.word?.forEach(w => {
                const id = getId()
                this.nodes_lv3.set(id, Generator.Node({
                    id,
                    group: 'table',
                    level: 3,
                    trackOrder: --this.levelOrder.lv3_l,
                    title: w,
                    content: ''
                }))
            })
        })
    }

    /**
     * @description 解析 reference 子树
     */
    private parseReference(references: SMReferenceNode[]) {
        // todo
    }

    /**
     * @description 解析 title 子树
     */
    private parseTitle(title: SMTitleNode) {
        const id = getId()
        this.nodes_lv1.set(id, Generator.Node({
            id,
            group: 'title',
            level: 1,
            trackOrder: ++this.levelOrder.lv1_r,
            title: 'title',
            content: '题目'
        }))

        const id2 = getId()
        this.nodes_lv2.set(id2, Generator.Node({
            id: id2,
            group: 'title',
            level: 2,
            trackOrder: ++this.levelOrder.lv2_r,
            title: title,
            content: ''
        }))
    }

    /**
     * @description 解析 keyword 子树
     */
    private parseKeyword(keywords: SMKeywordsNode[]) {
        if(keywords.length === 0) return

        const id = getId()
        this.nodes_lv1.set(id, Generator.Node({
            id,
            group: 'keyword',
            level: 1,
            trackOrder: ++this.levelOrder.lv1_r,
            title: 'keyword',
            content: '关键词'
        }))

        keywords.forEach(keyword => {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id: id,
                group: 'keyword',
                level: 2,
                trackOrder: ++this.levelOrder.lv2_r,
                title: keyword,
                content: ''
            }))
        })
    }

    /**
     * @description 解析 Abstract 子树
     */
    private parseAbstract(abstracts: SMAbstractNode) {
        const id = getId()
        this.nodes_lv1.set(id, Generator.Node({
            id,
            group: 'abstract',
            level: 1,
            trackOrder: ++this.levelOrder.lv1_r,
            title: 'abstract',
            content: '摘要'
        }))

        for (let abstract_item in abstracts) {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id: id,
                group: 'abstract',
                level: 2,
                trackOrder: ++this.levelOrder.lv2_r,
                title: abstract_item,
                content: ''
            }))

            // @ts-ignore
            abstracts[abstract_item]?.forEach((abstract_sub: string) => {
                const id = getId()
                this.nodes_lv3.set(id, Generator.Node({
                    id: id,
                    group: 'abstract',
                    level: 3,
                    trackOrder: ++this.levelOrder.lv3_r,
                    title: abstract_sub,
                    content: ''
                }))
            })
        }
    }

    /**
     * @description 解析 Conclusion 子树
     */
    private parseConclusion(conclusions: SMConclusionNode) {
        const id = getId()
        this.nodes_lv1.set(id, Generator.Node({
            id,
            group: 'conclusion',
            level: 1,
            trackOrder: ++this.levelOrder.lv1_r,
            title: 'conclusion',
            content: '结论'
        }))

        for (let conclusion_item in conclusions) {
            const id = getId()
            this.nodes_lv2.set(id, Generator.Node({
                id: id,
                group: 'conclusion',
                level: 2,
                trackOrder: ++this.levelOrder.lv2_r,
                title: conclusion_item,
                content: ''
            }))

            // @ts-ignore
            conclusions[conclusion_item].forEach(conclusion_sub => {
                const id = getId()
                this.nodes_lv3.set(id, Generator.Node({
                    id: id,
                    group: 'conclusion',
                    level: 3,
                    trackOrder: ++this.levelOrder.lv3_r,
                    title: conclusion_sub,
                    content: ''
                }))
            })
        }
    }

    /**
     * @description 解析 Support 子树
     */
    private parseSupport(support: SMSupportNode) {
        // todo 处理 SMSupportNode
    }

    constructor(tree: SMTree) {
        // 左侧
        this.parseMeta(tree.meta)
        this.parseBody(tree.body)
        this.parseTable(tree.table)
        this.parseFig(tree.fig)
        this.parseReference(tree.reference)

        // 右侧
        this.parseTitle(tree.title)
        this.parseKeyword(tree.keyword)
        this.parseAuthor(tree.author)
        this.parseAbstract(tree.abstract)
        this.parseConclusion(tree.conclusion)
    }

    getLv1() {
        return [ ...this.nodes_lv1.values() ].map(v => v.getConfig())
    }

    getLv2() {
        return [ ...this.nodes_lv2.values() ].map(v => v.getConfig())
    }

    getLv3() {
        return [ ...this.nodes_lv3.values() ].map(v => v.getConfig())
    }

    dispose() {

    }

    /**
     * @description 零消耗调用, 获取解析结果用于渲染
     */
    toHTMLElements() {

    }
}

export {
    Parser
}
