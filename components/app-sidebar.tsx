
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

export function AppSidebar() {
  const { role, user, setRole } = useRole();

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
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight group-data-[collapsible=icon]:hidden">
            EduGestion
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 mb-2">Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className="px-6 py-6 h-auto">
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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

      <SidebarFooter className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="h-auto p-2 group-data-[collapsible=icon]:p-0">
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start overflow-hidden group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-semibold truncate w-full">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate w-full">{role}</span>
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
