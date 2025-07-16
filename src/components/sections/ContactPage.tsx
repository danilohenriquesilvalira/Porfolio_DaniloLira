'use client';

import { useState, useRef, FormEvent, CSSProperties, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormTouched {
  name: boolean;
  email: boolean;
  subject: boolean;
  message: boolean;
}

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_0bu6ndi";
const EMAILJS_TEMPLATE_ID = "template_hmgmp9g";
const EMAILJS_PUBLIC_KEY = "tmTDJVCQm9LARIpqm";

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<ContactFormErrors>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [touched, setTouched] = useState<ContactFormTouched>({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    // Verificar se estamos no cliente antes de inicializar
    if (typeof window !== 'undefined') {
      emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
        blockHeadless: false,
      });
      
      // Check if mobile
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  const styles: { [key: string]: CSSProperties } = {
    // Seção principal
    section: {
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#191919',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 0'
    },
    
    // Container principal
    container: {
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      padding: '0 20px',
      fontFamily: "'Poppins', sans-serif"
    },
    
    // Header da seção
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '12px',
      letterSpacing: '-0.02em'
    },
    
    subtitle: {
      fontSize: '1rem',
      color: '#d1d5db',
      lineHeight: 1.5,
      maxWidth: '600px',
      margin: '0 auto'
    },
    
    // Layout principal
    content: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      alignItems: 'stretch'
    },
    
    // Container para contatos
    contactContainer: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '30px',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    
    // Lado esquerdo - Informações
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      height: '100%',
      justifyContent: 'space-between'
    },
    
    // Bloco de informações
    infoBlock: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '0'
    },
    
    blockTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '0'
    },
    
    blockText: {
      fontSize: '0.9rem',
      color: '#d1d5db',
      lineHeight: 1.4,
      marginBottom: '0'
    },
    
    // Lista de contatos
    contactList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      border: '1px solid transparent',
      cursor: 'pointer'
    },
    
    contactItemHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateX(4px)'
    },
    
    contactIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      flexShrink: 0,
      transition: 'all 0.3s ease'
    },
    
    contactIconHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05)'
    },
    
    contactDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0'
    },
    
    contactLabel: {
      fontSize: '0.7rem',
      color: '#9ca3af',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '0'
    },
    
    contactValue: {
      fontSize: '0.9rem',
      color: 'white',
      fontWeight: '500',
      textDecoration: 'none'
    },
    
    // Destaque WhatsApp
    whatsappContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginTop: '40px'
    },
    
    whatsappHighlight: {
      background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.05) 0%, rgba(37, 211, 102, 0.02) 100%)',
      border: '1px solid rgba(37, 211, 102, 0.1)',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
      width: '80%',
      maxWidth: '500px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer'
    },
    
    whatsappHighlightHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
    },
    
    whatsappTitle: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    },
    
    whatsappText: {
      fontSize: '0.85rem',
      color: '#d1d5db',
      marginBottom: '12px',
      lineHeight: 1.4
    },
    
    whatsappButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '10px 20px',
      background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.7) 0%, rgba(32, 182, 89, 0.7) 100%)',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(37, 211, 102, 0.2)'
    },
    
    whatsappButtonHover: {
      background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.8) 0%, rgba(32, 182, 89, 0.8) 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 15px rgba(37, 211, 102, 0.3)'
    },
    
    // Lado direito - Formulário
    formContainer: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '30px',
      backdropFilter: 'blur(10px)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    
    formTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '24px'
    },
    
    // Formulário
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      height: '100%'
    },
    
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px'
    },
    
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    
    formLabel: {
      fontSize: '0.85rem',
      fontWeight: '500',
      color: '#d1d5db',
      marginBottom: '2px'
    },
    
    formInput: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '0.9rem',
      padding: '12px 14px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    
    formInputFocus: {
      borderColor: 'rgba(255, 255, 255, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.05)'
    },
    
    formInputError: {
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.05)'
    },
    
    formTextarea: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '0.9rem',
      padding: '12px 14px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      outline: 'none',
      transition: 'all 0.3s ease',
      resize: 'vertical',
      minHeight: '110px',
      maxHeight: '180px',
      lineHeight: 1.4,
      flex: '1'
    },
    
    // Mensagens de erro
    errorMessage: {
      fontSize: '0.75rem',
      color: '#ef4444',
      marginTop: '2px',
      display: 'flex',
      alignItems: 'center',
      gap: '3px'
    },
    
    // Mensagens de status
    statusMessage: {
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    
    successMessage: {
      background: 'rgba(34, 197, 94, 0.1)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      color: '#22c55e'
    },
    
    errorStatusMessage: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#ef4444'
    },
    
    // Botão de envio
    submitButton: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '0.95rem',
      fontWeight: '600',
      padding: '14px 28px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
      color: '#191919',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      minHeight: '46px',
      marginTop: 'auto'
    },
    
    submitButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
    },
    
    submitButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none'
    },
    
    // Spinner
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid #191919',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    
    // Responsividade
    mobileContent: {
      gridTemplateColumns: '1fr',
      gap: '30px'
    },
    
    mobileFormRow: {
      gridTemplateColumns: '1fr'
    }
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Nome deve ter pelo menos 2 caracteres' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email inválido' : '';
      case 'subject':
        return value.trim().length < 3 ? 'Assunto deve ter pelo menos 3 caracteres' : '';
      case 'message':
        return value.trim().length < 10 ? 'Mensagem deve ter pelo menos 10 caracteres' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name as keyof ContactFormTouched]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = formData[field as keyof ContactFormData];
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validação completa
    const nameValid = formData.name.trim().length >= 2;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const subjectValid = formData.subject.trim().length >= 3;
    const messageValid = formData.message.trim().length >= 10;
    
    if (!nameValid || !emailValid || !subjectValid || !messageValid) {
      setErrors({
        name: !nameValid ? 'Nome deve ter pelo menos 2 caracteres' : '',
        email: !emailValid ? 'Email inválido' : '',
        subject: !subjectValid ? 'Assunto deve ter pelo menos 3 caracteres' : '',
        message: !messageValid ? 'Mensagem deve ter pelo menos 10 caracteres' : ''
      });
      
      setTouched({
        name: true,
        email: true,
        subject: true,
        message: true
      });
      
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 4000);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: formData.subject,
        from_name: formData.name,
        to_name: "Danilo Lira",
        reply_to: formData.email
      };
      
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('SUCCESS!', response.status, response.text);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({ name: false, email: false, subject: false, message: false });
      setErrors({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    Object.assign(e.target.style, styles.formInputFocus);
  };

  const handleInputBlur = (field: string, e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleBlur(field);
    if (!errors[field as keyof ContactFormErrors]) {
      e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      e.target.style.boxShadow = 'none';
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <section style={styles.section}>
        <div style={styles.container}>
          
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.title}>Vamos Conversar</h1>
            <p style={styles.subtitle}>
              Especialista em Automação Industrial e Desenvolvimento de Sistemas. 
              Pronto para transformar suas ideias em soluções tecnológicas.
            </p>
          </div>

          {/* Conteúdo Principal */}
          <div style={{
            ...styles.content,
            ...(isMobile ? styles.mobileContent : {})
          }}>
            
            {/* Informações de Contato */}
            <div style={styles.contactContainer}>
              <h2 style={styles.formTitle}>Informações de Contato</h2>
              <div style={styles.contactInfo}>
                
                {/* Intro */}
                <div style={styles.infoBlock}>
                  <h3 style={styles.blockTitle}>Como posso ajudar?</h3>
                  <p style={styles.blockText}>
                    Especializado em soluções completas para a Indústria 4.0, combinando expertise em automação 
                    industrial e desenvolvimento full stack. Ofereço integração de sistemas SCADA, implementação 
                    de redes PROFINET/PROFIBUS, e aplicações web responsivas para monitoramento em tempo real 
                    e análise de dados industriais.
                  </p>
                </div>

                {/* Contatos */}
                <div style={styles.contactList}>
                  
                  {/* Email */}
                  <div 
                    style={styles.contactItem}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.contactItemHover);
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) Object.assign(icon.style, styles.contactIconHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) {
                        icon.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        icon.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <div style={styles.contactIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div style={styles.contactDetails}>
                      <span style={styles.contactLabel}>Email</span>
                      <a 
                        href="mailto:danilosilvalira@hotmail.com" 
                        style={styles.contactValue}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                      >
                        danilosilvalira@hotmail.com
                      </a>
                    </div>
                  </div>

                  {/* Telefone */}
                  <div 
                    style={styles.contactItem}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.contactItemHover);
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) Object.assign(icon.style, styles.contactIconHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) {
                        icon.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        icon.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <div style={styles.contactIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div style={styles.contactDetails}>
                      <span style={styles.contactLabel}>Telefone</span>
                      <a 
                        href="tel:+351935479757" 
                        style={styles.contactValue}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                      >
                        +351 935 479 757
                      </a>
                    </div>
                  </div>

                  {/* Localização */}
                  <div 
                    style={styles.contactItem}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.contactItemHover);
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) Object.assign(icon.style, styles.contactIconHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) {
                        icon.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        icon.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <div style={styles.contactIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div style={styles.contactDetails}>
                      <span style={styles.contactLabel}>Localização</span>
                      <span style={styles.contactValue}>Sintra, Portugal</span>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div 
                    style={styles.contactItem}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.contactItemHover);
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) Object.assign(icon.style, styles.contactIconHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) {
                        icon.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        icon.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <div style={styles.contactIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div style={styles.contactDetails}>
                      <span style={styles.contactLabel}>LinkedIn</span>
                      <a 
                        href="https://www.linkedin.com/in/danilo-lira-82b17516b" 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.contactValue}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                      >
                        danilo-lira
                      </a>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div 
                    style={styles.contactItem}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.contactItemHover);
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) Object.assign(icon.style, styles.contactIconHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                      const icon = e.currentTarget.firstChild as HTMLElement;
                      if (icon) {
                        icon.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        icon.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <div style={styles.contactIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div style={styles.contactDetails}>
                      <span style={styles.contactLabel}>GitHub</span>
                      <a 
                        href="https://github.com/danilohenriquesilvalira" 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.contactValue}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                      >
                        danilohenriquesilvalira
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div style={styles.formContainer}>
              <h2 style={styles.formTitle}>Enviar Mensagem</h2>
              
              <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div style={{ ...styles.statusMessage, ...styles.successMessage }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    Mensagem enviada com sucesso! Entrarei em contato em breve.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div style={{ ...styles.statusMessage, ...styles.errorStatusMessage }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    Por favor, corrija os erros no formulário.
                  </div>
                )}

                {/* Nome e Email */}
                <div style={{
                  ...styles.formRow,
                  ...(isMobile ? styles.mobileFormRow : {})
                }}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Nome *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onBlur={(e) => handleInputBlur('name', e)}
                      style={{
                        ...styles.formInput,
                        ...(touched.name && errors.name ? styles.formInputError : {})
                      }}
                    />
                    {touched.name && errors.name && (
                      <div style={styles.errorMessage}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="15" y1="9" x2="9" y2="15"/>
                          <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        {errors.name}
                      </div>
                    )}
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      onBlur={(e) => handleInputBlur('email', e)}
                      style={{
                        ...styles.formInput,
                        ...(touched.email && errors.email ? styles.formInputError : {})
                      }}
                    />
                    {touched.email && errors.email && (
                      <div style={styles.errorMessage}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="15" y1="9" x2="9" y2="15"/>
                          <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Assunto */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Assunto *</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Sobre o que você gostaria de falar?"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur('subject', e)}
                    style={{
                      ...styles.formInput,
                      ...(touched.subject && errors.subject ? styles.formInputError : {})
                    }}
                  />
                  {touched.subject && errors.subject && (
                    <div style={styles.errorMessage}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      {errors.subject}
                    </div>
                  )}
                </div>
                
                {/* Mensagem */}
                <div style={{...styles.formGroup, flex: '1', display: 'flex', flexDirection: 'column'}}>
                  <label style={styles.formLabel}>Mensagem *</label>
                  <textarea
                    name="message"
                    placeholder="Conte-me sobre seu projeto ou como posso ajudar..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur('message', e)}
                    rows={5}
                    style={{
                      ...styles.formTextarea,
                      ...(touched.message && errors.message ? styles.formInputError : {})
                    }}
                  />
                  {touched.message && errors.message && (
                    <div style={styles.errorMessage}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      {errors.message}
                    </div>
                  )}
                </div>

                {/* Botão */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...styles.submitButton,
                    ...(isSubmitting ? styles.submitButtonDisabled : {})
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      Object.assign(e.currentTarget.style, styles.submitButtonHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={styles.spinner}></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                      </svg>
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* WhatsApp Destaque */}
          <div style={styles.whatsappContainer}>
            <div 
              style={styles.whatsappHighlight}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.whatsappHighlightHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h4 style={styles.whatsappTitle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
                Resposta Rápida
              </h4>
              <p style={styles.whatsappText}>
                Para atendimento imediato e discussões técnicas detalhadas,
                entre em contato via WhatsApp. Disponível em horário comercial.
              </p>
              <a 
                href="https://wa.me/+351935479757" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.whatsappButton}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.whatsappButtonHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(37, 211, 102, 0.2)';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;