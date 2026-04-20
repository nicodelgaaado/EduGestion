'use client';

import { DashboardLayout } from "@/components/dashboard-layout";
import { useRole } from "@/components/role-provider";
import { StudentDashboard } from "@/components/dashboards/student-dashboard";
import { TeacherDashboard } from "@/components/dashboards/teacher-dashboard";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";

export default function Home() {
  const { role } = useRole();

  const renderDashboard = () => {
    switch (role) {
      case 'Estudiante':
        return <StudentDashboard />;
      case 'Docente':
        return <TeacherDashboard />;
      case 'Coordinación':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}
