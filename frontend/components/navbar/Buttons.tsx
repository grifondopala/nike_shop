import Image from "next/image";
import Router from "next/router";

export const LikeButton = ({isSearching}: {isSearching: boolean}) => {
    return(
        <div className={'cursor-pointer w-[24px] h-[24px] select-none ' + (isSearching ? 'hidden' : 'visible')} onClick={() => Router.push("/favorites")}>
            <Image src={'/navbar/like.svg'} alt={'like-icon'} width={'24'} height={'24'}/>
        </div>
    )
}

export const BasketButton = ({isSearching}: {isSearching: boolean}) => {
    return(
        <div className={'cursor-pointer w-[24px] h-[24px] select-none ' + (isSearching ? 'hidden' : 'visible')} onClick={() => Router.push("/basket")}>
            <Image src={'/navbar/basket.svg'} alt={'basket-icon'} width={'24'} height={'24'}/>
        </div>
    )
}