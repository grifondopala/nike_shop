import Image from "next/image";
import { useState } from "react";

import { Login } from "@/api/auth";
import Router from "next/router";

export function SignIn({email}: {email: string}){

    const [password, setPassword] = useState<string>("")
    const [isCorrect, setIsCorrect] = useState<boolean>(false)

    async function Continue(){
        const result = await Login(email, password);
        if(typeof result.token === 'string'){
            localStorage.setItem("token", result.token)
            await Router.push(`/cloth?sorted=newest`)
        }else{
            setIsCorrect(true)
        }
    }

    return(
        <div className={'flex flex-col w-[450px] ml-auto mr-auto gap-4 select-none max-[450px]:w-[95%]'}>
            <div className={'flex flex-row w-full gap-4'}>
                <Image src={"/navbar/person-logo.svg"} alt={'person-logo'} width={'44'} height={'44'}/>
                <Image src={"/navbar/nike-logo.svg"} alt={'nike-logo'} width={'60'} height={'44'}/>
            </div>
            <p className={'font-bold text-[24px]'}>Enter your password to sign in to your Nike account</p>
            <div className={'border-[1px] h-[44px] w-full rounded-[10px] flex justify-center items-center box-border p-[5px]'}>
                <input className={'outline-none w-full'} placeholder={'Password'} type={'password'} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {isCorrect && (
                <div className={'h-[44px] flex justify-center items-center border-[2px] border-error rounded-md text-error'}>
                    Password is not correct
                </div>
            )}
            <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center ml-auto 0 cursor-pointer'}
                 onClick={Continue}>
                <p className={'text-white'}>Sign in</p>
            </div>
        </div>
    )
}