import Image from "next/image";

export const LikeButton = () => {
    return(
        <div className={'cursor-pointer'}>
            <Image src={'/like.svg'} alt={'like-icon'} width={'24'} height={'24'}/>
        </div>
    )
}

export const BasketButton = () => {
    return(
        <div className={'cursor-pointer'}>
            <Image src={'/basket.svg'} alt={'basket-icon'} width={'24'} height={'24'}/>
        </div>
    )
}