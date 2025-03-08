import { Checkbox } from "@/components/ui/checkbox";
import { SortedIcon } from "@/components/ui/dataTable";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/schemas/productSchema"
import { Button } from "@radix-ui/themes";
import { ColumnDef, FilterFn, Row } from "@tanstack/react-table"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const customFilter: FilterFn<Product> = (row: Row<Product>, columnId: string, filterValue: string, addMeta: (meta?: any) => void) => {
  const values = filterValue.toLocaleLowerCase().split(" ");
  const rowValue = `${row.original.codigo} ${row.original.descripcion} ${row.original.ubicacion}`.toLocaleLowerCase();
  return values.every((value) => {
    return rowValue.toLocaleLowerCase().includes(value);
  });
}

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "codigo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    filterFn: customFilter,
  },
  {
    accessorKey: "descripcion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripción
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    filterFn: customFilter,
  },
  {
    accessorKey: "ubicacion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ubicación
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    filterFn: customFilter,
  },
  {
    accessorKey: "precio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    id: "acciones",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
           <EditButton product={row.original} />
           <DialogDemo product={row.original} />
        </div>
      )
    }
  },
]

const EditButton = ({ product }: { product: Product }) => {
  const navigage = useNavigate();
  return (
    <Button variant="outline" onClick={() =>  navigage(`/products/${product.id}`)}>
      Editar
    </Button>
  );
}

const handlePrintPdf = async (product: Product, quantity: number) => {
  const params: URLSearchParams = new URLSearchParams({
    codigo: product.codigo,
    descripcion: product.descripcion ||'',
    ubicacion: product.ubicacion ||'',
    type: 'code128',
    quantity: quantity.toString(),
  });
  const response = await fetch(`http://localhost:8080/generate_barcode?${params.toString()}`);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  console.log(url);
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
      URL.revokeObjectURL(url);
    };
  }
};


export function DialogDemo({ product } : {product:Product}) {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Imprimir</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-reverse">
        <DialogHeader>
          <DialogTitle>Impimir etiquetas</DialogTitle>
          <DialogDescription>
            Elija la cantidad de etiquetas que desea imprimir.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Cantidad
            </Label>
            <Input
              id="name"
              type="number"
              defaultValue="1"
              value={quantity}
              className="col-span-3"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={()=> handlePrintPdf(product, quantity)}>Imprimir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
