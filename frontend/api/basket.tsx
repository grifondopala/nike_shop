export async function GetBasket(token: string){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/basket/getBasket`,
        {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    )

    return await response.json()

}

export async function DeleteBasketItem(basket_item_id: number){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/basket/delete`,
        {
            method: 'POST',
            body: JSON.stringify({basket_item_id})
        }
    )

    return await response.json()

}

export async function GetPayedBaskets(token: string){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/basket/getPayedBaskets`,
        {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    )

    return await response.json()

}

export async function PayBasket(token: string){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/basket/pay`,
        {method: 'POST', headers: {Authorization: `Bearer ${token}`}}
    )

    return await response.json()

}