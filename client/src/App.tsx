import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button, Heading, Container, TabNav, Box, Card, Flex } from '@radix-ui/themes';
import { ProductsList } from './pages/products/productsList';
import { AddProduct } from './pages/products/addProducts';

function Home() {
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate('/add-product');
  };
  return (
    <Box mt={'2rem'}>
      <Card>
        <Heading>Productos</Heading>
        <Flex justify={'end'} className='mt-4'>
          <Button className='mr-4' onClick={handleAddProduct}>Agregar Producto</Button>
        </Flex>
        <ProductsList />
      </Card>
    </Box>
  );
}

function About() {
  return (
    <Box mt={'2rem'}>
      <Card>
        <Heading>Informacion</Heading>
        <Box mt={'2rem'} >
          <Button>Volver a inicio</Button>
        </Box>
      </Card>
    </Box>
  )
}

function Menu() {
  return (
    <TabNav.Root>
      <TabNav.Link href="/">Inicio</TabNav.Link>
      <TabNav.Link href="/about">Informacion</TabNav.Link>
    </TabNav.Root>

  )
}
function App() {
  return (
    <Router>
      <Container size="4">
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App
