import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
        <Route path='/profile' element={<h1>Profile</h1>}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
