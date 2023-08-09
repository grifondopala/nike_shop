import Image from "next/image";

import { useState } from "react";

import { FilterParams } from "@/models/filter-params";
import Router from "next/router";

export function Sort({filterParams}: {filterParams: FilterParams}){

    const [sortingVisible, setSortingVisible] = useState(false);

    function changeSort(sort: string){
        setSortingVisible(false)

        const query = Object.assign({}, filterParams)
        Object.keys(query).forEach(key => query[key] === undefined && delete query[key])

        Router.push({
            pathname: '/cloth',
            query: { ...query, sorted: sort },
        })
    }

    return(
        <div className={'w-[150px] select-none'}>
            <div className={'flex flex-row gap-2 cursor-pointer bg-white'} onClick={() => setSortingVisible((value) => !value)}>
                <p className={'font-bold text-[14px]'}>Sort by: {filterParams.sorted}</p>
                <Image src={'/cloth/down-arrow.svg'} alt={'hide icon'} width={'14'} height={'14'} className={'ml-auto mr-0 w-auto h-auto' +
                    (sortingVisible
                        ? "transition-all duration-[0.3s] -rotate-180"
                        : "transition-all duration-[0.3s] rotate-0")}/>
            </div>
            <div className={'absolute grid w-[150px] gap-[2px] z-50 bg-white pr-2 border-box rounded-b-md shadow-md easy-in overflow-hidden ' +
                (sortingVisible
                    ? "transition-all grid-rows-[1fr] duration-[0.3s]"
                    : "transition-all grid-rows-[0fr] duration-[0.3s] pointer-events-none")}>
                <div className={'min-h-0 flex flex-col gap-1'}>
                    <p className={'text-right text-[14px] cursor-pointer'} onClick={() => changeSort('featured')}>Featured</p>
                    <p className={'text-right text-[14px] cursor-pointer'} onClick={() => changeSort('newest')}>Newest</p>
                    <p className={'text-right text-[14px] cursor-pointer'} onClick={() => changeSort('high-low')}>Price: High-Low</p>
                    <p className={'text-right text-[14px] cursor-pointer'} onClick={() => changeSort('low-high')}>Price: Low-High</p>
                </div>
            </div>
        </div>
    )
}