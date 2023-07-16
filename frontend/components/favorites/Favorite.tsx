import { useEffect, useState } from "react";

import { GetFavorites } from "@/api/favorites";
import { Favorite } from "@/models/favorite";
import { SingleFavorite } from "@/components/favorites/SingleFavorite";

export function FavoriteList(){

    const [data, setData] = useState<Favorite[]>([])

    useEffect(() => {
        async function GetData(){
            const token = localStorage.getItem("token")
            const result = await GetFavorites(token)
            if(!result['error']){
                setData(result.favorites)
            }
        }
        GetData()
    }, [])

    function DeleteFromData(id: number){
        let newData = [...data]
        newData = newData.filter((item) => item.favoriteId != id)
        setData(newData)
    }

    if(!data || data?.length === 0){
        return(
            <div className={'w-[40%] ml-auto mr-auto flex flex-col'}>
                <p className={'font-bold text-[24px] w-full text-center'}>List of favorite cloth is empty</p>
            </div>
        )
    }

    return(
        <div className={'w-[40%] ml-auto mr-auto flex flex-col gap-[50px]'}>
            <p className={'font-bold text-[24px]'}>Your favorite cloth</p>
            <div className={'w-full flex flex-col gap-[50px]'}>
                {data?.map((favorite) => (
                    <SingleFavorite favorite={favorite} deleteFromData={DeleteFromData} />
                ))}
            </div>
        </div>
    )
}