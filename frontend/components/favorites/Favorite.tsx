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
            <div className={'w-[60%] ml-auto mr-auto flex flex-col max-[800px]:w-full'}>
                <p className={'font-bold text-[24px] w-full text-center'}>List of favorite cloth is empty</p>
            </div>
        )
    }

    return(
        <div className={'w-[60%] ml-auto mr-auto flex flex-col gap-[50px] max-[800px]:w-full max-[800px]:pl-[30px] max-[800px]:pr-[30px] max-[450px]:pl-2 max-[450px]:pr-2'}>
            <p className={'font-bold text-[24px] text-center'}>Your favorite cloth</p>
            <div className={'w-full flex flex-col gap-[50px]'}>
                {data?.map((favorite) => (
                    <SingleFavorite key={favorite.favoriteId} favorite={favorite} deleteFromData={DeleteFromData} />
                ))}
            </div>
        </div>
    )
}