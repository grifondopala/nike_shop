import Link from 'next/link'

interface LinkProp {
    label: string,
    url: string,
}

export const DefaultLink = ({label, url}: LinkProp) => {
    return(
        <div className={'box-border pl-4 pr-4 max-[450px]:pl-3 max-[450px]:pr-3 [&:not(:last-child)]:border-r-2 h-[21px]'}>
            <Link href={url} className={'text-[14px] font-bold cursor-pointer hover:underline'}>
                {label}
            </Link>
        </div>
    )
}

export const SectionLink = ({label, url}: LinkProp) => {
    return(
        <div className={'box-border pl-3 pr-3 flex justify-center items-center'}>
            <Link href={url}>
                <p className={'text-[16px] font-bold cursor-pointer text-center'}>{label}</p>
            </Link>
        </div>
    )
}