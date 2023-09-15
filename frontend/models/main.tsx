export interface FashionItemModel {
    photo_url: string,
    href: string,
}

export interface IconicItemModel{
    photo_url: string,
    href: string,
    name: string,
}

export interface TrendingItemModel{
    photo_url: string,
    href: string,
    name: string,
}

export interface SportItemModel{
    photo_url: string,
    href: string,
    name: string,
    description: string,
}

export interface PopularItemModel{
    photo_url: string,
    href: string,
    name: string,
    cost: number,
    type: string,
}