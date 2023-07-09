import { ClothColor } from "@/models/cloth-color";

export interface Cloth{
    ID: number,
    CreatedAt: string,
    DeletedAt: string,
    UpdatedAt: string,
    name: string,
    description: string,
    cost: string,
    person_gender: string,
    kid_gender: string,
    type: string,
    cloth_color: ClothColor[]
}