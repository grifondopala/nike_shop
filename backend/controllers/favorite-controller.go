package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/models"
	"server/utils/token"
)

type CreateFavoriteInput struct {
	ClothColorRefer uint `json:"cloth_color_refer"`
}

func CreateFavorite(c *gin.Context) {

	var input CreateFavoriteInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var model models.Favorite
	model.UserRefer = userId
	model.ClothColorRefer = input.ClothColorRefer

	favorite, err := model.Create()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"favorite": favorite})

}

type DeleteFavoriteInput struct {
	ID              uint `json:"id"`
	ClothColorRefer uint `json:"cloth_color_refer"`
}

func DeleteFavorite(c *gin.Context) {

	var input DeleteFavoriteInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var model models.Favorite
	model.ID = input.ID
	model.UserRefer = userId
	model.ClothColorRefer = input.ClothColorRefer

	status := model.Delete()

	c.JSON(http.StatusOK, gin.H{"status": status})

}

type FavoriteReturn struct {
	Cloth      models.Cloth      `json:"cloth"`
	ClothColor models.ClothColor `json:"clothColor"`
	FavoriteId uint              `json:"favoriteId"`
}

func GetFavorites(c *gin.Context) {

	userId, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := models.GetUserByID(userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var favorites []FavoriteReturn

	for _, favorite := range user.Favorite {
		clothColor, err := models.GetClothColorById(favorite.ClothColorRefer)
		if err != nil {
			continue
		}
		cloth, err := models.GetClothById(clothColor.ClothRefer)
		if err != nil {
			continue
		}
		var input FavoriteReturn
		input.Cloth = cloth
		input.ClothColor = clothColor
		input.FavoriteId = favorite.ID
		favorites = append(favorites, input)
	}

	c.JSON(http.StatusBadRequest, gin.H{"favorites": favorites})

}
