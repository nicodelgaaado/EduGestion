
'use client';

import React from 'react';
import { DashboardLayout } from "@/components/dashboard-layout";
import { RequestTable } from "@/components/requests/request-table";
import { Button } from "@/components/ui/button";
import { Plus, Download, FileSpreadsheet } from "lucide-react";
import { useRole } from "@/components/role-provider";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { RequestForm } from "@/components/requests/request-form";

export default function SolicitudesPage() {
  const { role } = useRole();

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight text-foreground/90">
              Bandeja de Solicitudes
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Gestiona trámites académicos, justificaciones y revisiones.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-10 px-4 font-semibold text-xs border-2 hover:bg-muted/50 transition-all">
              <Download className="mr-2 h-3.5 w-3.5" />
              Exportar PDF
            </Button>
            <Button variant="outline" size="sm" className="h-10 px-4 font-semibold text-xs border-2 hover:bg-muted/50 transition-all">
              <FileSpreadsheet className="mr-2 h-3.5 w-3.5" />
              Excel
            </Button>
            {role === 'Estudiante' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-10 px-6 font-bold text-xs shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Solicitud
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-150 p-0 overflow-hidden border-none shadow-2xl">
                  <RequestForm />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="bg-background/40 backdrop-blur-sm rounded-2xl p-1 border shadow-sm">
          <RequestTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
