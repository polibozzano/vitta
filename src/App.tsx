import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";
import Private from "./components/Private";
import Admin from "./pages/Admin";
import PrivateAdmin from "./routes/PrivateAdmin";
import ContatoMedico from "./pages/ContatoMédico";
import Faq from "./pages/Faq";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/dashboard" element={
          <Private>
            <Dashboard />
          </Private>
        }
        ></Route>
        <Route path="/new" element={
          <Private>
            <New />
          </Private>
          }
          ></Route>
          <Route path="/contatomedico" element={
            <Private>
              <ContatoMedico />
            </Private>
          }
          ></Route>
          <Route path="/faq" element={
            <Private>
              <Faq />
            </Private>
            }>
          </Route>
          <Route path="/admin" element={
            <PrivateAdmin>
              <Admin />
            </PrivateAdmin>
          }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
