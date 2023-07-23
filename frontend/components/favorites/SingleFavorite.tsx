import { Favorite } from "@/models/favorite";
import Image from "next/image";
import Router from "next/router";

import { DeleteFavorite } from "@/api/favorites";

export function SingleFavorite({favorite, deleteFromData}: {favorite: Favorite, deleteFromData}){

    const type = favorite.cloth.person_gender === 'MEN' ? 'Men\'s' : favorite.cloth.person_gender === 'WOMEN'
        ? 'Women\'s' : favorite.cloth.kid_gender === 'BOYS' ? 'Boy\'s' : favorite.cloth.kid_gender === 'GIRLS' ? 'Girl\'s' : 'Unisex'

    async function Delete(){
        const token = await localStorage.getItem('token')
        const result = await DeleteFavorite(token, favorite.clothColor.cloth_refer, favorite.favoriteId)
        deleteFromData(favorite.favoriteId)
    }

    return(
        <div className={'w-full flex flex-row h-[150px] gap-4'}>
            <div className={'h-full relative aspect-square cursor-pointer'}
                 onClick={() => Router.push(`/cloth/${favorite.cloth.ID}/${favorite.clothColor.ID}`)}>
                <Image src={`${process.env.NEXT_PUBLIC_SERVER_IP}/static/${favorite.clothColor.main_photo}`} alt={'photo'} fill={true} objectFit={'fill'} />
            </div>
            <div className={'grid grid-cols-[calc(100%-24px)_24px] w-full'}>
                <div className={'flex flex-col w-full'}>
                    <p className={'text-[18px]'}>{favorite.cloth.name}</p>
                    <p>{type} {favorite.cloth.type}</p>
                    <p className={'font-bold'}>{favorite.cloth.cost} $</p>
                </div>
                <Image src={'/navbar/like.svg'} alt={'like-icon'} width={'24'} height={'24'} className={'ml-auto mr-0 cursor-pointer'}
                       onClick={Delete}/>
            </div>
        </div>
    )
}