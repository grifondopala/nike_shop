package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/models"
	"strconv"
)

func CreateCloth(c *gin.Context) {

	var clothInput = models.Cloth{}
	if err := c.ShouldBindJSON(&clothInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cloth, err := clothInput.Create()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"cloth": cloth})

}

func GetClothById(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cloth, err := models.GetClothById(uint(id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"cloth": cloth})
}

func GetAllCloth(c *gin.Context) {

	params := c.Request.URL.Query()

	cloth, err := models.GetAllCloth(params)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"cloth": cloth})
}
