/**
 * @description 计算旋转后的便宜 dx dy
 * @param curr 当前序号 (从0开始)
 * @param total 总数 (Arrow.length)
 * @param radius 半径
 * @param side 左 | 右
 * @param keep 上下(单侧)保留距离
 */
const calc_rotate = (curr: number, total: number, radius: number, side: 'left' | 'right', keep: number = 17): { dx: number, dy: number } => {
    const y_total = (radius - keep) * 2
    const y_each = y_total / (total - 1)
    const dy = -radius + keep + y_each * curr
    const dx = Math.sqrt(radius * radius - dy * dy) * (side === 'left' ? -1 : 1)
    return { dx, dy }
}

export {
    calc_rotate
}
