import { Component} from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Register from './components/Register';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import CreateInvoice from "./components/CreateInvoice";
import UpdateInvoice from "./components/UpdateInvoice";


import './App.css'

class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login/" element={<LoginForm />} /> 
        <Route exact path="/home" element={<Home />} /> 
        <Route exact path='/createinvoice' element={<CreateInvoice/>} />
        <Route exact path='/update/:id' element={<UpdateInvoice/>} />
      </Routes>
  </BrowserRouter>
    )
  }
}

export default App
