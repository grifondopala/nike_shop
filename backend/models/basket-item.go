package models

import "github.com/jinzhu/gorm"

type BasketItem struct {
	gorm.Model
	ClothSizeRefer uint `json:"cloth_size_refer"`
	BasketRefer    uint `json:"basket_refer"`
	Amount         uint `json:"amount"`
}

func (b *BasketItem) Create() (*BasketItem, error) {

	var err error
	err = DB.Create(&b).Error
	if err != nil {
		return &BasketItem{}, err
	}

	return b, nil
}

func DeleteBasketItem(id uint) bool {

	var err error

	err = DB.Delete(&BasketItem{}, id).Error
	if err != nil {
		return false
	}

	return true
}
