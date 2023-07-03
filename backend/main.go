package main

import (
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
	"server/models"
)

func main() {

	models.ConnectDataBase()

	r := gin.Default()
	r.Use(cors.AllowAll())
	r.Static("/static", "./static")

	r.Run(":8080")

}
