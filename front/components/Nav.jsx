import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Nav() {
  const { token, logout, hasUsers } = useAuth()

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Stock UTN</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link 
                  to="/add-product" 
                  className="text-gray-700 hover:text-gray-900"
                >
                  Agregar Producto
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : hasUsers ? (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-gray-900"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <Link 
                to="/register" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Registrarse
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}