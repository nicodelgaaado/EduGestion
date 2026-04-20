
'use client';

import React from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  CalendarDays,
  GraduationCap,
  ClipboardCheck,
  UserCheck,
  BarChart3,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { mockRequests, mockSubjects } from '@/lib/mock-data';
import { useRole } from '@/components/role-provider';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';

export function AdminDashboard() {
  const { user } = useRole();
  const allRequests = mockRequests.slice(0, 3);

  const stats = [
    { title: 'Solicitudes Totales', value: '1,248', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Pendientes', value: '42', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Justificaciones', value: '15', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Incidencias', value: '8', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión Académica, {user.name}</h1>
        <p className="text-muted-foreground mt-1">
          Coordinación Central • ID: {user.idNumber}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-blue-600 font-medium inline-flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8%
                </span> vs mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Bandeja de Solicitudes</CardTitle>
              <CardDescription>Todas las solicitudes académicas pendientes de resolución.</CardDescription>
            </div>
            <Button variant="outline" size="sm">Ver Todas</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Materia</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.studentName}</TableCell>
                    <TableCell className="text-xs">{req.type}</TableCell>
                    <TableCell className="text-xs">{req.subject}</TableCell>
                    <TableCell>
                      <Badge variant={
                        req.status === 'Aprobada' ? 'success' : 
                        req.status === 'Pendiente' ? 'warning' : 
                        req.status === 'Rechazada' ? 'destructive' : 
                        req.status === 'Requiere información' ? 'outline' :
                        'secondary'
                      } className="rounded-full px-2 py-0 text-[10px] font-bold uppercase">
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">{req.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Métricas de Facultad</CardTitle>
            <CardDescription>Resumen de asistencia y rendimiento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Ingeniería de Sistemas</span>
                  <span className="font-bold">92%</span>
                </div>
                <Progress value={92} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Arquitectura</span>
                  <span className="font-bold">88%</span>
                </div>
                <Progress value={88} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Administración</span>
                  <span className="font-bold">85%</span>
                </div>
                <Progress value={85} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Derecho</span>
                  <span className="font-bold">78%</span>
                </div>
                <Progress value={78} className="h-1.5" />
              </div>
            </div>

            <div className="bg-muted/40 p-4 rounded-xl border border-border/50 space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Tendencia de Solicitudes</p>
                  <p className="text-[10px] text-muted-foreground">+15% este semestre</p>
                </div>
              </div>
              <Button className="w-full text-xs h-8" variant="secondary">Descargar Reporte Completo</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
