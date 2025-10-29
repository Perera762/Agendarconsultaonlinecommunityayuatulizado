import { useState, useEffect } from 'react';
import { Calendar, Clock, Stethoscope, LogOut, User, Plus } from 'lucide-react';
import logoImage from 'figma:asset/57deffdb02e805463990fbf1ee80a9891070f68a.png';

interface PatientDashboardProps {
  patientId: string;
  onLogout: () => void;
  onNavigateToBooking: () => void;
}

interface Appointment {
  id: string;
  patientId: string;
  dentistName: string;
  procedureName: string;
  date: string;
  time: string;
  createdAt: string;
}

export function PatientDashboard({ patientId, onLogout, onNavigateToBooking }: PatientDashboardProps) {
  const [patient, setPatient] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Carregar dados do paciente
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const currentPatient = patients.find((p: any) => p.id === patientId);
    setPatient(currentPatient);

    // Carregar consultas do paciente
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const patientAppointments = allAppointments.filter((apt: Appointment) => apt.patientId === patientId);
    setAppointments(patientAppointments);
  }, [patientId]);

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const isUpcoming = (dateStr: string, timeStr: string) => {
    const appointmentDate = new Date(`${dateStr}T${timeStr}`);
    return appointmentDate > new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Logo COB" className="w-10 h-10 object-contain" />
              <span className="text-blue-600">Clínica Odontológica do Brás</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-slate-600">Olá, {patient?.fullName}</span>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-slate-900 mb-2">Portal do Paciente</h1>
            <p className="text-slate-600">Gerencie suas consultas e informações</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Total de Consultas</p>
                  <p className="text-slate-900">{appointments.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Consultas Futuras</p>
                  <p className="text-slate-900">
                    {appointments.filter(apt => isUpcoming(apt.date, apt.time)).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm">ID do Paciente</p>
                  <p className="text-slate-900 text-sm">{patient?.username}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-slate-900">Minhas Consultas</h2>
              <button
                onClick={onNavigateToBooking}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nova Consulta
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">Você ainda não tem consultas agendadas</p>
                <button
                  onClick={onNavigateToBooking}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Agendar Primeira Consulta
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => {
                  const upcoming = isUpcoming(appointment.date, appointment.time);
                  return (
                    <div
                      key={appointment.id}
                      className={`border rounded-lg p-4 transition-all ${
                        upcoming
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Stethoscope className={`w-5 h-5 ${upcoming ? 'text-blue-600' : 'text-slate-600'}`} />
                            <h3 className="text-slate-900">{appointment.procedureName}</h3>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-slate-500 mb-1">Dentista</p>
                              <p className="text-slate-900">{appointment.dentistName}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 mb-1">Data</p>
                              <p className="text-slate-900 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(appointment.date)}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-500 mb-1">Horário</p>
                              <p className="text-slate-900 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {appointment.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {upcoming && (
                          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                            Próxima
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
