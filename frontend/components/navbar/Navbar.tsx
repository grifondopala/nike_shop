import Image from "next/image";
import { useEffect, useState } from "react";

import { DefaultLink, SectionLink } from "@/components/navbar/Links";
import { Search } from "@/components/navbar/Search";
import { BasketButton, LikeButton } from "@/components/navbar/Buttons";

import { CheckAuth } from "@/api/auth";


export const Navbar = () => {

    const [isAuth, setIsAuth] = useState<boolean>(false)

    useEffect(() => {
        async function CheckUser(){
            const token = await localStorage.getItem('token');
            if(!token || token == ''){
                return
            }
            const result = await CheckAuth(token);
            setIsAuth(result)
        }
        CheckUser()
    }, [])

    function AuthSection(){

        function ExitHandler(){
            localStorage.removeItem('token');
            setIsAuth(false)
        }

        if(isAuth){
            return (
                <div className={'box-border pl-4 pr-4 [&:not(:last-child)]:border-r-2 max-[450px]:pl-[6px] max-[450px]:pr-[6px] h-[21px]'}>
                    <label className={'text-[14px] font-bold cursor-pointer hover:underline'} onClick={ExitHandler}>Exit</label>
                </div>
            )
        }
        return <DefaultLink label={'Sign In'} url={'/auth'} />
    }

    return(
        <nav>
            <div className={`w-full bg-simple-gray h-[36px] flex flex-row box-border min-[800px]:pr-[150px] max-[800px]:pl-[30px] max-[800px]:pr-[30px] min-[800px]:pl-[150px] items-center
                             max-[450px]:pl-2 max-[450px]:pr-2`}>
                <Image src={"/navbar/person-logo.svg"} alt={'person-logo'} width={'24'} height={'24'}/>
                <div className={'flex flex-row ml-auto mr-0 items-center'}>
                    <DefaultLink label={'Find a Store'} url={'/stores'} />
                    <DefaultLink label={'Help'} url={'/help'} />
                    <DefaultLink label={'Join Us'} url={'/join-us'} />
                    <AuthSection />
                </div>
            </div>
            <div className={`w-full bg-white h-[60px] flex flex-row items-center box-border min-[800px]:pr-[150px] max-[800px]:pl-[30px] max-[800px]:pr-[30px] min-[800px]:pl-[150px]
                             max-[450px]:pl-2 max-[450px]:pr-2`}>
                <Image src={"/navbar/nike-logo.svg"} alt={'nike-logo'} width={'60'} height={'22'}/>
                <div className={'absolute flex flex-row left-0 right-0 m-auto w-fit max-[1300px]:hidden'}>
                    <SectionLink label={'New & Featured'} url={'/cloth?sorted=newest'} />
                    <SectionLink label={'Men'} url={'/cloth?person_gender=MEN&sorted=newest'} />
                    <SectionLink label={'Women'} url={'/cloth?person_gender=WOMEN&sorted=newest'} />
                    <SectionLink label={'Kids'} url={'/cloth?kid_gender=BOYS&kid_gender=GIRLS'} />
                    <SectionLink label={'Sale'} url={'/sale'} />
                    <SectionLink label={'SNKRS'} url={'/snkrs'} />
                </div>
                <div className={'flex flex-row ml-auto mr-0 w-fit flex flex-row items-center gap-2'}>
                    <Search />
                    <LikeButton />
                    <BasketButton />
                </div>
            </div>
            <div className={'absolute min-[450px]:flex min-[450px]:flex-row max-[450px]:grid max-[450px]:grid-cols-3 left-0 right-0 m-auto w-fit min-[1300px]:hidden'}>
                <SectionLink label={'New & Featured'} url={'/cloth?sorted=newest'} />
                <SectionLink label={'Men'} url={'/cloth?person_gender=MEN&sorted=newest'} />
                <SectionLink label={'Women'} url={'/cloth?person_gender=WOMEN&sorted=newest'} />
                <SectionLink label={'Kids'} url={'/cloth?kid_gender=BOYS&kid_gender=GIRLS'} />
                <SectionLink label={'Sale'} url={'/sale'} />
                <SectionLink label={'SNKRS'} url={'/snkrs'} />
            </div>
        </nav>
    )
}