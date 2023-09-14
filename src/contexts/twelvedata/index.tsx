import axios from 'axios'
import React, { createContext, useContext, useReducer, Dispatch } from 'react'
import { IAction, IState, reducer } from '../../storage/stocks'

interface Props {
  children?: React.ReactNode
}

interface QueryGetStocks {
  symbol?: string
  name?: string
}

interface TwelvedataContextType {
  storage: IState
  dispatch: Dispatch<IAction>
  getStocks: (query: QueryGetStocks) => Promise<void>
  symbolSearch: (symbol: string) => Promise<void>
  getTimeSerieBySymbol: (
    symbol: string,
    params?: IQueryGetTimeSerie
  ) => Promise<void>
}

const TwelvedataContext = createContext<TwelvedataContextType | undefined>(
  undefined
)

const initialState: IState = {
  stocks: [],
  symbols: [],
  timeSerie: [],
  timeSerieLoading: true,
  stocksLoading: true,
  symbolsLoading: false,
}

interface IQueryGetTimeSerie {
  startDate?: string
  endDate?: string
  interval?: string
  outputsize?: string
}

export const TwelvedataProvider: React.FC<Props> = ({ children }) => {
  const [storage, dispatch] = useReducer(reducer, initialState)

  const getStocks = async (query: QueryGetStocks): Promise<void> => {
    dispatch({ type: 'FETCH_STOCKS_REQUEST' })
    try {
      const {
        data: { data: response },
      } = await axios.get(`https://api.twelvedata.com/stocks`, {
        params: query,
      })
      dispatch({ type: 'FETCH_STOCKS_SUCCESS', payload: response })
    } catch (error) {
      console.error('Error fetching data:', error)
      dispatch({ type: 'FETCH_STOCKS_FAILURE' })
    }
  }

  const symbolSearch = async (symbol: string): Promise<void> => {
    dispatch({ type: 'FETCH_SYMBOLS_REQUEST' })
    try {
      const {
        data: { data: response },
      } = await axios.get(
        `https://api.twelvedata.com/symbol_search?symbol=${symbol}&source=docs`
      )
      dispatch({ type: 'FETCH_SYMBOLS_SUCCESS', payload: response })
    } catch (error) {
      console.error('Error fetching data:', error)
      dispatch({ type: 'FETCH_SYMBOLS_FAILURE' })
    }
  }

  const getTimeSerieBySymbol = async (
    symbol: string,
    params?: IQueryGetTimeSerie
  ): Promise<void> => {
    dispatch({ type: 'FETCH_TIMESERIE_REQUEST' })
    try {
      const apikey = import.meta.env.PROD
        ? import.meta.env.VITE_APIKEY || '6a2fb1533991410c9c2422676f014085'
        : import.meta.env.VITE_APIKEY

      if (!import.meta.env.PROD && import.meta.env.VITE_APIKEY === undefined)
        throw new Error('Hace falta un api key')

      const { data } = await axios.get(
        'https://api.twelvedata.com/time_series',
        {
          params: {
            symbol,
            apikey,
            start_date: params?.startDate,
            end_date: params?.endDate,
            interval: params?.interval,
            outputsize: params?.outputsize,
          },
        }
      )
      if (data.code !== 200) throw new Error(data.message)

      dispatch({ type: 'FETCH_TIMESERIE_SUCCESS', payload: data.values })
    } catch (error) {
      console.error('Error fetching data:', error)
      dispatch({ type: 'FETCH_TIMESERIE_FAILURE' })
    }
  }

  return (
    <TwelvedataContext.Provider
      value={{
        storage,
        dispatch,
        getStocks,
        symbolSearch,
        getTimeSerieBySymbol,
      }}
    >
      {children}
    </TwelvedataContext.Provider>
  )
}

export const useTwelvedata = (): TwelvedataContextType => {
  const context = useContext(TwelvedataContext)
  if (!context) {
    throw new Error('useTwelvedata debe usarse dentro de un TwelvedataProvider')
  }
  return context
}
