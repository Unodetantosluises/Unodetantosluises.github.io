import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Layout from '../../components/Layout/Layout';
import BackgroundGrid from '../../components/BackgroundGrid/BackgroundGrid';
import Controls from '../../components/Controls/Controls';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import './_contact.scss';

export const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Fallback if environment variables are not yet configured in local environment
    if (!serviceId || !templateId || !publicKey) {
      setTimeout(() => {
        setIsSubmitting(false);
        setFeedback({
          type: 'success',
          text: '¡Mensaje recibido! (Modo demostración: configura tus claves de EmailJS en .env)'
        });
        setFormData({ user_name: '', user_email: '', message: '' });
      }, 750);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setFeedback({
        type: 'success',
        text: '¡Mensaje enviado con éxito! Te responderé a la brevedad.'
      });
      setFormData({ user_name: '', user_email: '', message: '' });
    } catch (error) {
      console.error('EmailJS submit error:', error);
      setFeedback({
        type: 'error',
        text: 'Hubo un problema al enviar el correo. Por favor, inténtalo de nuevo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <main className="page contact">
        <BackgroundGrid />

        {/* Translucent Rounded Panel covering the canvas */}
        <div className="contact__panel">
          {/* Header: Return Button + Title */}
          <header className="contact__header">
            <ReturnButton />
            <h1 className="contact__title">Contacto</h1>
          </header>

          {/* Controls in top-right of panel */}
          <Controls />

          {/* Main Content Layout */}
          <div className="contact__body">
            {/* Upper Section: Texts + Kaomojis + Envelope Animation */}
            <section className="contact__intro">
              <div className="contact__text-group">
                <p className="contact__text">
                  ¿Tienes alguna pregunta o propuesta?
                  <br />
                  <span className="contact__kaomoji" aria-hidden="true">
                    ( ͡• ͜ʖ ͡• )/
                  </span>
                </p>

                <p className="contact__text">
                  ¿O solo quieres saludar?
                  <br />
                  <span className="contact__kaomoji" aria-hidden="true">
                    ヾ(•ω•`)o
                  </span>
                </p>

                <p className="contact__text">
                  ¿Buenas palabra o malas palabras?
                  <br />
                  <span className="contact__kaomoji" aria-hidden="true">
                    \_(ツ)_/
                  </span>
                </p>

                <p className="contact__highlight">¡Adelante!</p>
              </div>

              {/* Pixel Art Envelope Animation */}
              <div className="contact__envelope-container" aria-hidden="true">
                <div className="envelope-animation" aria-hidden="true" />
              </div>
            </section>

            {/* Form Section */}
            <form ref={formRef} className="contact__form" onSubmit={handleSubmit} noValidate={false}>
              <div className="contact__form-grid">
                {/* Row 1: Nombre & Correo Electrónico */}
                <div className="contact__field">
                  <label htmlFor="user_name" className="contact__label">
                    Nombre
                  </label>
                  <div className="contact__input-wrapper">
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      placeholder="Ingresa Tu Nombre"
                      value={formData.user_name}
                      onChange={handleChange}
                      className="contact__input"
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="user_email" className="contact__label">
                    Correo Electrónico
                  </label>
                  <div className="contact__input-wrapper">
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      placeholder="Ingresa Tu Correo Electrónico"
                      value={formData.user_email}
                      onChange={handleChange}
                      className="contact__input"
                    />
                  </div>
                </div>

                {/* Row 2: Tu Mensaje */}
                <div className="contact__field contact__field--full">
                  <label htmlFor="message" className="contact__label">
                    Tu Mensaje
                  </label>
                  <div className="contact__input-wrapper contact__input-wrapper--textarea">
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Ingresa tu mensaje, te respondere a la brevedad!!"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="contact__textarea"
                    />
                  </div>
                </div>
              </div>

              {/* Form Footer: Feedback + Enviar Button */}
              <div className="contact__form-footer">
                {feedback && (
                  <div
                    className={`contact__feedback contact__feedback--${feedback.type}`}
                    role="alert"
                  >
                    {feedback.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact__submit-btn"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contact;
