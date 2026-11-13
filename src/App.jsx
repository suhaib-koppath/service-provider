import { Navigate, useRoutes } from 'react-router-dom'
import routes from './utils/routes.jsx'

function App() {
  const routeElement = useRoutes(routes)

  return routeElement ?? <Navigate to="/" replace />
}

export default App
