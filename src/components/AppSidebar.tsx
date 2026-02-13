import { useState } from "react";
import {
  Droplets,
  Waves,
  Mic,
  Cable,
  ClipboardList,
  Speaker,
  Sparkles,
  Disc3,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const sessions = [
  { number: 1, title: "Introdução / Analogia", icon: Droplets, path: "/" },
  { number: 2, title: "Acústica", icon: Waves, path: "/sessao/2", disabled: true },
  { number: 3, title: "Microfones", icon: Mic, path: "/sessao/3", disabled: true },
  { number: 4, title: "Interfaces", icon: Cable, path: "/sessao/4", disabled: true },
  { number: 5, title: "Planeamento", icon: ClipboardList, path: "/sessao/5", disabled: true },
  { number: 6, title: "Monitores", icon: Speaker, path: "/sessao/6", disabled: true },
  { number: 7, title: "Efeitos", icon: Sparkles, path: "/sessao/7", disabled: true },
  { number: 8, title: "Mix / Master", icon: Disc3, path: "/sessao/8", disabled: true },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 flex h-screen flex-col border-r border-sidebar-border bg-sidebar"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sidebar-border p-4">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm font-semibold text-sidebar-foreground">
                Som Claro
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Sessions */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {sessions.map((session) => {
            const Icon = session.icon;
            if (session.disabled) {
              return (
                <div
                  key={session.number}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-muted-foreground/50 cursor-not-allowed",
                    collapsed && "justify-center px-2"
                  )}
                  title={`${session.number}. ${session.title}`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <span className="text-sm">
                      <span className="font-mono text-xs mr-2">{String(session.number).padStart(2, "0")}</span>
                      {session.title}
                    </span>
                  )}
                </div>
              );
            }
            return (
              <NavLink
                key={session.number}
                to={session.path}
                end
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  collapsed && "justify-center px-2"
                )}
                activeClassName="bg-sidebar-accent text-primary font-medium"
                title={`${session.number}. ${session.title}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && (
                  <span className="text-sm">
                    <span className="font-mono text-xs mr-2">{String(session.number).padStart(2, "0")}</span>
                    {session.title}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer - Admin link */}
      <div className="border-t border-sidebar-border p-2">
        <NavLink
          to="/admin"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 text-muted-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground text-xs",
            collapsed && "justify-center px-2"
          )}
          activeClassName="text-primary"
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Área do Formador</span>}
        </NavLink>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
