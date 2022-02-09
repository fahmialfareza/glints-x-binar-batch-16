package main

import "fmt"

type User struct {
	Name string
	Age  int
}

func main() {
	user := User{Name: "Reza", Age: 20}

	name := "Reza"

	name = "Aku"

	fmt.Println(user, name)
}
