import Image from "next/image";

import { SportItemModel } from "@/models/main";

export function SportItem({item}: {item: SportItemModel}){
    return(
        <div className={`w-[480px] bg-white inline-block select-none mr-[10px] cursor-pointer relative max-[450px]:w-[80vw]`}>
            <div className={`max-w-[480px] max-h-[320px] max-[450px]:w-[100%] aspect-[3/2] relative`}>
                <Image src={item.photo_url} layout={'fill'} style={{objectFit:"contain"}} className={'w-[100%] aspect-[2/1]'} alt={'fashion'} />
            </div>
            <p className={'mt-[15px] text-[18px]'}>{item.name}</p>
            <p className={'mt-[5px] text-[16px]'}>{item.description}</p>
            <p className={'underline text-[14px] mt-[20px]'}>Shop</p>
        </div>
    )
}