import { Button, Box, Card, Grid, Flex } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../schemas/productSchema';
import { createProduct } from '../../api/products';
import { Label } from 'radix-ui';

export const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Product>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: Product) => {
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid columns="3" gap="4" rows="repeat(6, 2rem)" width="auto">
                        <Label.Root>
                            Codigo
                        </Label.Root>
                        <input
                            id="code"
                            {...register('codigo', { required: 'Codigo is requerido' })}
                        />
                        <span>{errors.codigo && <span>{errors.codigo.message}</span>}</span>
                        <Label.Root>
                            Descripcion
                        </Label.Root>
                        <input
                            id="description"
                            {...register('descripcion', { required: 'Descripcion is requerida' })}
                        />
                        <span>{errors.descripcion && <span>{errors.descripcion?.message}</span>}</span>
                        <Label.Root>
                            Ubicacion
                        </Label.Root>
                        <input
                            id="ubicacion"
                            {...register('ubicacion')}
                        />
                        <span>{errors.ubicacion && <span>{errors.ubicacion.message}</span>}</span>
                        <Label.Root>
                            Precio
                        </Label.Root>
                        <input
                            id="precio"
                            {...register('precio')}
                        />
                        <span>{errors.precio && <span>{errors.precio?.message}</span>}</span>
                        <Label.Root>
                            imagen
                        </Label.Root>
                        <input
                            id="imagen"
                            {...register('imagen')}
                        />

                        <span>{errors.imagen && <span>{errors.imagen?.message}</span>}</span>
                    </Grid>

                    <Flex justify={'end'} gap={"4"} m={"4"} >
                        <Button className='mr-4' onClick={() => navigate('/')} variant="outline">Cancelar</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Cargando...' : 'Guardar'}
                        </Button>
                    </Flex>

                </form>
            </Card>
        </Box >
    );
};