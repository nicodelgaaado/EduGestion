
'use client';

import React from 'react';
import { 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { 
  History, 
  MessageSquare, 
  Info, 
  Calendar, 
  User, 
  FileText, 
  AlertCircle,
  Paperclip,
  CheckCircle,
  XCircle,
  ExternalLink,
  Clock,
  Loader2
} from 'lucide-react';
import { AcademicRequest } from '@/types';

interface RequestDetailProps {
  request: AcademicRequest;
}

export function RequestDetail({ request }: RequestDetailProps) {
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleAction = (name: string) => {
    setLoading(name);
    setTimeout(() => {
      setLoading(null);
      alert(`Acción procesada: ${name}`);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="pb-6 border-b">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-primary border-primary">
            {request.id}
          </Badge>
          <Badge variant={
            request.status === 'Aprobada' ? 'success' : 
            request.status === 'Pendiente' ? 'warning' : 
            'default'
          } className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            {request.status}
          </Badge>
        </div>
        <SheetTitle className="text-xl font-bold leading-tight">{request.type}</SheetTitle>
        <SheetDescription className="text-sm mt-1">
          Iniciada el {request.date} • {request.subject}
        </SheetDescription>
      </SheetHeader>

      <div className="flex-1 mt-6">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1">
            <TabsTrigger value="info" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">Información</TabsTrigger>
            <TabsTrigger value="comments" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">Comentarios</TabsTrigger>
            <TabsTrigger value="history" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <User className="h-3 w-3" /> Datos del Estudiante
              </h4>
              <div className="flex items-center gap-3 p-4 rounded-xl border bg-muted/20">
                <Avatar className="h-10 w-10 border border-border shadow-sm">
                  <AvatarFallback>{request.studentName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold">{request.studentName}</p>
                  <p className="text-xs text-muted-foreground">ID: {request.studentId} • Ingeniería de Sistemas</p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Info className="h-3 w-3" /> Detalles de la Solicitud
              </h4>
              <div className="grid grid-cols-2 gap-6 p-1">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Prioridad</p>
                  <Badge variant={request.priority === 'Alta' ? 'destructive' : 'secondary'} className="rounded-full px-2 py-0 text-[10px] font-bold">{request.priority}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Docente Revisor</p>
                  <p className="text-xs font-medium">{request.teacherName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Motivo y Descripción</p>
                <div className="bg-muted/30 p-4 rounded-xl text-xs leading-relaxed">
                  <p className="font-bold mb-2">{request.reason}</p>
                  <p className="text-muted-foreground">{request.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Evidencias Adjuntas</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9 px-3 text-xs gap-2 rounded-lg hover:bg-muted/50 border-dashed border-2"
                    onClick={() => handleAction('Descargar Evidencia')}
                    disabled={!!loading}
                  >
                    {loading === 'Descargar Evidencia' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Paperclip className="h-3.5 w-3.5" />}
                    constancia_medica.pdf
                    {!loading && <ExternalLink className="h-3 w-3 ml-1 opacity-50" />}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-4">
              {request.comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-muted/10 rounded-2xl border border-dashed">
                  <MessageSquare className="h-8 w-8 mb-2 opacity-20" />
                  <p className="text-xs font-medium">No hay comentarios aún</p>
                </div>
              ) : (
                request.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-4 rounded-2xl border bg-card/50">
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{comment.userName}</span>
                        <span className="text-[10px] text-muted-foreground">{comment.date}</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] font-bold py-0 h-4 px-1">{comment.userRole}</Badge>
                      <p className="text-xs mt-2 text-foreground/80 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}

              <div className="space-y-3 pt-4 border-t">
                <Textarea 
                  placeholder="Escribe un comentario..." 
                  className="text-xs min-h-25 bg-muted/20 border-transparent focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-background transition-all"
                />
                <Button 
                  className="w-full text-xs font-bold h-10 shadow-sm" 
                  size="sm"
                  onClick={() => handleAction('Añadir comentario')}
                  disabled={!!loading}
                >
                  {loading === 'Añadir comentario' ? <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> : <MessageSquare className="h-3.5 w-3.5 mr-2" />}
                  Añadir comentario
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="animate-in fade-in slide-in-from-bottom-2">
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border/60">
              {request.history.map((entry, index) => (
                <div key={entry.id} className="relative">
                  <div className={`absolute -left-6.5 top-1 h-3 w-3 rounded-full border-2 border-background shadow-sm ${index === 0 ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold">{entry.status}</p>
                      <p className="text-[10px] text-muted-foreground">{entry.date}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Por: {entry.updatedBy}</p>
                    {entry.comment && (
                      <div className="mt-2 p-2 bg-muted/30 rounded-lg border border-border/50">
                        <p className="text-[11px] text-foreground/80 italic">"{entry.comment}"</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Separator className="my-6 opacity-50" />

      <SheetFooter className="gap-2 sm:gap-0 sm:flex-col pb-6">
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button 
            variant="outline" 
            className="text-xs font-bold border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-10"
            onClick={() => handleAction('Rechazar')}
            disabled={!!loading}
          >
            {loading === 'Rechazar' ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> : <XCircle className="h-3.5 w-3.5 mr-2" />}
            Rechazar
          </Button>
          <Button 
            className="text-xs font-bold bg-green-600 hover:bg-green-700 h-10"
            onClick={() => handleAction('Aprobar')}
            disabled={!!loading}
          >
            {loading === 'Aprobar' ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> : <CheckCircle className="h-3.5 w-3.5 mr-2" />}
            Aprobar
          </Button>
        </div>
        <Button 
          variant="secondary" 
          className="w-full mt-3 text-xs font-bold h-10"
          onClick={() => handleAction('Pedir información')}
          disabled={!!loading}
        >
          {loading === 'Pedir información' ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> : <Clock className="h-3.5 w-3.5 mr-2" />}
          Solicitar más información
        </Button>
      </SheetFooter>
    </div>
  );
}
