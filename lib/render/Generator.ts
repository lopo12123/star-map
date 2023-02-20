import { SMGroup, SMNode } from "../declare/types";
import { SMNodeStyleDefault } from "../constants/styles";

type SMNodePrefabProps = {
    id: string
    level: number
    trackOrder: number
    group: SMGroup
    title: string
    content: string
}

class SMNodePrefab {
    private readonly _config: SMNodePrefabProps
    private _position: { dx: number, dy: number } = { dx: 0, dy: 0 }

    constructor(props: SMNodePrefabProps) {
        this._config = props
    }

    getXY(): { dx: number, dy: number } {
        return { ...this._position }
    }

    getConfig(): SMNodePrefabProps {
        return { ...this._config }
    }

    toHTML(dx: number, dy: number) {
        this._position = { dx, dy }

        // todo
        return this._config
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
