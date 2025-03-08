import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
                <CardDescription>Card Description</CardDescription>
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
                <div className="col-span-2 flex justify-end mt-4">
                    <Button type="submit" disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
                        {isLoading ? 'Agregando...' : 'Agregar'}
                    </Button>
                </div>
            </FormProvider>
        </div>
    )
}


/*
    const form = useForm<Product>({ resolver: zodResolver(productSchema) });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: Product) => {
        console.log({ data });
        setIsLoading(true);
        try {
            await createProduct(data);
            navigate('/');
        } catch (error) {
            console.error('Error creating product:', error);
        }
        setIsLoading(false);
    };

    return (
        <Box mt={'2rem'}>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Grid columns="1" gap="4" rows="repeat(6, 2rem)" width="auto" m={"4"}>
                            <FormField
                                control={form.control}
                                name="codigo"
                                render={({ field }) => (
                                    <FormItem style={{ display: 'flex', gap: '4'  }}>
                                        <FormLabel>Código</FormLabel>
                                        <FormControl>
                                            <input
                                                type="text"
                                                placeholder="Enter code"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            Enter a unique code for the product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField
                                control={form.control}
                                name="descripcion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripcion</FormLabel>
                                        <FormControl>
                                            <input
                                                type="text"
                                                placeholder="Enter descripcion"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField
                                control={form.control}
                                name="ubicacion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ubicacion</FormLabel>
                                        <FormControl>
                                            <input
                                                type="text"
                                                placeholder="Enter ubicacion"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField
                                control={form.control}
                                name="precio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Precio</FormLabel>
                                        <FormControl>
                                            <input
                                                type="text"
                                                placeholder="Enter precio"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField
                                control={form.control}
                                name="imagen"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imagen</FormLabel>
                                        <FormControl>
                                          <RegexValidator field={field}  />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            
                        </Grid>

                        <Flex justify={'end'} gap={"4"} m={"4"} >
                            <Button className='mr-4' onClick={() => navigate('/')} variant="outline">Cancelar</Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Cargando...' : 'Guardar'}
                            </Button>
                        </Flex>

                    </form>
                </Form>
            </Card>
        </Box >
    );
};

const RegexValidator = ({field}: {field: ControllerRenderProps}) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Define tu expresión regular aquí
  const regex = /^[a-zA-Z0-9]+$/; // Ejemplo: solo letras y números

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsValid(regex.test(value));
  };

  <input
  type="text"
  placeholder="Enter imagen"

/>
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Escribe algo..."
        {...field}
      />
      {!isValid && inputValue.length > 0 && (
        <p style={{ color: 'red' }}>Entrada no válida</p>
      )}
    </div>
  );
};

export default RegexValidator;
*/