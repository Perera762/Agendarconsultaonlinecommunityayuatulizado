import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import logoImage from "figma:asset/57deffdb02e805463990fbf1ee80a9891070f68a.png";

interface BookingPageProps {
  onBack: () => void;
  patientId?: string;
}

export function BookingPage({ onBack, patientId }: BookingPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    dentista: "",
    procedimento: "",
    data: "",
    hora: "",
  });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulação de horários ocupados (RN003)
  const horariosOcupados = ["10:00", "14:30", "16:00"];

  // Dados simulados
  const dentistas = [
    {
      id: "1",
      nome: "Dr. Carlos Silva",
      especialidade: "Clínico Geral",
    },
    {
      id: "2",
      nome: "Dra. Ana Santos",
      especialidade: "Ortodontia",
    },
    {
      id: "3",
      nome: "Dr. Paulo Mendes",
      especialidade: "Implantodontia",
    },
  ];

  const procedimentos = [
    { id: "1", nome: "Consulta de Avaliação" },
    { id: "2", nome: "Limpeza Dental" },
    { id: "3", nome: "Tratamento de Canal" },
    { id: "4", nome: "Clareamento Dental" },
    { id: "5", nome: "Implante Dentário" },
  ];

  // Validação dos campos (RN001)
  const validarPasso = () => {
    setError("");

    if (currentStep === 1) {
      if (!formData.dentista || !formData.procedimento) {
        setError(
          "Por favor, selecione o dentista e o procedimento.",
        );
        return false;
      }
    }

    if (currentStep === 2) {
      if (!formData.data || !formData.hora) {
        setError("Por favor, selecione a data e o horário.");
        return false;
      }
      // Validar horário ocupado (RN003)
      if (horariosOcupados.includes(formData.hora)) {
        setError(
          "Horário ocupado. Por favor, escolha outro horário.",
        );
        return false;
      }
    }

    return true;
  };

  const avancarPasso = () => {
    if (validarPasso()) {
      if (currentStep === 3) {
        // Finalizar agendamento e salvar no localStorage
        const appointment = {
          id: `apt-${Date.now()}`,
          patientId: patientId || 'guest',
          dentistName: getDentistaNome(),
          procedureName: getProcedimentoNome(),
          date: formData.data,
          time: formData.hora,
          createdAt: new Date().toISOString(),
        };

        // Salvar consulta
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        setShowSuccess(true);
        setCurrentStep(4);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const voltarPasso = () => {
    setError("");
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setError("");
  };

  const reiniciarAgendamento = () => {
    setCurrentStep(1);
    setFormData({
      dentista: "",
      procedimento: "",
      data: "",
      hora: "",
    });
    setError("");
    setShowSuccess(false);
  };

  const getDentistaNome = () => {
    const dentista = dentistas.find(
      (d) => d.id === formData.dentista,
    );
    return dentista
      ? `${dentista.nome} - ${dentista.especialidade}`
      : "";
  };

  const getProcedimentoNome = () => {
    const proc = procedimentos.find(
      (p) => p.id === formData.procedimento,
    );
    return proc ? proc.nome : "";
  };

  const formatarData = (data: string) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para início
          </button>

          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={logoImage}
              alt="Logo COB"
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-slate-900">
              Portal do Paciente
            </h1>
          </div>
          <p className="text-slate-600">
            Agende sua consulta odontológica de forma rápida e
            segura
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-10">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step === currentStep
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : step < currentStep
                        ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                        : "bg-slate-200 text-slate-400 border-2 border-slate-300"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${step === currentStep ? "text-blue-600" : "text-slate-400"}`}
                >
                  {step === 1 && "Seleção"}
                  {step === 2 && "Data/Hora"}
                  {step === 3 && "Confirmar"}
                  {step === 4 && "Sucesso"}
                </span>
              </div>
              {index < 3 && (
                <div
                  className={`h-0.5 w-16 mx-2 transition-all duration-300 ${
                    step < currentStep
                      ? "bg-blue-600"
                      : "bg-slate-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white backdrop-blur-sm border border-slate-200 rounded-2xl shadow-2xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Passo 1: Seleção de Dentista e Procedimento */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-slate-900 mb-6">
                  Selecione o Dentista e Procedimento
                </h2>

                <div className="space-y-6">
                  {/* Dentista */}
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-3">
                      <User className="w-5 h-5 text-blue-600" />
                      Dentista
                    </label>
                    <select
                      value={formData.dentista}
                      onChange={(e) =>
                        handleInputChange(
                          "dentista",
                          e.target.value,
                        )
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <option value="">
                        Escolha um dentista
                      </option>
                      {dentistas.map((dentista) => (
                        <option
                          key={dentista.id}
                          value={dentista.id}
                        >
                          {dentista.nome} -{" "}
                          {dentista.especialidade}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Procedimento */}
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-3">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                      Procedimento
                    </label>
                    <select
                      value={formData.procedimento}
                      onChange={(e) =>
                        handleInputChange(
                          "procedimento",
                          e.target.value,
                        )
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <option value="">
                        Escolha um procedimento
                      </option>
                      {procedimentos.map((proc) => (
                        <option key={proc.id} value={proc.id}>
                          {proc.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Passo 2: Data e Hora */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-slate-900 mb-6">
                  Escolha Data e Horário
                </h2>

                <div className="space-y-6">
                  {/* Data */}
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Data da Consulta
                    </label>
                    <input
                      type="date"
                      value={formData.data}
                      onChange={(e) =>
                        handleInputChange(
                          "data",
                          e.target.value,
                        )
                      }
                      min={
                        new Date().toISOString().split("T")[0]
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  {/* Hora */}
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 mb-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Horário
                    </label>
                    <input
                      type="time"
                      value={formData.hora}
                      onChange={(e) =>
                        handleInputChange(
                          "hora",
                          e.target.value,
                        )
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Horários disponíveis: 08:00 às 18:00
                    </p>
                  </div>

                  {/* Aviso de horários ocupados */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-700 text-sm">
                      <strong>Horários já ocupados:</strong>{" "}
                      {horariosOcupados.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Passo 3: Confirmação */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-slate-900 mb-6">
                  Confirme seus Dados
                </h2>

                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                      <span className="text-slate-600">
                        Dentista:
                      </span>
                      <span className="text-slate-900 text-right max-w-xs">
                        {getDentistaNome()}
                      </span>
                    </div>

                    <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                      <span className="text-slate-600">
                        Procedimento:
                      </span>
                      <span className="text-slate-900 text-right">
                        {getProcedimentoNome()}
                      </span>
                    </div>

                    <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                      <span className="text-slate-600">
                        Data:
                      </span>
                      <span className="text-slate-900">
                        {formatarData(formData.data)}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-slate-600">
                        Horário:
                      </span>
                      <span className="text-slate-900">
                        {formData.hora}
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-700 text-sm">
                      Ao confirmar, você receberá um e-mail com
                      os detalhes da consulta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Passo 4: Sucesso */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn text-center">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center animate-bounce-slow">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-slate-900 mb-4">
                  Consulta Agendada com Sucesso!
                </h2>
                <p className="text-slate-600 mb-6">
                  Seu agendamento foi confirmado. Em breve você
                  receberá um e-mail com todos os detalhes.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Dentista:
                  </span>
                  <span className="text-slate-900">
                    {getDentistaNome().split(" - ")[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Procedimento:
                  </span>
                  <span className="text-slate-900">
                    {getProcedimentoNome()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Data:</span>
                  <span className="text-slate-900">
                    {formatarData(formData.data)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Horário:
                  </span>
                  <span className="text-slate-900">
                    {formData.hora}
                  </span>
                </div>
              </div>

              <button
                onClick={reiniciarAgendamento}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Agendar Nova Consulta
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={voltarPasso}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-slate-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Voltar
                </button>
              )}

              <button
                onClick={avancarPasso}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30"
              >
                {currentStep === 3
                  ? "Confirmar Agendamento"
                  : "Avançar"}
                {currentStep < 3 && (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>
            Horário de atendimento: Segunda a Sexta, 08:00 -
            18:00
          </p>
          <p className="mt-1">
            Em caso de emergência, ligue: (11) 2081-0106
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6);
          cursor: pointer;
        }

        select option {
          background-color: #ffffff;
          color: #0f172a;
        }
      `}</style>
    </div>
  );
}