import { useState } from 'react';
import { User, Lock, UserPlus, ArrowLeft, Moon, Sun } from 'lucide-react';
import logoImage from 'figma:asset/57deffdb02e805463990fbf1ee80a9891070f68a.png';
import { useTheme } from './ThemeProvider';

interface RegisterPageProps {
  onBack: () => void;
  onRegisterSuccess: () => void;
}

export function RegisterPage({ onBack, onRegisterSuccess }: RegisterPageProps) {
  const { theme, toggleTheme } = useTheme();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para login
          </button>

          <button
            onClick={toggleTheme}
            className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 p-2 rounded-lg transition-all duration-300 border border-slate-300 dark:border-slate-600"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-8 transition-colors duration-300">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={logoImage} alt="Logo COB" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-slate-900 dark:text-white mb-2">Cadastro de Paciente</h1>
            <p className="text-slate-600 dark:text-slate-300">Crie sua conta para agendar consultas</p>
          </div>

          {/* Mensagem de sucesso */}
          {success && (
            <div className="mb-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3 text-green-600 dark:text-green-400 text-sm">
              Cadastro realizado com sucesso! Redirecionando para o login...
            </div>
          )}

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Formulário */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Nome Completo
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                disabled={success}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Login (2 caracteres)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toUpperCase())}
                maxLength={2}
                placeholder="Ex: AB"
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all uppercase"
                disabled={success}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Use 2 letras ou números únicos</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
                <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Senha (2 caracteres)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={2}
                placeholder="Ex: 12"
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
                disabled={success}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Use 2 caracteres de sua escolha</p>
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
