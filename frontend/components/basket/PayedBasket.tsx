import { SingleBasket } from "@/components/basket/SingleBasket";;
import { BasketItem } from "@/models/basket";
import { useMemo } from "react";

export function PayedBasket({data}: {data: BasketItem[]}){

    const totalCost = useMemo(() => data?.reduce((sum: number, item: BasketItem) => sum + item.cost * item.amount, 0), [data])

    return(
        <div className={'w-full ml-auto mr-auto flex flex-col max-[800px]:w-full max-[800px]:pl-[30px] max-[800px]:pr-[30px] max-[450px]:pl-2 max-[450px]:pr-2'}>
            <p className={'font-bold text-[24px] text-center'}>Basket</p>
            <div className={'w-full fle  x flex-col gap-[50px]'}>
                <div className={'w-full flex flex-col gap-[50px] mt-4'}>
                    {data?.map((item) => (
                        <SingleBasket item={item} key={item.id} isPayed={true} />
                    ))}
                </div>
            </div>
            <hr className={'mt-4 mb-4'}/>
            <div className={'flex flex-row justify-end items-center content-center gap-4 w-full'}>
                <p className={'text-[18px] text-center'}>Total cost: <label className={'font-bold'}>{totalCost}&nbsp;$ </label> </p>
            </div>
        </div>
    )
}