
'use client';

import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  CalendarDays,
  GraduationCap,
  Loader2
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
import { cn } from '@/lib/utils';
import { AttendanceChart } from './attendance-chart';

export function StudentDashboard() {
  const { user } = useRole();
  const [loading, setLoading] = React.useState<'agenda' | 'carnet' | null>(null);
  const recentRequests = mockRequests.filter(r => r.studentId === user.id).slice(0, 3);

  const handleAction = (type: 'agenda' | 'carnet') => {
    setLoading(type);
    setTimeout(() => {
      setLoading(null);
      alert(type === 'agenda' ? 'Abriendo agenda académica...' : 'Generando carnet digital...');
    }, 1000);
  };

  const stats = [
    { title: 'Solicitudes Totales', value: '8', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Aprobadas', value: '5', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Pendientes', value: '2', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Alertas', value: '1', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-foreground/90">Bienvenido, {user.name}</h1>
          <p className="text-muted-foreground mt-1 font-medium flex items-center gap-2">
            <Badge variant="secondary" className="rounded-md font-bold text-[10px]">{user.career}</Badge>
            <span className="text-xs">• Semestre {user.semester} • ID: {user.idNumber}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full h-9 font-bold text-xs"
            onClick={() => handleAction('agenda')}
            disabled={!!loading}
          >
            {loading === 'agenda' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CalendarDays className="h-4 w-4 mr-2" />}
            Agenda
          </Button>
          <Button 
            size="sm" 
            className="rounded-full h-9 font-bold text-xs shadow-lg shadow-primary/20"
            onClick={() => handleAction('carnet')}
            disabled={!!loading}
          >
            {loading === 'carnet' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Descargar Carnet
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={stat.title} className={cn(
            "border-none shadow-sm bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group",
            `animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-[${i * 100}ms]`
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <div className={cn(stat.bg, stat.color, "p-2 rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-3")}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tight">{stat.value}</div>
              <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-wider">
                <span className="text-green-600 inline-flex items-center mr-1">
                  <TrendingUp className="h-3 w-3 mr-0.5" /> +12%
                </span> vs mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Solicitudes Recientes</CardTitle>
            <CardDescription>Tus últimos trámites académicos y su estado actual.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Materia</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.type}</TableCell>
                    <TableCell>{req.subject}</TableCell>
                    <TableCell>
                      <Badge variant={
                        req.status === 'Aprobada' ? 'success' : 
                        req.status === 'Pendiente' ? 'warning' : 
                        'default'
                      } className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{req.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button 
              variant="ghost" 
              className="w-full mt-4 text-primary font-medium hover:bg-primary/5"
              onClick={() => window.location.href = '/solicitudes'}
            >
              Ver todas las solicitudes
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Resumen de Asistencia</CardTitle>
            <CardDescription>Cumplimiento por materia en el semestre actual.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <AttendanceChart />
            
            <div className="space-y-2 mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Promedio General</span>
                <span className="font-bold text-primary">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>

            <div className="space-y-4 pt-2">
              {mockSubjects.map((subject) => (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground truncate max-w-45">{subject.name}</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="h-1" />
                </div>
              ))}
            </div>

            <div className="bg-muted/40 p-4 rounded-xl border border-border/50 space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Próxima Clase</p>
                  <p className="text-[10px] text-muted-foreground">Mañana, 08:00 AM</p>
                </div>
              </div>
              <p className="text-xs font-medium border-t border-border/50 pt-2">
                Arquitectura de Software - Aula 401
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
