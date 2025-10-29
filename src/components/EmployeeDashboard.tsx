import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  LogOut, 
  Wrench, 
  FileText, 
  Plus, 
  Users, 
  Stethoscope,
  UserPlus,
  Send,
  Edit,
  CheckCircle,
  XCircle
} from 'lucide-react';
import logoImage from 'figma:asset/57deffdb02e805463990fbf1ee80a9891070f68a.png';

interface EmployeeDashboardProps {
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

interface Equipment {
  id: string;
  name: string;
  status: 'available' | 'in-use' | 'maintenance';
}

interface Dentist {
  id: string;
  name: string;
  specialty: string;
  crm: string;
}

interface NoteForDentist {
  id: string;
  appointmentId: string;
  note: string;
  createdAt: string;
  sentBy: string;
}

export function EmployeeDashboard({ onLogout }: EmployeeDashboardProps) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'equipment' | 'notes' | 'register'>('schedule');
  
  // Data states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [notes, setNotes] = useState<NoteForDentist[]>([]);

  // Form states for registration
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientUsername, setNewPatientUsername] = useState('');
  const [newPatientPassword, setNewPatientPassword] = useState('');
  
  const [newDentistName, setNewDentistName] = useState('');
  const [newDentistSpecialty, setNewDentistSpecialty] = useState('');
  const [newDentistCRM, setNewDentistCRM] = useState('');

  // Note form state
  const [selectedAppointmentForNote, setSelectedAppointmentForNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Carregar consultas
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(allAppointments);

    // Carregar pacientes
    const allPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    setPatients(allPatients);

    // Carregar equipamentos
    const savedEquipment = JSON.parse(localStorage.getItem('equipment') || JSON.stringify([
      { id: '1', name: 'Cadeira Odontológica 1', status: 'available' },
      { id: '2', name: 'Cadeira Odontológica 2', status: 'in-use' },
      { id: '3', name: 'Cadeira Odontológica 3', status: 'available' },
      { id: '4', name: 'Raio-X Digital', status: 'available' },
      { id: '5', name: 'Autoclave', status: 'maintenance' },
      { id: '6', name: 'Ultrassom Odontológico', status: 'available' },
    ]));
    setEquipment(savedEquipment);

    // Carregar dentistas
    const savedDentists = JSON.parse(localStorage.getItem('dentists') || JSON.stringify([
      { id: '1', name: 'Dr. Carlos Silva', specialty: 'Clínico Geral', crm: 'CRO-SP 12345' },
      { id: '2', name: 'Dra. Ana Santos', specialty: 'Ortodontia', crm: 'CRO-SP 23456' },
      { id: '3', name: 'Dr. Paulo Mendes', specialty: 'Implantodontia', crm: 'CRO-SP 34567' },
    ]));
    setDentists(savedDentists);

    // Carregar anotações para dentistas
    const savedNotes = JSON.parse(localStorage.getItem('employee-notes') || '[]');
    setNotes(savedNotes);
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.fullName || 'Paciente não encontrado';
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const isUpcoming = (dateStr: string, timeStr: string) => {
    const appointmentDate = new Date(`${dateStr}T${timeStr}`);
    return appointmentDate > new Date();
  };

  const handleUpdateEquipmentStatus = (equipmentId: string, newStatus: Equipment['status']) => {
    const updatedEquipment = equipment.map(eq => 
      eq.id === equipmentId ? { ...eq, status: newStatus } : eq
    );
    setEquipment(updatedEquipment);
    localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
    showMessage('success', 'Status do equipamento atualizado!');
  };

  const handleRegisterPatient = () => {
    if (!newPatientName.trim() || newPatientUsername.length !== 2 || newPatientPassword.length !== 2) {
      showMessage('error', 'Preencha todos os campos corretamente. Login e senha devem ter 2 caracteres.');
      return;
    }

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const existingPatient = patients.find((p: any) => p.username === newPatientUsername);

    if (existingPatient) {
      showMessage('error', 'Este login já está em uso.');
      return;
    }

    const newPatient = {
      id: `patient-${Date.now()}`,
      fullName: newPatientName.trim(),
      username: newPatientUsername,
      password: newPatientPassword,
      createdAt: new Date().toISOString(),
    };

    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));
    
    setNewPatientName('');
    setNewPatientUsername('');
    setNewPatientPassword('');
    loadData();
    showMessage('success', 'Paciente cadastrado com sucesso!');
  };

  const handleRegisterDentist = () => {
    if (!newDentistName.trim() || !newDentistSpecialty.trim() || !newDentistCRM.trim()) {
      showMessage('error', 'Preencha todos os campos do dentista.');
      return;
    }

    const newDentist = {
      id: `dentist-${Date.now()}`,
      name: newDentistName.trim(),
      specialty: newDentistSpecialty.trim(),
      crm: newDentistCRM.trim(),
    };

    const updatedDentists = [...dentists, newDentist];
    setDentists(updatedDentists);
    localStorage.setItem('dentists', JSON.stringify(updatedDentists));
    
    setNewDentistName('');
    setNewDentistSpecialty('');
    setNewDentistCRM('');
    showMessage('success', 'Dentista cadastrado com sucesso!');
  };

  const handleSendNoteToDoctor = (appointmentId: string) => {
    if (!noteText.trim()) {
      showMessage('error', 'Digite uma anotação antes de enviar.');
      return;
    }

    const newNote: NoteForDentist = {
      id: `note-${Date.now()}`,
      appointmentId,
      note: noteText.trim(),
      createdAt: new Date().toISOString(),
      sentBy: 'Funcionário',
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('employee-notes', JSON.stringify(updatedNotes));
    
    setNoteText('');
    setSelectedAppointmentForNote(null);
    showMessage('success', 'Anotação enviada para o dentista!');
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
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
              <span className="text-slate-600">Portal do Funcionário</span>
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
            <h1 className="text-slate-900 mb-2">Painel do Funcionário</h1>
            <p className="text-slate-600">Gerencie horários, equipamentos e cadastros</p>
          </div>

          {/* Message Banner */}
          {message && (
            <div className={`mb-6 rounded-lg p-4 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="bg-white border border-slate-200 rounded-xl mb-6 p-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'schedule'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Horários
              </button>
              <button
                onClick={() => setActiveTab('equipment')}
                className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'equipment'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Wrench className="w-4 h-4" />
                Equipamentos
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'notes'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                Anotações
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                Cadastros
              </button>
            </div>
          </div>

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-slate-900 mb-6">Tabela de Horários</h2>

              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Nenhuma consulta agendada</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-slate-700">Data</th>
                        <th className="text-left py-3 px-4 text-slate-700">Horário</th>
                        <th className="text-left py-3 px-4 text-slate-700">Paciente</th>
                        <th className="text-left py-3 px-4 text-slate-700">Dentista</th>
                        <th className="text-left py-3 px-4 text-slate-700">Procedimento</th>
                        <th className="text-left py-3 px-4 text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => {
                        const upcoming = isUpcoming(appointment.date, appointment.time);
                        return (
                          <tr key={appointment.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4 text-slate-900">{formatDate(appointment.date)}</td>
                            <td className="py-3 px-4 text-slate-900">{appointment.time}</td>
                            <td className="py-3 px-4 text-slate-900">{getPatientName(appointment.patientId)}</td>
                            <td className="py-3 px-4 text-slate-900">{appointment.dentistName}</td>
                            <td className="py-3 px-4 text-slate-900">{appointment.procedureName}</td>
                            <td className="py-3 px-4">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                upcoming 
                                  ? 'bg-green-100 text-green-700 border border-green-300' 
                                  : 'bg-slate-100 text-slate-700 border border-slate-300'
                              }`}>
                                {upcoming ? 'Pendente' : 'Realizada'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Equipment Tab */}
          {activeTab === 'equipment' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-slate-900 mb-6">Gerenciar Equipamentos</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {equipment.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-slate-900 mb-2">{item.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getEquipmentStatusColor(item.status)}`}>
                          {getEquipmentStatusText(item.status)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateEquipmentStatus(item.id, 'available')}
                        className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm transition-colors border border-green-200"
                      >
                        Disponível
                      </button>
                      <button
                        onClick={() => handleUpdateEquipmentStatus(item.id, 'in-use')}
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm transition-colors border border-blue-200"
                      >
                        Em Uso
                      </button>
                      <button
                        onClick={() => handleUpdateEquipmentStatus(item.id, 'maintenance')}
                        className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-2 rounded-lg text-sm transition-colors border border-amber-200"
                      >
                        Manutenção
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-slate-900 mb-6">Enviar Anotações para Dentistas</h2>

              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Nenhuma consulta disponível para anotações</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => {
                    const upcoming = isUpcoming(appointment.date, appointment.time);
                    const isEditing = selectedAppointmentForNote === appointment.id;
                    const existingNotes = notes.filter(n => n.appointmentId === appointment.id);

                    return (
                      <div
                        key={appointment.id}
                        className={`border rounded-lg p-4 ${
                          upcoming ? 'border-blue-300 bg-blue-50' : 'border-slate-200'
                        }`}
                      >
                        <div className="mb-3">
                          <h3 className="text-slate-900 mb-2">{appointment.procedureName}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-slate-600">
                            <div>
                              <span className="text-slate-500">Paciente:</span>
                              <p className="text-slate-900">{getPatientName(appointment.patientId)}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Dentista:</span>
                              <p className="text-slate-900">{appointment.dentistName}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Data:</span>
                              <p className="text-slate-900">{formatDate(appointment.date)}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Horário:</span>
                              <p className="text-slate-900">{appointment.time}</p>
                            </div>
                          </div>
                        </div>

                        {/* Existing Notes */}
                        {existingNotes.length > 0 && (
                          <div className="mb-3 space-y-2">
                            <p className="text-sm text-slate-600">Anotações enviadas:</p>
                            {existingNotes.map(note => (
                              <div key={note.id} className="bg-white rounded p-3 text-sm border border-slate-200">
                                <p className="text-slate-900">{note.note}</p>
                                <p className="text-xs text-slate-500 mt-1">
                                  {new Date(note.createdAt).toLocaleString('pt-BR')}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Note Form */}
                        {isEditing ? (
                          <div className="space-y-2">
                            <textarea
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Digite a anotação para o dentista..."
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[80px]"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSendNoteToDoctor(appointment.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                              >
                                <Send className="w-4 h-4" />
                                Enviar para Dentista
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedAppointmentForNote(null);
                                  setNoteText('');
                                }}
                                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedAppointmentForNote(appointment.id)}
                            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Adicionar anotação
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Register Tab */}
          {activeTab === 'register' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Register Patient */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6">Cadastrar Novo Paciente</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={newPatientName}
                      onChange={(e) => setNewPatientName(e.target.value)}
                      placeholder="Digite o nome completo"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Login (2 caracteres)
                    </label>
                    <input
                      type="text"
                      value={newPatientUsername}
                      onChange={(e) => setNewPatientUsername(e.target.value.toUpperCase())}
                      maxLength={2}
                      placeholder="Ex: AB"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Senha (2 caracteres)
                    </label>
                    <input
                      type="text"
                      value={newPatientPassword}
                      onChange={(e) => setNewPatientPassword(e.target.value)}
                      maxLength={2}
                      placeholder="Ex: 12"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <button
                    onClick={handleRegisterPatient}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Cadastrar Paciente
                  </button>
                </div>

                {/* Lista de Pacientes */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-slate-900 mb-3">Pacientes Cadastrados ({patients.length})</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {patients.map(patient => (
                      <div key={patient.id} className="flex items-center justify-between bg-slate-50 rounded p-3">
                        <div>
                          <p className="text-slate-900 text-sm">{patient.fullName}</p>
                          <p className="text-slate-500 text-xs">Login: {patient.username}</p>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Register Dentist */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-slate-900 mb-6">Cadastrar Novo Dentista</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-2">
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={newDentistName}
                      onChange={(e) => setNewDentistName(e.target.value)}
                      placeholder="Digite o nome do dentista"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-2">
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      Especialidade
                    </label>
                    <input
                      type="text"
                      value={newDentistSpecialty}
                      onChange={(e) => setNewDentistSpecialty(e.target.value)}
                      placeholder="Ex: Ortodontia"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      CRM
                    </label>
                    <input
                      type="text"
                      value={newDentistCRM}
                      onChange={(e) => setNewDentistCRM(e.target.value)}
                      placeholder="Ex: CRO-SP 12345"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <button
                    onClick={handleRegisterDentist}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Cadastrar Dentista
                  </button>
                </div>

                {/* Lista de Dentistas */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-slate-900 mb-3">Dentistas Cadastrados ({dentists.length})</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {dentists.map(dentist => (
                      <div key={dentist.id} className="bg-slate-50 rounded p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-slate-900 text-sm">{dentist.name}</p>
                            <p className="text-slate-500 text-xs">{dentist.specialty}</p>
                            <p className="text-slate-500 text-xs">{dentist.crm}</p>
                          </div>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
