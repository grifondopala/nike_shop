package main

import (
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
	"server/controllers"
	"server/models"
)

func main() {

	models.ConnectDataBase()

	r := gin.Default()
	r.Use(cors.AllowAll())
	r.Static("/static", "./static")

	cloth := r.Group("/cloth")
	cloth.POST("/create", controllers.CreateCloth)
	cloth.GET("/getById/:id", controllers.GetClothById)

	clothColor := r.Group("/cloth-color")
	clothColor.POST("/create", controllers.CreateClothColor)

	clothSize := r.Group("/cloth-size")
	clothSize.POST("/create", controllers.CreateClothSize)

	r.Run(":8080")
}
