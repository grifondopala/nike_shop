package main

import (
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
	"server/controllers"
	"server/middlewares"
	"server/models"
)

func main() {

	models.ConnectDataBase()

	r := gin.Default()
	r.Use(cors.AllowAll())
	r.Static("/static", "./static")

	public := r.Group("/")
	public.POST("/register", controllers.Register)
	public.POST("/login", controllers.Login)

	protected := r.Group("/admin")
	protected.Use(middlewares.JwtAuthMiddleware())
	protected.GET("/user", controllers.CurrentUser)

	user := r.Group("/user")
	user.POST("/checkRegistered", controllers.CheckRegistered)

	cloth := r.Group("/cloth")
	cloth.POST("/create", controllers.CreateCloth)
	cloth.GET("/getById/:id", controllers.GetClothById)
	cloth.GET("/getAll", controllers.GetAllCloth)

	clothColor := r.Group("/cloth-color")
	clothColor.POST("/create", controllers.CreateClothColor)

	clothSize := r.Group("/cloth-size")
	clothSize.POST("/create", controllers.CreateClothSize)

	favorite := r.Group("/favorite")
	favorite.POST("/create", controllers.CreateFavorite)
	favorite.GET("/getAll", controllers.GetFavorites)

	r.Run(":8080")
}
