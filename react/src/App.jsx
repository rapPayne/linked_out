import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Secret } from './components/Secret'
import { Home } from './pages/Home';
function App() {
  const [loggedIn, setLogin] = useState(false);
  return (
    <>
      <header>
        <Link to="/people">People</Link>
        <Link to="/secret">Secret</Link>
        <button onClick={() => setLogin(loggedIn ? false : true)}>{loggedIn ? "Log out" : "Authenticate"}</button>
      </header>
      <Routes>
        <Route path="/people" element={<Home />} />
        <Route path="/secret" element={loggedIn ? <Secret /> : <h1>No dice!</h1>} />
      </Routes>
      <footer>
        <p>Copyright &copy; today us.com</p>
      </footer>
    </>
  )
}

export default App
