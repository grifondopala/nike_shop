import Image from "next/image";
import axios from "axios";

import { Filter } from "@/components/things/Filter";


interface ClothListProps{
    label: string
}

async function GetData(){
    const promise = axios({
        url: `${process.env.SERVER_IP}/cloth/getAll`,
        method: "GET",
    })
    promise.then((res) => {})
}

export function ClothList({label} : ClothListProps){

    const data = GetData();

    return(
        <div className={'border-box pl-[30px] pr-[30px]'}>
            <div className={'flex flex-row h-[50px] items-center'}>
                <p className={'font-bold text-[18px]'}>{label}</p>
                <div className={'ml-auto mr-0 flex flex-row gap-[15px]'}>
                    <div className={'flex flex-row gap-2'}>
                        <p className={'font-bold text-[14px]'}>Hide filters</p>
                        <Image src={'/things/hide-filters.svg'} alt={'hide icon'} width={'24'} height={'24'}/>
                    </div>
                    <div className={'flex flex-row gap-2'}>
                        <p className={'font-bold text-[14px]'}>Sort by</p>
                        <Image src={'/things/down-arrow.svg'} alt={'hide icon'} width={'14'} height={'14'}/>
                    </div>
                </div>
            </div>
            <div className={'grid grid-cols-[15%_85%] mt-[20px] w-full'}>
                <Filter />
                <div>
                    
                </div>
            </div>
        </div>
    )
}
