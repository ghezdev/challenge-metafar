import { StocksData, SymbolSearchData } from '../types/twelvedata'

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'FETCH_STOCKS_REQUEST':
      return { ...state, stocks: [], stocksLoading: true }
    case 'FETCH_STOCKS_SUCCESS':
      return {
        ...state,
        stocksLoading: false,
        stocks: action.payload,
      }
    case 'FETCH_STOCKS_FAILURE':
      return { ...state, stocks: [], stocksLoading: false }

    case 'FETCH_SYMBOLS_REQUEST':
      return { ...state, symbols: [], symbolsLoading: true }
    case 'FETCH_SYMBOLS_SUCCESS':
      return {
        ...state,
        symbolsLoading: false,
        symbols: action.payload,
      }
    case 'FETCH_SYMBOLS_FAILURE':
      return { ...state, symbols: [], symbolsLoading: false }

    default:
      return state
  }
}

export type IState = {
  stocks: StocksData[]
  symbols: SymbolSearchData[]
  stocksLoading: boolean
  symbolsLoading: boolean
}

export type IAction =
  | { type: 'FETCH_STOCKS_REQUEST' }
  | { type: 'FETCH_STOCKS_SUCCESS'; payload: StocksData[] }
  | { type: 'FETCH_STOCKS_FAILURE' }
  | { type: 'FETCH_SYMBOLS_REQUEST' }
  | { type: 'FETCH_SYMBOLS_SUCCESS'; payload: SymbolSearchData[] }
  | { type: 'FETCH_SYMBOLS_FAILURE' }

// // Context type
// type AppContextType = {
//   state: State
//   dispatch: React.Dispatch<Action>
// }
