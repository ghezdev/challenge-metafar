import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import theme from './theme'
import Home from './pages/home'
import Symbol from './pages/symbol'
import { TwelvedataProvider } from './contexts/twelvedata'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="challenge-metafar">
      <Route index element={<Home />} />
      <Route path="detail" element={<Symbol />} />
    </Route>
  )
)

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <TwelvedataProvider>
          <Container sx={styles}>
            <RouterProvider router={router} />
          </Container>
        </TwelvedataProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

const styles = { height: '100vh', width: '100vw' }

export default App
