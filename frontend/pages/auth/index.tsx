import { Auth } from "@/components/auth/Auth";
import Head from "next/head";

function AuthPage(){
    return(
        <Auth />
    )
}

AuthPage.getLayout = (page) => (
    <>
        <Head>
            <title>Nike</title>
        </Head>
        <div className={'mt-4'}>
            {page}
        </div>
    </>
)


export default AuthPage