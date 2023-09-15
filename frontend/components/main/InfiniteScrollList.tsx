import Image from "next/image"

import ReactNode, { useEffect, useRef, useState } from "react";


interface IProps<T> {
    label: string,
    baseList: T[],
    component: ReactNode
}

export function InfiniteScrollList<T extends object>(props: IProps<T>){

    const listRef = useRef<HTMLDivElement | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);
    const elementNow = useRef<HTMLDivElement | null>(null);

    const [itemsList, setItemsList] = useState<T[]>([...props.baseList, ...props.baseList])

    const [scrolledBegin, setScrolledBegin] = useState(false);

    const Node = props.component

     function scrollTo(value: number){

        let lastChildElement;
        if(value === 1) {
            lastChildElement = elementNow?.current?.nextSibling as HTMLDivElement;
        } else {
            lastChildElement = elementNow?.current?.previousSibling as HTMLDivElement;
        }

        if(!lastChildElement) return

        lastChildElement?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: "start"});
        elementNow.current = lastChildElement

    }

    useEffect(() => {

        if(!scrolledBegin){
            const lastChildElement = listRef.current?.children?.item(props.baseList.length) as HTMLDivElement
            elementNow.current = lastChildElement
            lastChildElement?.scrollIntoView({behavior: 'auto', block: 'nearest', inline: "start"});
            setScrolledBegin(true);
        }

        function updateScrollPosition() {
            if(ref.current?.scrollLeft === 0){
                setItemsList((value) => [...props.baseList, ...value])
            }
            if(ref.current?.scrollLeft + ref.current?.offsetWidth > ref.current?.scrollWidth - 630){
                setItemsList((value) => [...value, ...props.baseList])
            }
        }

        const list = ref.current;
        if(list){
            list.addEventListener("scroll", updateScrollPosition);
            return () => {
                list.removeEventListener("scroll", updateScrollPosition);
            };
        }

    }, [ref.current, listRef.current])

    useEffect(() => {
        if(ref.current?.scrollLeft === 0){
            let lastChildElement = listRef.current?.children?.item(props.baseList.length) as HTMLDivElement
            elementNow.current = lastChildElement
            lastChildElement?.scrollIntoView({behavior: 'auto', block: 'nearest', inline: "start"});
        }
    }, [itemsList])


    return(
        <div className={'w-full mt-[50px] flex flex-col gap-4'}>
            <p>{props.label}</p>
            <div className={'relative w-full flex flex-row'}>
                <div className={'absolute w-[40px] h-[40px] rounded-full bg-white top-[130px] left-[20px] flex justify-center items-center cursor-pointer select-none z-50 max-[450px]:hidden'}
                     onClick={() => scrollTo(-1)}>
                    <Image src={'/cloth/down-arrow.svg'} width={'14'} height={'14'} className={'rotate-90'} alt={'left'}/>
                </div>
                <div className={'absolute w-[40px] h-[40px] rounded-full bg-white top-[130px] right-[20px] flex justify-center items-center cursor-pointer select-none z-50 max-[450px]:hidden'}
                     onClick={() => scrollTo(1)}>
                    <Image src={'/cloth/down-arrow.svg'} width={'14'} height={'14'} className={'-rotate-90'} alt={'right'}/>
                </div>
                <div className={'overflow-x-auto w-full flex flex-row overflow-y-hidden no-scrollbar'} ref={ref}>
                    <div className={'whitespace-nowrap'} ref={listRef}>
                        {itemsList.map((item: T, index: number) => (
                            <Node item={item} index={index} length={props.baseList.length} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}