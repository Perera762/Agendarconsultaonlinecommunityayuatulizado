import { useState } from 'react';
import { User, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import logoImage from 'figma:asset/57deffdb02e805463990fbf1ee80a9891070f68a.png';

interface RegisterPageProps {
  onBack: () => void;
  onRegisterSuccess: () => void;
}

export function RegisterPage({ onBack, onRegisterSuccess }: RegisterPageProps) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    setError('');

    // Validações
    if (!fullName.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }

    if (username.length !== 2) {
      setError('O login deve ter exatamente 2 caracteres.');
      return;
    }

    if (password.length !== 2) {
      setError('A senha deve ter exatamente 2 caracteres.');
      return;
    }

    // Verificar se login já existe
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const existingPatient = patients.find((p: any) => p.username === username);

    if (existingPatient) {
      setError('Este login já está em uso. Por favor, escolha outro.');
      return;
    }

    // Criar novo paciente
    const newPatient = {
      id: `patient-${Date.now()}`,
      fullName: fullName.trim(),
      username,
      password,
      createdAt: new Date().toISOString(),
    };

    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));

    setSuccess(true);
    setFullName('');
    setUsername('');
    setPassword('');

    setTimeout(() => {
      onRegisterSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para login
        </button>

        <div className="bg-white backdrop-blur-sm border border-slate-200 rounded-2xl shadow-2xl p-8">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={logoImage} alt="Logo COB" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-slate-900 mb-2">Cadastro de Paciente</h1>
            <p className="text-slate-600">Crie sua conta para agendar consultas</p>
          </div>

          {/* Mensagem de sucesso */}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 text-green-600 text-sm">
              Cadastro realizado com sucesso! Redirecionando para o login...
            </div>
          )}

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Formulário */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-2">
                <User className="w-4 h-4 text-blue-600" />
                Nome Completo
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                disabled={success}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-2">
                <User className="w-4 h-4 text-blue-600" />
                Login (2 caracteres)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toUpperCase())}
                maxLength={2}
                placeholder="Ex: AB"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
                disabled={success}
              />
              <p className="text-xs text-slate-500 mt-1">Use 2 letras ou números únicos</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-2">
                <Lock className="w-4 h-4 text-blue-600" />
                Senha (2 caracteres)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={2}
                placeholder="Ex: 12"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                disabled={success}
              />
              <p className="text-xs text-slate-500 mt-1">Use 2 caracteres de sua escolha</p>
            </div>
          </div>

          {/* Botão de Cadastro */}
          <button
            onClick={handleRegister}
            disabled={success}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus className="w-5 h-5" />
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
