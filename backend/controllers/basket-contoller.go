package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/models"
	"server/utils/token"
)

type BasketReturn struct {
	Id        uint   `json:"id"`
	Name      string `json:"name"`
	Cost      uint   `json:"cost"`
	Size      string `json:"size"`
	MainPhoto string `json:"main_photo"`
	Amount    uint   `json:"amount"`
	ClothId   uint   `json:"cloth_id"`
	ColorId   uint   `json:"color_id"`
}

func GetBasket(c *gin.Context) {

	userId, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	basket, err := models.GetBasket(userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var Basket []BasketReturn

	for _, basketItem := range basket.BasketItems {
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
		BasketReturnItem.ClothId = cloth.ID
		BasketReturnItem.ColorId = cloth_color.ID
		Basket = append(Basket, BasketReturnItem)
	}

	c.JSON(http.StatusOK, gin.H{"basket": Basket})

}

func GetPayedBaskets(c *gin.Context) {

	userId, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	baskets, err := models.GetPayedBaskets(userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var basketsItems [][]BasketReturn

	for _, basket := range baskets {
		var Basket []BasketReturn
		for _, basketItem := range basket.BasketItems {
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
			BasketReturnItem.ClothId = cloth.ID
			BasketReturnItem.ColorId = cloth_color.ID
			Basket = append(Basket, BasketReturnItem)
		}
		basketsItems = append(basketsItems, Basket)
	}

	c.JSON(http.StatusOK, gin.H{"baskets": basketsItems})

}

func PayBasket(c *gin.Context) {

	userId, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	basket, err := models.GetBasket(userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = basket.PayBasket()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "OK"})

}
