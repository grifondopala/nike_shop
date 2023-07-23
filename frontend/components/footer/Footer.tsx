import { SocialMedia } from "@/components/footer/SocialMedia";

export function Footer(){
    return(
        <footer className={`relative w-full bg-[#111111] grid grid-cols-4 border-box pt-[50px] pl-[30px] pr-[30px] pb-[30px] max-[450px]:pl-2 max-[450px]:pr-2
                            max-[450px]:grid grid-cols-[30%_30%_30%_10%]`}>
            <div className={'flex flex-col gap-3'}>
                <p className={'text-white uppercase'}>Find a store</p>
                <p className={'text-white uppercase'}>Become a member</p>
                <p className={'text-white uppercase'}>Sign up for email</p>
                <p className={'text-white uppercase'}>Send us feedback</p>
                <p className={'text-white uppercase'}>Students discount</p>
            </div>
            <div className={'flex flex-col gap-3'}>
                <p className={'text-white uppercase'}>Get help</p>
                <p className={'text-based-gray'}>Order Status</p>
                <p className={'text-based-gray'}>Delivery</p>
                <p className={'text-based-gray'}>Returns</p>
                <p className={'text-based-gray'}>Payment Option</p>
                <p className={'text-based-gray'}>Contact Us On Nike.com Inquiries</p>
                <p className={'text-based-gray'}>Contact Us On All Other Inquiries</p>
            </div>
            <div className={'flex flex-col gap-3'}>
                <p className={'text-white uppercase'}>About Nike</p>
                <p className={'text-based-gray'}>News</p>
                <p className={'text-based-gray'}>Careers</p>
                <p className={'text-based-gray'}>Investors</p>
                <p className={'text-based-gray'}>Sustainbility</p>
            </div>
            <div className={'flex flex-row justify-end gap-2 max-[450px]:flex-col max-[450px]:justify-start'}>
                <SocialMedia icon={'/footer/twitter.svg'} url={''} />
                <SocialMedia icon={'/footer/facebook.svg'} url={''} />
                <SocialMedia icon={'/footer/youtube.svg'} url={''} />
                <SocialMedia icon={'/footer/instagram.svg'} url={''} />
            </div>
        </footer>
    )
}