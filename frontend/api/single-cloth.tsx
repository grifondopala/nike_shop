import axios from "axios";

export async function GetSingleClothData(clothId){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/cloth/getById/${clothId}`,
        {method: 'GET'}
    )

    const data = await response.json();

    return data;
}