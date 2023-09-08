import { useEffect, useState } from "react";

import { GetFavorites } from "@/api/favorites";
import { Favorite } from "@/models/favorite";
import { SingleFavorite } from "@/components/favorites/SingleFavorite";
import { NotAuth } from "@/components/components/NotAuth";
import { ListEmpty } from "@/components/components/ListEmpty";
import { useAuth } from "@/hooks/useAuth";

export function FavoriteList(){

    const auth = useAuth();

    const [data, setData] = useState<Favorite[]>([])

    useEffect(() => {
        async function GetData(): Promise<Favorite[]>{

            if(!auth.isAuth){
                return [];
            }

            const result = await GetFavorites(auth.token);

            if(result['error']) return [];

            if(result.favorites) return result.favorites

            return [];
        }
        GetData().then(result => setData(result))
    }, [auth.isAuth])

    function DeleteFromData(id: number){
        let newData = [...data]
        newData = newData.filter((item) => item.favoriteId != id)
        setData(newData)
    }

    if(!auth.isAuth) return <NotAuth />

    if(!data || data.length === 0) return <ListEmpty label={'List of favorite cloth is empty'}/>

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