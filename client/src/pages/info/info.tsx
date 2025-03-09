import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function Information() {
        const navigate = useNavigate();
        return (
                <Card className="mt-4">
                        <CardHeader>
                                <CardTitle>Información</CardTitle>
                                <CardDescription>Realizado por HK soluciones, c.a</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <Button onClick={() => navigate('/')}>Volver</Button>
                        </CardContent>
                </Card>
        )
}