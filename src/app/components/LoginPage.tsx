import { useState } from 'react';
import { User, Lock, ArrowLeft, LogIn, Moon, Sun } from 'lucide-react';
import logoImage from 'figma:asset/57deffdb02e805463990fbf1ee80a9891070f68a.png';
import { useTheme } from './ThemeProvider';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: (userType: 'dentist' | 'patient' | 'employee', userId: string) => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onBack, onLoginSuccess, onNavigateToRegister }: LoginPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [loginType, setLoginType] = useState<'dentist' | 'patient' | 'employee'>('patient');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (loginType === 'dentist') {
      // Validação de dentista (login: "01", senha: "01")
      if (username === '01' && password === '01') {
        onLoginSuccess('dentist', 'dentist-01');
      } else {
        setError('Credenciais de dentista inválidas.');
      }
    } else if (loginType === 'employee') {
      // Validação de funcionário (login: "02", senha: "02")
      if (username === '02' && password === '02') {
        onLoginSuccess('employee', 'employee-01');
      } else {
        setError('Credenciais de funcionário inválidas.');
      }
    } else {
      // Validação de paciente (login e senha com 2 caracteres)
      if (username.length !== 2 || password.length !== 2) {
        setError('Login e senha devem ter exatamente 2 caracteres.');
        return;
      }

      // Buscar paciente no localStorage
      const patients = JSON.parse(localStorage.getItem('patients') || '[]');
      const patient = patients.find((p: any) => p.username === username && p.password === password);

      if (patient) {
        onLoginSuccess('patient', patient.id);
      } else {
        setError('Credenciais inválidas. Verifique seu login e senha ou cadastre-se.');
      }
    }
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
            Voltar para início
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
            <h1 className="text-slate-900 dark:text-white mb-2">Login</h1>
            <p className="text-slate-600 dark:text-slate-300">Acesse sua conta</p>
          </div>

          {/* Tabs de tipo de usuário */}
          <div className="flex gap-2 mb-6 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
            <button
              onClick={() => {
                setLoginType('patient');
                setUsername('');
                setPassword('');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition-all text-sm ${
                loginType === 'patient'
                  ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Paciente
            </button>
            <button
              onClick={() => {
                setLoginType('dentist');
                setUsername('');
                setPassword('');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition-all text-sm ${
                loginType === 'dentist'
                  ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Dentista
            </button>
            <button
              onClick={() => {
                setLoginType('employee');
                setUsername('');
                setPassword('');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition-all text-sm ${
                loginType === 'employee'
                  ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Funcionário
            </button>
          </div>

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
                Login {loginType === 'patient' && '(2 caracteres)'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={loginType === 'patient' ? 2 : undefined}
                placeholder={loginType === 'dentist' ? '01' : loginType === 'employee' ? '02' : 'Ex: AB'}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
                <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Senha {loginType === 'patient' && '(2 caracteres)'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={loginType === 'patient' ? 2 : undefined}
                placeholder={loginType === 'dentist' ? '01' : loginType === 'employee' ? '02' : 'Ex: 12'}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
              />
            </div>
          </div>

          {/* Botão de Login */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 mb-4"
          >
            <LogIn className="w-5 h-5" />
            Entrar
          </button>

          {/* Link para cadastro (apenas para pacientes) */}
          {loginType === 'patient' && (
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Não tem uma conta?{' '}
                <button
                  onClick={onNavigateToRegister}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Cadastre-se
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
