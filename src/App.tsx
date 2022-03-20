import { useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from './contexts/Auth/AuthContext';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { Home } from './pages/Home';
import { Private } from './pages/Private';

function App() {
  const auth = useContext(AuthContext)

  const handleLogout = async () => {
    await auth.signout();
    window.location.href = window.location.href
  }

  return (
    <div className="App">
      <header>
        <h1>Header do site</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/private">Página privada</Link>
          {auth.user && <button onClick={handleLogout}>Sair</button>}
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/private" element={<RequireAuth><Private /></RequireAuth>}/>
        </Routes>
      </header>
    </div>
  )
}

export default App
