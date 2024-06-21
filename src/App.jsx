import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Home from "./component/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      />
      <Routes>
        <Route
          path="/"
          element={<Home title={"Home- Authentication System"} />}
        ></Route>
        <Route
          path="/register"
          element={<Register title={"Register"} />}
        ></Route>
        <Route path="/login" element={<Login title={"Login"} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
