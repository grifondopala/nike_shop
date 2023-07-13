import { useEffect, useState } from "react";
import Image from "next/image";
import Router from "next/router";

import { GetSingleClothData } from "@/api/single-cloth";

import { Cloth } from "@/models/cloth";
import { ClothColor } from "@/models/cloth-color";


interface SingleClothProps{
    clothId: string | string[] | undefined,
    colorId: string | string[] | undefined,
}

export function SingleCloth({clothId, colorId}: SingleClothProps){

    const [cloth, setCloth] = useState<Cloth>()
    const [currentColor, setCurrentColor] = useState<ClothColor>()
    const [pictureIndex, setPictureIndex] = useState(0)
    const [sizeChosen, setSizeChosen] = useState(0)

    const type = cloth?.person_gender === 'MEN' ? 'Men\'s' : cloth?.person_gender === 'WOMEN'
        ? 'Women\'s' : cloth?.kid_gender === 'BOYS' ? 'Boy\'s' : cloth?.kid_gender === 'GIRLS' ? 'Girl\'s' : 'Unisex'

    useEffect(() => {
        if(typeof clothId === 'undefined' || typeof colorId === 'undefined') return
        async function getData(){
            const result = await GetSingleClothData(clothId)
            setCloth(result.cloth)
            const colorIndex = result.cloth.cloth_color.findIndex((color) => color.ID == colorId )
            result.cloth.cloth_color[colorIndex].another_photo.unshift(result.cloth.cloth_color[colorIndex].main_photo)
            setCurrentColor(result.cloth.cloth_color[colorIndex])
            setPictureIndex(0)
        }
        getData()
    }, [clothId, colorId])

    function changePhoto(plus: number){
        let newIndex = pictureIndex + plus;
        if(newIndex == -1) newIndex = currentColor?.another_photo.length - 1;
        if(newIndex == currentColor?.another_photo.length) newIndex = 0;
        setPictureIndex(newIndex);
    }

    return(
        <div className={'mt-[50px] ml-auto mr-auto w-[60%] grid grid-cols-[70%_30%]'}>
            <div className={'grid grid-cols-[10%_90%] gap-[20px]'}>
                <div className={'flex flex-col gap-2'}>
                    {currentColor?.another_photo.map((url, index) => (
                        <div className={`w-full relative aspect-square rounded-md cursor-pointer 
                                        ${url === currentColor?.another_photo[pictureIndex] ? 'border-2' : ''}`}
                             onClick={() => setPictureIndex(index)}>
                            <Image className={`rounded-md`} src={`${process.env.NEXT_PUBLIC_SERVER_IP}/static/${url}`}
                                   alt={'color'} fill={true} objectFit={'fill'}/>
                        </div>
                    ))}
                </div>
                <div className={`w-[80%] relative aspect-square rounded-md select-none`}>
                    <Image className={`rounded-md`} src={`${process.env.NEXT_PUBLIC_SERVER_IP}/static/${currentColor?.another_photo[pictureIndex]}`}
                           alt={'color'} fill={true} objectFit={'cover'}/>
                    <div className={'absolute flex flex-row right-0 bottom-0 mb-4 mr-4 gap-2'}>
                        <div className={'w-[36px] h-[36px] rounded-full bg-white flex justify-center items-center cursor-pointer'}>
                            <Image className={'rotate-90'} src={'/cloth/down-arrow.svg'} alt={'hide icon'} width={'14'} height={'14'}
                                   onClick={() => changePhoto(-1)}/>
                        </div>
                        <div className={'w-[36px] h-[36px] rounded-full bg-white flex justify-center items-center cursor-pointer'}
                             onClick={() => changePhoto(1)}>
                            <Image className={'-rotate-90'} src={'/cloth/down-arrow.svg'} alt={'hide icon'} width={'14'} height={'14'}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col'}>
                <p className={'font-bold text-[18px]'}>{cloth?.name}</p>
                <p className={'font-bold text-[14px]'}>{type} {cloth?.type}</p>
                <p className={'font-bold text-[14px] mt-[20px]'}>{cloth?.cost} $</p>
                <div className={'grid grid-cols-5 mt-[20px] gap-2'}>
                    {cloth?.cloth_color.map((color) =>
                        <div className={`w-full relative aspect-square rounded-md ${currentColor?.ID === color.ID ? 'border-2' : ''}`}>
                            <Image className={`rounded-md cursor-pointer`} src={`${process.env.NEXT_PUBLIC_SERVER_IP}/static/${color.main_photo}`}
                                   alt={'color'} fill={true} objectFit={'cover'} onClick={() => Router.push(`/cloth/${cloth?.ID}/${color.ID}`)}/>
                        </div>
                    )}
                </div>
                <div className={'mt-[20px]'}>
                    <p className={'font-bold'}>Select Size</p>
                    <div className={'mt-[10px] grid grid-cols-3 gap-2'}>
                        {currentColor?.cloth_size.map((size) => (
                            <div className={`w-full flex justify-center items-center h-[30px] rounded-md cursor-pointer select-none
                                            ${size.ID === sizeChosen ? 'border-dark border-[2px]' : 'border-based-gray border-[1px]'}`}
                                onClick={() => setSizeChosen(size.ID)}>
                                {size.size}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={'w-full mt-[20px] h-[60px] rounded-[20px] bg-dark flex justify-center items-center cursor-pointer select-none'}>
                    <p className={'text-white'}>Add to bag</p>
                </div>
                <div className={'w-full mt-[20px] h-[60px] rounded-[20px] bg-white border-[1px] cursor-pointer flex justify-center items-center gap-1 select-none'}>
                    <p className={'text-dark'}>Favorite</p>
                    <Image src={'/navbar/like.svg'} alt={'like-icon'} width={'18'} height={'18'}/>
                </div>
                <p className={'mt-[20px]'}>{cloth?.description}</p>
            </div>
        </div>
    )
}