package models

import (
	"errors"
	"github.com/jinzhu/gorm"
)

type Basket struct {
	gorm.Model
	UserRefer   uint         `json:"user_refer"`
	IsPayed     bool         `json:"is_payed" gorm:"default:false"`
	BasketItems []BasketItem `json:"basket_items" gorm:"foreignKey:basket_refer"`
}

func CreateBasket(userId uint) (Basket, error) {

	var basket Basket

	basket.UserRefer = userId
	basket.IsPayed = false

	var err error
	err = DB.Create(&basket).Error
	if err != nil {
		return Basket{}, err
	}

	return basket, nil

}

func GetBasket(userId uint) (Basket, error) {

	var basket Basket

	if err := DB.Preload("BasketItems").Where("user_refer = ? AND is_payed = false", userId).First(&basket).Error; err != nil {
		basket, err = CreateBasket(userId)
	}

	return basket, nil

}

func GetPayedBaskets(userId uint) ([]Basket, error) {

	var basket []Basket

	if err := DB.Preload("BasketItems").Where("user_refer = ? AND is_payed = true", userId).Find(&basket).Error; err != nil {
		return []Basket{}, err
	}

	return basket, nil

}

func (b *Basket) PayBasket() error {

	if len(b.BasketItems) == 0 {
		return errors.New("Basket is not payed")
	}

	if err := DB.Model(&Basket{}).Where("id = ?", b.ID).Update("is_payed", true).Error; err != nil {
		return errors.New("Basket is not payed")
	}

	return nil

}
