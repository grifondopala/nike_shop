import Image from "next/image"

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { GetPayedBaskets } from "@/api/basket";

import { BasketItem } from "@/models/basket";
import { PayedBasket } from "@/components/basket/PayedBasket";

export function PreviousBaskets(){

    const auth = useAuth();

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isGotPayedBaskets, setIsGotPayedBaskets] = useState<boolean>(false);

    const [data, setData] = useState<BasketItem[][]>([])

    async function showBaskets(){

        if(!isGotPayedBaskets){
            const result = await GetPayedBaskets(auth.token);

            if(result['error']) return [];

            if(result.baskets) setData(result.baskets);

            setIsGotPayedBaskets(true);
        }

        setIsVisible((value) => !value);

    }


    return(
        <div className={'w-[60%] ml-auto mr-auto flex flex-col max-[800px]:w-full max-[800px]:pl-[30px] max-[800px]:pr-[30px] max-[450px]:pl-2 max-[450px]:pr-2 mt-[60px]'}>
            <hr className={'w-full'}/>
            <div className={'w-[220px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer gap-2 ml-auto mr-auto mt-[20px]'} onClick={showBaskets}>
                <p className={'text-white'}>Show previous purchase</p>
                <Image src={'/basket/arrow-white-right.png'} alt={'hide icon'} width={'14'} height={'14'} className={'w-auto h-auto ' +
                    (isVisible
                        ? "transition-all duration-[0.3s] -rotate-90"
                        : "transition-all duration-[0.3s] rotate-90")}/>
            </div>
            <div className={'grid easy-in overflow-hidden mt-[60px] ' +
                (isVisible
                    ? "transition-all grid-rows-[1fr] duration-[0.5s] pointer-events-none"
                    : "transition-all grid-rows-[0fr] duration-[0.5s] pointer-events-none")}>
                <div className={'min-h-0 flex flex-col gap-4 w-full'}>
                    {data.map((item: BasketItem[], index) => (
                        <PayedBasket data={item} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )

}