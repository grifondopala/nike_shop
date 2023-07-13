import { FilterParams } from "@/models/filter-params";

import Router from "next/router";

import { typeFilter, typeFilters } from "@/constants/type-filter";

interface FilterProps{
    filterVisible: boolean,
    filterParams: FilterParams
}

export function Filter({filterVisible, filterParams} : FilterProps){

    function checkedParam(value: string, key: string){
        return filterParams[key] == value || (Array.isArray(filterParams[key]) && filterParams[key].includes(value))
    }

    function genderParamHandler(value: string, key: string){
        const query = Object.assign({}, filterParams)
        Object.keys(query).forEach(key => query[key] === undefined && delete query[key])

        if(typeof query[key] === 'string' & query[key] === value) {
            delete query[key];
        }
        else if(typeof query[key] === 'string' & query[key] != value) {
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

        Router.push({
            pathname: '/cloth',
            query: {...query, type: value},
        })
    }

    return(
        <div className={'w-[100%] flex flex-col box-border' +
                        (filterVisible
                            ? " transition-all duration-[1.6s] -translate-x-0"
                            : " transition-all duration-[0.8s] -translate-x-[400px] pointer-events-none"
                        )}>
            <div className={'flex flex-col gap-2'}>
                {typeFilters.map((filter: typeFilter) =>
                    <p key={filter.name} className={'font-bold text-[16px] cursor-pointer'}
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
            <div className={'mt-[20px] flex flex-col gap-2'}>
                <p className={'font-bold text-[16px]'}>Price</p>
                <div className={'grid grid-cols-[40%_60%] gap-2'}>
                    <p>From: </p>
                    <input className={'border-[1px] outline-none'}/>
                    <p>To: </p>
                    <input className={'border-[1px] outline-none'}/>
                </div>
            </div>
        </div>
    )
}