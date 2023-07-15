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

func GetFavorites(c *gin.Context) {

	userId, err := token.ExtractTokenID(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

}
