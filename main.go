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
		BackgroundColour:  &options.RGBA{R: 0, G: 0, B: 0, A: 0},
		Frameless:         true,
		StartHidden:       true,
		HideWindowOnClose: true,
		OnStartup:         application.Startup,
		OnShutdown:        application.Shutdown,
		Menu:              application.CreateMenu(),
		Bind: []interface{}{
			application,
		},
		Mac: &mac.Options{
			WebviewIsTransparent: true,
			WindowIsTranslucent:  false,
			TitleBar:             mac.TitleBarHidden(),
		},
	})
	if err != nil {
		log.Fatal(err)
	}
}
