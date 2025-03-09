import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { F } from "@/components/ui/form";
import { Product, productSchema } from "@/schemas/productSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/api/products";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Agregar productos</CardTitle>
                <CardDescription>Proporcione la informacion del producto</CardDescription>
            </CardHeader>
            <CardContent>
                <ProductForm />
            </CardContent>
        </Card>

    );
}

const ProductForm = () => {
    const navigate = useNavigate();
    const form = useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            codigo: "",
            descripcion: "",
            ubicacion: "",
            precio: 0
        }
    });
    const  {isLoading} = form.formState;
    const onSubmit = async (data: Product) => {
        console.log({ data });
        try {
            await createProduct(data);
            navigate('/');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };
    return (
        <div className="grid grid-cols-2 gap-4">
            <FormProvider   {...form}>
                <F control={form.control} name="codigo" label="Codigo" />
                <F control={form.control} name="descripcion" label="Descripcion" />
                <F control={form.control} name="ubicacion" label="Ubicacion" />
                <F control={form.control} name="precio" label="Precio"  type="number" />
                <div className="col-span-2 flex justify-end mt-4 gap-4">
                    <Button onClick={() => navigate('/')}>Cancelar</Button>
                    <Button type="submit" disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
                        {isLoading ? 'Agregando...' : 'Agregar'}
                    </Button>
                </div>
            </FormProvider>
        </div>
    )
}