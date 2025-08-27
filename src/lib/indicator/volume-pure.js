export default {
  name: 'CJL',
  series: 'volume',
  precision: 0,
  shouldCheckParamCount: false,
  shouldFormatBigNumber: false,
  plots: [
    {
      key: 'volume',
      title: '成交量：',
      type: 'bar',
      baseValue: 0,
      minValue: 0,
      color: (data, options) => {
        const kLineData = data.current.kLineData || {}
        if (kLineData.close > kLineData.open) return options.bar.upColor
        if (kLineData.close < kLineData.open) return options.bar.downColor
        return options.bar.noChangeColor
      }
    }
  ],
  calcTechnicalIndicator: (dataList) =>
    dataList.map(kLineData => ({ volume: kLineData.volume || 0 }))
}
