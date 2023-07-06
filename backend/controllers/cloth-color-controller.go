package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/models"
)

func CreateClothColor(c *gin.Context) {

	var input models.ClothColor
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	clothColor, err := input.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"cloth_color": clothColor})

}
