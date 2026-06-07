import { BarChart3, BookOpenText, CalendarCheck, ClipboardList, LayoutDashboard, Lightbulb, LogOut, Shield, UserCircle, Brain } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Planner', url: '/planner', icon: ClipboardList },
  { title: 'Journal', url: '/journal', icon: BookOpenText },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Recommendations', url: '/recommendations', icon: Lightbulb },
  { title: 'Calendar', url: '/calendar', icon: CalendarCheck },
  { title: 'Profile', url: '/profile', icon: UserCircle },
  { title: 'Admin', url: '/admin', icon: Shield },
];

interface Props {
  onLogout: () => void;
}

export function AppSidebar({ onLogout }: Props) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-accent animate-brain-pulse shrink-0" />
          {!collapsed && (
            <span className="text-lg font-bold text-gradient">NeuroLearn</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      activeClassName="bg-primary/10 text-primary neon-border"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>Logout</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
