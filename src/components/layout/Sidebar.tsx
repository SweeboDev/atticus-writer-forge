import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  FileText, 
  Eye, 
  Download,
  BookOpen,
  Target,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ViewMode } from "./AppLayout";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  currentView: ViewMode;
}

interface Chapter {
  id: string;
  title: string;
  wordCount: number;
  isActive: boolean;
}

export const Sidebar = ({ 
  isCollapsed, 
  onToggleCollapse, 
  onViewModeChange, 
  currentView 
}: SidebarProps) => {
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: "1", title: "Chapter 1: The Beginning", wordCount: 2847, isActive: true },
    { id: "2", title: "Chapter 2: Rising Action", wordCount: 3156, isActive: false },
    { id: "3", title: "Chapter 3: The Conflict", wordCount: 0, isActive: false },
  ]);

  const totalWordCount = chapters.reduce((sum, chapter) => sum + chapter.wordCount, 0);
  const dailyGoal = 2000;
  const progressPercentage = Math.min((totalWordCount % dailyGoal) / dailyGoal * 100, 100);

  const addNewChapter = () => {
    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: `Chapter ${chapters.length + 1}: Untitled`,
      wordCount: 0,
      isActive: false
    };
    setChapters([...chapters, newChapter]);
  };

  const selectChapter = (id: string) => {
    setChapters(chapters.map(chapter => ({
      ...chapter,
      isActive: chapter.id === id
    })));
  };

  return (
    <div className={cn(
      "bg-sidebar border-r border-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-sidebar"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-heading font-semibold text-lg">Atticus</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* View Mode Buttons */}
          <div className="p-4 space-y-2">
            <Button
              variant={currentView === "write" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("write")}
              className="w-full justify-start"
            >
              <FileText className="h-4 w-4 mr-2" />
              Write
            </Button>
            <Button
              variant={currentView === "preview" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("preview")}
              className="w-full justify-start"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant={currentView === "export" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("export")}
              className="w-full justify-start"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Progress Section */}
          <div className="px-4 pb-4">
            <div className="bg-card p-3 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Today's Progress</span>
                <Target className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{totalWordCount % dailyGoal} words</span>
                  <span className="text-muted-foreground">{dailyGoal} goal</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chapters Section */}
          <div className="flex-1 flex flex-col">
            <div className="px-4 pb-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Manuscript
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addNewChapter}
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-1">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer transition-colors border",
                      chapter.isActive 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "hover:bg-muted border-transparent"
                    )}
                    onClick={() => selectChapter(chapter.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm truncate">{chapter.title}</span>
                      <Badge 
                        variant={chapter.isActive ? "secondary" : "outline"}
                        className="text-xs ml-2"
                      >
                        {chapter.wordCount}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Total Word Count */}
            <div className="p-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalWordCount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Words</div>
              </div>
            </div>
          </div>
        </>
      )}

      {isCollapsed && (
        <div className="p-2 space-y-2">
          <Button
            variant={currentView === "write" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("write")}
            className="w-full p-2"
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button
            variant={currentView === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("preview")}
            className="w-full p-2"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant={currentView === "export" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("export")}
            className="w-full p-2"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};