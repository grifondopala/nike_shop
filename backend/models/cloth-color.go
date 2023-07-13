package models

import (
	"github.com/jinzhu/gorm"
	"github.com/lib/pq"
)

type ClothColor struct {
	gorm.Model
	Color        string         `gorm:"not null" json:"color"`
	MainPhoto    string         `gorm:"not null" json:"main_photo"`
	AnotherPhoto pq.StringArray `gorm:"type:text[]" json:"another_photo"`
	ClothRefer   uint           `json:"cloth_refer"`
	ClothSize    []ClothSize    `json:"cloth_size" gorm:"foreignKey:cloth_color_refer"`
}

func (c *ClothColor) Create() (*ClothColor, error) {

	var err error
	err = DB.Create(&c).Error
	if err != nil {
		return &ClothColor{}, err
	}

	return c, nil

}
