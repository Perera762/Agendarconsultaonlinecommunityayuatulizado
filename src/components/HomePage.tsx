import { Calendar, Shield, Star, Clock, Phone, MapPin, Mail, Sparkles, Award, Users, LogIn } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/57deffdb02e805463990fbf1ee80a9891070f68a.png';

interface HomePageProps {
  onNavigateToBooking: () => void;
  onNavigateToLogin: () => void;
}

export function HomePage({ onNavigateToBooking, onNavigateToLogin }: HomePageProps) {
  const servicos = [
    {
      icon: Shield,
      titulo: 'Clínica Geral',
      descricao: 'Consultas de rotina, limpeza e prevenção para manter seu sorriso saudável.'
    },
    {
      icon: Sparkles,
      titulo: 'Estética Dental',
      descricao: 'Clareamento, lentes de contato e procedimentos para um sorriso perfeito.'
    },
    {
      icon: Award,
      titulo: 'Implantes',
      descricao: 'Implantes dentários de última geração com tecnologia avançada.'
    },
    {
      icon: Star,
      titulo: 'Ortodontia',
      descricao: 'Aparelhos ortodônticos tradicionais e invisíveis para alinhar seus dentes.'
    }
  ];

  const dentistas = [
    {
      nome: 'Dr. Carlos Silva',
      especialidade: 'Clínico Geral',
      experiencia: '15 anos',
      descricao: 'Especialista em odontologia preventiva e restauradora.'
    },
    {
      nome: 'Dra. Ana Santos',
      especialidade: 'Ortodontia',
      experiencia: '12 anos',
      descricao: 'Referência em tratamentos ortodônticos modernos e eficientes.'
    },
    {
      nome: 'Dr. Paulo Mendes',
      especialidade: 'Implantodontia',
      experiencia: '18 anos',
      descricao: 'Expert em implantes dentários e reabilitação oral.'
    }
  ];

  const depoimentos = [
    {
      nome: 'Maria Oliveira',
      texto: 'Excelente atendimento! Equipe profissional e clínica moderna. Recomendo!',
      rating: 5
    },
    {
      nome: 'João Santos',
      texto: 'Fiz meu implante aqui e o resultado foi incrível. Muito satisfeito!',
      rating: 5
    },
    {
      nome: 'Ana Paula',
      texto: 'Ambiente acolhedor e dentistas muito atenciosos. Melhor clínica da região!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Logo COB" className="w-10 h-10 object-contain" />
              <span className="text-blue-600">Clínica Odontológica do Brás</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#servicos" className="text-slate-600 hover:text-blue-600 transition-colors">Serviços</a>
              <a href="#equipe" className="text-slate-600 hover:text-blue-600 transition-colors">Equipe</a>
              <a href="#depoimentos" className="text-slate-600 hover:text-blue-600 transition-colors">Depoimentos</a>
              <a href="#contato" className="text-slate-600 hover:text-blue-600 transition-colors">Contato</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateToLogin}
                className="bg-white hover:bg-slate-50 text-blue-600 px-6 py-2 rounded-lg transition-all duration-300 border border-blue-300 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
              
              <button
                onClick={onNavigateToBooking}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Agendar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeIn">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 text-sm">Clínica Odontológica de Excelência</span>
              </div>
              
              <h1 className="text-slate-900">
                Seu Sorriso Merece o Melhor Cuidado
              </h1>
              
              <p className="text-slate-600 text-lg leading-relaxed">
                Oferecemos tratamentos odontológicos de alta qualidade com tecnologia de ponta e uma equipe de profissionais experientes, dedicados ao seu bem-estar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onNavigateToBooking}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Consulta
                </button>
                
                <a
                  href="#servicos"
                  className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-lg transition-all duration-300 border border-slate-300 flex items-center justify-center gap-2"
                >
                  Conheça Nossos Serviços
                </a>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-blue-600">15+</div>
                  <p className="text-slate-500 text-sm">Anos de Experiência</p>
                </div>
                <div>
                  <div className="text-blue-600">5000+</div>
                  <p className="text-slate-500 text-sm">Pacientes Atendidos</p>
                </div>
                <div>
                  <div className="text-blue-600">98%</div>
                  <p className="text-slate-500 text-sm">Satisfação</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fadeIn-delay">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur-2xl" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1606811801193-e318c9a87ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDczNjAxOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Clínica Odontológica"
                className="relative rounded-2xl shadow-2xl border border-slate-200 w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4">Nossos Serviços</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Oferecemos uma ampla gama de tratamentos odontológicos para cuidar da sua saúde bucal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicos.map((servico, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-sm border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <servico.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-slate-900 mb-2">{servico.titulo}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{servico.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section id="equipe" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4">Nossa Equipe</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Profissionais altamente qualificados e dedicados ao seu sorriso
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dentistas.map((dentista, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="h-48 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                  <Users className="w-20 h-20 text-blue-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-slate-900 mb-1">{dentista.nome}</h3>
                  <p className="text-blue-600 text-sm mb-2">{dentista.especialidade}</p>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                    <Award className="w-4 h-4" />
                    {dentista.experiencia} de experiência
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{dentista.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4">O Que Nossos Pacientes Dizem</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A satisfação dos nossos pacientes é nossa maior conquista
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-sm border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(depoimento.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">{depoimento.texto}</p>
                <p className="text-blue-600">{depoimento.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-12 text-center">
            <h2 className="text-slate-900 mb-4">Pronto para Transformar seu Sorriso?</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Agende sua consulta agora e dê o primeiro passo para um sorriso mais saudável e bonito
            </p>
            <button
              onClick={onNavigateToBooking}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Agendar Minha Consulta
            </button>
          </div>
        </div>
      </section>

      {/* Contato/Footer */}
      <footer id="contato" className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImage} alt="Logo COB" className="w-10 h-10 object-contain" />
                <span className="text-blue-400">Clínica Odontológica do Brás</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                Clínica odontológica de excelência, comprometida com a saúde e beleza do seu sorriso há mais de 15 anos.
              </p>
            </div>

            <div>
              <h3 className="text-white mb-4">Contato</h3>
              <div className="space-y-3 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  (11) 3456-7890
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  contato@dentalcare.com
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-4">Localização</h3>
              <div className="space-y-3 text-slate-400 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span>Av. Paulista, 1000<br />São Paulo - SP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Seg-Sex: 08:00-18:00
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2025 Clínica Odontológica do Brás. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-fadeIn-delay {
          animation: fadeIn-delay 0.6s ease-out 0.2s backwards;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
