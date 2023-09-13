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
import { TwelvedataProvider } from './contexts/twelvedata'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/challenge-metafar/" element={<Home />} />
  )
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TwelvedataProvider>
        <Container sx={styles}>
          <RouterProvider router={router} />
        </Container>
      </TwelvedataProvider>
    </ThemeProvider>
  )
}

const styles = { py: 10, height: '100vh', width: '100vw' }

export default App
