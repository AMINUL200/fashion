import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ArrowRight,
  User,
  AtSign,
  PhoneCall,
  Globe,
  Building2
} from 'lucide-react';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: 'What are your shipping options?',
      answer: 'We offer standard shipping (3-5 business days), express shipping (1-2 business days), and free shipping on orders over $100. International shipping is available to select countries.'
    },
    {
      id: 2,
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.'
    },
    {
      id: 3,
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all products. Items must be returned in original condition with tags attached. Returns are processed within 3-5 business days.'
    },
    {
      id: 4,
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to select countries worldwide. International shipping rates and delivery times vary by destination. Please check our shipping policy for more details.'
    },
    {
      id: 5,
      question: 'How can I contact customer support?',
      answer: 'You can reach our customer support team via email at support@apsara.com, phone at +91 7699367737, or through our live chat feature available 24/7.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name?.trim()) newErrors.full_name = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject?.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message?.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitSuccess(true);
      setFormData({ full_name: '', email: '', phone_number: '', subject: '', message: '' });
      toast.success('Message sent successfully!');
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', details: '+91 7699367737', description: 'Available 24/7' },
    { icon: Mail, title: 'Email', details: 'support@apsara.com', description: 'Response within 24h' },
    { icon: MapPin, title: 'Address', details: 'Habra NRC Road', description: 'North 24 Parganas, West Bengal' },
    { icon: Clock, title: 'Hours', details: 'Mon-Sat: 10AM - 8PM', description: 'Sunday: Closed' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* ===== HERO SECTION - Gold Theme ===== */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden pt-20" style={{ background: 'linear-gradient(135deg, #B67E00 0%, #D19701 30%, #FFF19C 60%, #D19701 80%, #B67E00 100%)' }}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-white/20 animate-pulse" />
          <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full border border-white/10 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          
          {/* Decorative dots pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full" />
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full" />
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full" />
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <span className="text-xs font-semibold uppercase tracking-wider text-white">Contact Us</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Let's Start a{' '}
              <span className="text-[#5A3A00]">Conversation</span>
            </h1>
            <p className="text-lg text-white/90 max-w-lg leading-relaxed">
              Have questions about our premium fashion collection? Our team is here to help
              you find the perfect style for every occasion.
            </p>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#5A3A00] animate-pulse" />
                <span>Online now</span>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-xs text-white"
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFF19C] to-transparent opacity-50" />

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM & INFO SECTION - Gold Theme ===== */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Contact Info Cards - Gold Theme */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="group p-4 md:p-6 rounded-2xl bg-white border border-[#EFE7C8] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(209,151,1,0.15)] hover:-translate-y-1 hover:border-[#D19701]"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
                  <item.icon size={20} className="md:w-6 md:h-6 text-[#5A3A00]" />
                </div>
                <h4 className="text-xs font-medium text-[#666666] uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="text-sm md:text-base font-semibold text-[#111111] mt-1">
                  {item.details}
                </p>
                <p className="text-xs text-[#999999] mt-0.5">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Form & Map Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form - 3 columns - Gold Theme */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
                    <MessageSquare size={22} className="text-[#5A3A00]" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-[#111111]">
                      Send us a Message
                    </h2>
                    <p className="text-sm text-[#666666]">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                </div>

                {submitSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-[#D19701]/10 border border-[#D19701]/30 flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#D19701] flex-shrink-0" />
                    <p className="font-medium text-[#5A3A00]">
                      Message sent successfully! Our team will contact you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Full Name <span className="text-[#D19701]">*</span>
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-[14px] bg-[#FDFBD4] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D19701]/20 ${
                            errors.full_name ? 'border-[#D19701]' : 'border-[#EFE7C8] focus:border-[#D19701]'
                          } text-[#111111] placeholder:text-[#999999]`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.full_name && (
                        <p className="mt-1 text-sm flex items-center gap-1 text-[#B67E00]">
                          <AlertCircle size={14} />
                          {errors.full_name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Email Address <span className="text-[#D19701]">*</span>
                      </label>
                      <div className="relative">
                        <AtSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-[14px] bg-[#FDFBD4] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D19701]/20 ${
                            errors.email ? 'border-[#D19701]' : 'border-[#EFE7C8] focus:border-[#D19701]'
                          } text-[#111111] placeholder:text-[#999999]`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm flex items-center gap-1 text-[#B67E00]">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <PhoneCall size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                        <input
                          type="tel"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-[#FDFBD4] border border-[#EFE7C8] focus:outline-none focus:ring-2 focus:ring-[#D19701]/20 focus:border-[#D19701] transition-all duration-200 text-[#111111] placeholder:text-[#999999]"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1.5">
                        Subject <span className="text-[#D19701]">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D19701]/20 ${
                          errors.subject ? 'border-[#D19701]' : 'border-[#EFE7C8] focus:border-[#D19701]'
                        } text-[#111111] placeholder:text-[#999999]`}
                        placeholder="How can we help?"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm flex items-center gap-1 text-[#B67E00]">
                          <AlertCircle size={14} />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1.5">
                      Message <span className="text-[#D19701]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`w-full px-4 py-3 rounded-[14px] bg-[#FDFBD4] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D19701]/20 resize-none ${
                        errors.message ? 'border-[#D19701]' : 'border-[#EFE7C8] focus:border-[#D19701]'
                      } text-[#111111] placeholder:text-[#999999]`}
                      placeholder="Tell us about your needs..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm flex items-center gap-1 text-[#B67E00]">
                        <AlertCircle size={14} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 font-heading font-semibold text-[#5A3A00] rounded-[14px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                      border: '1px solid #C38A00',
                      boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#5A3A00] border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Social - 2 columns - Gold Theme */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map Card - Gold Theme */}
              <div className="bg-white rounded-2xl border border-[#EFE7C8] overflow-hidden shadow-sm">
                <div className="h-48 md:h-56 relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FDFBD4 0%, #FFF19C 100%)' }}>
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
                      <MapPin size={28} className="text-[#5A3A00]" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[#111111]">Our Location</h3>
                    <p className="text-sm text-[#666666] max-w-xs mx-auto">Habra NRC Road, Dhanar Chatal, Jadssore Road, North 24 Parganas</p>
                  </div>
                  {/* Decorative map lines */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-[#D19701]" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border-2 border-[#D19701]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-[#D19701]" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-heading font-semibold text-[#111111] mb-2">Visit Our Showroom</h4>
                  <p className="text-sm text-[#666666] mb-4">
                    Experience our premium fashion collection firsthand. Our experts are available
                    to guide you through our complete range.
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-[14px] font-medium transition-all duration-300 hover:shadow-lg" style={{
                      background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                      color: '#5A3A00',
                      border: '1px solid #C38A00',
                    }}>
                      Get Directions
                    </button>
                    <button className="px-4 py-2 rounded-[14px] font-medium border border-[#D19701] text-[#D19701] hover:bg-[#FDFBD4] transition-all duration-300">
                      Schedule Visit
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Media Card - Gold Theme */}
              <div className="bg-white rounded-2xl border border-[#EFE7C8] p-6 shadow-sm">
                <h4 className="font-heading font-semibold text-[#111111] mb-2">Connect With Us</h4>
                <p className="text-sm text-[#666666] mb-4">
                  Follow us for the latest updates, offers, and inspiration.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-11 h-11 rounded-[14px] flex items-center justify-center border border-[#EFE7C8] transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      style={{ background: 'linear-gradient(90deg, #FDFBD4, #FFFFFF)' }}
                      aria-label={social.label}
                    >
                      <social.icon size={18} className="text-[#666666] group-hover:text-[#D19701] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION - Gold Theme ===== */}
      <section className="py-16 px-4 md:px-8 bg-[#FDFBD4] border-t border-[#EFE7C8]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[#D19701]/30" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701, #FFF19C)' }}>
              <span className="text-sm font-heading font-semibold uppercase tracking-wider text-[#5A3A00]">
                FAQ
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-[#111111] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-[#666666] max-w-lg mx-auto">
              Find answers to the most common questions about our products and services.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`rounded-[14px] border transition-all duration-300 bg-white ${
                  openFaq === faq.id
                    ? 'border-[#D19701] shadow-[0_4px_20px_rgba(209,151,1,0.15)]'
                    : 'border-[#EFE7C8] hover:border-[#D19701]/50'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left group"
                >
                  <span className={`font-heading font-medium transition-colors duration-300 ${
                    openFaq === faq.id ? 'text-[#D19701]' : 'text-[#111111]'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-lg transition-all duration-300 flex-shrink-0 ${
                    openFaq === faq.id ? 'bg-[#FDFBD4]' : 'bg-[#FDFBD4] group-hover:bg-[#FFF19C]'
                  }`}>
                    {openFaq === faq.id ? (
                      <ChevronUp size={18} className="text-[#D19701]" />
                    ) : (
                      <ChevronDown size={18} className="text-[#666666] group-hover:text-[#D19701]" />
                    )}
                  </div>
                </button>

                <div
                  className={`px-5 overflow-hidden transition-all duration-300 ${
                    openFaq === faq.id ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-[#666666] leading-relaxed border-t border-[#EFE7C8] pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;