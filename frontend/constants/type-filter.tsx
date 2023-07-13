export interface typeFilter{
    name: string,
    value: string | string[]
}

export const typeFilters= [
    {name: "Shoes", value: "Shoes"},
    {name: "Sports Bras", value: "Sports Bras"},
    {name: "Tops & T-Shirts", value: ["Top", "T-Shirt"]},
    {name: "Hoodies & Sweatshirts", value: ["Hoodie", "Sweatshirt"]},
    {name: "Jackets", value: "Jacket"},
    {name: "Trousers & Tights", value: ["Trousers", "Tights"]},
    {name: "Shorts", value: "Shorts"},
    {name: "Tracksuits", value: "Tracksuit"},
    {name: "Jumpsuits & Rompers", value: ["Jumpsuit", "Romper"]},
    {name: "Skirts & Dresses", value: ["Skirt", "Dress"]},
    {name: "Socks", value: "Socks"}
]