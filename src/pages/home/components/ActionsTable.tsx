import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { OpenInNewOutlined } from '@mui/icons-material'
import { StocksData } from '../../../types/twelvedata'

const ActionsTable: React.FC<Props> = ({ stocks, loading }) => {
  const navigate = useNavigate()

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'symbol',
        headerName: 'Símbolo',
        flex: 1,
        renderCell: (params) => (
          <>
            <Button
              endIcon={
                <OpenInNewOutlined sx={{ fontSize: '15px !important' }} />
              }
              sx={{
                width: 100,
                justifyContent: 'space-between',
              }}
              onClick={() => navigate(`./${params.value}`)}
            >
              {params.value}
            </Button>
          </>
        ),
      },
      { field: 'name', headerName: 'Nombre', flex: 3 },
      { field: 'currency', headerName: 'Moneda', flex: 1 },
      { field: 'type', headerName: 'Tipo', flex: 2 },
    ],
    [navigate]
  )

  return (
    <Box height="400px">
      <DataGrid
        rows={mapToRow(stocks)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        autoHeight
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        loading={loading}
      />
    </Box>
  )
}

const mapToRow = (stocks: StocksData[]): Row[] =>
  stocks.map(({ symbol, name, currency, type }, index) => ({
    id: index,
    symbol,
    name,
    currency,
    type,
  }))

interface Props {
  stocks: StocksData[]
  loading?: boolean
}

interface Row extends Omit<StocksData, 'exchange' | 'mic_code' | 'country'> {
  id: number
}

export default React.memo(ActionsTable)
