import Link from 'next/link'

interface LinkProp {
    label: string,
    url: string,
}

export const DefaultLink = ({label, url}: LinkProp) => {
    return(
        <div className={'box-border pl-4 pr-4 [&:not(:last-child)]:border-r-2 h-[21px]'}>
            <Link href={url} className={'text-[14px] font-bold cursor-pointer hover:underline'}>
                {label}
            </Link>
        </div>
    )
}

export const SectionLink = ({label, url}: LinkProp) => {
    return(
        <div className={'box-border pl-3 pr-3'}>
            <Link href={url} className={'text-[16px] font-bold cursor-pointer'}>
                {label}
            </Link>
        </div>
    )
}