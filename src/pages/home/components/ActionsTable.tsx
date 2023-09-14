import React, { useEffect, useMemo, useState } from 'react'
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
        renderCell: (params) => {
          const {
            row: { id: _id, ...row },
            value,
          } = params
          return (
            <>
              <Button
                endIcon={
                  <OpenInNewOutlined sx={{ fontSize: '15px !important' }} />
                }
                sx={{
                  width: 100,
                  justifyContent: 'space-between',
                }}
                onClick={() => navigate('./detail', { state: row })}
              >
                {value}
              </Button>
            </>
          )
        },
      },
      { field: 'name', headerName: 'Nombre', flex: 3 },
      { field: 'currency', headerName: 'Moneda', flex: 1 },
      { field: 'type', headerName: 'Tipo', flex: 2 },
    ],
    [navigate]
  )

  const rows = useMemo(() => mapToRow(stocks), [stocks])
  const [rowsToShow, setRowsToShow] = useState<Row[]>(rows.slice(0, 5))
  const [paginationModel, setPaginationModel] = useState<IPaginationModel>({
    page: 0,
    pageSize: 5,
  })

  useEffect(() => {
    setPaginationModel({
      page: 0,
      pageSize: 5,
    })
    setRowsToShow(rows.slice(0, 5))
  }, [rows])

  useEffect(() => {
    const endSlice = (paginationModel.page + 1) * paginationModel.pageSize
    setRowsToShow(rows.slice(0, endSlice))
  }, [paginationModel])

  return (
    <Box height="400px">
      <DataGrid
        rows={rowsToShow}
        columns={columns}
        pageSizeOptions={[5, 10]}
        autoHeight
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        loading={loading}
        paginationModel={paginationModel}
        rowCount={rows.length}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  )
}

const mapToRow = (stocks: StocksData[]): Row[] =>
  stocks.map((stock, index) => ({
    id: index,
    ...stock,
  }))

interface Props {
  stocks: StocksData[]
  loading?: boolean
}

interface Row extends Omit<StocksData, 'exchange' | 'mic_code' | 'country'> {
  id: number
}

interface IPaginationModel {
  page: number
  pageSize: number
}

export default React.memo(ActionsTable)
