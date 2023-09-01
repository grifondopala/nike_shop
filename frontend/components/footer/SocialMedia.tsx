import Image from "next/image";

interface SocialMediaProps{
    icon: string,
    url: string,
}

export function SocialMedia({icon, url} : SocialMediaProps){
    return(
        <a className={'w-[30px] h-[30px] border-error cursor-pointer'} href={url}>
            <Image src={icon} alt={url} width={'30'} height={'30'}/>
        </a>
    )
}