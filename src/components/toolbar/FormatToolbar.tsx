import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Undo, 
  Redo, 
  Search, 
  Settings,
  BookOpen
} from "lucide-react";

export const FormatToolbar = () => {
  return (
    <div className="h-toolbar bg-toolbar-background border-b border-border px-4 flex items-center justify-between">
      {/* Left Section - File Operations */}
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-2 mr-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-semibold">My Novel</span>
        </div>
        
        <Button variant="ghost" size="sm" className="h-8">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-2" />
        
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Right Section - Tools */}
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};