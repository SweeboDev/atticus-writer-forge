import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlignLeft, 
  AlignCenter, 
  Bold, 
  Italic, 
  Underline,
  Quote,
  List,
  Hash,
  Type,
  Focus
} from "lucide-react";
import { cn } from "@/lib/utils";

export const WritingArea = () => {
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.textContent || "");
  };

  const applyFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="flex-1 flex flex-col bg-editor-background">
      {/* Quick Formatting Bar */}
      <div className="px-6 py-3 border-b border-border bg-toolbar-background">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormatting("bold")}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormatting("italic")}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormatting("underline")}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>
          
          <Separator orientation="vertical" className="h-6 mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormatting("justifyLeft")}
            className="h-8 w-8 p-0"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormatting("justifyCenter")}
            className="h-8 w-8 p-0"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          
          <Separator orientation="vertical" className="h-6 mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormatting("formatBlock", "blockquote")}
            className="h-8 w-8 p-0"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => applyFormatting("insertUnorderedList")}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          
          <div className="flex-1" />
          
          <Button
            variant={isFocusMode ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="h-8 px-3"
          >
            <Focus className="h-4 w-4 mr-2" />
            Focus
          </Button>
          
          <Badge variant="secondary" className="ml-4">
            {wordCount} words
          </Badge>
        </div>
      </div>

      {/* Writing Editor */}
      <div className={cn(
        "flex-1 relative",
        isFocusMode && "bg-editor-background"
      )}>
        <ScrollArea className="h-full">
          <div className={cn(
            "max-w-4xl mx-auto px-6 py-8",
            isFocusMode && "max-w-2xl"
          )}>
            {/* Chapter Title */}
            <div className="mb-8">
              <h1 
                className="text-3xl font-bold text-editor-foreground mb-2 outline-none"
                contentEditable
                suppressContentEditableWarning
                data-placeholder="Chapter Title..."
              >
                Chapter 1: The Beginning
              </h1>
              <div className="text-sm text-muted-foreground">
                Last edited 2 minutes ago
              </div>
            </div>

            {/* Editor Content */}
            <div
              ref={editorRef}
              className={cn(
                "min-h-[600px] text-editor-foreground leading-relaxed outline-none",
                "prose prose-lg max-w-none",
                "focus:ring-0 focus:outline-none",
                isFocusMode && "text-xl leading-loose"
              )}
              contentEditable
              suppressContentEditableWarning
              onInput={handleContentChange}
              data-placeholder="Start writing your story..."
              style={{
                fontFamily: "Georgia, Charter, 'Times New Roman', serif",
                fontSize: isFocusMode ? "1.25rem" : "1.125rem",
                lineHeight: isFocusMode ? "1.8" : "1.7"
              }}
            >
              <p>In the beginning, there was nothing but a blank page. The cursor blinked steadily, waiting for the first word to break the silence. This is where every great story begins—with possibility.</p>
              
              <p>The writer sat at their desk, fingers hovering over the keyboard. They had an idea, a spark of creativity that demanded to be brought to life. But how to begin? How to transform that fleeting thought into something substantial, something that would resonate with readers across the world?</p>
              
              <p>That's when they discovered Atticus—the writing companion that would change everything.</p>
            </div>
          </div>
        </ScrollArea>

        {/* Focus Mode Overlay */}
        {isFocusMode && (
          <div className="absolute inset-0 bg-editor-background/80 backdrop-blur-sm pointer-events-none" />
        )}
      </div>

      {/* Status Bar */}
      <div className="px-6 py-2 border-t border-border bg-toolbar-background">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Line 1, Column 1</span>
            <span>•</span>
            <span>Auto-save enabled</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{content.length} characters</span>
            <span>•</span>
            <span>{Math.ceil(wordCount / 250)} pages</span>
          </div>
        </div>
      </div>
    </div>
  );
};