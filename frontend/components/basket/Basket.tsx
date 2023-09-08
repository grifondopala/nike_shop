import { useEffect, useMemo, useState } from "react";
import {DeleteBasketItem, GetBasket, PayBasket} from "@/api/basket";
import { BasketItem } from "@/models/basket";

import { SingleBasket } from "@/components/basket/SingleBasket";
import { NotAuth } from "@/components/components/NotAuth";
import { ListEmpty } from "@/components/components/ListEmpty";

import { useAuth } from "@/hooks/useAuth";
import {PreviousBaskets} from "@/components/basket/PreviousBaskets";
import {set} from "zod";

export function Basket(){

    const auth = useAuth();

    const [data, setData] = useState<BasketItem[]>([])

    const totalCost = useMemo(() => data.reduce((sum: number, item: BasketItem) => sum + item.cost * item.amount, 0), [data])

    useEffect(() => {
        async function GetData(): Promise<BasketItem[]>{
            if(!auth.isAuth){
                return [];
            }

            const result = await GetBasket(auth.token);

            if(result['error']) return [];

            if(result.basket) return result.basket

            return [];
        }
        GetData().then(result => setData(result))
    }, [auth.isAuth])

    async function DeleteFromData(id: number){

        const result = await DeleteBasketItem(id)

        if(result['error']){
            let newData = [...data]
            newData = newData.filter((item: BasketItem) => item.id != id)
            setData(newData)
        }

    }

    async function Pay(){
        const result = await PayBasket(auth.token);
        setData([]);
    }

    if(!auth.isAuth) return <NotAuth />

    if(!data || data.length === 0){
        return (
            <>
                <ListEmpty label={'Your Basket is Empty'}/>
                <PreviousBaskets />
            </>
        )
    }

    return(
        <>
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
                    <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer'}
                         onClick={Pay}>
                        <p className={'text-white'}>Pay</p>
                    </div>
                </div>
            </div>
            <PreviousBaskets />
        </>
    )
}