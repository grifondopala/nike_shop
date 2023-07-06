const filters = [
    "Shoes",
    "Sports Bras",
    "Tops & T-Shirts",
    "Hoodies & Sweatshirts",
    "Jackets",
    "Trousers & Tights",
    "Shorts",
    "Tracksuits",
    "Jumpsuits & Rompers",
    "Skirts & Dresses",
    "Socks"
]

export function Filter(){
    return(
        <div className={'w-[100%] flex flex-col box-border'}>
            <div className={'flex flex-col gap-2'}>
                {filters.map((filter: string) =>
                    <p key={filter} className={'font-bold text-[16px] cursor-pointer'}>{filter}</p>
                )}
            </div>
            <hr className={'mt-[40px]'}/>
            <div className={'mt-[20px]'}>
                <p className={'font-bold text-[16px]'}>Gender</p>
                <div className={'flex flex-col gap-1'}>
                    <div className={'flex flex-row gap-4'}>
                        <input type={"checkbox"} value={"MEN"}/>
                        <label>Men</label>
                    </div>
                    <div className={'flex flex-row gap-4'}>
                        <input type={"checkbox"} value={"WOMEN"}/>
                        <label>Women</label>
                    </div>
                    <div className={'flex flex-row gap-4'}>
                        <input type={"checkbox"} value={"UNISEX"}/>
                        <label>Unisex</label>
                    </div>
                </div>
            </div>
            <hr className={'mt-[20px]'}/>
            <div className={'mt-[20px]'}>
                <p className={'font-bold text-[16px]'}>Kids</p>
                <div className={'flex flex-col gap-1'}>
                    <div className={'flex flex-row gap-4'}>
                        <input type={"checkbox"} value={"BOYS"}/>
                        <label>Boys</label>
                    </div>
                    <div className={'flex flex-row gap-4'}>
                        <input type={"checkbox"} value={"GIRLS"}/>
                        <label>Girls</label>
                    </div>
                </div>
            </div>
        </div>
    )
}