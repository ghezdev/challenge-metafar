import { Box } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import React, { useCallback, useMemo } from 'react'
import dayjs from 'dayjs'
import endsWith from 'lodash.endswith'
import { ITimeSerieData } from '../../../types/twelvedata'

const Chart: React.FC<Props> = ({ data, period, ticks }) => {
  const formatterXAxis = useCallback(
    (date: Date) => {
      const showDate =
        endsWith(period, 'day') ||
        endsWith(period, 'week') ||
        endsWith(period, 'month')
      return dayjs(date).format(showDate ? 'DD/MM/YY' : 'HH:mm')
    },
    [period]
  )

  const xAxis = useMemo(
    () =>
      data.length > 0
        ? data.map(({ datetime }) => dayjs(datetime).toDate()).reverse()
        : [],
    [data]
  )

  const yAxis = useMemo(
    () => (data.length > 0 ? data.map(({ close }) => Number(close)) : []),
    [data]
  )

  return (
    xAxis.length > 0 &&
    yAxis.length > 0 && (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <LineChart
          xAxis={[
            {
              data: xAxis,
              scaleType: 'time',
              valueFormatter: formatterXAxis,
              tickNumber: ticks,
            },
          ]}
          series={[{ data: yAxis }]}
          width={1000}
          height={400}
        />
      </Box>
    )
  )
}

interface Props {
  period: string
  ticks: number
  data: ITimeSerieData[]
}

export default React.memo(Chart)
