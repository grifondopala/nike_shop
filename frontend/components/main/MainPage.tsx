import { InfiniteScrollList } from "@/components/main/InfiniteScrollList";

import { Featured } from "@/components/main/Featured";
import { FashionItemModel, IconicItemModel, PopularItemModel, SportItemModel, TrendingItemModel } from "@/models/main";

import { FashionItem } from "@/components/main/FashionItem";
import { IconicItem } from "@/components/main/IconicItem";
import { FiniteScrollList } from "@/components/main/FiniteScrollList";
import { TrendingItem } from "@/components/main/TrendingItem";
import { SportItem } from "@/components/main/SportItem";
import { PopularItem } from "@/components/main/PopularItem";

const fashionListBase: FashionItemModel[] = [
    {photo_url: "/main/first_fashion.jpg", href: ""},
    {photo_url: "/main/second_fashion.jpg", href: ""},
    {photo_url: "/main/third_fashion.jpg", href: ""},
    {photo_url: "/main/fourth_fashion.jpg", href: ""},
    {photo_url:  "/main/fifth_fashion.jpg", href: ""},
    {photo_url:  "/main/sixth_fashion.jpg", href: ""},
    {photo_url: "/main/seventh_fashion.jpg", href: ""},
    {photo_url: "/main/eighth_fashion.jpg", href: ""},
]

const alwaysIconicBase: IconicItemModel[] = [
    {photo_url: "/main/AirForce1.jpg", href: "", name: "Air Force 1"},
    {photo_url: "/main/AirJordan.jpg", href: "", name: "Air Jordan"},
    {photo_url: "/main/Dunk.jpg", href: "", name: "Dunk"},
    {photo_url: "/main/Metcon.jpg", href: "", name: "Metcon"},
    {photo_url: "/main/NikeBlazer.jpg", href: "", name: "Nike Blazer"},
    {photo_url: "/main/PegasusRunningShoes.jpg", href: "", name: "PegasusRunningShoes"},
    {photo_url: "/main/AirMax.jpg", href: "", name: "Air Max"},
]

const trendingBase: TrendingItemModel[] = [
    {photo_url: "/main/hiking.jpg", href: "", name: "Nike ACG Hiking Gear"},
    {photo_url: "/main/bra.jpg", href: "", name: "Indy Plunge Cutout Bra"},
    {photo_url: "/main/must-have-dunks.jpg", href: "", name: "Must-Have Dunks"},
    {photo_url: "/main/heritage.jpg", href: "", name: "Jordan Flight Heritage"},
    {photo_url: "/main/nfl-football.jpg", href: "", name: "NFL Football Fever"},
]

const sportBase: SportItemModel[] = [
    {photo_url: "/main/basketball.jpg", href: "", name: "Nike Basketball", description: "Styles made for your game."},
    {photo_url: "/main/trail.jpg", href: "", name: "Nike Trail", description: "Gear that leads to wild places."},
    {photo_url: "/main/golf.jpg", href: "", name: "Nike Golf", description: "Conquer any course in style."},
    {photo_url: "/main/football.jpg", href: "", name: "Nike Football", description: "Command the field in game-ready gear."},
    {photo_url: "/main/tennis.jpg", href: "", name: "Nike Tennis", description: "Serve up in style."},
    {photo_url: "/main/soccer.jpg", href: "", name: "Nike Soccer", description: "Bring mad style to the pitch with the latest gear."},
]

const popularBase: PopularItemModel[] = [
    {photo_url: "/main/crew.jpg", href: "", name: "Nike Dunk Low Disrupt x Serena Williams Design Crew", cost: 120, type: "Women's Shoes"},
    {photo_url: "/main/AirJordanRetro.jpg", href: "", name: "Air Jordan 1 Retro High OG", cost: 180, type: "Women's Shoes"},
    {photo_url: "/main/AirJordanCraft.jpg", href: "", name: "Air Jordan 1 Low SE Craft", cost: 120, type: "Men's Shoes"},
    {photo_url: "/main/AirJordanLow.jpg", href: "", name: "Air Jordan 1 Low", cost: 110, type: "Women's Shoes"},
    {photo_url: "/main/AirJordanHighOG.jpg", href: "", name: "Air Jordan 1 Retro High OG", cost: 180, type: "Men's Shoes"},
    {photo_url: "/main/AirJordanLowOG.jpg", href: "", name: "Air Jordan 1 Low OG", cost: 140, type: "Shoes"},
    {photo_url: "/main/DunkLowRetro.jpg", href: "", name: "Nike Dunk Low Retro", cost: 110, type: "Men's Shoes"},

]

export default function MainPage(){
    return(
        <div className={'w-[80%] mr-auto ml-auto'}>
            <div className={'flex flex-col gap-4 w-full'}>
                <p className={'font-bold text-center text-[32px] max-[450px]:text-left leading-8'}>MOVEMENT ESSENTIALS FOR <br/> YOUR EVERY MOOD</p>
                <p className={'text-center max-[450px]:text-left'}>Discover leggins, bras, sneakers, and comfy basics that tell you move freely and express what makes you, you.</p>
                <div className={'w-[180px] h-[35px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer ml-auto mr-auto hover:opacity-50 max-[450px]:ml-0'}>
                    <p className={'text-white'}>Shop the Collection</p>
                </div>
            </div>
            <InfiniteScrollList label={'Fashion Week Styles'} baseList={fashionListBase} component={FashionItem}/>
            <FiniteScrollList label={'Trending'} baseList={trendingBase} component={TrendingItem}/>
            <div className={'flex flex-col gap-4 w-full mt-[50px]'}>
                <p className={'font-bold text-center text-[32px] max-[450px]:text-left leading-8'}>EA$Y. ALL DAY.</p>
                <p className={'text-center max-[450px]:text-left'}>Take your game to the next level in the new KD 16.</p>
                <div className={'w-[180px] h-[35px] rounded-[25px] bg-dark select-none flex justify-center items-center cursor-pointer ml-auto mr-auto hover:opacity-50 max-[450px]:ml-0'}>
                    <p className={'text-white'}>Shop</p>
                </div>
            </div>
            <Featured />
            <InfiniteScrollList label={'Always Iconic'} baseList={alwaysIconicBase} component={IconicItem}/>
            <FiniteScrollList label={'Shop by Sport'} baseList={sportBase} component={SportItem}/>
            <FiniteScrollList label={'Popular Right Now'} baseList={popularBase} component={PopularItem}/>
        </div>
    )
}