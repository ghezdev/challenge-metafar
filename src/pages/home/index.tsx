import { useTwelvedata } from '../../contexts/twelvedata'
import { Box, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import Searcher from './components/Searcher'
import styles from './styles'
import ActionsTable from './components/ActionsTable'
import startsWith from 'lodash.startswith'

function Home() {
  const { storage, getStocks, symbolSearch } = useTwelvedata()

  const nameStocks = useMemo(
    () => storage.stocks.map((value) => value.name),
    [storage.stocks]
  )
  const symbols = useMemo(
    () => storage.symbols.map((value) => value.symbol),
    [storage.symbols]
  )

  const [symbolToSearch, setSymbolToSearch] = useState<string>('')
  const [nameToSearch, setNameToSearch] = useState<string>('')
  const [optionsName, setOptionsName] = useState<string[]>([])

  useEffect(() => {
    getStocks({
      symbol: symbolToSearch || undefined,
      name: nameToSearch || undefined,
    })
  }, [symbolToSearch, nameToSearch])

  useEffect(() => {
    setOptionsName(nameStocks.slice(0, 30))
  }, [nameStocks])

  return (
    <Box sx={styles.container}>
      <Typography align="center" variant="h3" mb={4}>
        Acciones disponibles
      </Typography>
      <Box mb={4} display="flex" gap={4} justifyContent="center">
        <Searcher
          label="Símbolo"
          options={symbols}
          onChange={(value) => setSymbolToSearch(value)}
          onInputChange={async (value: string) => {
            if (value.length > 0) {
              await symbolSearch(value)
            }
          }}
          loading={storage.symbolsLoading}
          noOptionsText="Escriba al menos 1 caracter"
        />
        <Searcher
          label="Nombre"
          fullwidth
          options={optionsName}
          onInputChange={(value) => {
            const optionsFiltered = nameStocks.filter((option) =>
              startsWith(option, value)
            )
            setOptionsName(optionsFiltered.slice(0, 30))
          }}
          onChange={(value) => setNameToSearch(value)}
          loading={storage.stocksLoading}
        />
      </Box>
      <ActionsTable stocks={storage.stocks} loading={storage.stocksLoading} />
    </Box>
  )
}

export default Home
