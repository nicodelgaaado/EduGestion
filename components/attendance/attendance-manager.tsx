
'use client';

import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Calendar as CalendarIcon, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  Save,
  Download,
  Filter,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { mockSubjects, mockAttendance } from '@/lib/mock-data';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function AttendanceManager() {
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0].id);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccessMessage('¡Asistencia guardada con éxito!');
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setSuccessMessage('Lista exportada correctamente');
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1000);
  };

  const students = [
    { id: 'u1', name: 'Estudiante Demo', attendance: 85 },
    { id: 'u5', name: 'Estudiante Secundario', attendance: 95 },
    { id: 'u8', name: 'Estudiante Alterno', attendance: 72 },
    { id: 'u9', name: 'Estudiante Regular', attendance: 88 },
  ];

  const updateAttendance = (studentId: string, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getAttendanceStats = () => {
    const values = Object.values(attendance);
    const presents = values.filter(v => v === 'Presente').length;
    const absents = values.filter(v => v === 'Ausente').length;
    return { presents, absents };
  };

  const stats = getAttendanceStats();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Presente': return <Badge variant="success" className="rounded-full">P</Badge>;
      case 'Ausente': return <Badge variant="destructive" className="rounded-full">A</Badge>;
      case 'Tarde': return <Badge variant="warning" className="rounded-full">T</Badge>;
      case 'Justificada': return <Badge variant="outline" className="rounded-full border-blue-500 text-blue-600">J</Badge>;
      default: return <Badge variant="secondary" className="rounded-full">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full md:w-70 h-11 bg-muted/30 border-transparent hover:bg-muted/50 transition-all focus:ring-primary focus:bg-background">
              <SelectValue placeholder="Selecciona una materia" />
            </SelectTrigger>
            <SelectContent>
              {mockSubjects.map((sub) => (
                <SelectItem key={sub.id} value={sub.id} className="text-xs font-medium py-2">{sub.name} - {sub.group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 rounded-lg">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="h-11 px-4 text-xs font-bold border-2 hover:bg-muted/50 flex-1 md:flex-none"
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> : <Download className="h-3.5 w-3.5 mr-2" />}
            {exporting ? 'Exportando...' : 'Exportar Lista'}
          </Button>
          <Button 
            className="h-11 px-6 text-xs font-bold shadow-lg shadow-primary/20 flex-1 md:flex-none relative"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-2" />}
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">Sesión del 20 de Abril, 2026</CardTitle>
                  <CardDescription className="text-xs font-medium mt-1">
                    Control de asistencia para {mockSubjects.find(s => s.id === selectedSubject)?.name}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1.5 text-green-600">
                    <CheckCircle2 className="h-4 w-4" /> {38 + stats.presents} Presentes
                  </div>
                  <div className="flex items-center gap-1.5 text-red-600">
                    <XCircle className="h-4 w-4" /> {4 + stats.absents} Ausentes
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-20 px-6">ID</TableHead>
                    <TableHead className="px-6">Estudiante</TableHead>
                    <TableHead className="px-6 text-center">Estado</TableHead>
                    <TableHead className="px-6 text-center">Rendimiento</TableHead>
                    <TableHead className="text-right px-6">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/10 transition-colors">
                      <TableCell className="font-mono text-[10px] font-bold text-muted-foreground px-6">{student.id}</TableCell>
                      <TableCell className="px-6">
                        <p className="text-sm font-bold">{student.name}</p>
                        <p className="text-[10px] text-muted-foreground">Ingeniería de Sistemas</p>
                      </TableCell>
                      <TableCell className="px-6">
                        <div className="flex items-center justify-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={cn(
                              "h-9 w-9 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all border border-transparent",
                              attendance[student.id] === 'Presente' ? "bg-green-600 text-white hover:bg-green-700" : "hover:border-green-200"
                            )}
                            onClick={() => updateAttendance(student.id, 'Presente')}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={cn(
                              "h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all border border-transparent",
                              attendance[student.id] === 'Ausente' ? "bg-red-600 text-white hover:bg-red-700" : "hover:border-red-200"
                            )}
                            onClick={() => updateAttendance(student.id, 'Ausente')}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={cn(
                              "h-9 w-9 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-all border border-transparent",
                              attendance[student.id] === 'Tarde' ? "bg-amber-600 text-white hover:bg-amber-700" : "hover:border-amber-200"
                            )}
                            onClick={() => updateAttendance(student.id, 'Tarde')}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="px-6">
                        <div className="w-full max-w-25 mx-auto space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span>{student.attendance}%</span>
                          </div>
                          <Progress value={student.attendance} className={`h-1 ${student.attendance < 75 ? 'bg-red-100' : 'bg-muted'}`} />
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-primary hover:bg-primary/5">Historial</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" /> Alertas Críticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-700">Estudiante Alterno</span>
                  <Badge variant="destructive" className="h-4 px-1 text-[8px] font-bold">72%</Badge>
                </div>
                <p className="text-[10px] text-red-600 leading-relaxed font-medium">
                  Riesgo de pérdida por inasistencias. Ha faltado a las últimas 3 sesiones.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full h-7 text-[9px] font-bold border-red-200 text-red-700 bg-white hover:bg-red-50"
                  onClick={() => {
                    alert('Notificación enviada al estudiante en riesgo.');
                  }}
                >
                  Notificar Estudiante
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700">Estudiante Demo</span>
                  <Badge variant="warning" className="h-4 px-1 text-[8px] font-bold">85%</Badge>
                </div>
                <p className="text-[10px] text-amber-600 leading-relaxed font-medium">
                  Se acerca al límite permitido (80%). Presenta llegadas tarde recurrentes.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full h-7 text-[9px] font-bold border-amber-200 text-amber-700 bg-white hover:bg-amber-50"
                  onClick={() => {
                    alert('Recordatorio de asistencia enviado.');
                  }}
                >
                  Enviar Recordatorio
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Próxima Sesión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Miércoles 22</p>
                  <p className="text-[10px] text-muted-foreground font-medium">10:00 AM - Aula 302</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
