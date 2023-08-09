import { useEffect, useState } from "react";
import { DeleteBasketItem, GetBasket } from "@/api/basket";
import { BasketItem } from "@/models/basket";

import { SingleBasket } from "@/components/basket/SingleBasket";

export function Basket(){

    const [data, setData] = useState<BasketItem[]>([])

    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        async function GetData(){
            const token = localStorage.getItem("token")
            const result = await GetBasket(token)
            if(!result['error']){
                setData(result.basket)
                const total = result.basket.reduce((sum: number, item) => sum + item.cost * item.amount, 0)
                setTotalCost(total)
            }
        }
        GetData()
    }, [])

    async function DeleteFromData(id: number){
        let newData = [...data]
        newData = newData.filter((item) => item.id != id)
        const total = newData.reduce((sum: number, item) => sum + item.cost * item.amount, 0)
        setTotalCost(total)
        setData(newData)
        const result = await DeleteBasketItem(id)
    }

    if(data.length === 0){
        return(
            <p className={'font-bold text-[24px] text-center'}>Your Basket is Empty</p>
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