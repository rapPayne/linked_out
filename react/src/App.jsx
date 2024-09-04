import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Secret } from './components/Secret'
import { Home } from './pages/Home';
function App() {
  const [user, setUser] = useState();
  return (
    <>
      <header>
        <Link to="/people">People</Link>
        <Link to="/secret">Secret</Link>
        <button onClick={() => user ? logout() : login('rap', 'nunyabizness')}>{user ? "Log out" : "Authenticate"}</button>
      </header>
      <Routes>
        <Route path="/people" element={<Home />} />
        <Route path="/secret" element={user ? <Secret /> : <h1>No dice!</h1>} />
      </Routes>
      <footer>
        <p>Copyright &copy; today us.com</p>
      </footer>
    </>
  )
  function logout() {
    setUser(undefined)
  }
  function login(username, password) {
    const url = `http://localhost:3001/api/login`
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (!res.ok) throw `Bad request: ${res.status}`;
        console.log(`Logged in with this token: ${res.headers.get('Authorization')}`);
        return res;
      })
      .then(res => res.json())
      .then(u => setUser(u))
  }
}


export default App
