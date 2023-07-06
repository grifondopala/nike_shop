import Image from "next/image";

export const LikeButton = () => {
    return(
        <div className={'cursor-pointer'}>
            <Image src={'/navbar/like.svg'} alt={'like-icon'} width={'24'} height={'24'}/>
        </div>
    )
}

export const BasketButton = () => {
    return(
        <div className={'cursor-pointer'}>
            <Image src={'/navbar/basket.svg'} alt={'basket-icon'} width={'24'} height={'24'}/>
        </div>
    )
}