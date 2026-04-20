
import { AcademicRequest, AttendanceRecord, Justification, User, Subject } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Juan Pérez',
    email: 'juan.perez@universidad.edu',
    role: 'Estudiante',
    career: 'Ingeniería de Sistemas',
    semester: 5,
    idNumber: '2021-0001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan'
  },
  {
    id: 'u2',
    name: 'Dra. María García',
    email: 'm.garcia@universidad.edu',
    role: 'Docente',
    idNumber: 'D-0452',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
  },
  {
    id: 'u3',
    name: 'Ing. Carlos Mendoza',
    email: 'c.mendoza@universidad.edu',
    role: 'Coordinación',
    idNumber: 'C-0112',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
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
    studentName: 'Juan Pérez',
    type: 'Justificación de inasistencia',
    subject: 'Arquitectura de Software',
    teacherName: 'Dra. María García',
    date: '2026-04-15',
    priority: 'Media',
    status: 'Pendiente',
    reason: 'Cita médica urgente',
    description: 'Adjunto constancia de la cita médica realizada el día 15 de abril.',
    comments: [],
    history: [
      { id: 'h1', status: 'Pendiente', date: '2026-04-15', updatedBy: 'Juan Pérez', comment: 'Solicitud creada' }
    ]
  },
  {
    id: 'REQ-002',
    studentId: 'u1',
    studentName: 'Juan Pérez',
    type: 'Revisión de calificación',
    subject: 'Bases de Datos II',
    teacherName: 'Dra. María García',
    date: '2026-04-10',
    priority: 'Baja',
    status: 'Aprobada',
    reason: 'Error en la suma del examen parcial',
    description: 'En el punto 3 obtuve 1.5 pero se sumó como 0.5.',
    comments: [
      { id: 'c1', userId: 'u2', userName: 'Dra. María García', userRole: 'Docente', content: 'Revisado y corregido.', date: '2026-04-12' }
    ],
    history: [
      { id: 'h1', status: 'Pendiente', date: '2026-04-10', updatedBy: 'Juan Pérez' },
      { id: 'h2', status: 'En revisión', date: '2026-04-11', updatedBy: 'Dra. María García' },
      { id: 'h3', status: 'Aprobada', date: '2026-04-12', updatedBy: 'Dra. María García', comment: 'Calificación actualizada en el sistema.' }
    ]
  },
  {
    id: 'REQ-003',
    studentId: 'u5',
    studentName: 'Ana Martínez',
    type: 'Prórroga de entrega',
    subject: 'Arquitectura de Software',
    teacherName: 'Dra. María García',
    date: '2026-04-18',
    priority: 'Alta',
    status: 'Requiere información',
    reason: 'Falla técnica en equipo personal',
    description: 'Mi laptop sufrió un daño crítico y estoy esperando reparación.',
    comments: [
      { id: 'c2', userId: 'u2', userName: 'Dra. María García', userRole: 'Docente', content: 'Por favor adjunta el reporte técnico del servicio.', date: '2026-04-19' }
    ],
    history: [
      { id: 'h1', status: 'Pendiente', date: '2026-04-18', updatedBy: 'Ana Martínez' },
      { id: 'h2', status: 'Requiere información', date: '2026-04-19', updatedBy: 'Dra. María García' }
    ]
  }
];

export const mockAttendance: AttendanceRecord[] = [
  { id: 'a1', subjectId: 's1', studentId: 'u1', studentName: 'Juan Pérez', date: '2026-04-13', status: 'Presente' },
  { id: 'a2', subjectId: 's1', studentId: 'u1', studentName: 'Juan Pérez', date: '2026-04-06', status: 'Ausente' },
  { id: 'a3', subjectId: 's1', studentId: 'u1', studentName: 'Juan Pérez', date: '2026-03-30', status: 'Tarde' },
  { id: 'a4', subjectId: 's1', studentId: 'u5', studentName: 'Ana Martínez', date: '2026-04-13', status: 'Presente' },
  { id: 'a5', subjectId: 's1', studentId: 'u5', studentName: 'Ana Martínez', date: '2026-04-06', status: 'Presente' },
];

export const mockJustifications: Justification[] = [
  {
    id: 'j1',
    studentId: 'u1',
    studentName: 'Juan Pérez',
    attendanceId: 'a2',
    date: '2026-04-07',
    reason: 'Cita médica odontológica',
    status: 'Aprobada',
    reviewedBy: 'Dra. María García'
  }
];
