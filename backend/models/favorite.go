package models

import (
	"github.com/jinzhu/gorm"
)

type Favorite struct {
	gorm.Model
	ClothColorRefer uint `json:"cloth_color_refer"`
	UserRefer       uint `json:"user_refer"`
}

func (f *Favorite) Create() (*Favorite, error) {

	var err error
	err = DB.Create(&f).Error
	if err != nil {
		return &Favorite{}, err
	}

	return f, nil
}

func (f *Favorite) Delete() bool {

	var err error

	err = DB.Delete(&Favorite{}, f.ID).Error
	if err != nil {
		return false
	}

	return true
}
