package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/models"
	"server/utils/token"
)

type CreateBasketItemInput struct {
	ClothSizeRefer uint `json:"cloth_size_refer"`
}

func CreateBasketItem(c *gin.Context) {

	var input CreateBasketItemInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var basketItem models.BasketItem
	basketItem.Amount = 1
	basketItem.UserRefer = userId
	basketItem.IsBought = false
	basketItem.ClothSizeRefer = input.ClothSizeRefer

	basket, err := basketItem.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"basketItem": basket})

}

type BasketReturn struct {
	Id        uint   `json:"id"`
	Name      string `json:"name"`
	Cost      uint   `json:"cost"`
	Size      string `json:"size"`
	MainPhoto string `json:"main_photo"`
	Amount    uint   `json:"amount"`
}

func GetBasket(c *gin.Context) {

	userId, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	basketItems, err := models.GetBasket(userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var Basket []BasketReturn

	for _, basketItem := range basketItems {
		var BasketReturnItem BasketReturn
		cloth_size, err := models.GetClothSize(basketItem.ClothSizeRefer)
		if err != nil {
			continue
		}
		cloth_color, err := models.GetClothColorById(cloth_size.ClothColorRefer)
		if err != nil {
			continue
		}
		cloth, err := models.GetClothById(cloth_color.ClothRefer)
		if err != nil {
			continue
		}
		BasketReturnItem.Cost = cloth.Cost
		BasketReturnItem.Name = cloth.Name
		BasketReturnItem.Amount = basketItem.Amount
		BasketReturnItem.MainPhoto = cloth_color.MainPhoto
		BasketReturnItem.Size = cloth_size.Size
		BasketReturnItem.Id = basketItem.ID
		Basket = append(Basket, BasketReturnItem)
	}

	c.JSON(http.StatusOK, gin.H{"basket": Basket})

}

type DeleteBasketItemInput struct {
	BasketItemId uint `json:"basket_item_id"`
}

func DeleteBasketItem(c *gin.Context) {

	var input DeleteBasketItemInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	status := models.DeleteBasketItem(input.BasketItemId)

	c.JSON(http.StatusOK, gin.H{"status": status})

}
