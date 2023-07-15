import Image from "next/image";
import { useState } from "react";

import { Register } from "@/api/auth";
import Router from "next/router";

export function SignUp({email}: {email: string}){

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")

    async function Continue(){
        const result = await Register(email, password, name, surname, birthday)
        if(typeof result.token === 'string') {
            localStorage.setItem("token", result.token)
            await Router.push(`/cloth?sorted=newest`)
        }
    }

    return(
        <div className={'flex flex-col w-[400px] ml-auto mr-auto gap-4 select-none'}>
            <div className={'flex flex-row w-full gap-4'}>
                <Image src={"/navbar/person-logo.svg"} alt={'person-logo'} width={'44'} height={'44'}/>
                <Image src={"/navbar/nike-logo.svg"} alt={'nike-logo'} width={'60'} height={'44'}/>
            </div>
            <p className={'font-bold text-[24px]'}>Now let's get you registered with the Nike club.</p>
            <div className={'flex flex-row gap-4'}>
                <div className={'border-[1px] w-full h-[44px] box-border p-[5px] flex justify-center items-center rounded-[10px]'}>
                    <input className={'outline-none w-full'} placeholder={'Name'} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={'border-[1px] w-full h-[44px] box-border p-[5px] flex justify-center items-center rounded-[10px]'}>
                    <input className={'outline-none w-full'} placeholder={'Surname'} onChange={(e) => setSurname(e.target.value)}/>
                </div>
            </div>
            <div className={'border-[1px] h-[44px] w-full rounded-[10px] flex justify-center items-center box-border p-[5px]'}>
                <input className={'outline-none w-full'} placeholder={'Password'} type={'password'} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <p className={'mb-2'}>Birthday</p>
                <div className={'border-[1px] h-[44px] w-full rounded-[10px] flex justify-center items-center box-border p-[5px]'}>
                    <input type={'date'} className={'outline-none w-full'} placeholder={'Birthday'} onChange={(e) => setBirthday(e.target.value)}/>
                </div>
            </div>
            <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center ml-auto 0 cursor-pointer'}
                 onClick={Continue}>
                <p className={'text-white'}>Sign up</p>
            </div>
        </div>
    )
}