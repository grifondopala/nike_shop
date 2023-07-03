import Image from "next/image";

interface SocialMediaProps{
    icon: string,
    url: string,
}

export function SocialMedia({icon, url} : SocialMediaProps){
    return(
        <div>
            <Image src={icon} alt={url} width={'40'} height={'40'}/>
        </div>
    )
}