import Image from "next/image";

import { TrendingItemModel } from "@/models/main";

export function TrendingItem({item}: {item: TrendingItemModel}){
    return(
        <div className={`w-[400px] bg-white inline-block select-none mr-[10px] cursor-pointer relative max-[450px]:w-[80vw]`}>
            <div className={`max-w-[400px] max-h-[400px] max-[450px]:w-[100%] aspect-square bg-dark relative`}>
                <Image src={item.photo_url} layout={'fill'} style={{objectFit:"contain"}} className={'w-[100%] aspect-square'} alt={'fashion'} />
            </div>
            <p className={'mt-[15px]'}>{item.name}</p>
        </div>
    )
}