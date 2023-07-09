import { ClothSize } from "@/models/cloth-size";

export interface ClothColor{
    ID: number,
    main_photo: string,
    another_photo: string,
    cloth_refer: number,
    cloth_size: ClothSize[]
}