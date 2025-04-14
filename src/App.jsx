import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

function Home() {
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const cpfParam = urlParams.get('cpf');
    if (cpfParam) {
      // Força o redirecionamento usando window.location
      window.location.href = `/assentos?cpf=${cpfParam}`;
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/assentos?cpf=${cpf}`;
  };

  return (
    <div className="container">
      <h1>Bem-vindo ao Sistema de Marcação de Assentos</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cpf">Digite seu CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            required
          />
        </div>
        <button type="submit">Continuar</button>
      </form>
    </div>
  );
}

function Assentos() {
  const [assentoSelecionado, setAssentoSelecionado] = useState(null);
  const navigate = useNavigate();

  const assentos = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleSelecionarAssento = (assento) => {
    setAssentoSelecionado(assento);
    const urlParams = new URLSearchParams(window.location.search);
    const cpf = urlParams.get('cpf');
    navigate(`/confirmacao?cpf=${cpf}&assento=${assento}`);
  };

  return (
    <div className="container">
      <h2>Selecione seu assento</h2>
      <div className="assentos-grid">
        {assentos.map((assento) => (
          <button
            key={assento}
            className={`assento ${assentoSelecionado === assento ? 'selecionado' : ''}`}
            onClick={() => handleSelecionarAssento(assento)}
          >
            {assento}
          </button>
        ))}
      </div>
    </div>
  );
}

function Confirmacao() {
  const urlParams = new URLSearchParams(window.location.search);
  const cpf = urlParams.get('cpf');
  const assento = urlParams.get('assento');

  return (
    <div className="container">
      <h2>Confirmação</h2>
      <div className="confirmacao-detalhes">
        <p>CPF: {cpf}</p>
        <p>Assento selecionado: {assento}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assentos" element={<Assentos />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
      </Routes>
    </Router>
  );
}

export default App; 