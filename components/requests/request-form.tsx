
'use client';

import React from 'react';
import { 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CalendarIcon, 
  Paperclip, 
  Send, 
  X,
  GraduationCap,
  BookOpen,
  UserCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { RequestType } from '@/types';
import { mockSubjects } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function RequestForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const form = useForm({
    defaultValues: {
      type: '',
      subject: '',
      teacher: '',
      date: new Date(),
      reason: '',
      description: '',
      terms: false,
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-100 text-green-600 p-4 rounded-full shadow-lg shadow-green-100/50">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight">¡Solicitud Enviada!</h2>
          <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">
            Tu trámite ha sido registrado con éxito. Podrás consultar el estado en tu bandeja de solicitudes.
          </p>
        </div>
        <div className="bg-muted/30 p-4 rounded-2xl border border-border/50 w-full max-w-xs space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span>Radicado</span>
            <span className="text-foreground">REQ-9382</span>
          </div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span>Fecha</span>
            <span className="text-foreground">{format(new Date(), "dd/MM/yyyy")}</span>
          </div>
        </div>
        <Button onClick={() => window.location.reload()} className="h-11 px-8 rounded-full font-bold text-xs shadow-lg shadow-primary/20 transition-all active:scale-95">
          Entendido
        </Button>
      </div>
    );
  }

  const requestTypes: RequestType[] = [
    'Justificación de inasistencia',
    'Revisión de calificación',
    'Solicitud de constancia académica',
    'Cambio de grupo',
    'Prórroga de entrega',
    'Tutoría o asesoría académica'
  ];

  return (
    <div className="flex flex-col h-full max-h-[90vh]">
      <DialogHeader className="p-8 pb-4 bg-muted/30 border-b">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-primary border-primary">Nueva Solicitud</Badge>
        </div>
        <DialogTitle className="text-2xl font-bold">Trámite Académico</DialogTitle>
        <DialogDescription className="text-sm font-medium">
          Completa el formulario para iniciar tu solicitud institucional.
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }: { field: any }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="h-3.5 w-3.5" /> Tipo de Solicitud
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 bg-muted/20 border-transparent hover:bg-muted/40 transition-all focus:ring-primary focus:bg-background">
                          <SelectValue placeholder="Selecciona el trámite" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {requestTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-xs font-medium py-2">{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }: { field: any }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5" /> Materia Relacionada
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 bg-muted/20 border-transparent hover:bg-muted/40 transition-all focus:ring-primary focus:bg-background">
                          <SelectValue placeholder="Selecciona la materia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockSubjects.map((sub) => (
                          <SelectItem key={sub.id} value={sub.name} className="text-xs font-medium py-2">{sub.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }: { field: any }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="h-3.5 w-3.5" /> Fecha del Incidente
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-11 pl-3 text-left font-normal bg-muted/20 border-transparent hover:bg-muted/40 transition-all",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-xs">Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="rounded-xl border-none shadow-xl"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teacher"
                render={({ field }: { field: any }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <UserCheck className="h-3.5 w-3.5" /> Docente a cargo
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del docente" className="h-11 bg-muted/20 border-transparent hover:bg-muted/40 transition-all focus:ring-primary focus:bg-background" {...field} />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="opacity-50" />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Motivo Breve</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Cita médica, Problema técnico, etc." className="h-11 bg-muted/20 border-transparent hover:bg-muted/40 transition-all focus:ring-primary focus:bg-background" {...field} />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Descripción Detallada</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explica detalladamente tu solicitud..." 
                      className="min-h-25 bg-muted/20 border-transparent hover:bg-muted/40 transition-all focus:ring-primary focus:bg-background resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-[10px] italic">Incluye todos los detalles relevantes para agilizar la revisión.</FormDescription>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Paperclip className="h-3.5 w-3.5" /> Adjuntar Evidencia (Simulado)
              </FormLabel>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer bg-muted/10 hover:bg-muted/20 border-muted-foreground/20 hover:border-primary/50 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Paperclip className="w-8 h-8 mb-3 text-muted-foreground/50" />
                    <p className="mb-1 text-xs font-bold text-muted-foreground">Haz clic para subir archivos</p>
                    <p className="text-[10px] text-muted-foreground">PDF, PNG, JPG (Máx. 5MB)</p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <FormField
              control={form.control}
              name="terms"
              render={({ field }: { field: any }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-primary"
                    />
                  </FormControl>
                  <div className="space-y-1.5 leading-none">
                    <FormLabel className="text-xs font-bold leading-tight">
                      Declaración de veracidad
                    </FormLabel>
                    <FormDescription className="text-[10px] leading-relaxed">
                      Certifico que la información y evidencias proporcionadas son verídicas y corresponden a la realidad. Entiendo que el suministro de información falsa puede acarrear sanciones académicas.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4 border-t gap-3 sm:gap-0">
              <Button type="button" variant="ghost" className="h-12 px-6 text-xs font-bold hover:bg-muted/50">
                Cancelar
              </Button>
              <Button type="submit" className="h-12 px-8 text-xs font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
                <Send className="h-3.5 w-3.5 mr-2" />
                Enviar Solicitud
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </div>
  );
}
