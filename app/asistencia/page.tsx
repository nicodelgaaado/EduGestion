
'use client';

import React from 'react';
import { DashboardLayout } from "@/components/dashboard-layout";
import { AttendanceManager } from "@/components/attendance/attendance-manager";
import { useRole } from "@/components/role-provider";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { mockAttendance, mockSubjects } from '@/lib/mock-data';
import { Progress } from '@/components/ui/progress';

export default function AsistenciaPage() {
  const { role, user } = useRole();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Presente': return <Badge variant="success" className="rounded-full gap-1"><CheckCircle2 className="h-3 w-3" />Presente</Badge>;
      case 'Ausente': return <Badge variant="destructive" className="rounded-full gap-1"><XCircle className="h-3 w-3" />Ausente</Badge>;
      case 'Tarde': return <Badge variant="warning" className="rounded-full gap-1"><Clock className="h-3 w-3" />Tarde</Badge>;
      case 'Justificada': return <Badge variant="outline" className="rounded-full border-blue-500 text-blue-600 gap-1"><ShieldCheck className="h-3 w-3" />Justificada</Badge>;
      default: return <Badge variant="secondary" className="rounded-full">{status}</Badge>;
    }
  };

  const renderStudentView = () => {
    const studentAttendance = mockAttendance.filter(a => a.studentId === user.id);
    
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Mi Asistencia</h1>
          <p className="text-muted-foreground text-sm font-medium">Consulta tu registro detallado por materia y solicita justificaciones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-blue-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-blue-800">Promedio General</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-blue-900">88%</div>
              <Progress value={88} className="h-2 mt-3 bg-blue-100" />
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-green-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-green-800">Sesiones Presente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-green-900">42</div>
              <p className="text-[10px] text-green-700 font-bold mt-2 uppercase tracking-wider">Total del semestre</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-amber-800">Faltas Justificables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-amber-900">3</div>
              <p className="text-[10px] text-amber-700 font-bold mt-2 uppercase tracking-wider">Pendientes de trámite</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Historial Reciente</CardTitle>
            <CardDescription>Tus últimos registros de asistencia en todas las materias.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6">Materia</TableHead>
                  <TableHead className="px-6">Fecha</TableHead>
                  <TableHead className="px-6">Estado</TableHead>
                  <TableHead className="text-right px-6">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentAttendance.map((record) => {
                  const subject = mockSubjects.find(s => s.id === record.subjectId);
                  return (
                    <TableRow key={record.id}>
                      <TableCell className="px-6">
                        <p className="text-sm font-bold">{subject?.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">Prof. {subject?.teacherId === 'u2' ? 'Dra. María García' : 'Ing. Carlos Mendoza'}</p>
                      </TableCell>
                      <TableCell className="px-6 text-sm font-medium">{record.date}</TableCell>
                      <TableCell className="px-6">{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="text-right px-6">
                        {record.status === 'Ausente' && (
                          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-pointer text-[10px] font-bold py-1 px-3">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            Justificar
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTeacherView = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Control de Asistencia</h1>
          <p className="text-muted-foreground text-sm font-medium">Gestiona el registro de tus grupos y sesiones académicas.</p>
        </div>
        <AttendanceManager />
      </div>
    );
  };

  return (
    <DashboardLayout>
      {role === 'Docente' ? renderTeacherView() : renderStudentView()}
    </DashboardLayout>
  );
}
