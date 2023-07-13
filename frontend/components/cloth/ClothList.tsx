import Image from "next/image";
import { ParsedUrlQuery } from "querystring";

import { useEffect, useState } from "react";

import { Filter } from "@/components/cloth/Filter";
import { ClothBox } from "@/components/cloth/ClothBox";
import { Sort } from "@/components/cloth/Sort"

import { Cloth } from "@/models/cloth";
import { FilterParams } from "@/models/filter-params";

import { GetClothData } from "@/api/cloth-list";


export function ClothList({params}: {params: ParsedUrlQuery}){

    const [data, setData] = useState<Array<Cloth>>([])
    const [filterParams, setFilterParams] = useState<FilterParams>({sorted: undefined, cost: undefined, kid_gender: undefined, person_gender: undefined, type: undefined})

    useEffect(() => {
        async function getData(){
            setData(await GetClothData(window.location.href))
        }
        getData()
        const sorted = params["sorted"];
        const person_gender = params["person_gender"];
        const kid_gender = params["kid_gender"];
        const cost = params["cost"];
        const type = params["type"];
        setFilterParams({sorted, cost, type, person_gender, kid_gender})
    }, [params])

    const [filterVisible, setFilterVisible] = useState(true);

    const [label, setLabel] = useState("Cloth");

    return(
        <div className={'border-box pl-[150px] pr-[150px]'}>
            <div className={'flex flex-row h-[50px] items-center'}>
                <p className={'font-bold text-[18px]'}>{label}</p>
                <div className={'ml-auto mr-0 flex flex-row gap-[15px]'}>
                    <div className={'flex flex-row gap-2 cursor-pointer select-none'} onClick={() => setFilterVisible((value) => !value)}>
                        <p className={'font-bold text-[14px]'}>Hide filters</p>
                        <Image src={'/cloth/hide-filters.svg'} alt={'hide icon'} width={'24'} height={'24'}/>
                    </div>
                    <Sort filterParams={filterParams}/>
                </div>
            </div>
            <div className={'grid mt-[50px] w-full' +
                (filterVisible
                        ? "transition-all duration-[0.8s] grid-cols-[10%_90%]"
                        : "transition-all delay-[0.6s] duration-[0.8s] grid-cols-[0%_100%]"
                )}>
                <Filter filterVisible={filterVisible} filterParams={filterParams} />
                <div className={'grid grid-cols-3 gap-[5%] w-[100%] box-border ' +
                    (filterVisible
                        ? "transition-all duration-[0.8s] pl-[100px]"
                        : "transition-all delay-[0.6s] duration-[0.8s] pl-0"
                    )}>
                    {data.map((cloth: Cloth) => (
                        <ClothBox key={cloth.ID} cloth={cloth}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
