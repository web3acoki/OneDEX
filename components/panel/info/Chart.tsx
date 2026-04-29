import React from "react"
import { useWindowDimensions, View, type ViewStyle } from "react-native"
import { LineChart } from "react-native-wagmi-charts"
import { Stop } from "react-native-svg"
import { OneDexText } from "@/components/content/general/OneDexText"
import type { ChartPoint } from "@/services/hyperliquid/candleSnapshot"

type ChartProps = {
  symbol: string
  points: ChartPoint[]
}

export function Chart({ symbol, points }: ChartProps) {
  const { width: screenWidth } = useWindowDimensions()
  const chartData = points.length ? points : [{ timestamp: Date.now() - 300000, value: 0 }, { timestamp: Date.now(), value: 0 }]
  const latest = chartData[chartData.length - 1]
  const dayAgoTime = latest.timestamp - 86_400_000
  const dayAgoPoint = chartData.find((item) => item.timestamp >= dayAgoTime) ?? chartData[0]
  const isUp = latest.value >= dayAgoPoint.value
  const lineColor = isUp ? "#00BC7D" : "#EF4444"
  const chartViewportWidth = screenWidth - 64
  const chartDrawWidth = chartViewportWidth + 36

  const chartWrapStyle: ViewStyle = {
    marginTop: 8,
    marginHorizontal: 16,
    minHeight: 240,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    overflow: "hidden",
  }

  const chartStyle: ViewStyle = {
    marginTop: 12,
    height: 180,
    overflow: "hidden",
    alignItems: "flex-end",
  }

  const chartInnerStyle: ViewStyle = {
    width: chartDrawWidth,
    height: 180,
  }

  return <>
    <View style={chartWrapStyle}>
      <OneDexText text={`${symbol} Price`} fontSize={16} lineHeight={24} />
      <View style={chartStyle}>
        <View style={chartInnerStyle}>
          <LineChart.Provider data={chartData}>
            <LineChart width={chartDrawWidth} height={180}>
              <LineChart.Path color={lineColor} width={2}>
                <LineChart.Gradient>
                  <Stop offset="0%" stopColor={lineColor} stopOpacity={0.42} />
                  <Stop offset="45%" stopColor={lineColor} stopOpacity={0.2} />
                  <Stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                </LineChart.Gradient>
              </LineChart.Path>
            </LineChart>
          </LineChart.Provider>
        </View>
      </View>
    </View>
  </>
}

