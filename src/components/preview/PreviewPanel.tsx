import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  BookOpen,
  Eye,
  Palette,
  Type
} from "lucide-react";
import { cn } from "@/lib/utils";

type PreviewDevice = "mobile" | "tablet" | "desktop" | "kindle";
type PreviewTheme = "classic" | "modern" | "minimal";

export const PreviewPanel = () => {
  const [currentDevice, setCurrentDevice] = useState<PreviewDevice>("desktop");
  const [currentTheme, setCurrentTheme] = useState<PreviewTheme>("classic");

  const devices = [
    { id: "mobile" as const, name: "Mobile", icon: Smartphone, width: "320px" },
    { id: "tablet" as const, name: "Tablet", icon: Tablet, width: "768px" },
    { id: "desktop" as const, name: "Desktop", icon: Monitor, width: "100%" },
    { id: "kindle" as const, name: "Kindle", icon: BookOpen, width: "600px" }
  ];

  const themes = [
    { id: "classic" as const, name: "Classic", description: "Traditional book styling" },
    { id: "modern" as const, name: "Modern", description: "Clean, contemporary look" },
    { id: "minimal" as const, name: "Minimal", description: "Simple and elegant" }
  ];

  const mockContent = {
    title: "Chapter 1: The Beginning",
    content: [
      "In the beginning, there was nothing but a blank page. The cursor blinked steadily, waiting for the first word to break the silence. This is where every great story begins—with possibility.",
      "The writer sat at their desk, fingers hovering over the keyboard. They had an idea, a spark of creativity that demanded to be brought to life. But how to begin? How to transform that fleeting thought into something substantial, something that would resonate with readers across the world?",
      "That's when they discovered Atticus—the writing companion that would change everything."
    ]
  };

  return (
    <div className="flex-1 bg-background">
      {/* Controls Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary" />
              <span className="font-semibold">Preview Mode</span>
            </div>
            
            {/* Device Selection */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {devices.map((device) => (
                <Button
                  key={device.id}
                  variant={currentDevice === device.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentDevice(device.id)}
                  className="h-8"
                >
                  <device.icon className="h-4 w-4 mr-1" />
                  {device.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div className="flex items-center space-x-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <div className="flex space-x-1">
              {themes.map((theme) => (
                <Button
                  key={theme.id}
                  variant={currentTheme === theme.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTheme(theme.id)}
                >
                  {theme.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-6 bg-muted/30">
        <div className="flex justify-center">
          <div 
            className={cn(
              "bg-white shadow-strong rounded-lg overflow-hidden transition-all duration-300",
              currentDevice === "mobile" && "max-w-[320px]",
              currentDevice === "tablet" && "max-w-[768px]",
              currentDevice === "kindle" && "max-w-[600px]",
              currentDevice === "desktop" && "max-w-4xl w-full"
            )}
            style={{ 
              width: currentDevice === "desktop" ? "100%" : devices.find(d => d.id === currentDevice)?.width 
            }}
          >
            <ScrollArea className="h-[600px]">
              <div className={cn(
                "p-8",
                currentTheme === "classic" && "font-serif",
                currentTheme === "modern" && "font-sans",
                currentTheme === "minimal" && "font-light"
              )}>
                {/* Chapter Title */}
                <h1 className={cn(
                  "mb-8 font-bold",
                  currentTheme === "classic" && "text-3xl text-gray-800 border-b-2 border-gray-200 pb-4",
                  currentTheme === "modern" && "text-4xl text-gray-900 mb-6",
                  currentTheme === "minimal" && "text-2xl text-gray-700 font-normal"
                )}>
                  {mockContent.title}
                </h1>

                {/* Content */}
                <div className={cn(
                  "space-y-6",
                  currentTheme === "classic" && "text-gray-700 leading-relaxed text-lg",
                  currentTheme === "modern" && "text-gray-800 leading-loose text-base",
                  currentTheme === "minimal" && "text-gray-600 leading-relaxed text-base"
                )}>
                  {mockContent.content.map((paragraph, index) => (
                    <p key={index} className={cn(
                      currentTheme === "classic" && "indent-8",
                      currentTheme === "modern" && "mb-4",
                      currentTheme === "minimal" && "mb-6"
                    )}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Page Break Indicator */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-400">
                    — Page Break —
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Theme: {themes.find(t => t.id === currentTheme)?.name}</span>
            <span>•</span>
            <span>Device: {devices.find(d => d.id === currentDevice)?.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Live Preview</Badge>
            <span>Updates automatically as you write</span>
          </div>
        </div>
      </div>
    </div>
  );
};