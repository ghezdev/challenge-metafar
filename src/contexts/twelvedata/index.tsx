import axios from 'axios'
import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  Dispatch,
} from 'react'
import { StocksData } from '../../types/twelvedata'
import uniq from 'lodash.uniq'
import { IAction, IState, reducer } from '../../storage/stocks'

interface Props {
  children?: React.ReactNode
}

interface QueryGetStocks {
  symbol?: string
  name?: string
}

// Definimos la forma del contexto
interface TwelvedataContextType {
  storage: IState
  dispatch: Dispatch<IAction>
  optionsNameSymbols: string[]
  getStocks: (query: QueryGetStocks) => Promise<void>
  symbolSearch: (symbol: string) => Promise<void>
}

const TwelvedataContext = createContext<TwelvedataContextType | undefined>(
  undefined
)

const initialState: IState = {
  stocks: [],
  symbols: [],
  stocksLoading: true,
  symbolsLoading: false,
}

export const TwelvedataProvider: React.FC<Props> = ({ children }) => {
  const [storage, dispatch] = useReducer(reducer, initialState)
  const [optionsNameSymbols, setOptionsNameSymbols] = useState<string[]>([])

  const getStocks = async (query: QueryGetStocks): Promise<void> => {
    dispatch({ type: 'FETCH_STOCKS_REQUEST' })
    try {
      const {
        data: { data: response },
      } = await axios.get(`https://api.twelvedata.com/stocks`, {
        params: query,
      })
      dispatch({ type: 'FETCH_STOCKS_SUCCESS', payload: response })
      const nameSymbols = uniq(
        (response as StocksData[]).map((value) => value.name)
      )
      setOptionsNameSymbols(nameSymbols)
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

  return (
    <TwelvedataContext.Provider
      value={{ storage, dispatch, getStocks, symbolSearch, optionsNameSymbols }}
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
