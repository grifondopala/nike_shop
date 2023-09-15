import { PopularItemModel } from "@/models/main";

import Image from "next/image";

export function PopularItem({item}: {item: PopularItemModel}){
    return(
        <div className={`w-[400px] bg-white inline-block select-none mr-[10px] cursor-pointer relative max-[450px]:w-[80vw]`}>
            <div className={`max-w-[400px] max-h-[400px] max-[450px]:w-[100%] aspect-square bg-dark relative`}>
                <Image src={item.photo_url} layout={'fill'} style={{objectFit:"contain"}} className={'w-[100%] aspect-square'} alt={'fashion'} />
            </div>
            <div className={'grid grid-cols-[90%_10%] max-w-[400px] max-[450px]:w-[100%] mt-[15px]'}>
                <div className={'flex flex-col'}>
                    <p className={'text-[18px] whitespace-pre-wrap'}>{item.name}</p>
                    <p className={'mt-[5px] text-[16px] text-based-gray'}>{item.type}</p>
                </div>
                <div>
                    <p className={'text-[18px]'}>${item.cost}</p>
                </div>
            </div>
        </div>
    )
}