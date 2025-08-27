

const colorOptions = [
  "#FF9600",  //橙色
  "#B3B300",  //暗黄
  "#84E6D6",  //青绿
  "#EC93D0",  //粉紫
  "#02EDED",  //青色
  "#B592D9",  //浅紫
  "#12ED71",  //绿色
  "#FBDAE6",  //浅粉
  "#B79BF8",  //紫蓝
  "#FFFF00",  //黄色
  "#FFD599",  //浅橙
  "#BEE477",  //黄绿
  "#86A2F3",  //粉蓝
  "#01C5C4",  //蓝绿
  "#EA3BF7",  //紫色
  "#AAC370",  //墨绿
  "#FB5050",  //红色
  "#C5E6FB"   //天蓝

]
const createStyle = (indicator, colorIndex) => {
  const base = { key: 'value', title: `${indicator.name}: ` }
  const color = colorOptions[colorIndex % colorOptions.length]

  return {
    line: { ...base, type: 'line', color },
    bar: {
      ...base,
      type: 'bar',
      baseValue: 0,
      color(data, options) {
        const value = data.current.technicalIndicatorData?.value ?? 0
        if (value > 0) return options.bar.upColor
        if (value < 0) return options.bar.downColor
        return options.bar.noChangeColor
      },
      isStroke({ prev, current }) {
        return (prev.technicalIndicatorData?.value ?? 0) > (current.technicalIndicatorData?.value ?? 0)
      }
    },
    circle: {
      ...base,
      type: 'circle',
      isStroke: false,
      color: (_, options) => options.circle.color
    }
  }[indicator.lineStyle]
}

export default (indicator, colorIndex, precision) => {
  const plot = createStyle(indicator, colorIndex)
  const prefix = indicator.paneId === 'candle_pane'
    ? '主图_' : `副图${indicator.paneId.replace('pane', '')}_`

  return {
    name: 'VAL_' + indicator.name,
    shortName: `${prefix}模组计算值`,
    plots: [plot],
    precision: Math.max(precision, 2),
    styles: {
      margin: { top: 0.2, bottom: 0.1 },
      line: { size: indicator.lineWidth },
      bar: { upColor: '#EF5350', downColor: '#26A69A', noChangeColor: '#888888' },
      circle: { color: '#FFFA70' }
    },
    calcTechnicalIndicator: (kLineDataList) =>
      kLineDataList.map(data => ({ value: data[indicator.name] ?? 0 }))
  }
}
