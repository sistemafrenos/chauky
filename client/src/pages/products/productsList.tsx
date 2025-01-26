import { Table } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Product } from '../../schemas/productSchema';
import { getProducts } from '../../api/products';


export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    // Fetch products from the API or any other source
    const fetchProducts = async () => {
        getProducts().then((data) => setProducts(data));
    };
    fetchProducts();
  }, []);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Código</Table.Cell>
          <Table.Cell>Descripción</Table.Cell>
          <Table.Cell>Precio</Table.Cell>
          <Table.Cell>Imagen</Table.Cell>
          <Table.Cell>Ubicación</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {products.map((product) => (
          <Table.Row key={product.codigo}>
            <Table.Cell>{product.codigo}</Table.Cell>
            <Table.Cell>{product.descripcion}</Table.Cell>
            <Table.Cell>{product.precio}</Table.Cell>
            <Table.Cell>
              {product.imagen ? <img src={product.imagen} alt={product.descripcion} /> : 'No Image'}
            </Table.Cell>
            <Table.Cell>{product.ubicacion}</Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
    </Table.Root>
    );
}

