import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/navbar';
import { Home } from './pages/home/home';
import { AddProduct } from './pages/addProducts/addProducts';
import { Information } from './pages/info/info';
import { ProductsList } from './pages/products/productsList';
import { EditProduct } from './pages/editProduct/editProduct';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/products/:id' element={<EditProduct />} />
        <Route path='/info' element={<Information />} />
      </Routes>
    </Router>
  );
}

export default App