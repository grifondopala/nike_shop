package models

import "github.com/jinzhu/gorm"

type BasketItem struct {
	gorm.Model
	ClothSizeRefer uint `json:"cloth_size_refer"`
	UserRefer      uint `json:"user_refer"`
	Amount         uint `json:"amount"`
	IsBought       bool `json:"is_bought" gorm:"default:false"`
}

func (b *BasketItem) Create() (*BasketItem, error) {

	var err error
	err = DB.Create(&b).Error
	if err != nil {
		return &BasketItem{}, err
	}

	return b, nil
}

func GetBasket(userId uint) ([]BasketItem, error) {

	var basket []BasketItem

	if err := DB.Where("user_refer = ? AND is_bought = false", userId).Find(&basket).Error; err != nil {
		return []BasketItem{}, err
	}

	return basket, nil

}

func DeleteBasketItem(id uint) bool {

	var err error

	err = DB.Delete(&BasketItem{}, id).Error
	if err != nil {
		return false
	}

	return true
}
