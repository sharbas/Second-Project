import {Outlet} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header/Header.jsx"
// import HomeScreen from "./screens/HomeScreen.jsx"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const App = ()=>{
  return (
    <>
    <Header/>
    <ToastContainer/>
    {/* <Container className='my-2'> */}

    {/* <h1>Second project</h1> */}
    <Outlet/>
    {/* </Container> */}
    </>
  )
}
export default App