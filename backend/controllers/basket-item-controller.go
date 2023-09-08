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

	basket, err := models.GetBasket(userId)

	var basketItem models.BasketItem
	basketItem.Amount = 1
	basketItem.BasketRefer = basket.ID
	basketItem.ClothSizeRefer = input.ClothSizeRefer

	item, err := basketItem.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"basketItem": item})

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
