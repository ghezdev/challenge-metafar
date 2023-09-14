import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTwelvedata } from '../../contexts/twelvedata'
import { ITimeSerieData, StocksData } from '../../types/twelvedata'
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import {
  Circle,
  LockClockOutlined,
  QueryStatsOutlined,
  TimelineOutlined,
} from '@mui/icons-material'
import Chart from './components/Chart'
import { DateTimePicker } from '@mui/x-date-pickers'
import styles from './styles'
import { OPTIONS_PERIOD, SIZE_TICKS } from './consts'

const Symbol: React.FC = () => {
  const { state } = useLocation()
  const { storage, getTimeSerieBySymbol } = useTwelvedata()

  const symbolSelected = useMemo<StocksData>(() => state, [state])

  const [period, setPeriod] = useState<string>(OPTIONS_PERIOD[0])
  const [onLive, setOnLive] = useState<boolean>(true)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [canRefetch, setCanRefetch] = useState<boolean>(false)
  const [dataChart, setDataChart] = useState<ITimeSerieData[]>([])
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

  const areDatesValid = useMemo(
    () => dayjs(startDate).isValid() && dayjs(endDate).isValid(),
    [startDate, endDate]
  )

  useEffect(() => {
    const dates = {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    }

    getTimeSerieBySymbol(symbolSelected.symbol, {
      interval: period,
      outputsize: String(SIZE_TICKS),
      ...(!onLive && dates),
    })

    if (onLive) {
      const callbackInterval = () => {
        if (dayjs().second() === 5)
          getTimeSerieBySymbol(symbolSelected.symbol, {
            interval: period,
            outputsize: String(SIZE_TICKS),
          })
      }

      const intervalId = setInterval(callbackInterval, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [symbolSelected, period, onLive])

  useEffect(() => {
    if (onLive && storage.timeSerie.length > 0) {
      setDataChart(storage.timeSerie)
      return
    }

    setDataChart(storage.timeSerie || [])
  }, [storage.timeSerie])

  useEffect(() => {
    if (isFirstRender && !storage.timeSerieLoading && dataChart.length > 0) {
      setIsFirstRender(false)
    }
  }, [storage.timeSerieLoading])

  const handleOnChangeDatePicker = (
    hookState: React.Dispatch<React.SetStateAction<string>>,
    value: Dayjs
  ) => {
    const date = dayjs(value as Dayjs)
    if (date.isValid()) {
      hookState(date.format('YYYY-MM-DD HH:mm'))
      setCanRefetch(true)
    }
  }

  const isLoading = useMemo(() => {
    if (isFirstRender) return storage.timeSerieLoading

    return onLive
      ? storage.timeSerieLoading || dataChart.length === 0
      : storage.timeSerieLoading
  }, [storage.timeSerieLoading, dataChart, onLive, isFirstRender])

  return (
    <>
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Typography align="center" variant="h5" fontWeight="bold" mt={1}>
            {symbolSelected.symbol} - {symbolSelected.name} -{' '}
            {symbolSelected.currency}
          </Typography>
          <Button
            size="small"
            disabled={onLive}
            onClick={() => {
              if (!onLive) {
                setOnLive(true)
                setCanRefetch(true)
              }
            }}
            sx={styles.buttonOnLive}
            startIcon={<Circle color={onLive ? 'error' : 'disabled'} />}
          >
            <Typography
              variant="h6"
              color={onLive ? 'error' : 'disabled'}
              mt={0.5}
            >
              EN VIVO
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={styles.filtersContainer}>
        <Box>
          <FormControl size="small" sx={styles.intervalContainer}>
            <InputLabel id="period-select-label">Intervalo</InputLabel>
            <Select
              labelId="period-select-label"
              id="period-select"
              value={period}
              label="Age"
              onChange={(e) => setPeriod(e.target.value)}
            >
              {OPTIONS_PERIOD.map((optionPeriod) => (
                <MenuItem key={optionPeriod} value={optionPeriod}>
                  {optionPeriod}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={styles.filtarDatesContainer}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              label="Fecha de inicio"
              slotProps={{ textField: { size: 'small' } }}
              disableFuture
              sx={{ width: 250 }}
              maxDateTime={dayjs(endDate).subtract(5, 'minute')}
              onChange={(value) =>
                handleOnChangeDatePicker(setStartDate, value as Dayjs)
              }
            />
          </DemoContainer>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              label="Fecha de fin"
              slotProps={{ textField: { size: 'small' } }}
              disableFuture
              sx={{ width: 250 }}
              minDateTime={dayjs(startDate).add(5, 'minute')}
              onChange={(value) =>
                handleOnChangeDatePicker(setEndDate, value as Dayjs)
              }
            />
          </DemoContainer>
          <IconButton
            sx={{ mt: 0.25 }}
            disabled={!areDatesValid || !canRefetch}
            onClick={() => {
              setOnLive(false)
              setCanRefetch(false)
            }}
          >
            <TimelineOutlined fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      {isLoading ? (
        <Box sx={styles.progressContainer}>
          <CircularProgress />
        </Box>
      ) : isFirstRender ? (
        <Box sx={styles.feedbackResponseContainer}>
          <LockClockOutlined sx={{ fontSize: 50 }} />
          <Typography variant="h5">Límite de llamadas excedido</Typography>
        </Box>
      ) : !onLive && !storage.timeSerie ? (
        <Box sx={styles.feedbackResponseContainer}>
          <QueryStatsOutlined sx={{ fontSize: 50 }} />
          <Typography variant="h5">
            Sin resultados. Pruebe con otro rango de fechas
          </Typography>
        </Box>
      ) : (
        <Chart data={dataChart} period={period} ticks={SIZE_TICKS} />
      )}
    </>
  )
}

export default Symbol
