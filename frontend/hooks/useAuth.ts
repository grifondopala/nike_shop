import { useEffect, useState } from "react";
import { CheckAuth } from "@/api/auth";

export function useAuth(){

    const [token, setToken] = useState<string>("")
    const [isAuth, setIsAuth] = useState<boolean>(false)

    useEffect(() => {

        async function CheckNewToken(token: string): Promise<boolean>{
            const result = await CheckAuth(token);
            return result;
        }

        const token = localStorage.getItem("token")
        setToken(token);

        if(!token){
            setIsAuth(false);
            return;
        }

        CheckNewToken(token).then(result => setIsAuth(result));

    }, [])

    return {
        token,
        isAuth
    }

}