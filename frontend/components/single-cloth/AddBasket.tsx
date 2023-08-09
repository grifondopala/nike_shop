import { useState } from "react";

import { CheckAuth } from "@/api/auth";
import { AddToBasket } from "@/api/single-cloth";

export function AddBasket({ sizeId }: {sizeId: number}){

    const [errorText, setErrorText] = useState("")
    const [statusError, setStatusError] = useState<boolean | undefined>()

    async function AddToBag(){
        if(sizeId == 0){
            setStatusError(true)
            setErrorText('Choose size')
            return;
        }

        const token = await localStorage.getItem('token');
        if(!token || token == ''){
            setStatusError(true)
            setErrorText("Please log in to the account")
            return
        }

        const result = await CheckAuth(token);
        if(result){
            const status = await AddToBasket(token, sizeId)
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
                    Cloth added to basket
                </div>
            )
        }
    }

    return(
        <>
            <div className={'w-full mt-[20px] h-[60px] rounded-[20px] bg-dark flex justify-center items-center cursor-pointer select-none'}
                 onClick={AddToBag}>
                <p className={'text-white'}>Add to bag</p>
            </div>
            <ErrorField />
        </>
    )
}