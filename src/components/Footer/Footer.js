import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Home,
  Calendar,
  BookOpen,
  Users,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [formState, setFormState] = useState({
    isSubmitting: false,
    error: "",
    success: false,
    touched: { email: false, message: false },
  });

  const email = process.env.REACT_APP_EMAILID;

  const sendEmail = async (templateParams) => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

    const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
    );

    return response;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    return errors;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [field]: true },
      error: "",
      success: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({
        ...prev,
        error: Object.values(errors)[0],
        touched: { email: true, message: true },
      }));
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true, error: "", success: false }));

    try {
      const templateParams = {
        to_email: email,
        from_name: formData.email,
        message: formData.message,
      };

      const response = await sendEmail(templateParams);

      if (response.status === 200) {
        setFormData({ email: "", message: "" });
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          success: true,
          touched: { email: false, message: false },
        }));
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: "Failed to send message. Please try again later.",
      }));
    }
  };

  useEffect(() => {
    if (formState.success || formState.error) {
      const timer = setTimeout(() => {
        setFormState((prev) => ({ ...prev, success: false, error: "" }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [formState.success, formState.error]);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/events", label: "Events", icon: Calendar },
    { to: "/blogs", label: "Blogs", icon: BookOpen },
    { to: "/team", label: "Team", icon: Users },
  ];

  const socialLinks = [
    { href: "https://twitter.com/csau_ceg", icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
    { href: "https://www.facebook.com/csau.ceg/", icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
    { href: "https://www.instagram.com/csau_ceg/", icon: Instagram, label: "Instagram", color: "hover:text-pink-500" },
    { href: "https://www.linkedin.com/school/computer-society-of-anna-university/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-700" },
  ];

  const getInputError = (field) => {
    if (!formState.touched[field]) return "";
    const errors = validateForm();
    return errors[field] || "";
  };

  return (
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Section */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div>
                    <h2 className="ml-2 text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CSAU</h2>
                    <p className="ml-2 text-gray-400 text-sm">Computer Society</p>
                  </div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            getInputError("email") ? "border-red-500 focus:ring-red-500/50" : "border-gray-600 focus:ring-purple-500/50 focus:border-purple-500"
                        }`}
                    />
                    {getInputError("email") && (
                        <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{getInputError("email")}</span>
                        </p>
                    )}
                  </div>
                  <div className="relative">
                  <textarea
                      placeholder="Tell us how we can help you..."
                      rows="3"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`w-full p-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                          getInputError("message") ? "border-red-500 focus:ring-red-500/50" : "border-gray-600 focus:ring-purple-500/50 focus:border-purple-500"
                      }`}
                  />
                    {getInputError("message") && (
                        <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{getInputError("message")}</span>
                        </p>
                    )}
                  </div>
                </div>
                <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        formState.isSubmitting
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] active:scale-[0.98]"
                    } shadow-lg hover:shadow-xl`}
                >
                  {formState.isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                  ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Contact Us</span>
                      </>
                  )}
                </button>
                {(formState.error || formState.success) && (
                    <div
                        className={`p-4 rounded-xl flex items-center space-x-2 transition-all duration-300 ${
                            formState.success
                                ? "bg-green-500/20 border border-green-500/30 text-green-300"
                                : "bg-red-500/20 border border-red-500/30 text-red-300"
                        } animate-in slide-in-from-top-2`}
                    >
                      {formState.success ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                      <span className="text-sm font-medium">
                    {formState.success ? "Message sent successfully!" : formState.error}
                  </span>
                    </div>
                )}
              </form>
            </div>

            {/* Right Section */}
            <div className="space-y-8">
              <div className="flex-col items-center mb-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-200 text-center">Quick Links</h3>
                <nav className="grid grid-cols-2 gap-3">
                  {navLinks.map((link, index) => (
                      <a
                          key={link.to}
                          href={link.to}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-gray-700 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group"
                          style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <link.icon className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        <span className="text-gray-300 group-hover:text-white transition-colors">{link.label}</span>
                      </a>
                  ))}
                </nav>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-200 text-center">Connect With Us</h3>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => (
                      <a
                          key={social.href}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-gray-700 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color}`}
                          style={{ animationDelay: `${index * 100}ms` }}
                          aria-label={social.label}
                      >
                        <social.icon className="h-6 w-6" />
                      </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 Computer Society of Anna University. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Footer;