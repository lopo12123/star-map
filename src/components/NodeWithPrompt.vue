<script setup lang="ts">
import { SMGroup } from "../../lib";

const props = defineProps<{
    // 左侧或右侧
    side: 'left' | 'right'
    // 锚点偏移量
    anchor: [ dx: number, dy: number ]
    // 分组
    group: SMGroup
    // 英文标题
    title: string
    // 中文翻译
    content: string
}>()

const titleTextAlign = props.side === 'left' ? 'right' : 'left'
const flexDirection = props.side === 'left' ? 'row-reverse' : 'row'
const marginLeft = props.side === 'left' ? '-318px' : '-12px'
const direction = props.side === 'left' ? 'rtl' : 'ltr'
</script>

<template>
    <div class="sm-node-with-prompt"
         :style="{left: `calc(50% + ${anchor[0]}px)`,top: `calc(50% + ${anchor[1]}px)`}">
        <div :class="`sm-node-${group}`"/>
        <i class="gap"/>
        <div class="sm-prompt" :data-dx="anchor[0]" :data-dy="anchor[1]">
            <div class="title">{{ title }}</div>
            <div class="content">{{ content }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$PromptWidth: 298px;
$PromptHeight: 50px;
$PromptRadius: 8px;

.sm-inline {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.sm-node-with-prompt {
    position: absolute;
    width: 330px;
    height: 50px;
    margin-top: -25px;
    margin-left: v-bind(marginLeft);
    //direction: v-bind(direction);
    display: flex;
    flex-direction: v-bind(flexDirection);
    align-items: center;
    justify-content: flex-start;

    // region 节点
    @mixin sm-follower($color) {
        position: relative;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: rgba($color, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
            content: "";
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: $color radial-gradient(50% 50% at 50% 50%,
                rgba(255, 255, 255, 0.5) 0%,
                rgba(255, 255, 255, 0) 100%);
        }
    }

    .sm-node-meta {
        @include sm-follower(#E03131);
    }

    .sm-node-author {
        @include sm-follower(#9C36B5);
    }

    .sm-node-table {
        @include sm-follower(#3B5BDB);
    }

    .sm-node-fig {
        @include sm-follower(#15AAB0);
    }

    .sm-node-reference {
        @include sm-follower(#2F9E44);
    }

    .sm-node-title {
        @include sm-follower(#C2255C);
    }

    .sm-node-keyword {
        @include sm-follower(#6741D9);
    }

    .sm-node-abstract {
        @include sm-follower(#1971C2);
    }

    .sm-node-body {
        @include sm-follower(#099268);
    }

    .sm-node-conclusion {
        @include sm-follower(#66A80F);
    }

    .sm-node-support {
        @include sm-follower(#E8590C);
    }

    // endregion

    .gap {
        width: 8px;
    }

    // region 文本框
    .sm-prompt {
        position: relative;
        width: fit-content;
        max-width: $PromptWidth;
        height: $PromptHeight;
        padding: 4px 8px;
        border-radius: $PromptRadius;
        background: rgba(0, 0, 0, 0.64);
        backdrop-filter: blur(1px);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        .title {
            @extend .sm-inline;
            color: #fff;
            font-size: 16px;
            text-align: v-bind(titleTextAlign);
        }

        .content {
            @extend .sm-inline;
            color: #fff;
            font-size: 14px;
            opacity: 0.4;
        }
    }

    // endregion
}
</style>
