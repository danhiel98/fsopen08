import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Menu from "./components/Menu";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/LoginForm";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Recommended from "./components/Recommended";
import { useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "./queries/books";

const App = () => {
  const [token, setToken] = useState(null)
  const userData = useLocalStorage('library-user-data')

  useEffect(() => {
    if (userData)
      setToken(userData.token)

  }, [userData])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      alert(`Book "${data.data.bookAdded.title}" created successfully`)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-data')
  }

  const setError = (error) => {
    console.log(error)
  }

  return (
    <div>
      <Menu token={token} logout={logout} />
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<NewBook token={token} />} />
        <Route path="/recommended" element={<Recommended userData={userData} />} />
        <Route path="/login" element={<Login setError={setError} setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
