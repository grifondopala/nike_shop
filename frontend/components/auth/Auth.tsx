import Image from "next/image";

import { useState } from "react";

import { CheckRegistered } from "@/api/auth";
import { SignUp } from "@/components/auth/SignUp";
import { SignIn } from "@/components/auth/SignIn";

export function Auth(){

    const [email, setEmail] = useState<string>("")
    const [statusAuth, setStatusAuth] = useState<boolean | undefined>()

    async function Continue(){
        const result = await CheckRegistered(email)
        setStatusAuth(result)
    }

    if(typeof statusAuth === "undefined") {
        return (
            <div className={'flex flex-col w-[450px] ml-auto mr-auto gap-4 max-[450px]:w-[95%]'}>
                <div className={'flex flex-row w-full gap-4'}>
                    <Image src={"/navbar/person-logo.svg"} alt={'person-logo'} width={'44'} height={'44'}/>
                    <Image src={"/navbar/nike-logo.svg"} alt={'nike-logo'} width={'60'} height={'44'}/>
                </div>
                <p className={'font-bold text-[24px]'}>Type your email to sign in or register</p>
                <div className={'w-full h-[44px] rounded-md border-2 flex justify-center items-center box-border p-[5px]'}>
                    <input className={'outline-none w-full'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <p>By continuing, I accept the Nike Privacy Policy and Terms of Use.</p>
                <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center ml-auto 0 cursor-pointer'}
                    onClick={Continue}>
                    <p className={'text-white'}>Continue</p>
                </div>
            </div>
        )
    }

    if(statusAuth){
        return(
            <SignIn email={email}/>
        )
    }else{
        return(
            <SignUp email={email}/>
        )
    }

}