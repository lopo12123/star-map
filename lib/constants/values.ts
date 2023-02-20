import { SMGroup } from "../declare/types";
import { SMPalette } from "./styles";

/**
 * @description 组别名称颜色
 */
const SMGroupMap: { [k in SMGroup]: { color: SMPalette, label: string } } = {
    meta: { color: SMPalette.Red, label: '元数据' },
    author: { color: SMPalette.Grape, label: "作者" },
    table: { color: SMPalette.Indigo, label: "表格" },
    fig: { color: SMPalette.Cyan, label: "图片" },
    reference: { color: SMPalette.Green, label: "引用" },
    title: { color: SMPalette.Pink, label: "题目" },
    keyword: { color: SMPalette.Violet, label: "关键词" },
    abstract: { color: SMPalette.Blue, label: "摘要" },
    body: { color: SMPalette.Teal, label: "主体" },
    conclusion: { color: SMPalette.Lime, label: "结论" },
    support: { color: SMPalette.Orange, label: "科研支持" },
} as const

/**
 * @description 数值
 */
const Constants = {
    TrackRadius0: 0,
    TrackRadius1: 180,
    TrackRadius2: 550,
    TrackRadius3: 893,
    NodeRadius: 12,
    PromptWidth: 298,
    PromptHeight: 50,
    PromptGap: 12
}

export {
    SMGroupMap,
    Constants,
}
