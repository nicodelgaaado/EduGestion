
'use client';

import React from 'react';
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
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
  Settings, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  AlertTriangle,
  FileText,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowRight,
  Database
} from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';

export default function AdminPage() {
  const requestTypes = [
    { name: 'Justificación de inasistencia', time: '48h', autoApprove: false, status: 'Activo' },
    { name: 'Revisión de calificación', time: '72h', autoApprove: false, status: 'Activo' },
    { name: 'Solicitud de constancia académica', time: '24h', autoApprove: true, status: 'Activo' },
    { name: 'Cambio de grupo', time: '120h', autoApprove: false, status: 'En revisión' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">Gestión Académica</h1>
            <p className="text-muted-foreground text-sm font-medium">Configuración de procesos, catálogos y reglas institucionales.</p>
          </div>
          <Button className="h-10 px-6 font-bold text-xs shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" /> Nuevo Catálogo
          </Button>
        </div>

        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted/30 p-1 mb-8">
            <TabsTrigger value="catalog" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Tipos de Solicitud</TabsTrigger>
            <TabsTrigger value="rules" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Reglas y Plazos</TabsTrigger>
            <TabsTrigger value="incidents" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Incidencias Críticas</TabsTrigger>
            <TabsTrigger value="subjects" className="text-xs font-bold py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Carreras y Materias</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="animate-in fade-in duration-300">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-muted/10 border-b pb-4">
                <CardTitle className="text-lg font-bold">Catálogo de Trámites</CardTitle>
                <CardDescription className="text-xs">Define los tipos de solicitudes disponibles para estudiantes.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-6">Nombre del Trámite</TableHead>
                      <TableHead className="px-6">Tiempo de Respuesta</TableHead>
                      <TableHead className="px-6 text-center">Aprobación Automática</TableHead>
                      <TableHead className="px-6">Estado</TableHead>
                      <TableHead className="text-right px-6">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requestTypes.map((type) => (
                      <TableRow key={type.name}>
                        <TableCell className="px-6 font-bold text-sm">{type.name}</TableCell>
                        <TableCell className="px-6 text-xs font-medium text-muted-foreground">{type.time}</TableCell>
                        <TableCell className="px-6 text-center">
                          <Switch checked={type.autoApprove} className="data-[state=checked]:bg-primary" />
                        </TableCell>
                        <TableCell className="px-6">
                          <Badge variant={type.status === 'Activo' ? 'success' : 'warning'} className="rounded-full text-[10px] font-bold py-0.5 px-2.5">
                            {type.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-4 border-b bg-muted/10">
                    <CardTitle className="text-lg font-bold">Reglas de Asistencia</CardTitle>
                    <CardDescription className="text-xs">Configuración global de porcentajes y límites.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      <AccordionItem value="item-1" className="border rounded-xl px-4 bg-muted/5">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                              <AlertTriangle className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-bold">Límite de Inasistencias</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-xs font-medium text-muted-foreground leading-relaxed">
                          El límite de inasistencias permitido es del 20% por materia. Superado este porcentaje, el estudiante pierde el derecho a examen final automáticamente.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border rounded-xl px-4 bg-muted/5">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                              <ShieldCheck className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-bold">Protocolo de Justificación</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-xs font-medium text-muted-foreground leading-relaxed">
                          Las justificaciones deben presentarse en un plazo máximo de 48 horas después de la falta. Se requiere adjuntar evidencia oficial (médica, legal o laboral).
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-sm bg-primary/5 border-primary/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold">Configuración de Plazos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Atención Urgente</p>
                      <p className="text-sm font-black">24 Horas</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Atención Estándar</p>
                      <p className="text-sm font-black">72 Horas</p>
                    </div>
                    <Button className="w-full text-xs font-bold h-9 mt-4" variant="secondary">Actualizar Plazos</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="animate-in fade-in duration-300">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-rose-50 border-b border-rose-100 pb-4">
                <CardTitle className="text-lg font-bold text-rose-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Reporte de Incidencias Críticas
                </CardTitle>
                <CardDescription className="text-xs text-rose-600 font-medium">Alertas que requieren intervención inmediata de coordinación.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="px-6">Estudiante</TableHead>
                      <TableHead className="px-6">Incidencia</TableHead>
                      <TableHead className="px-6">Gravedad</TableHead>
                      <TableHead className="text-right px-6">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-rose-50/20">
                      <TableCell className="px-6 font-bold text-sm">Juan Pérez</TableCell>
                      <TableCell className="px-6 text-xs font-medium">Baja asistencia recurrente (65%)</TableCell>
                      <TableCell className="px-6">
                        <Badge variant="destructive" className="h-5 px-2 text-[9px] font-bold uppercase">Crítica</Badge>
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-rose-200 text-rose-700 bg-white hover:bg-rose-50">Citar a entrevista</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold">Facultad de Ingeniería</CardTitle>
                    <CardDescription className="text-[10px]">12 Carreras • 850 Estudiantes</CardDescription>
                  </div>
                  <Database className="h-5 w-5 text-muted-foreground/30" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-transparent hover:border-border transition-all cursor-pointer">
                      <span className="text-xs font-bold">Ingeniería de Sistemas</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-transparent hover:border-border transition-all cursor-pointer">
                      <span className="text-xs font-bold">Ingeniería Civil</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
