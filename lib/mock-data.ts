import { AcademicRequest, AttendanceRecord, Justification, User, Subject } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Estudiante Demo',
    email: 'estudiante@universidad.edu',
    role: 'Estudiante',
    career: 'Ingeniería de Sistemas',
    semester: 5,
    idNumber: '2021-0001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Estudiante'
  },
  {
    id: 'u2',
    name: 'Docente Demo',
    email: 'docente@universidad.edu',
    role: 'Docente',
    idNumber: 'D-0452',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Docente'
  },
  {
    id: 'u3',
    name: 'Administrador Demo',
    email: 'admin@universidad.edu',
    role: 'Coordinación',
    idNumber: 'C-0112',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  }
];

export const mockSubjects: Subject[] = [
  { id: 's1', name: 'Arquitectura de Software', code: 'IS-401', teacherId: 'u2', schedule: 'Lunes 8:00 - 10:00', group: 'A' },
  { id: 's2', name: 'Bases de Datos II', code: 'IS-305', teacherId: 'u2', schedule: 'Miércoles 10:00 - 12:00', group: 'B' },
  { id: 's3', name: 'Ingeniería de Requisitos', code: 'IS-302', teacherId: 'u4', schedule: 'Viernes 14:00 - 16:00', group: 'A' },
];

export const mockRequests: AcademicRequest[] = [
  {
    id: 'REQ-001',
    studentId: 'u1',
    studentName: 'Estudiante Demo',
    type: 'Justificación de inasistencia',
    subject: 'Arquitectura de Software',
    teacherName: 'Docente Demo',
    date: '2026-04-15',
    priority: 'Media',
    status: 'Pendiente',
    reason: 'Cita médica urgente',
    description: 'Adjunto constancia de la cita médica realizada el día 15 de abril.',
    comments: [],
    history: [
      { id: 'h1', status: 'Pendiente', date: '2026-04-15', updatedBy: 'Estudiante Demo', comment: 'Solicitud creada' }
    ]
  },
  {
    id: 'REQ-002',
    studentId: 'u1',
    studentName: 'Estudiante Demo',
    type: 'Revisión de calificación',
    subject: 'Bases de Datos II',
    teacherName: 'Docente Demo',
    date: '2026-04-10',
    priority: 'Baja',
    status: 'Aprobada',
    reason: 'Error en la suma del examen parcial',
    description: 'En el punto 3 obtuve 1.5 pero se sumó como 0.5.',
    comments: [
      { id: 'c1', userId: 'u2', userName: 'Docente Demo', userRole: 'Docente', content: 'Revisado y corregido.', date: '2026-04-12' }
    ],
    history: [
      { id: 'h1', status: 'Pendiente', date: '2026-04-10', updatedBy: 'Estudiante Demo' },
      { id: 'h2', status: 'En revisión', date: '2026-04-11', updatedBy: 'Docente Demo' },
      { id: 'h3', status: 'Aprobada', date: '2026-04-12', updatedBy: 'Docente Demo', comment: 'Calificación actualizada en el sistema.' }
    ]
  },
  {
    id: 'REQ-003',
    studentId: 'u5',
    studentName: 'Estudiante Secundario',
    type: 'Prórroga de entrega',
    subject: 'Arquitectura de Software',
    teacherName: 'Docente Demo',
    date: '2026-04-18',
    priority: 'Alta',
    status: 'Requiere información',
    reason: 'Falla técnica en equipo personal',
    description: 'Mi laptop sufrió un daño crítico y estoy esperando reparación.',
    comments: [
      { id: 'c2', userId: 'u2', userName: 'Docente Demo', userRole: 'Docente', content: 'Por favor adjunta el reporte técnico del servicio.', date: '2026-04-19' }
    ],
    history: [
      { id: 'h1', status: 'Pendiente', date: '2026-04-18', updatedBy: 'Estudiante Secundario' },
      { id: 'h2', status: 'Requiere información', date: '2026-04-19', updatedBy: 'Docente Demo' }
    ]
  }
];

export const mockAttendance: AttendanceRecord[] = [
  { id: 'a1', subjectId: 's1', studentId: 'u1', studentName: 'Estudiante Demo', date: '2026-04-13', status: 'Presente' },
  { id: 'a2', subjectId: 's1', studentId: 'u1', studentName: 'Estudiante Demo', date: '2026-04-06', status: 'Ausente' },
  { id: 'a3', subjectId: 's1', studentId: 'u1', studentName: 'Estudiante Demo', date: '2026-03-30', status: 'Tarde' },
  { id: 'a4', subjectId: 's1', studentId: 'u5', studentName: 'Estudiante Secundario', date: '2026-04-13', status: 'Presente' },
  { id: 'a5', subjectId: 's1', studentId: 'u5', studentName: 'Estudiante Secundario', date: '2026-04-06', status: 'Presente' },
  { id: 'a6', subjectId: 's1', studentId: 'u1', studentName: 'Estudiante Demo', date: '2026-03-23', status: 'Presente' },
  { id: 'a7', subjectId: 's1', studentId: 'u1', studentName: 'Estudiante Demo', date: '2026-03-16', status: 'Presente' },
  { id: 'a8', subjectId: 's1', studentId: 'u1', studentName: 'Estudiante Demo', date: '2026-03-09', status: 'Presente' },
  { id: 'a9', subjectId: 's2', studentId: 'u1', studentName: 'Estudiante Demo', date: '2026-04-15', status: 'Presente' },
  { id: 'a10', subjectId: 's2', studentId: 'u1', studentName: 'Estudiante Demo', date: '2026-04-08', status: 'Tarde' },
  { id: 'a11', subjectId: 's2', studentId: 'u1', studentName: 'Estudiante Demo', date: '2026-04-01', status: 'Presente' },
];

export const mockAttendanceTrends = [
  { date: '2026-03-01', presente: 85, ausente: 10, tarde: 5 },
  { date: '2026-03-08', presente: 88, ausente: 8, tarde: 4 },
  { date: '2026-03-15', presente: 92, ausente: 5, tarde: 3 },
  { date: '2026-03-22', presente: 80, ausente: 15, tarde: 5 },
  { date: '2026-03-29', presente: 84, ausente: 10, tarde: 6 },
  { date: '2026-04-05', presente: 90, ausente: 7, tarde: 3 },
  { date: '2026-04-12', presente: 95, ausente: 3, tarde: 2 },
  { date: '2026-04-19', presente: 87, ausente: 8, tarde: 5 },
];

export const mockRequestDistribution = [
  { type: 'Justificación', count: 420, fill: "var(--color-justificacion)" },
  { type: 'Calificación', count: 310, fill: "var(--color-calificacion)" },
  { type: 'Constancia', count: 280, fill: "var(--color-constancia)" },
  { type: 'Cambio Grupo', count: 150, fill: "var(--color-cambio)" },
  { type: 'Prórroga', count: 90, fill: "var(--color-prorroga)" },
];

export const mockJustifications: Justification[] = [
  {
    id: 'j1',
    studentId: 'u1',
    studentName: 'Estudiante Demo',
    attendanceId: 'a2',
    date: '2026-04-07',
    reason: 'Cita médica odontológica',
    status: 'Aprobada',
    reviewedBy: 'Docente Demo'
  }
];
