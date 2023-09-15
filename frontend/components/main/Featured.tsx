import Image from "next/image";

export function Featured(){
    return(
        <div className={'w-full flex flex-col mt-[50px]'}>
            <p>Featured</p>
            <div className={'grid grid-cols-2 gap-4 w-full mt-4 max-[1200px]:grid-cols-1'}>
                <div className={'w-full aspect-[2/1.5] bg-error relative select-none'}>
                    <Image src={'/main/nike-just-do-it.jpg'} alt={'nike-just-do-it'} fill={true} className={'w-auto h-auto object-fill'} />
                    <div className={'absolute flex flex-col justify-start bottom-[50px] left-[50px] max-[800px]:bottom-[15px] max-[800px]:left-[15px]'}>
                        <p className={'text-white text-[14px]'}>Nike Tech</p>
                        <p className={'text-white text-[18px]'}>Engineered to the Exact Specifications of Championship Athletes</p>
                        <div className={'w-[80px] h-[35px] rounded-[25px] bg-white select-none flex justify-center items-center cursor-pointer hover:opacity-80 max-[450px]:ml-0 mt-[20px]'}>
                            <p>Shop</p>
                        </div>
                    </div>
                </div>
                <div className={'w-full aspect-[2/1.5] bg-error relative select-none'}>
                    <Image src={'/main/0a2fd5af-f759-4256-87bf-a62326e73c36.jpeg'} alt={'nike-just-do-it'} fill={true} className={'w-auto h-auto object-fill'} />
                    <div className={'absolute flex flex-col justify-start bottom-[50px] left-[50px] max-[800px]:bottom-[15px] max-[800px]:left-[15px]'}>
                        <p className={'text-white text-[14px]'}>New from Nike Running</p>
                        <p className={'text-white text-[18px]'}>Nike Structure 25 PRM</p>
                        <div className={'w-[80px] h-[35px] rounded-[25px] bg-white select-none flex justify-center items-center cursor-pointer hover:opacity-80 max-[450px]:ml-0 mt-[20px]'}>
                            <p>Shop</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}