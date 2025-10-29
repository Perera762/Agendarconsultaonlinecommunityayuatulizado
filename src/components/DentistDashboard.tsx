import { useState, useEffect } from 'react';
import { Calendar, Clock, User, LogOut, Wrench, FileText, Save } from 'lucide-react';
import logoImage from 'figma:asset/57deffdb02e805463990fbf1ee80a9891070f68a.png';

interface DentistDashboardProps {
  onLogout: () => void;
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

interface PatientNote {
  appointmentId: string;
  note: string;
}

interface Equipment {
  id: string;
  name: string;
  status: 'available' | 'in-use' | 'maintenance';
}

export function DentistDashboard({ onLogout }: DentistDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [notes, setNotes] = useState<PatientNote[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  
  const [equipment] = useState<Equipment[]>([
    { id: '1', name: 'Cadeira Odontológica 1', status: 'available' },
    { id: '2', name: 'Cadeira Odontológica 2', status: 'in-use' },
    { id: '3', name: 'Cadeira Odontológica 3', status: 'available' },
    { id: '4', name: 'Raio-X Digital', status: 'available' },
    { id: '5', name: 'Autoclave', status: 'maintenance' },
    { id: '6', name: 'Ultrassom Odontológico', status: 'available' },
  ]);

  useEffect(() => {
    // Carregar consultas
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(allAppointments);

    // Carregar pacientes
    const allPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    setPatients(allPatients);

    // Carregar anotações
    const savedNotes = JSON.parse(localStorage.getItem('dentist-notes') || '[]');
    setNotes(savedNotes);
  }, []);

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.fullName || 'Paciente não encontrado';
  };

  const getPatientUsername = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.username || 'N/A';
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const isUpcoming = (dateStr: string, timeStr: string) => {
    const appointmentDate = new Date(`${dateStr}T${timeStr}`);
    return appointmentDate > new Date();
  };

  const handleSaveNote = (appointmentId: string) => {
    const updatedNotes = notes.filter(n => n.appointmentId !== appointmentId);
    updatedNotes.push({ appointmentId, note: currentNote });
    setNotes(updatedNotes);
    localStorage.setItem('dentist-notes', JSON.stringify(updatedNotes));
    setCurrentNote('');
    setSelectedAppointment(null);
  };

  const getNoteForAppointment = (appointmentId: string) => {
    const note = notes.find(n => n.appointmentId === appointmentId);
    return note?.note || '';
  };

  const getEquipmentStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'in-use':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'maintenance':
        return 'bg-amber-100 text-amber-700 border-amber-300';
    }
  };

  const getEquipmentStatusText = (status: Equipment['status']) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'in-use':
        return 'Em Uso';
      case 'maintenance':
        return 'Manutenção';
    }
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
              <span className="text-slate-600">Portal do Dentista</span>
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
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-slate-900 mb-2">Painel do Dentista</h1>
            <p className="text-slate-600">Gerencie consultas, pacientes e equipamentos</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Total Consultas</p>
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
                  <p className="text-slate-600 text-sm">Próximas</p>
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
                  <p className="text-slate-600 text-sm">Pacientes</p>
                  <p className="text-slate-900">{patients.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Equipamentos</p>
                  <p className="text-slate-900">{equipment.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Appointments List */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-slate-900 mb-6">Consultas Agendadas</h2>

              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Nenhuma consulta agendada no momento</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {appointments.map((appointment) => {
                    const upcoming = isUpcoming(appointment.date, appointment.time);
                    const existingNote = getNoteForAppointment(appointment.id);
                    const isEditing = selectedAppointment === appointment.id;

                    return (
                      <div
                        key={appointment.id}
                        className={`border rounded-lg p-4 transition-all ${
                          upcoming
                            ? 'border-blue-300 bg-blue-50'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-slate-900">{appointment.procedureName}</h3>
                              {upcoming && (
                                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                  Próxima
                                </span>
                              )}
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                              <div>
                                <p className="text-slate-500">Paciente</p>
                                <p className="text-slate-900">{getPatientName(appointment.patientId)}</p>
                                <p className="text-slate-500 text-xs">ID: {getPatientUsername(appointment.patientId)}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Dentista</p>
                                <p className="text-slate-900">{appointment.dentistName}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Data</p>
                                <p className="text-slate-900 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(appointment.date)}
                                </p>
                              </div>
                              <div>
                                <p className="text-slate-500">Horário</p>
                                <p className="text-slate-900 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {appointment.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Notes Section */}
                        <div className="border-t border-slate-200 pt-3 mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center gap-2 text-slate-700 text-sm">
                              <FileText className="w-4 h-4 text-blue-600" />
                              Anotações
                            </label>
                            {!isEditing && existingNote && (
                              <button
                                onClick={() => {
                                  setSelectedAppointment(appointment.id);
                                  setCurrentNote(existingNote);
                                }}
                                className="text-blue-600 hover:text-blue-700 text-sm"
                              >
                                Editar
                              </button>
                            )}
                          </div>

                          {isEditing ? (
                            <div className="space-y-2">
                              <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                placeholder="Digite suas anotações sobre esta consulta..."
                                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[80px]"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleSaveNote(appointment.id)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
                                >
                                  <Save className="w-4 h-4" />
                                  Salvar
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedAppointment(null);
                                    setCurrentNote('');
                                  }}
                                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : existingNote ? (
                            <p className="text-slate-700 text-sm bg-white rounded-lg p-3 border border-slate-200">
                              {existingNote}
                            </p>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment.id);
                                setCurrentNote('');
                              }}
                              className="text-blue-600 hover:text-blue-700 text-sm"
                            >
                              + Adicionar anotação
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Equipment Status */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-slate-900 mb-6">Equipamentos Disponíveis</h2>

              <div className="space-y-3">
                {equipment.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-slate-900 text-sm mb-2">{item.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getEquipmentStatusColor(item.status)}`}>
                          {getEquipmentStatusText(item.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
