import { useEffect, useState } from "react";

import { GetFavorites } from "@/api/favorites";
import { Favorite } from "@/models/favorite";
import { SingleFavorite } from "@/components/favorites/SingleFavorite";
import Router from "next/router";

export function FavoriteList(){

    const [isAuth, setIsAuth] = useState<boolean>(true)

    const [data, setData] = useState<Favorite[]>([])

    useEffect(() => {
        async function GetData(){
            const token = localStorage.getItem("token")

            if(!token) {
                setIsAuth(false)
                return
            }

            const result = await GetFavorites(token)

            if(result['error']){
                setIsAuth(false)
                return
            }

            if(result.favorites){
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

    if(!isAuth){
        return(
            <div className={'flex flex-col items-center gap-4 w-[350px] ml-auto mr-auto'}>
                <p className={'font-bold text-[24px] text-center text-center w-full'}>Please login to your account</p>
                <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer'} onClick={() => Router.push('/auth')}>
                    <p className={'text-white'}>Sign In</p>
                </div>
            </div>
        )
    }

    if(!data || data?.length === 0){
        return(
            <div className={'w-[60%] ml-auto mr-auto flex flex-col max-[800px]:w-full flex flex-col items-center gap-4'}>
                <p className={'font-bold text-[24px] w-full text-center'}>List of favorite cloth is empty</p>
                <div className={'w-[150px] h-[50px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer'} onClick={() => Router.push('/cloth?sorted=newest')}>
                    <p className={'text-white'}>Find Cloth</p>
                </div>
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