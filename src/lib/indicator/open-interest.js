const OPI = {
  name: 'OPI',
  series: 'volume',
  shouldCheckParamCount: false,
  shouldFormatBigNumber: false,

  plots: [
    {
      key: 'openInterest',
      title: '持仓量：',
      type: 'bar',
      baseValue: 0,
      color: (data, options) => {
        const delta = data.current.technicalIndicatorData?.openInterestDelta ?? 0
        if (delta > 0) {
          return options.bar.upColor   // 持仓量增加 → 绿色
        } else if (delta < 0) {
          return options.bar.downColor // 持仓量减少 → 红色
        }
        return options.bar.noChangeColor
      }
    }
  ],

  calcTechnicalIndicator: (dataList) => {
    return dataList.map((kLineData, i) => {
      const openInterest = kLineData.openInterest || 0
      const prev = dataList[i - 1]?.openInterest || 0
      const openInterestDelta = openInterest - prev
      return { openInterest, openInterestDelta }
    })
  }
}

export default OPI
