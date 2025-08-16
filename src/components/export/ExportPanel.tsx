import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  BookOpen, 
  Download, 
  Settings,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle
} from "lucide-react";

export const ExportPanel = () => {
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: string) => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const exportFormats = [
    {
      id: "epub",
      name: "EPUB",
      description: "Perfect for e-readers and digital platforms",
      icon: BookOpen,
      recommended: true
    },
    {
      id: "pdf",
      name: "PDF",
      description: "Print-ready format with custom layouts",
      icon: FileText,
      recommended: false
    },
    {
      id: "docx",
      name: "Word Document",
      description: "Compatible with Microsoft Word",
      icon: FileText,
      recommended: false
    }
  ];

  return (
    <div className="flex-1 bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Export Your Manuscript</h1>
          <p className="text-lg text-muted-foreground">
            Choose your format and export your work to share with the world
          </p>
        </div>

        {/* Progress Section */}
        {isExporting && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Exporting...</span>
                  <span className="text-sm text-muted-foreground">{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export Formats */}
        <div className="grid md:grid-cols-3 gap-6">
          {exportFormats.map((format) => (
            <Card key={format.id} className="relative">
              {format.recommended && (
                <Badge className="absolute -top-2 left-4 bg-accent text-accent-foreground">
                  Recommended
                </Badge>
              )}
              <CardHeader className="text-center">
                <format.icon className="h-12 w-12 mx-auto text-primary mb-2" />
                <CardTitle>{format.name}</CardTitle>
                <CardDescription>{format.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleExport(format.id)}
                  disabled={isExporting}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export {format.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Export Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Export Settings
            </CardTitle>
            <CardDescription>
              Customize your export options for each format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">EPUB Options</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Include table of contents</span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Chapter navigation</span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Metadata included</span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">PDF Options</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Print margins</span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Page numbers</span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Professional typography</span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Compatibility */}
        <Card>
          <CardHeader>
            <CardTitle>Device Compatibility</CardTitle>
            <CardDescription>
              Your exports will work perfectly across all devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <Smartphone className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-sm font-medium">Mobile</div>
                <div className="text-xs text-muted-foreground">iOS & Android</div>
              </div>
              <div className="text-center">
                <Tablet className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-sm font-medium">Tablet</div>
                <div className="text-xs text-muted-foreground">iPad & Android</div>
              </div>
              <div className="text-center">
                <Monitor className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-sm font-medium">Desktop</div>
                <div className="text-xs text-muted-foreground">All platforms</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};