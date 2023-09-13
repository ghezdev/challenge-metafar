import { Autocomplete, TextField } from '@mui/material'
import { useMemo } from 'react'
import uniq from 'lodash.uniq'

const Searcher: React.FC<Props> = ({
  label = '',
  options = [],
  size = 'small',
  fullwidth = false,
  onChange,
  onInputChange,
  loading = false,
  noOptionsText = undefined,
}) => {
  const uniqOptions = useMemo(() => uniq(options), [options])

  return (
    <Autocomplete
      disablePortal
      options={uniqOptions}
      noOptionsText={noOptionsText}
      size={size}
      fullWidth={fullwidth}
      renderInput={(params) => <TextField {...params} label={label} />}
      sx={fullwidth ? {} : { width: 200 }}
      onChange={(_e, value) => onChange(value || '')}
      onInputChange={(_e, value) => onInputChange(value)}
      loading={loading}
      loadingText="Cargando..."
    />
  )
}

interface Props {
  label: string
  options: string[]
  size?: 'small' | 'medium'
  fullwidth?: boolean
  onChange: (value: string) => void
  loading?: boolean
  onInputChange: (value: string) => Promise<void> | void
  noOptionsText?: string | undefined
}

export default Searcher
