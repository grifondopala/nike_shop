import Router from "next/router";

export function NotAuth(){
    return(
        <div className={'flex flex-col items-center gap-4 w-[350px] ml-auto mr-auto'}>
            <p className={'font-bold text-[24px] text-center text-center w-full'}>Please login to your account</p>
            <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer'} onClick={() => Router.push('/auth')}>
                <p className={'text-white'}>Sign In</p>
            </div>
        </div>
    )
}