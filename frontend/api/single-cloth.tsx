export async function GetSingleClothData(clothId: string | string[] | undefined){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/cloth/getById/${clothId}`,
        {method: 'GET'}
    )

    return await response.json();
}

export async function AddToFavorite(token: string, cloth_color_refer: string){

    let result = false

    await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/favorite/create`,
        {method: 'POST',
             headers: {Authorization: `Bearer ${token}`},
             body: JSON.stringify({cloth_color_refer: parseInt(cloth_color_refer)})}
    ).then(() => result = true)

    return result

}

export async function AddToBasket(token: string, cloth_size_refer: number){

    let result = false
    
    await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/basket/create`,
        {method: 'POST',
            headers: {Authorization: `Bearer ${token}`},
            body: JSON.stringify({cloth_size_refer})}
    ).then(() => result = true)

    return result

}