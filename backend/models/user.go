package models

import (
	"errors"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"server/utils/token"
)

type User struct {
	gorm.Model
	Email    string     `gorm:"size:255;not null;" json:"email"`
	Password string     `gorm:"size:255;not null;" json:"password"`
	Name     string     `gorm:"size:255;not null;" json:"name"`
	Surname  string     `gorm:"size:255;not null;" json:"Surname"`
	Birthday string     `gorm:"not null;" json:"birthday"`
	Favorite []Favorite `json:"favorite" gorm:"foreignKey:user_refer"`
}

func GetUserByID(uid uint) (User, error) {

	var u User

	if err := DB.First(&u, uid).Error; err != nil {
		return u, errors.New("User not found!")
	}

	u.PrepareGive()

	return u, nil

}

func CheckRegistered(email string) bool {

	var u User

	if err := DB.Where("email = ?", email).First(&u).Error; err != nil {
		return false
	}

	return true

}

func (u *User) PrepareGive() {
	u.Password = ""
}

func VerifyPassword(password, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func LoginCheck(email string, password string) (string, error) {

	var err error

	u := User{}

	err = DB.Model(User{}).Where("email = ?", email).Take(&u).Error

	if err != nil {
		return "", err
	}

	err = VerifyPassword(password, u.Password)

	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", err
	}

	token, err := token.GenerateToken(u.ID)

	if err != nil {
		return "", err
	}

	return token, nil

}

func (u *User) SaveUser() (*User, error) {

	var err error
	err = DB.Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) BeforeSave() error {

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)

	return nil

}
