import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { BookingPage } from './components/BookingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { PatientDashboard } from './components/PatientDashboard';
import { DentistDashboard } from './components/DentistDashboard';
import { EmployeeDashboard } from './components/EmployeeDashboard';

type Page = 'home' | 'booking' | 'login' | 'register' | 'patient-dashboard' | 'dentist-dashboard' | 'employee-dashboard';

interface UserSession {
  userType: 'dentist' | 'patient' | 'employee';
  userId: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  const handleLoginSuccess = (userType: 'dentist' | 'patient' | 'employee', userId: string) => {
    setUserSession({ userType, userId });
    if (userType === 'dentist') {
      setCurrentPage('dentist-dashboard');
    } else if (userType === 'employee') {
      setCurrentPage('employee-dashboard');
    } else {
      setCurrentPage('patient-dashboard');
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    setCurrentPage('home');
  };

  const handleNavigateToBooking = () => {
    setCurrentPage('booking');
  };

  return (
    <>
      {currentPage === 'home' && (
        <HomePage
          onNavigateToBooking={handleNavigateToBooking}
          onNavigateToLogin={() => setCurrentPage('login')}
        />
      )}

      {currentPage === 'booking' && (
        <BookingPage
          onBack={() => {
            // Se o usuário está logado como paciente, volta para o dashboard
            if (userSession?.userType === 'patient') {
              setCurrentPage('patient-dashboard');
            } else {
              setCurrentPage('home');
            }
          }}
          patientId={userSession?.userId}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage
          onBack={() => setCurrentPage('home')}
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={() => setCurrentPage('register')}
        />
      )}

      {currentPage === 'register' && (
        <RegisterPage
          onBack={() => setCurrentPage('login')}
          onRegisterSuccess={() => setCurrentPage('login')}
        />
      )}

      {currentPage === 'patient-dashboard' && userSession?.userType === 'patient' && (
        <PatientDashboard
          patientId={userSession.userId}
          onLogout={handleLogout}
          onNavigateToBooking={handleNavigateToBooking}
        />
      )}

      {currentPage === 'dentist-dashboard' && userSession?.userType === 'dentist' && (
        <DentistDashboard
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'employee-dashboard' && userSession?.userType === 'employee' && (
        <EmployeeDashboard
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
