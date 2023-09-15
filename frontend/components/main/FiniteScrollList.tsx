import Image from "next/image";

import ReactNode, {useEffect, useRef, useState} from "react";

import { FashionItemModel } from "@/models/main";

interface IProps<T> {
    label: string,
    baseList: T[],
    component: ReactNode
}

export function FiniteScrollList<T extends object>(props: IProps<T>){

    const listRef = useRef<HTMLDivElement | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);
    const elementNow = useRef<HTMLDivElement | null>(null);

    const [scrolledBegin, setScrolledBegin] = useState(false);

    const [itemsList, setItemsList] = useState<T[]>([...props.baseList])
    const [stage, setStage] = useState<number>(0);

    const Node = props.component

    function scrollTo(value: number){

        if(stage == 0 && value == -1 || stage == 2 && value == 1) return;

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
            const lastChildElement = listRef.current?.children?.item(0) as HTMLDivElement
            elementNow.current = lastChildElement
            setScrolledBegin(true);
        }

        function updateScrollPosition() {
            if(ref.current?.scrollLeft === 0){
                setStage(0)
            }else if(ref.current?.scrollLeft + ref.current?.offsetWidth > ref.current?.scrollWidth - 300){
                setStage(2)
            }else{
                setStage(1);
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

    return(
        <div className={'w-full mt-[50px] flex flex-col gap-4'}>
            <div className={'flex flex-row items-center gap-2'}>
                <p>{props.label}</p>
                <div className={'flex flex-row mr-0 ml-auto gap-2'}>
                    <div className={'w-[40px] h-[40px] rounded-full bg-light-gray flex justify-center items-center cursor-pointer select-none z-50 '
                        + (stage === 0 ? 'opacity-50 cursor-default' : '')}
                         onClick={() => scrollTo(-1)}>
                        <Image src={'/cloth/down-arrow.svg'} width={'14'} height={'14'} className={'rotate-90'} alt={'left'}/>
                    </div>
                    <div className={'w-[40px] h-[40px] rounded-full bg-light-gray flex justify-center items-center cursor-pointer select-none z-50 '
                        + (stage === 2 ? 'opacity-50 cursor-default' : '')}
                         onClick={() => scrollTo(1)}>
                        <Image src={'/cloth/down-arrow.svg'} width={'14'} height={'14'} className={'-rotate-90'} alt={'right'}/>
                    </div>
                </div>
            </div>
            <div className={'overflow-x-auto w-full flex flex-row overflow-y-hidden scrollbar-good max-[450px]:no-scrollbar'} ref={ref}>
                <div className={'whitespace-nowrap mb-[20px]'} ref={listRef}>
                    {itemsList.map((item: FashionItemModel, index: number) => (
                        <Node item={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}