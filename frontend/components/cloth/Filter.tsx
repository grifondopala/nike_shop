import { FilterParams } from "@/models/filter-params";

import Router from "next/router";

import { typeFilter, typeFilters } from "@/constants/type-filter";
import { useState } from "react";

interface FilterProps{
    filterVisible: boolean,
    filterParams: FilterParams
}

export function Filter({filterVisible, filterParams} : FilterProps){

    const [minCost, setMinCost] = useState<number>()
    const [maxCost, setMaxCost] = useState<number>()

    function checkedParam(value: string, key: string){
        return filterParams[key] == value || (Array.isArray(filterParams[key]) && filterParams[key].includes(value))
    }

    function genderParamHandler(value: string, key: string){
        const query = Object.assign({}, filterParams)
        Object.keys(query).forEach(key => query[key] === undefined && delete query[key])

        if(typeof query[key] === 'string' && query[key] === value) {
            delete query[key];
        }
        else if(typeof query[key] === 'string' && query[key] != value) {
            query[key] = [query[key], value]
        }
        else if(Array.isArray(query[key]) && query[key].includes(value)) {
            query[key] = query[key].filter((str) => str != value)
        }
        else if(Array.isArray(query[key]) && !query[key].includes(value)){
            query[key].push(value)
        }
        else if(typeof query[key] === 'undefined') {
            query[key] = value
        }

        Router.push({
            pathname: '/cloth',
            query: {...query},
        })
    }

    function typeParamHander(value: string | string[]){
        const query = Object.assign({}, filterParams)
        Object.keys(query).forEach(key => query[key] === undefined && delete query[key])

        if(JSON.stringify(value) === JSON.stringify(filterParams.type)){
            delete query['type']
            Router.push({
                pathname: '/cloth',
                query: {...query},
            })
            return;
        }

        Router.push({
            pathname: '/cloth',
            query: {...query, type: value},
        })
    }

    function costHandler(){
        const query = Object.assign({}, filterParams)
        Object.keys(query).forEach(key => query[key] === undefined && delete query[key])

        if(minCost != '' && typeof minCost != 'undefined'){
            query['minCost'] = minCost
        }
        if(maxCost != '' && typeof maxCost != 'undefined'){
            query['maxCost'] = maxCost
        }

        Router.push({
            pathname: '/cloth',
            query: {...query},
        })

    }

    return(
        <div className={'w-[100%] min-[600px]:flex min-[600px]:flex-col max-[600px]:grid box-border easy-in overflow-hidden min-[600px]:min-w-[150px] max-[600px]:mt-[10px]' +
                        (filterVisible
                            ? " transition-all min-[600px]:duration-[1.6s] min-[600px]:-translate-x-0 max-[600px]:grid-rows-[1fr] max-[600px]:duration-[0.8s]"
                            : " transition-all pointer-events-none min-[600px]:duration-[0.8s] min-[600px]:-translate-x-[400px] max-[600px]:grid-rows-[0fr] max-[600px]:duration-[0.8s]"
                        )}>
            <div className={'min-h-0'}>
                <div className={'flex flex-col gap-2'}>
                    {typeFilters.map((filter: typeFilter) =>
                        <p key={filter.name} className={`text-[16px] cursor-pointer ${JSON.stringify(filter.value) === JSON.stringify(filterParams.type) ? 'font-bold' : ''}`}
                           onClick={() => typeParamHander(filter.value)}>{filter.name}</p>
                    )}
                </div>
                <hr className={'mt-[40px]'}/>
                <div className={'mt-[20px]'}>
                    <p className={'font-bold text-[16px]'}>Gender</p>
                    <div className={'flex flex-col gap-1'}>
                        <div className={'flex flex-row gap-4'}>
                            <input type={"checkbox"} value={"MEN"} checked={checkedParam('MEN', 'person_gender')}
                                   onChange={() => genderParamHandler('MEN', 'person_gender')}/>
                            <label>Men</label>
                        </div>
                        <div className={'flex flex-row gap-4'}>
                            <input type={"checkbox"} value={"WOMEN"} checked={checkedParam('WOMEN', 'person_gender')}
                                   onChange={() => genderParamHandler('WOMEN', 'person_gender')}/>
                            <label>Women</label>
                        </div>
                        <div className={'flex flex-row gap-4'}>
                            <input type={"checkbox"} value={"UNISEX"} checked={checkedParam('UNISEX', 'person_gender')}
                                   onChange={() => genderParamHandler('UNISEX', 'person_gender')}/>
                            <label>Unisex</label>
                        </div>
                    </div>
                </div>
                <hr className={'mt-[20px]'}/>
                <div className={'mt-[20px]'}>
                    <p className={'font-bold text-[16px]'}>Kids</p>
                    <div className={'flex flex-col gap-1'}>
                        <div className={'flex flex-row gap-4'}>
                            <input type={"checkbox"} value={"BOYS"} checked={checkedParam('BOYS', 'kid_gender')}
                                   onChange={() => genderParamHandler('BOYS', 'kid_gender')}/>
                            <label>Boys</label>
                        </div>
                        <div className={'flex flex-row gap-4'}>
                            <input type={"checkbox"} value={"GIRLS"} checked={checkedParam('GIRLS', 'kid_gender')}
                                   onChange={() => genderParamHandler('GIRLS', 'kid_gender')}/>
                            <label>Girls</label>
                        </div>
                    </div>
                </div>
                <hr className={'mt-[20px]'}/>
                <div className={'mt-[20px] w-full flex flex-col gap-2'}>
                    <p className={'font-bold text-[16px]'}>Price</p>
                    <div className={'grid w-full grid-cols-[40%_60%]'}>
                        <p>From: </p>
                        <input type={'number'} className={'border-[1px] w-full outline-none'} value={minCost} onChange={(e) => setMinCost(parseInt(e.target.value))}/>
                        <p className={'mt-2'}>To: </p>
                        <input type={'number'} className={'border-[1px] w-full mt-2 outline-none'} value={maxCost} onChange={(e) => setMaxCost(parseInt(e.target.value))}/>
                    </div>
                    <div className={'w-[120px] h-[40px] rounded-md bg-dark select-none flex justify-center items-center cursor-pointer mt-2'}
                         onClick={costHandler}>
                        <p className={'text-white'}>Set cost range</p>
                    </div>
                </div>
            </div>
        </div>
    )
}