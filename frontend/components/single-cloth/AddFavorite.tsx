import Image from "next/image";

import { CheckAuth } from "@/api/auth";
import { AddToFavorite } from "@/api/single-cloth";
import { useState } from "react";

export function AddFavorite({colorId}: {colorId: string}){

    const [errorText, setErrorText] = useState("")
    const [statusError, setStatusError] = useState<boolean | undefined>()

    async function Add(){
        const token = await localStorage.getItem('token');
        if(!token || token == ''){
            setStatusError(true)
            setErrorText("Please log in to the account")
            return
        }
        const result = await CheckAuth(token);
        if(result){
            const status = await AddToFavorite(token, colorId)
            if(status){
                setStatusError(false)
            }else{
                setStatusError(true)
                setErrorText("Try to add again")
            }
        }else{
            setStatusError(true)
            setErrorText("Please log in to the account")
        }
    }

    function ErrorField(){
        if(typeof statusError === 'undefined'){
            return
        }
        if(statusError){
            return(
                <div className={'h-[44px] flex justify-center items-center border-[2px] border-error rounded-md text-error mt-4 select-none'}>
                    {errorText}
                </div>
            )
        }else{
            return(
                <div className={'h-[44px] flex justify-center items-center border-[2px] border-success rounded-md text-success mt-4 select-none'}>
                    Cloth added to favorites
                </div>
            )
        }
    }

    return(
        <>
            <div className={'w-full mt-[20px] h-[60px] rounded-[20px] bg-white border-[1px] cursor-pointer flex justify-center items-center gap-1 select-none'}
                 onClick={Add}>
                <p className={'text-dark'}>Favorite</p>
                <Image src={'/navbar/like.svg'} alt={'like-icon'} width={'18'} height={'18'}/>
            </div>
            <ErrorField />
        </>
    )
}