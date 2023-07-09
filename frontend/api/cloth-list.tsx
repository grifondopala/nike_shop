import axios from "axios";

export async function GetClothData(href: string){

    const str = href.split("?");
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/cloth/getAll` + `${str.length == 2 ? `?${str[1]}` : ''}`

    const response = await axios.get(url)

    return response;

}