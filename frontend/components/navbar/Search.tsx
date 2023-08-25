import Image from "next/image";

import { useState } from "react";

import Router from "next/router";

interface SearchProps{
    isSearching: boolean,
    setIsSearching: any
}

export const Search = ({isSearching, setIsSearching}: SearchProps) => {

    const [searchValue, setSearchValue] = useState<string>('')

    function FocusHandler(){
        OnClickHandler()
        setIsSearching((value) => !value)
    }

    function OnClickHandler(){
        if(searchValue != '') {
            Router.push({
                pathname: '/cloth',
                query: {search: searchValue},
            })
        }
    }

    return(
        <div className={'w-[180px] h-[40px] bg-simple-gray box-border pt-[4px] pb-[4px] pl-[12px] pr-[12px] rounded-[20px] flex flex-row items-center gap-2 ' +
            (isSearching ? 'w-full min-[450px]:mr-[15%] min-[450px]:ml-[15%] max-[450px]:ml-2' : '')}>
            <div className={'flex items-center box-border p-[4px] h-full aspect-square justify-center cursor-pointer rounded-[100%] hover:bg-based-gray select-none'} onClick={OnClickHandler}>
                <Image src={'/navbar/search.svg'} alt={'search-icon'} width={'24'} height={'24'}/>
            </div>
            <input placeholder={'Search'} className={'w-full bg-simple-gray outline-none'} onFocus={FocusHandler} onBlur={FocusHandler} onChange={(e) => setSearchValue(e.target.value)}/>
        </div>
    )
}