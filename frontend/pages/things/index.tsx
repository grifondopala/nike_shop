import { ClothList } from "@/components/things/ClothList";
import { useRouter } from "next/router";


function Things(){

    const router = useRouter()
    const params = router.query

    return(
         <ClothList params={params}/>
    )
}

export default Things;