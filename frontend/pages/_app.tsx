import { Layout } from "@/components/Layout";

import Head from "next/head";

function MyApp({ Component, pageProps }) {

    function layout(pageProps){
        return (
            <>
                <Head>
                    <title>Nike</title>
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </>
        )
    }

    const getLayout = Component.getLayout ?? layout

    return getLayout(<Component {...pageProps} />)

}

export default MyApp