'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { account,ID } from "../../app/appwrite";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);
    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        setError(null);
        if(isRegistering){
            await register();
        }
        else await login(email, password);   
    }
    
    const login = async (email: string, password:string)=>{
        try{
            const session = await account.createEmailPasswordSession(email, password);
            console.log(session);
            
            router.push('/dashboard');
        }
        catch(error){
            console.log(error)
            setError('email y/o contraseña inválidos');
        }
    }
    const register = async () =>{
        try{
            await account.create(ID.unique(), email, password);
            await login(email, password);
        }
        catch(error){
            setError('Falló el registro. El email podría estar en uso');
        }
    }
    /*const logOut = async () => {
        await account.deleteSession('current');
    }*/

    return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
            <CardTitle className="text-xl">
                {isRegistering? 'Crear una cuenta':'Bienvenido de nuevo'}
            </CardTitle>
          <CardDescription>
            {isRegistering?'Regístrate con tu email y contraseña' : 'Inicia sesión con tu email y contraseña'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={({target}) => setEmail(target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {!isRegistering&&
                    (<a
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>)}
                  </div>
                  <Input id="password" type="password" required onChange={({target})=>setPassword(target.value)}/>
                </div>
                <Button type="submit" className="w-full">
                  {isRegistering?'Registrar': 'Iniciar sesión'}
                </Button>
                {error&&(<h1>{error}</h1>)}
              </div>
              <div className="text-center text-sm">
                {isRegistering?(
                    <>
                    ¿Ya tienes una cuenta?{" "}
                    <a onClick={() => setIsRegistering(false)} className="underline underline-offset-4">
                      Iniciar sesión
                    </a>
                  </>
                ) : (
                  <>
                    ¿No tienes una cuenta?{" "}
                    <a onClick={() => setIsRegistering(true)} className="underline underline-offset-4">
                      Regístrate
                    </a>
                  </>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
