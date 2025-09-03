import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  PlusCircle, 
  Settings,
  LogOut,
  User,
  FileText
} from 'lucide-react';

interface NavigationSidebarProps {
  currentView: 'master' | 'customer' | 'alerts' | 'wizard' | 'reports';
  onViewChange: (view: 'master' | 'customer' | 'alerts' | 'wizard' | 'reports') => void;
  onHomepageClick?: () => void;
  selectedCustomer?: string | null;
}

export default function NavigationSidebar({ 
  currentView, 
  onViewChange, 
  onHomepageClick,
  selectedCustomer 
}: NavigationSidebarProps) {
  const menuItems = [
    {
      id: 'master',
      label: 'Master Dashboard',
      icon: LayoutDashboard,
      description: 'Overview of all jobs and customers'
    },
    {
      id: 'customer',
      label: 'Customer View',
      icon: Users,
      description: 'Manage and view all customer accounts and their job history'
    },
    {
      id: 'alerts',
      label: 'Alerts Portal',
      icon: Bell,
      description: 'Monitor and manage all system alerts across all customers and jobs'
    },
    {
      id: 'wizard',
      label: 'New Job Wizard',
      icon: PlusCircle,
      description: 'Create a new support job'
    },
    {
      id: 'reports',
      label: 'End of Shift Report',
      icon: FileText,
      description: 'Generate and view end of shift reports'
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div 
          className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-sidebar-accent rounded-md transition-colors"
          onClick={() => {
            onViewChange('master');
            if (onHomepageClick) {
              onHomepageClick();
            }
          }}
          title="Click to return to homepage"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Customer Service</span>
            <span className="text-xs text-muted-foreground">Portal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => {
                        onViewChange(item.id as 'master' | 'customer' | 'alerts' | 'wizard' | 'reports');
                        // If it's Master Dashboard, also trigger homepage navigation
                        if (item.id === 'master' && onHomepageClick) {
                          onHomepageClick();
                        }
                      }}
                      isActive={isActive}
                      tooltip={item.description}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewChange('wizard')}
                  tooltip="Create a new support job"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>New Job</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewChange('master')}
                  tooltip="Return to main dashboard"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="User Settings">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Application Settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Sign out">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
