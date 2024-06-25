import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Menu from "./components/Menu";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
