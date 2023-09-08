import Router from "next/router";

export function ListEmpty({label}: {label: string}){
    return(
        <div className={'w-[60%] ml-auto mr-auto flex flex-col max-[800px]:w-full flex flex-col items-center gap-4'}>
            <p className={'font-bold text-[24px] text-center'}>{label}</p>
            <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer'} onClick={() => Router.push('/cloth?sorted=newest')}>
                <p className={'text-white'}>Find Cloth</p>
            </div>
        </div>
    )
}