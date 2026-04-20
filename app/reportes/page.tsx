
'use client';

import React from 'react';
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Calendar,
  Download,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function ReportesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">Reportes y Métricas</h1>
            <p className="text-muted-foreground text-sm font-medium">Análisis detallado de solicitudes, asistencias y rendimiento académico.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-10 px-4 font-bold text-xs border-2 hover:bg-muted/50 transition-all">
              <Filter className="mr-2 h-3.5 w-3.5" />
              Filtrar Periodo
            </Button>
            <Button className="h-10 px-6 font-bold text-xs shadow-lg shadow-primary/20">
              <Download className="mr-2 h-3.5 w-3.5" />
              Descargar PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Solicitudes Atendidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">942</div>
              <p className="text-[10px] font-bold text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +12% vs mes anterior
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tiempo de Respuesta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">1.4 <span className="text-sm font-medium text-muted-foreground">días</span></div>
              <p className="text-[10px] font-bold text-green-600 mt-2 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" /> -0.2 días de mejora
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Asistencia Global</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">86%</div>
              <p className="text-[10px] font-bold text-rose-600 mt-2 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" /> -3% vs mes anterior
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Satisfacción Estudiantil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">4.8 <span className="text-sm font-medium text-muted-foreground">/ 5</span></div>
              <p className="text-[10px] font-bold text-blue-600 mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +0.2 vs mes anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Tipos de Solicitudes más frecuentes</CardTitle>
              <CardDescription>Distribución porcentual de trámites académicos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Justificación de inasistencia</span>
                  <span className="text-primary">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Revisión de calificación</span>
                  <span className="text-primary">28%</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Cambio de grupo</span>
                  <span className="text-primary">15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Otros</span>
                  <span className="text-primary">15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Solicitudes por Facultad</CardTitle>
              <CardDescription>Resumen de actividad académica institucional.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/10">
                <div>
                  <p className="text-sm font-bold">Ingeniería de Sistemas</p>
                  <p className="text-[10px] text-muted-foreground font-medium">342 solicitudes atendidas</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/5 hover:text-primary transition-all">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/10">
                <div>
                  <p className="text-sm font-bold">Arquitectura y Diseño</p>
                  <p className="text-[10px] text-muted-foreground font-medium">128 solicitudes atendidas</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/5 hover:text-primary transition-all">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/10">
                <div>
                  <p className="text-sm font-bold">Administración de Empresas</p>
                  <p className="text-[10px] text-muted-foreground font-medium">215 solicitudes atendidas</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/5 hover:text-primary transition-all">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
