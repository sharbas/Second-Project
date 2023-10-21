import { ToastContainer } from "react-toastify";
import Layout from "./layout/layout.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Layout />
    </div>
  );
}
export default App;
