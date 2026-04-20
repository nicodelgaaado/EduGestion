
'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock
} from 'lucide-react';
import { AcademicRequest } from '@/types';
import { mockRequests } from '@/lib/mock-data';
import { 
  Sheet, 
  SheetContent 
} from '@/components/ui/sheet';
import { RequestDetail } from './request-detail';

export function RequestTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<AcademicRequest | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredRequests = mockRequests.filter(req => 
    req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprobada': return <Badge variant="success" className="rounded-full">{status}</Badge>;
      case 'Pendiente': return <Badge variant="warning" className="rounded-full">{status}</Badge>;
      case 'Rechazada': return <Badge variant="destructive" className="rounded-full">{status}</Badge>;
      case 'Requiere información': return <Badge variant="outline" className="rounded-full border-amber-500 text-amber-600">{status}</Badge>;
      default: return <Badge variant="secondary" className="rounded-full">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Alta': case 'Urgente': return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-none px-2 text-[10px] font-bold">{priority}</Badge>;
      case 'Media': return <Badge variant="warning" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-2 text-[10px] font-bold">{priority}</Badge>;
      default: return <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none px-2 text-[10px] font-bold">{priority}</Badge>;
    }
  };

  const handleViewDetails = (request: AcademicRequest) => {
    setSelectedRequest(request);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por ID, estudiante o tipo..." 
            className="pl-10 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-10 px-3 flex-1 sm:flex-none">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" size="sm" className="h-10 px-3 flex-1 sm:flex-none">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Ordenar
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Estudiante</TableHead>
              <TableHead>Tipo de Solicitud</TableHead>
              <TableHead>Materia</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((req) => (
              <TableRow key={req.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => handleViewDetails(req)}>
                <TableCell className="font-mono text-xs font-bold text-primary">{req.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{req.studentName}</div>
                  <div className="text-[10px] text-muted-foreground">ID: {req.studentId}</div>
                </TableCell>
                <TableCell className="text-sm">{req.type}</TableCell>
                <TableCell className="text-sm">{req.subject}</TableCell>
                <TableCell>{getPriorityBadge(req.priority)}</TableCell>
                <TableCell>{getStatusBadge(req.status)}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewDetails(req)}>
                        <Eye className="mr-2 h-4 w-4" /> Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-green-600">
                        <CheckCircle className="mr-2 h-4 w-4" /> Aprobar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <XCircle className="mr-2 h-4 w-4" /> Rechazar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" /> Pedir información
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          {selectedRequest && <RequestDetail request={selectedRequest} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
