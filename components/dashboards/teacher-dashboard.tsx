
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
  UserCheck
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

export function TeacherDashboard() {
  const { user } = useRole();
  const teacherRequests = mockRequests.filter(r => r.teacherName === user.name).slice(0, 3);

  const stats = [
    { title: 'Estudiantes Totales', value: '124', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Solicitudes Pendientes', value: '4', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Asistencia Hoy', value: '92%', icon: ClipboardCheck, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Baja Asistencia', value: '12', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel Docente, {user.name}</h1>
        <p className="text-muted-foreground mt-1">
          Facultad de Ingeniería • ID: {user.idNumber}
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
                <span className="text-green-600 font-medium inline-flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +3%
                </span> vs semana pasada
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Solicitudes por Revisar</CardTitle>
              <CardDescription>Trámites académicos que requieren tu atención.</CardDescription>
            </div>
            <Button variant="outline" size="sm">Ver Todas</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Tipo de Solicitud</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.studentName}</TableCell>
                    <TableCell className="text-sm">{req.type}</TableCell>
                    <TableCell>
                      <Badge variant={
                        req.priority === 'Alta' || req.priority === 'Urgente' ? 'destructive' : 
                        req.priority === 'Media' ? 'warning' : 
                        'secondary'
                      } className="rounded-full text-[10px] font-bold uppercase">
                        {req.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Revisar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Clases del Día</CardTitle>
            <CardDescription>Tus sesiones programadas para hoy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            {mockSubjects.slice(0, 2).map((subject, index) => (
              <div key={subject.id} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-primary">{subject.schedule}</span>
                  <Badge variant="outline" className="text-[10px]">Grupo {subject.group}</Badge>
                </div>
                <h4 className="text-sm font-bold">{subject.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Users className="h-3 w-3" /> 42 estudiantes inscritos
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="h-7 text-xs px-2 gap-1.5">
                    <UserCheck className="h-3.5 w-3.5" />
                    Pasar Asistencia
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs px-2">Ver Grupo</Button>
                </div>
              </div>
            ))}

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-primary">Resumen Semanal</p>
                <p className="text-[10px] text-muted-foreground">Progreso de temas: 85%</p>
              </div>
              <div className="h-10 w-10">
                <Progress value={85} className="h-1.5 mt-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
