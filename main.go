package main

import (
	"embed"
	"log"

	"shotgo/internal/app"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	application := app.New()

	err := wails.Run(&options.App{
		Title:  "ShotGo",
		Width:  800,
		Height: 600,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 18, G: 18, B: 24, A: 1},
		StartHidden:      true,
		OnStartup:        application.Startup,
		OnShutdown:       application.Shutdown,
		Menu:             application.CreateMenu(),
		Mac: &mac.Options{
			ActivationPolicy: mac.NSApplicationActivationPolicyAccessory,
		},
		Bind: []interface{}{
			application,
		},
	})
	if err != nil {
		log.Fatal(err)
	}
}
