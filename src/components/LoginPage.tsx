import { useState } from 'react';
import { User, Lock, ArrowLeft, LogIn } from 'lucide-react';
import logoImage from 'figma:asset/57deffdb02e805463990fbf1ee80a9891070f68a.png';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: (userType: 'dentist' | 'patient' | 'employee', userId: string) => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onBack, onLoginSuccess, onNavigateToRegister }: LoginPageProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para início
        </button>

        <div className="bg-white backdrop-blur-sm border border-slate-200 rounded-2xl shadow-2xl p-8">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={logoImage} alt="Logo COB" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-slate-900 mb-2">Login</h1>
            <p className="text-slate-600">Acesse sua conta</p>
          </div>

          {/* Tabs de tipo de usuário */}
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => {
                setLoginType('patient');
                setUsername('');
                setPassword('');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition-all text-sm ${
                loginType === 'patient'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
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
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
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
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Funcionário
            </button>
          </div>

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
                Login {loginType === 'patient' && '(2 caracteres)'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={loginType === 'patient' ? 2 : undefined}
                placeholder={loginType === 'dentist' ? '01' : loginType === 'employee' ? '02' : 'Ex: AB'}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-2">
                <Lock className="w-4 h-4 text-blue-600" />
                Senha {loginType === 'patient' && '(2 caracteres)'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={loginType === 'patient' ? 2 : undefined}
                placeholder={loginType === 'dentist' ? '01' : loginType === 'employee' ? '02' : 'Ex: 12'}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
              <p className="text-slate-600 text-sm">
                Não tem uma conta?{' '}
                <button
                  onClick={onNavigateToRegister}
                  className="text-blue-600 hover:text-blue-700"
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
