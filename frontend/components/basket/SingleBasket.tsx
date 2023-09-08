import { BasketItem } from "@/models/basket";

import Image from "next/image";
import Router from "next/router";

export function SingleBasket({item, deleteHandle}: {item: BasketItem, deleteHandle: any}){
    return(
        <div className={'w-full flex flex-row gap-4'}>
            <div className={'h-[150px] w-[150px] relative aspect-square cursor-pointer'} onClick={() => Router.push(`/cloth/${item.cloth_id}/${item.color_id}`)}>
                <Image src={`${process.env.NEXT_PUBLIC_SERVER_IP}/static/${item.main_photo}`} alt={'photo'} fill={true} objectFit={'fill'} />
            </div>
            <div className={'grid grid-cols-[calc(100%-24px)_24px] w-full'}>
                <div className={'flex flex-col w-full'}>
                    <p className={'text-[18px]'}>{item.name}</p>
                    <p>Cost: {item.cost} $</p>
                    <p>Size: {item.size}</p>
                    <p>Amount: {item.amount}</p>
                    <p>Total <label className={'font-bold'}>{item.cost * item.amount} $</label></p>
                </div>
                <Image src={'/navbar/basket.svg'} alt={'like-icon'} width={'24'} height={'24'} className={'ml-auto mr-0 cursor-pointer'} onClick={() => deleteHandle(item.id)}/>
            </div>
        </div>
    )
}