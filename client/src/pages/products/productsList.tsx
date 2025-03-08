

import * as React from 'react'

import { DataTable } from '@/components/ui/dataTable';
import { columns } from './columns';
import { getProducts } from '@/api/products';

export function ProductsList() {
  const [data, setData] = React.useState(() => [])
  React.useEffect(() => {

    const fetchProducts = async () => {
        getProducts().then((result) => setData(result));
    };
    fetchProducts();
  }, []);

  return (
    <DataTable columns={columns} data={data} />
  )
}

