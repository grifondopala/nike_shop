package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/models"
)

type CheckRegisteredInput struct {
	Email string `json="email"`
}

func CheckRegistered(c *gin.Context) {

	var input CheckRegisteredInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := models.CheckRegistered(input.Email)

	c.JSON(http.StatusOK, gin.H{"status": result})

}
