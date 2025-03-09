import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { F } from "@/components/ui/form";
import { Product, productSchema } from "@/schemas/productSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { getProductById, updateProduct } from "@/api/products";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Schema } from "zod";

export const EditProduct = () => {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Editar Producto</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <ProductForm />
            </CardContent>
        </Card>

    );
}

const ProductForm = () => {
    const id = useParams().id;
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['producto', id],
        queryFn: () => getProductById(String(id)),
    })
    const form = useForm<Product>({
        resolver: zodResolver(productSchema)
    });
    const navigate = useNavigate();
    useEffect(() => {
        if (data) {
            form.reset(data);
        }
    }, [data])

    const { isLoading } = form.formState;
    const onSubmit = async (data: Product) => {
        try {
            await updateProduct(String(id), data);
            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <div className="grid grid-cols-2 gap-4">
            <FormProvider   {...form}>
                <F control={form.control} name="codigo" label="Codigo" />
                <F control={form.control} name="descripcion" label="Descripcion" />
                <F control={form.control} name="ubicacion" label="Ubicacion" />
                <F control={form.control} name="precio" label="Precio" type="number" />
                <div className="col-span-2 flex justify-end mt-4 gap-4">
                    <Button onClick={() => navigate('/')}>Cancelar</Button>
                    <Button type="submit" disabled={isLoading} onClick={() => {
                        const x = form.getValues();
                        const result = productSchema.safeParse(x);
                        console.log({error: result.error});
                        form.handleSubmit(onSubmit)()}
                    } >
                        {isLoading ? 'guardando...' : 'Guardar'}
                    </Button>
                </div>
            </FormProvider>
        </div>
    )
}