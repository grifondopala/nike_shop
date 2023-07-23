import { SingleCloth } from "@/components/single-cloth/SingleCloth";
import { useRouter } from "next/router";

function ClothPage(){

    const router = useRouter()
    const { cloth_id, color_id } = router.query

    return(
        <SingleCloth clothId={cloth_id} colorId={color_id}/>
    )

}

export default ClothPage

