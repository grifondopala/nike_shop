export async function GetFavorites(token: string){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/favorite/getAll`,
        {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    )

    return await response.json()

}

export async function DeleteFavorite(token: string, cloth_color_refer: number, id: number){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/favorite/delete`,
        {
                method: 'POST',
                headers: {Authorization: `Bearer ${token}`},
                body: JSON.stringify({cloth_color_refer, id})
        }
    )

    return await response.json()

}