import Image from "next/image";
import Router from "next/router";

export const LikeButton = () => {
    return(
        <div className={'cursor-pointer'} onClick={() => Router.push("/favorites")}>
            <Image src={'/navbar/like.svg'} alt={'like-icon'} width={'24'} height={'24'}/>
        </div>
    )
}

export const BasketButton = () => {
    return(
        <div className={'cursor-pointer'} onClick={() => Router.push("/basket")}>
            <Image src={'/navbar/basket.svg'} alt={'basket-icon'} width={'24'} height={'24'}/>
        </div>
    )
}