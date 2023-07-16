import { ClothColor } from "@/models/cloth-color";
import { Cloth } from "@/models/cloth"

export interface Favorite{
    cloth: Cloth,
    clothColor: ClothColor,
    favoriteId: number
}