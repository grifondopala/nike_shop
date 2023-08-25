package models

import (
	"database/sql/driver"
	"github.com/jinzhu/gorm"
	"net/url"
	"strings"
)

type PersonGender string

const (
	MEN        PersonGender = "MEN"
	WOMEN      PersonGender = "WOMEN"
	UNISEX     PersonGender = "UNISEX"
	NOT_PERSON PersonGender = "NOT_PERSON"
)

func (self *PersonGender) Scan(value interface{}) error {
	*self = PersonGender(value.([]byte))
	return nil
}

func (self PersonGender) Value() (driver.Value, error) {
	return string(self), nil
}

type KidGender string

const (
	BOYS    KidGender = "BOYS"
	GIRLS   KidGender = "GIRLS"
	NOT_KID KidGender = "NOT_KID"
)

func (self *KidGender) Scan(value interface{}) error {
	*self = KidGender(value.([]byte))
	return nil
}

func (self KidGender) Value() (driver.Value, error) {
	return string(self), nil
}

type Cloth struct {
	gorm.Model
	Name         string       `gorm:"size:255;not null;" json:"name"`
	Description  string       `gorm:"not null;" json:"description"`
	Cost         uint         `gorm:"not null;" json:"cost"`
	PersonGender PersonGender `gorm:"not null" json:"person_gender" sql:"type:person_gender"`
	KidGender    KidGender    `gorm:"not null" json:"kid_gender" sql:"type:kid_gender"`
	Type         string       `gorm:"not null" json:"type"`
	ClothColor   []ClothColor `json:"cloth_color" gorm:"foreignKey:cloth_refer"`
}

func (c *Cloth) Create() (*Cloth, error) {

	var err error
	err = DB.Create(&c).Error
	if err != nil {
		return &Cloth{}, err
	}

	return c, nil
}

func GetClothById(id uint) (Cloth, error) {

	var cloth Cloth
	if err := DB.Where(id).Preload("ClothColor").Preload("ClothColor.ClothSize").First(&cloth).Error; err != nil {
		return Cloth{}, err
	}

	return cloth, nil
}

func GetAllCloth(params url.Values) ([]Cloth, error) {
	var cloth []Cloth

	var fields []string
	var values []interface{}
	if len(params["type"]) > 0 {
		fields = append(fields, "type IN (?)")
		values = append(values, params["type"])
	}
	if len(params["person_gender"]) > 0 {
		fields = append(fields, "person_gender IN (?)")
		values = append(values, params["person_gender"])
	}

	if len(params["minCost"]) > 0 {
		fields = append(fields, "cost >= ?")
		values = append(values, params["minCost"][0])
	}

	if len(params["maxCost"]) > 0 {
		fields = append(fields, "cost <= ?")
		values = append(values, params["maxCost"][0])
	}

	if len(params["search"]) > 0 {
		fields = append(fields, "name LIKE ?")
		values = append(values, "%"+params["search"][0]+"%")
	}

	var orderField string
	if len(params["sorted"]) > 0 {

		switch params["sorted"][0] {
		case "newest":
			orderField = "id desc"
		case "high-low":
			orderField = "cost desc"
		case "low-high":
			orderField = "cost asc"
		}

		if err := DB.Order(orderField).Where(strings.Join(fields, " AND "), values...).Preload("ClothColor").Find(&cloth).Error; err != nil {
			return []Cloth{}, err
		}

	} else {
		if err := DB.Where(strings.Join(fields, " AND "), values...).Preload("ClothColor").Find(&cloth).Error; err != nil {
			return []Cloth{}, err
		}
	}

	return cloth, nil
}
