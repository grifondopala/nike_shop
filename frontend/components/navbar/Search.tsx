import Image from "next/image";

export const Search = () => {
    return(
        <div className={'w-[180px] h-[40px] bg-simple-gray box-border pt-[8px] pb-[8px] pl-[12px] pr-[12px] rounded-[20px] flex flex-row items-center gap-2'}>
            <Image src={'/navbar/search.svg'} alt={'search-icon'} width={'24'} height={'24'}/>
            <input placeholder={'Search'} className={'w-full bg-simple-gray outline-none'}/>
        </div>
    )
}