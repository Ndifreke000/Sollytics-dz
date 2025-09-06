"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Palette } from "lucide-react"

interface ColorPalette {
  name: string
  colors: string[]
}

interface ColorPaletteSelectorProps {
  selectedColors: { [key: string]: string }
  columns: string[]
  onColorsChange: (colors: { [key: string]: string }) => void
}

const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Default",
    colors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00", "#ff00ff", "#00ffff", "#ff0000"]
  },
  {
    name: "Ocean",
    colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8DD1E1", "#D084D0", "#FFABAB", "#FFC3A0"]
  },
  {
    name: "Sunset",
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"]
  },
  {
    name: "Forest",
    colors: ["#2E8B57", "#228B22", "#32CD32", "#90EE90", "#98FB98", "#00FF7F", "#00FA9A", "#ADFF2F"]
  },
  {
    name: "Fire",
    colors: ["#FF4500", "#FF6347", "#FF7F50", "#FFA500", "#FFB347", "#FFCCCB", "#FFA07A", "#F08080"]
  },
  {
    name: "Purple",
    colors: ["#8A2BE2", "#9370DB", "#BA55D3", "#DA70D6", "#DDA0DD", "#EE82EE", "#FF69B4", "#FFB6C1"]
  }
]

export function ColorPaletteSelector({ selectedColors, columns, onColorsChange }: ColorPaletteSelectorProps) {
  const applyPalette = (palette: ColorPalette) => {
    const newColors = { ...selectedColors }
    columns.forEach((col, index) => {
      newColors[col] = palette.colors[index % palette.colors.length]
    })
    onColorsChange(newColors)
  }

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Palette className="w-4 h-4" />
        Color Palettes
      </Label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {COLOR_PALETTES.map(palette => (
          <Button
            key={palette.name}
            variant="outline"
            onClick={() => applyPalette(palette)}
            className="flex flex-col gap-2 h-auto p-3 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-1">
              {palette.colors.slice(0, 4).map((color, i) => (
                <div 
                  key={i} 
                  className="w-4 h-4 rounded-sm border border-gray-200" 
                  style={{ backgroundColor: color }} 
                />
              ))}
            </div>
            <span className="text-xs font-medium">{palette.name}</span>
          </Button>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground">
        Click a palette to apply colors to your chart columns
      </div>
    </div>
  )
}