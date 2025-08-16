import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { WritingArea } from "../editor/WritingArea";
import { FormatToolbar } from "../toolbar/FormatToolbar";
import { ExportPanel } from "../export/ExportPanel";
import { PreviewPanel } from "../preview/PreviewPanel";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export type ViewMode = "write" | "preview" | "export";

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("write");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onViewModeChange={setViewMode}
        currentView={viewMode}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Format Toolbar */}
        <FormatToolbar />
        
        {/* Content Area */}
        <div className="flex-1 flex">
          {viewMode === "write" && <WritingArea />}
          {viewMode === "preview" && <PreviewPanel />}
          {viewMode === "export" && <ExportPanel />}
        </div>
      </div>
    </div>
  );
};