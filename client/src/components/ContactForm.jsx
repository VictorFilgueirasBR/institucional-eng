import React, { useState } from 'react';
import './ContactForm.scss';
import Celebration from './Celebration'; // Novo componente de animação

const countries = {
  Brazil: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia'],
  USA: ['California', 'New York'],
  Portugal: ['Lisboa', 'Porto'],
  Others: ['N/A'],
};

const subjects = [
  'Suporte técnico',
  'Solicitação de orçamento',
  'Parcerias',
  'Feedback',
  'Outros',
];

const ContactForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Brazil',
    state: '',
    subject: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        });

        if (response.ok) {
        console.log('✅ Formulário enviado com sucesso!');
        setSubmitted(true);
        setStep(3);
        } else {
        console.error('❌ Erro ao enviar formulário');
        }
    } catch (error) {
        console.error('❌ Erro de conexão com o backend:', error);
    }
    };


  return (
    <div className="contact-form-container">
      {step === 1 && (
        <form className="form-step" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <h2>Fale conosco</h2>
          <input type="text" name="name" placeholder="Nome completo" required value={formData.name} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Telefone / WhatsApp" required value={formData.phone} onChange={handleChange} />
          <input type="email" name="email" placeholder="E-mail" required value={formData.email} onChange={handleChange} />
          <button type="submit">Próximo</button>
        </form>
      )}

      {step === 2 && (
        <form className="form-step" onSubmit={handleSubmit}>
          <h2>Só falta preencher</h2>
          <select name="country" value={formData.country} onChange={handleChange} required>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <select name="state" value={formData.state} onChange={handleChange} required>
            <option value="">Selecione o estado</option>
            {countries[formData.country]?.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select name="subject" value={formData.subject} onChange={handleChange} required>
            <option value="">Motivo do contato</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button type="submit">Enviar</button>
        </form>
      )}

      {step === 3 && submitted && (
        <div className="form-step confirmation-step">
          <h2>🎉 Em breve iremos entrar em contato via WhatsApp!</h2>
          <Celebration />
        </div>
      )}
    </div>
  );
};

export default ContactForm;
