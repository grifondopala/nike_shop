import { useEffect, useState } from "react";
import { DeleteBasketItem, GetBasket } from "@/api/basket";
import { BasketItem } from "@/models/basket";

import { SingleBasket } from "@/components/basket/SingleBasket";
import Router from "next/router";

export function Basket(){

    const [isAuth, setIsAuth] = useState<boolean>(true)

    const [data, setData] = useState<BasketItem[]>([])

    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        async function GetData(){
            const token = localStorage.getItem("token")
            if(!token) {
                setIsAuth(false)
                return
            }
            const result = await GetBasket(token)

            if(result['error']){
                setIsAuth(false)
                return
            }

            if(result.basket){
                setData(result.basket)
                const total = result.basket.reduce((sum: number, item: BasketItem) => sum + item.cost * item.amount, 0)
                setTotalCost(total)
            }
        }
        GetData()
    }, [])

    async function DeleteFromData(id: number){
        let newData = [...data]
        newData = newData.filter((item: BasketItem) => item.id != id)
        const total = newData.reduce((sum: number, item: BasketItem) => sum + item.cost * item.amount, 0)
        setTotalCost(total)
        setData(newData)
        const result = await DeleteBasketItem(id)
    }

    if(!isAuth){
        return(
            <div className={'flex flex-col items-center gap-4 w-[350px] ml-auto mr-auto'}>
                <p className={'font-bold text-[24px] text-center text-center w-full'}>Please login to your account</p>
                <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer'} onClick={() => Router.push('/auth')}>
                    <p className={'text-white'}>Sign In</p>
                </div>
            </div>
        )
    }

    if(!data || data.length === 0){
        return(
            <div className={'w-[60%] ml-auto mr-auto flex flex-col max-[800px]:w-full flex flex-col items-center gap-4'}>
                <p className={'font-bold text-[24px] text-center'}>Your Basket is Empty</p>
                <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer'} onClick={() => Router.push('/cloth?sorted=newest')}>
                    <p className={'text-white'}>Find Cloth</p>
                </div>
            </div>
        )
    }

    return(
        <div className={'w-[60%] ml-auto mr-auto flex flex-col max-[800px]:w-full max-[800px]:pl-[30px] max-[800px]:pr-[30px] max-[450px]:pl-2 max-[450px]:pr-2'}>
            <div className={'w-full fle  x flex-col gap-[50px]'}>
                <p className={'font-bold text-[24px] text-center'}>Your Basket</p>
                <div className={'w-full flex flex-col gap-[50px] mt-4'}>
                    {data?.map((item) => (
                        <SingleBasket item={item} key={item.id} deleteHandle={DeleteFromData}/>
                    ))}
                </div>
            </div>
            <hr className={'mt-4 mb-4'}/>
            <div className={'flex flex-row justify-end items-center content-center gap-4 w-full'}>
                <p className={'text-[18px] text-center'}>Total cost: <label className={'font-bold'}>{totalCost}&nbsp;$ </label> </p>
                <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer'}>
                    <p className={'text-white'}>Pay</p>
                </div>
            </div>
        </div>
    )
}