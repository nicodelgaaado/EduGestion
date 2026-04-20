
export type Role = 'Estudiante' | 'Docente' | 'Coordinación';

export type RequestStatus = 
  | 'Pendiente' 
  | 'En revisión' 
  | 'Aprobada' 
  | 'Rechazada' 
  | 'Requiere información' 
  | 'Cerrada';

export type RequestType = 
  | 'Justificación de inasistencia' 
  | 'Revisión de calificación' 
  | 'Solicitud de constancia académica' 
  | 'Cambio de grupo' 
  | 'Prórroga de entrega' 
  | 'Tutoría o asesoría académica';

export type Priority = 'Baja' | 'Media' | 'Alta' | 'Urgente';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  career?: string;
  semester?: number;
  idNumber: string;
}

export interface AcademicRequest {
  id: string;
  studentId: string;
  studentName: string;
  type: RequestType;
  subject: string;
  teacherName: string;
  date: string;
  priority: Priority;
  status: RequestStatus;
  description: string;
  reason: string;
  reviewerId?: string;
  reviewerName?: string;
  comments: Comment[];
  history: HistoryEntry[];
  attachments?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole: Role;
  content: string;
  date: string;
}

export interface HistoryEntry {
  id: string;
  status: RequestStatus;
  date: string;
  updatedBy: string;
  comment?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  schedule: string;
  group: string;
}

export interface AttendanceRecord {
  id: string;
  subjectId: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'Presente' | 'Ausente' | 'Tarde' | 'Justificada';
  sessionTopic?: string;
}

export interface Justification {
  id: string;
  studentId: string;
  studentName: string;
  attendanceId: string;
  date: string;
  reason: string;
  evidenceUrl?: string;
  status: 'Pendiente' | 'Aprobada' | 'Rechazada';
  reviewedBy?: string;
}

export interface DashboardStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  averageAttendance: number;
  alerts: number;
}
