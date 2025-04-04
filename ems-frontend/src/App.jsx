import React from 'react'
import LIstEmployeeComponent from './components/LIstEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

const App = () => {
  return (
    <div>
      <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<LIstEmployeeComponent />} />
        <Route path="/employees" element={<LIstEmployeeComponent />} />
        <Route path='add-employee' element={<EmployeeComponent />}></Route>
        <Route path='edit-employee/:id' element={<EmployeeComponent />}></Route>
      </Routes>
      <FooterComponent />
      </Router>
    </div>
  )
}

export default App