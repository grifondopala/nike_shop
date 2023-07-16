import Image from "next/image";
import Router from 'next/router';

import { Cloth } from "@/models/cloth";

export function ClothBox({cloth}: {cloth: Cloth}){

    const type = cloth.person_gender === 'MEN' ? 'Men\'s' : cloth.person_gender === 'WOMEN'
                 ? 'Women\'s' : cloth.kid_gender === 'BOYS' ? 'Boy\'s' : cloth.kid_gender === 'GIRLS' ? 'Girl\'s' : 'Unisex'

    return(
        <div className={'w-full aspect-[1/1.2] cursor-pointer'} onClick={() => Router.push(`/cloth/${cloth.ID}/${cloth.cloth_color[0].ID}`)}>
            <div className={'w-full relative aspect-square'}>
                <Image src={`${process.env.NEXT_PUBLIC_SERVER_IP}/static/${cloth.cloth_color[0].main_photo}`} alt={'123'} fill={true} objectFit={'fill'}/>
            </div>
            <div className={'flex flex-col box-border pt-3 pb-3'}>
                <p className={'font-bold text-[18px]'}>{cloth.name}</p>
                <p className={'text-[16px] text-based-gray'}>{type + ' ' + cloth.type}</p>
                <p className={'text-[16px] text-based-gray'}>{cloth.cloth_color.length} Colour</p>
                <p className={'font-bold text-[18px]'}>{cloth.cost}$</p>
            </div>
        </div>
    )
}