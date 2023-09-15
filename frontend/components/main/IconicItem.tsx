import Image from "next/image";

import { IconicItemModel } from "@/models/main";

export function IconicItem({item, index, length}: {item: IconicItemModel, index: number, length: number}){
    return(
        <div className={`w-[300px] bg-white inline-block select-none mr-[10px] cursor-pointer relative max-[450px]:w-[80vw]`}>
            <div className={'absolute w-[50px] h-[30px] bg-[#000000] opacity-60 right-[50px] top-[30px] rounded-[25px] flex justify-center items-center z-10'}>
                <p className={'text-white'}>{index % length + 1}/{length}</p>
            </div>
            <div className={`max-w-[300px] max-[450px]:w-[100%] aspect-square bg-dark relative`}>
                <Image src={item.photo_url} layout={'fill'} style={{objectFit:"contain"}} className={'w-[100%] aspect-square'} alt={'fashion'} />
            </div>
            <p className={'mt-[15px]'}>{item.name}</p>
        </div>
    )
}