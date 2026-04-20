
'use client';

import * as React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  UserCheck, 
  ClipboardCheck, 
  Settings, 
  Users, 
  GraduationCap,
  ChevronDown,
  LogOut,
  HelpCircle,
  Bell
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { useRole } from '@/components/role-provider';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { role, user, setRole } = useRole();
  const pathname = usePathname();

  const menuItems = {
    Estudiante: [
      { title: 'Dashboard', icon: LayoutDashboard, href: '/' },
      { title: 'Mis Solicitudes', icon: FileText, href: '/solicitudes' },
      { title: 'Mi Asistencia', icon: UserCheck, href: '/asistencia' },
    ],
    Docente: [
      { title: 'Dashboard', icon: LayoutDashboard, href: '/' },
      { title: 'Pasar Asistencia', icon: ClipboardCheck, href: '/asistencia' },
      { title: 'Revisar Solicitudes', icon: FileText, href: '/solicitudes' },
    ],
    Coordinación: [
      { title: 'Dashboard', icon: LayoutDashboard, href: '/' },
      { title: 'Bandeja de Entrada', icon: FileText, href: '/solicitudes' },
      { title: 'Gestión Académica', icon: Users, href: '/admin' },
      { title: 'Reportes y Métricas', icon: Settings, href: '/reportes' },
    ],
  };

  const currentMenuItems = menuItems[role];

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r-0 shadow-xl">
      <SidebarHeader className="h-20 flex items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-lg shadow-primary/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-black text-xl tracking-tighter text-foreground">
              Edu<span className="text-primary">Gestion</span>
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">v2.4.0 Professional</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-3">
              {currentMenuItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title} 
                      className={cn(
                        "px-4 py-6 h-auto rounded-xl transition-all duration-200 group/item",
                        isActive ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <a href={item.href} className="flex items-center gap-4">
                        <item.icon className={cn("h-5 w-5 transition-transform group-hover/item:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover/item:text-primary")} />
                        <span className="font-bold text-sm tracking-tight">{item.title}</span>
                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-6">Ayuda</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Notificaciones" className="px-6 py-4">
                  <Bell className="h-5 w-5" />
                  <span>Notificaciones</span>
                  <Badge className="ml-auto px-1.5 py-0 h-5" variant="destructive">2</Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Soporte Técnico" className="px-6 py-4">
                  <HelpCircle className="h-5 w-5" />
                  <span>Soporte</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50 bg-muted/20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="h-auto p-2 group-data-[collapsible=icon]:p-0 rounded-xl hover:bg-muted/80 transition-all">
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-sm">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start overflow-hidden group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-black text-foreground truncate w-full tracking-tight">{user.name}</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{role}</span>
                </div>
                <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56">
            <DropdownMenuLabel>Cambiar de Rol</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setRole('Estudiante')}>
              Estudiante {role === 'Estudiante' && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole('Docente')}>
              Docente {role === 'Docente' && '✓'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole('Coordinación')}>
              Coordinación {role === 'Coordinación' && '✓'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
