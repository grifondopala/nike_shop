package models

import "github.com/jinzhu/gorm"

type ClothSize struct {
	gorm.Model
	Size            string `gorm:"not null" json:"size"`
	Amount          uint   `gorm:"not null" json:"amount"`
	ClothColorRefer uint   `json:"cloth_color_refer"`
}

func (c *ClothSize) Create() (*ClothSize, error) {

	var err error
	err = DB.Create(&c).Error
	if err != nil {
		return &ClothSize{}, err
	}

	return c, nil

}

func GetClothSize(id uint) (ClothSize, error) {

	var item ClothSize

	if err := DB.Find(&item, id).Error; err != nil {
		return ClothSize{}, err
	}

	return item, nil

}
