import { FashionItemModel    } from "@/models/main";

import Image from "next/image";

export function FashionItem({item, index, length}: {item: FashionItemModel, index: number, length: number}){
    return(
        <div className={`w-[300px] bg-white inline-block select-none mr-[10px] cursor-pointer relative max-[450px]:w-[80vw] aspect-square`}>
            <div className={'absolute w-[50px] h-[30px] bg-[#000000] opacity-60 right-[50px] top-[30px] rounded-[25px] flex justify-center items-center z-10'}>
                <p className={'text-white'}>{index % length + 1}/{length}</p>
            </div>
            <Image src={item.photo_url} width={'300'} height={'300'} style={{objectFit:"cover"}} alt={'fashion'} />
        </div>
    )
}