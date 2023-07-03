import Image from "next/image";

interface ClothListProps{
    label: string
}


export function ClothList({label} : ClothListProps){

    return(
        <div className={'border-box pl-[30px] pr-[30px] pt-[30px] min-h-[100%] mb-[330px]'}>
            <div className={'flex flex-row h-[50px] items-center'}>
                <p className={'font-bold text-[18px]'}>{label}</p>
                <div className={'ml-auto mr-0 flex flex-row gap-[15px]'}>
                    <div className={'flex flex-row gap-2'}>
                        <p className={'font-bold text-[14px]'}>Hide filters</p>
                        <Image src={'/hide-filters.svg'} alt={'hide icon'} width={'24'} height={'24'}/>
                    </div>
                    <div className={'flex flex-row gap-2'}>
                        <p className={'font-bold text-[14px]'}>Sort by</p>
                        <Image src={'/down-arrow.svg'} alt={'hide icon'} width={'14'} height={'14'}/>
                    </div>
                </div>
            </div>
            <div className={'grid grid-cols-2'}>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}
