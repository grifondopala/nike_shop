export async function GetClothData(href: string){

    const str = href.split("?");
    const url = `${process.env.NEXT_PUBLIC_SERVER_IP}/cloth/getAll` + `${str.length == 2 ? `?${str[1]}` : ''}`

    const response = await fetch(url, {method: "GET"})
    const data = await response.json()

    return data.cloth;

}