export interface StocksData {
  symbol: string
  name: string
  currency: string
  exchange: string
  mic_code: string
  country: string
  type: string
}

export interface SymbolSearchData {
  symbol: string
  instrument_name: string
  exchange: string
  mic_code: string
  exchange_timezone: string
  instrument_type: string
  country: string
  currency: string
}
