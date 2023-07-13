import { DefaultLink, SectionLink } from "@/components/navbar/Links";
import { Search } from "@/components/navbar/Search";
import { BasketButton, LikeButton } from "@/components/navbar/Buttons";

import Image from "next/image";

export const Navbar = () => {
    return(
        <nav>
            <div className={`w-full bg-simple-gray h-[36px] flex flex-row box-border pr-[150px] pl-[150px] items-center`}>
                <Image src={"/navbar/person-logo.svg"} alt={'person-logo'} width={'25'} height={'24'}/>
                <div className={'flex flex-row ml-auto mr-0 items-center'}>
                    <DefaultLink label={'Find a Store'} url={'/stores'} />
                    <DefaultLink label={'Help'} url={'/help'} />
                    <DefaultLink label={'Join Us'} url={'/join-us'} />
                    <DefaultLink label={'Sign In'} url={'/sign-in'} />
                </div>
            </div>
            <div className={`w-full bg-white h-[60px] flex flex-row items-center box-border pr-[150px] pl-[150px]`}>
                <Image src={"/navbar/nike-logo.svg"} alt={'nike-logo'} width={'60'} height={'22'}/>
                <div className={'absolute flex flex-row left-0 right-0 m-auto w-fit'}>
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
        </nav>
    )
}