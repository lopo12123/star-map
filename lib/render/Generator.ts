import { SMGroup, SMNode } from "../declare/types";
import { SMNodeStyleDefault } from "../constants/styles";

type SMNodePrefabProps = {
    id: string
    groupId: SMGroup
    level: number
    trackOrder: number
    title: string
    content: string
}

class SMNodePrefab {
    private readonly _node: SMNode

    constructor(props: SMNodePrefabProps) {
        this._node = {
            id: props.id,
            prompt: {
                title: props.title,
                content: props.content
            },
            layout: {
                level: props.level,
                trackOrder: props.trackOrder,
                left: 0, top: 0
            }
        }
    }

    toSMNode() {
        return this._node
    }
}

class SMLinkPrefab {
    constructor() {
    }

    toLink() {

    }
}

class SMPromptPrefab {
    constructor() {
    }

    toPrompt() {

    }
}

/**
 * @description 生成器 生成节点
 */
abstract class Generator {
    public static Node(props: SMNodePrefabProps): SMNodePrefab {
        return new SMNodePrefab(props)
    }

    public static Link(): SMLinkPrefab {
        return new SMLinkPrefab()
    }

    public static Prompt(): SMPromptPrefab {
        return new SMPromptPrefab()
    }
}

export {
    SMNodePrefab,
    SMLinkPrefab,
    Generator
}
