import { SxProps } from '@mui/material'

const styles: Record<string, SxProps> = {
  appBar: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none',
    backgroundImage: 'inherit',
    borderBottom: 'solid 1px #fff',
    marginBottom: 4,
  },
  toolbar: { display: 'flex', justifyContent: 'center', gap: 2 },
  buttonOnLive: { p: 0 },
  filtersContainer: { display: 'flex', gap: 20, justifyContent: 'center' },
  intervalContainer: { width: 130, mt: 1 },
  filtarDatesContainer: { display: 'flex', gap: 3 },
  progressContainer: { display: 'flex', justifyContent: 'center', mt: 20 },
  feedbackResponseContainer: {
    display: 'flex',
    alignItems: 'center ',
    flexDirection: 'column',
    mt: 12,
    gap: 2,
  },
}

export default styles
