package main

import (
	"./databases"
	"github.com/gofiber/fiber"
)

func main() {
	databases.Connect()

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Listen(":3000")
}
