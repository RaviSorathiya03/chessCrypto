import {Route, Routes} from 'react-router-dom'
import './App.css'
import HomePage from './components/global/HomePage'
import ChessBoard from './components/global/ChessBoard'
import PaymentPage from './components/global/PaymentPage'

function App() {
  

  return (
  
   <Routes>
    <Route path='/' element={<HomePage />}/>
    <Route path='/board' element={<ChessBoard />} />
    <Route path='/pay' element={<PaymentPage />} />
   </Routes>
  
  )
}


export default App
