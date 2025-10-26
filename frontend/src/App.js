import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import CreateMovie from "./pages/CreateMovie";
import EditMovie from "./pages/EditMovie";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/create" element={<CreateMovie/>}/>
        <Route path="/movies/edit/:id" element={<EditMovie />} />
      </Routes>
 
  );
}

export default App;
