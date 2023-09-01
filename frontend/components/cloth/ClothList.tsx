import Image from "next/image";
import { ParsedUrlQuery } from "querystring";

import { useEffect, useState } from "react";

import { Filter } from "@/components/cloth/Filter";
import { ClothBox } from "@/components/cloth/ClothBox";
import { Sort } from "@/components/cloth/Sort"

import { Cloth } from "@/models/cloth";
import { FilterParams } from "@/models/filter-params";

import { GetClothData } from "@/api/cloth-list";
import Router from "next/router";


export function ClothList({params}: {params: ParsedUrlQuery}){

    const [data, setData] = useState<Array<Cloth>>([])
    const [filterParams, setFilterParams] = useState<FilterParams>({sorted: undefined, cost: undefined, kid_gender: undefined, person_gender: undefined, type: undefined, search: undefined})

    const [filterVisible, setFilterVisible] = useState(true);

    const [label, setLabel] = useState("");

    useEffect(() => {
        async function getData(){
            const result = await GetClothData(window.location.href)
            setData(result)
        }
        getData()
        const sorted = params["sorted"];
        const person_gender = params["person_gender"];
        const kid_gender = params["kid_gender"];
        const cost = params["cost"];
        const type = params["type"];
        const search = params["search"];
        setFilterParams({sorted, cost, type, person_gender, kid_gender, search})
    }, [params])

    useEffect(() => {
        let text = '';
        if(filterParams.person_gender){
            text+= (typeof filterParams.person_gender === 'string' ? filterParams.person_gender : filterParams.person_gender.join(', ')) + ' '
        }
        if(filterParams.type){
            text+= (typeof filterParams.type === 'string' ? filterParams.type : filterParams.type.join(' & ')) + ' '
        }else{
            text+='cloth '
        }
        if(filterParams.search){
            text+= `on request \'${filterParams.search}\'`;
        }
        text = text.toLowerCase().replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
        setLabel(text)
    }, [filterParams])

    function DeleteSearch(){
        const query = Object.assign({}, filterParams)
        Object.keys(query).forEach(key => query[key] === undefined && delete query[key])

        delete query["search"]

        Router.push({
            pathname: '/cloth',
            query: {...query},
        })
    }

    return(
        <div className={'border-box max-[800px]:pl-[30px] max-[800px]:pr-[30px] w-full pl-[150px] pr-[150px]'}>
            <div className={'flex flex-row h-[50px] items-center gap-2 justify-start max-[450px]:flex-col max-[450px]:gap-[20px]'}>
                <div className={'flex flex-row items-center gap-2 max-[450px]:w-full'}>
                    <label className={'font-bold inline-block text-[14px] max-[600px]:w-[calc(100%-40px)] select-none min-[600px]:text-[18px]'}>{label}</label>
                    {filterParams.search && (
                        <div className={'flex justify-center mr-0 ml-auto items-center cursor-pointer h-[24px] w-[24px] rounded-full bg-based-gray'}
                             onClick={DeleteSearch}>
                            <Image src={'/cloth/cross-icon.png'} width={'16'} height={'16'}/>
                        </div>
                    )}
                </div>
                <div className={'ml-auto mr-0 max-[450px]:w-full flex flex-row gap-[15px]'}>
                    <div className={'flex flex-row gap-2 cursor-pointer select-none max-[450px]:ml-0 max-[450px]:mr-auto'}
                         onClick={() => setFilterVisible((value) => !value)}>
                        <p className={'font-bold text-[14px] mt-auto mb-auto'}>Hide filters</p>
                        <Image src={'/cloth/hide-filters.svg'} alt={'hide icon'} width={'25'} height={'24'}/>
                    </div>
                    <Sort filterParams={filterParams}/>
                </div>
            </div>
            <div className={'max-[600px]:flex max-[600px]:flex-col min-[600px]:grid mt-[50px] w-full ' +
                (filterVisible
                        ? "transition-all duration-[0.8s] grid-cols-[20%_80%] max-[600px]:grid-cols-1"
                        : "transition-all delay-[0.6s] duration-[0.8s] grid-cols-[0%_100%]"
                )}>
                <Filter filterVisible={filterVisible} filterParams={filterParams} />
                <div className={'grid max-xl:grid-cols-2 max-[600px]:grid-cols-1 grid-cols-3 gap-[5%] w-[100%] box-border ' +
                    (filterVisible
                        ? "transition-all duration-[0.8s] pl-[50px] max-[600px]:pl-0 max-[600px]:mt-[30px]"
                        : "transition-all delay-[0.6s] duration-[0.8s] pl-0 max-[600px]:mt-0"
                    )}>
                    {data.map((cloth: Cloth) => (
                        <ClothBox key={cloth.ID} cloth={cloth}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
