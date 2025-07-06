import Home from './pages/Home'
import { ThemeProvider } from './utils/ThemeContext'

function App() {

  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  )
}

export default App
