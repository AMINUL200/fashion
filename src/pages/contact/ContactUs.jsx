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
      answer: 'You can reach our customer support team via email at support@onerepmore.com, phone at +1 (555) 123-4567, or through our live chat feature available 24/7.'
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
    // Simulate API call
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
    { icon: Phone, title: 'Phone', details: '+1 (555) 123-4567', description: 'Available 24/7' },
    { icon: Mail, title: 'Email', details: 'support@onerepmore.com', description: 'Response within 24h' },
    { icon: MapPin, title: 'Location', details: '123 Fitness Street', description: 'Miami, FL 33101' },
    { icon: Clock, title: 'Hours', details: 'Mon-Fri: 9AM - 8PM', description: 'Sat-Sun: 10AM - 6PM' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ===== HERO SECTION - Half Screen ===== */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden bg-[#0B1120] pt-20">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src="/contact.avif"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-40"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-white/10 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full border border-white/5 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Let's Start a{' '} Conversation
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
                
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              Have questions about our premium products? Our team is here to help
              you find the perfect fit for your needs.
            </p>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>Online now</span>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0B1120] bg-primary-light/20 flex items-center justify-center text-xs text-white"
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center">
            <div className="w-1 h-2 bg-white/40 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM & INFO SECTION ===== */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="group p-4 md:p-6 rounded-2xl bg-white border border-[#E5E7EB] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(24,46,114,0.12)] hover:-translate-y-1"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 bg-[#E9EEFF] text-[#182E72] group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={20} className="md:w-6 md:h-6" />
                </div>
                <h4 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="text-sm md:text-base font-semibold text-[#111827] mt-1">
                  {item.details}
                </p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Form & Map Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form - 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#E9EEFF]">
                    <MessageSquare size={22} className="text-[#182E72]" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#111827]">
                      Send us a Message
                    </h2>
                    <p className="text-sm text-[#6B7280]">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                </div>

                {submitSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#16A34A] flex-shrink-0" />
                    <p className="font-medium text-[#16A34A]">
                      Message sent successfully! Our team will contact you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">
                        Full Name <span className="text-[#DC2626]">*</span>
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#182E72]/20 ${
                            errors.full_name ? 'border-[#DC2626]' : 'border-[#E5E7EB] focus:border-[#182E72]'
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.full_name && (
                        <p className="mt-1 text-sm flex items-center gap-1 text-[#DC2626]">
                          <AlertCircle size={14} />
                          {errors.full_name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">
                        Email Address <span className="text-[#DC2626]">*</span>
                      </label>
                      <div className="relative">
                        <AtSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#182E72]/20 ${
                            errors.email ? 'border-[#DC2626]' : 'border-[#E5E7EB] focus:border-[#182E72]'
                          }`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm flex items-center gap-1 text-[#DC2626]">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <PhoneCall size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                        <input
                          type="tel"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#182E72]/20 focus:border-[#182E72] transition-all duration-200"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-1.5">
                        Subject <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#182E72]/20 ${
                          errors.subject ? 'border-[#DC2626]' : 'border-[#E5E7EB] focus:border-[#182E72]'
                        }`}
                        placeholder="How can we help?"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm flex items-center gap-1 text-[#DC2626]">
                          <AlertCircle size={14} />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">
                      Message <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#182E72]/20 resize-none ${
                        errors.message ? 'border-[#DC2626]' : 'border-[#E5E7EB] focus:border-[#182E72]'
                      }`}
                      placeholder="Tell us about your needs..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm flex items-center gap-1 text-[#DC2626]">
                        <AlertCircle size={14} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#182E72] text-white font-medium rounded-xl transition-all duration-300 hover:bg-[#2848A0] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
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

            {/* Map & Social - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map Card */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
                <div className="h-48 md:h-56 bg-[#E9EEFF] relative flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#182E72]/10 flex items-center justify-center">
                      <MapPin size={28} className="text-[#182E72]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#111827]">Our Location</h3>
                    <p className="text-sm text-[#6B7280]">123 Fitness Street, Miami, FL 33101</p>
                  </div>
                  {/* Decorative map lines */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-[#182E72]" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border-2 border-[#182E72]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-[#182E72]" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-[#111827] mb-2">Visit Our Showroom</h4>
                  <p className="text-sm text-[#6B7280] mb-4">
                    Experience our premium products firsthand. Our experts are available
                    to guide you through our complete range.
                  </p>
                  <div className="flex gap-3">
                    <button className="btn-secondary text-sm px-4 py-2">
                      Get Directions
                    </button>
                    <button className="btn-primary text-sm px-4 py-2">
                      Schedule Visit
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                <h4 className="font-semibold text-[#111827] mb-2">Connect With Us</h4>
                <p className="text-sm text-[#6B7280] mb-4">
                  Follow us for the latest updates, offers, and inspiration.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-11 h-11 rounded-xl flex items-center justify-center bg-[#F8FAFC] border border-[#E5E7EB] transition-all duration-300 hover:bg-[#182E72] hover:border-[#182E72] hover:shadow-md hover:-translate-y-1"
                      aria-label={social.label}
                    >
                      <social.icon size={18} className="text-[#6B7280] group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-16 px-4 md:px-8 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-[#E9EEFF] border border-[#182E72]/20">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#182E72]">
                FAQ
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-[#111827] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-[#6B7280] max-w-lg mx-auto">
              Find answers to the most common questions about our products and services.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-300 ${
                  openFaq === faq.id
                    ? 'border-[#182E72] shadow-[0_4px_20px_rgba(24,46,114,0.1)]'
                    : 'border-[#E5E7EB] hover:border-[#182E72]/30'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left group"
                >
                  <span className={`font-medium transition-colors duration-300 ${
                    openFaq === faq.id ? 'text-[#182E72]' : 'text-[#111827]'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-lg transition-all duration-300 flex-shrink-0 ${
                    openFaq === faq.id ? 'bg-[#E9EEFF]' : 'bg-[#F8FAFC] group-hover:bg-[#E9EEFF]'
                  }`}>
                    {openFaq === faq.id ? (
                      <ChevronUp size={18} className="text-[#182E72]" />
                    ) : (
                      <ChevronDown size={18} className="text-[#6B7280] group-hover:text-[#182E72]" />
                    )}
                  </div>
                </button>

                <div
                  className={`px-5 overflow-hidden transition-all duration-300 ${
                    openFaq === faq.id ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-[#6B7280] leading-relaxed border-t border-[#F1F5F9] pt-4">
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
        .btn-primary {
          background: #182E72;
          color: #FFFFFF;
          font-weight: 500;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-primary:hover {
          background: #2848A0;
          box-shadow: 0 8px 24px rgba(24,46,114,0.25);
          transform: translateY(-2px);
        }
        .btn-secondary {
          background: transparent;
          color: #182E72;
          border: 1.5px solid #182E72;
          border-radius: 10px;
          padding: 10px 20px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-secondary:hover {
          background: #182E72;
          color: #FFFFFF;
          border-color: #182E72;
          box-shadow: 0 8px 20px rgba(24,46,114,0.18);
          transform: translateY(-2px);
        }
        .text-primary-light {
          color: #E9EEFF;
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