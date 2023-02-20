<script setup lang="ts">
import { Parser } from "../lib/render/Parser";
import TestTree from "./demo.json";
import { Constants, SMGroup } from "../lib";
import NodeWithPrompt from "./components/NodeWithPrompt.vue";
import { calc_rotate } from "./scripts/utils";

console.time('parse')
const parser = new Parser(TestTree)

type SMNodeConfig = {
    group: SMGroup
    title: string
    content: string
    dx: number
    dy: number
}

// 第一层级点位固定
const nodes_lv0 = <SMNodeConfig[]>[
    // 左侧
    { group: 'meta', title: 'Meta', content: '元数据', dx: -130, dy: -124 },
    { group: 'author', title: 'Author', content: '作者', dx: -168, dy: -63 },
    { group: 'table', title: 'Table', content: '表格', dx: -180, dy: -0 },
    { group: 'fig', title: 'Fig', content: '图片', dx: -168, dy: 63 },
    { group: 'reference', title: 'Reference', content: '引用', dx: -130, dy: 124 },
    // 右侧
    { group: 'title', title: 'Title', content: '题目', dx: 91, dy: -155 },
    { group: 'keyword', title: 'Keyword', content: '关键词', dx: 157, dy: -85 },
    { group: 'abstract', title: 'Abstract', content: '摘要', dx: 178, dy: -23 },
    { group: 'body', title: 'Body', content: '主体', dx: 178, dy: 23 },
    { group: 'conclusion', title: 'Conclusion', content: '结论', dx: 157, dy: 85 },
    { group: 'support', title: 'Support', content: '科研支持', dx: 91, dy: 155 },
]

// 第二层
const lv2 = parser.getLv2()
const lv2_count = lv2.length
const lv2_left = lv2.reduce((prev, curr) => prev + (curr.trackOrder < 0 ? 1 : 0), 0)
const nodes_lv2: SMNodeConfig[] = lv2.map(v => {
    const { group, title, content, trackOrder } = v
    return {
        group, title, content,
        ...calc_rotate(Math.abs(trackOrder) - 1, trackOrder < 0 ? lv2_left : (lv2_count - lv2_left), Constants.TrackRadius2, trackOrder < 0 ? 'left' : 'right')
    }
})
console.log(lv2)

console.timeEnd('parse')
</script>

<template>
    <div class="page">
        <div id="container" class="sm-scroll">
            <div class="sm-space">
                <div class="sm-galaxy">
                    <!-- <div class="sm-modal"/> -->
                    <div class="sm-canvas">
                        <!-- 轨道 -->
                        <div class="sm-track-1"/>
                        <div class="sm-track-2"/>
                        <div class="sm-track-3"/>

                        <!-- 中心 -->
                        <div class="sm-leader"/>

                        <!-- 一级点位 -->
                        <NodeWithPrompt
                            v-for="(node, idx) in nodes_lv0"
                            :key="`node-lv1-${node.group}`"
                            :title="node.title" :content="node.content"
                            :group="node.group"
                            :side="idx < 5 ? 'left' : 'right'"
                            :anchor="[node.dx,node.dy]"/>

                        <!-- 二级点位 -->
                        <NodeWithPrompt
                            v-for="(node, idx) in nodes_lv2"
                            :key="`node-lv2-${node.group}-${idx}`"
                            :title="node.title" :content="node.content"
                            :group="node.group"
                            :side="node.dx < 0 ? 'left' : 'right'"
                            :anchor="[node.dx,node.dy]"/>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "./style";

.page {
    position: relative;
    width: 100%;
    height: 100%;

    #container {
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        overflow: auto;
    }
}
</style>
