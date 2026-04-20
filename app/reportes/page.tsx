
'use client';

import React from 'react';
import { DashboardLayout } from "@/components/dashboard-layout";
import { AttendanceChart } from "@/components/dashboards/attendance-chart";
import { RequestDistributionChart } from "@/components/dashboards/request-distribution-chart";
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
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function ReportesPage() {
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleAction = (name: string) => {
    setLoading(name);
    setTimeout(() => {
      setLoading(null);
      alert(`Reporte generado: ${name}`);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">Reportes y Métricas</h1>
            <p className="text-muted-foreground text-sm font-medium">Análisis detallado de solicitudes, asistencias y rendimiento académico.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 px-4 font-bold text-xs border-2 hover:bg-muted/50 transition-all"
              onClick={() => handleAction('Filtrar Periodo')}
              disabled={!!loading}
            >
              {loading === 'Filtrar Periodo' ? <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> : <Filter className="mr-2 h-3.5 w-3.5" />}
              Filtrar Periodo
            </Button>
            <Button 
              className="h-10 px-6 font-bold text-xs shadow-lg shadow-primary/20"
              onClick={() => handleAction('Descargar PDF')}
              disabled={!!loading}
            >
              {loading === 'Descargar PDF' ? <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> : <Download className="mr-2 h-3.5 w-3.5" />}
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
              <CardTitle>Distribución de Solicitudes</CardTitle>
              <CardDescription>Trámites académicos procesados por tipo.</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <RequestDistributionChart />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Tendencia de Asistencia</CardTitle>
              <CardDescription>Evolución del cumplimiento académico en las últimas semanas.</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <AttendanceChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
