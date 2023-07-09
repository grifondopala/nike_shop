import Image from "next/image";

import { useState } from "react";

export function Order({sortedBy}: {sortedBy: string | string[] | undefined}){

    const [sortingVisible, setSortingVisible] = useState(false);

    return(
        <div className={'w-[150px]'}>
            <div className={'flex flex-row gap-2 cursor-pointer bg-white'} onClick={() => setSortingVisible((value) => !value)}>
                <p className={'font-bold text-[14px]'}>Sort by: {sortedBy}</p>
                <Image className={'ml-auto mr-0'} src={'/things/down-arrow.svg'} alt={'hide icon'} width={'14'} height={'14'}/>
            </div>
            <div className={'absolute flex flex-col w-[150px] gap-[2px] z-50 bg-white pr-2 border-box rounded-b-md shadow-md' +
                (sortingVisible
                    ? "transition-all opacity-100 duration-[0.3s] opacity-100"
                    : "transition-all opacity-0 duration-[0.3s] pointer-events-none")}>
                <p className={'text-right text-[14px] cursor-pointer'}>Featured</p>
                <p className={'text-right text-[14px] cursor-pointer'}>Newest</p>
                <p className={'text-right text-[14px] cursor-pointer'}>Price: High-Low</p>
                <p className={'text-right text-[14px] cursor-pointer'}>Price: Low-High</p>
            </div>
        </div>
    )
}