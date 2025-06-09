import React, { useState, useEffect } from "react";
import {
    User,
    Mail,
    GraduationCap,
    Hash,
    Calendar,
    Code,
    MessageSquare,
    Send,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Footer from "../Footer/Footer";

const JoinUs = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        department: "",
        rollNumber: "",
        yearOfStudy: "",
        domainPreference: "",
        reason: "",
    });

    const [formState, setFormState] = useState({
        isSubmitting: false,
        error: "",
        success: false,
        touched: {},
    });

    const recipientEmail = process.env.REACT_APP_EMAILID;

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

        if (!formData.fullName.trim()) {
            errors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (!formData.department.trim()) {
            errors.department = "Department is required";
        }

        if (!formData.rollNumber.trim()) {
            errors.rollNumber = "Roll number is required";
        }

        if (!formData.yearOfStudy) {
            errors.yearOfStudy = "Year of study is required";
        }

        if (!formData.domainPreference) {
            errors.domainPreference = "Domain preference is required";
        }

        if (!formData.reason.trim()) {
            errors.reason = "Please tell us why you want to join";
        } else if (formData.reason.trim().length < 20) {
            errors.reason = "Please provide more details (at least 20 characters)";
        }

        return errors;
    };

    const handleInputChange = (field, value) => {
        // Limit reason field to 500 characters
        if (field === 'reason' && value.length > 500) {
            return;
        }

        setFormData((prev) => ({ ...prev, [field]: value }));
        setFormState((prev) => ({
            ...prev,
            touched: { ...prev.touched, [field]: true },
            error: "",
            success: false,
        }));
    };

    const handleSubmit = async () => {
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setFormState((prev) => ({
                ...prev,
                error: Object.values(errors)[0],
                touched: Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
            }));
            return;
        }

        setFormState((prev) => ({ ...prev, isSubmitting: true, error: "", success: false }));

        try {
            const templateParams = {
                to_email: recipientEmail,
                from_name: formData.fullName,
                from_email: formData.email,
                department: formData.department,
                roll_number: formData.rollNumber,
                year_of_study: formData.yearOfStudy,
                domain_preference: formData.domainPreference,
                message: formData.reason,
                subject: `New Membership Application from ${formData.fullName}`,
                reply_to: formData.email,
            };

            const response = await sendEmail(templateParams);

            if (response.status === 200) {
                setFormData({
                    fullName: "",
                    email: "",
                    department: "",
                    rollNumber: "",
                    yearOfStudy: "",
                    domainPreference: "",
                    reason: "",
                });
                setFormState({
                    isSubmitting: false,
                    success: true,
                    error: "",
                    touched: {},
                });
            }
        } catch (error) {
            setFormState((prev) => ({
                ...prev,
                isSubmitting: false,
                error: "Failed to submit application. Please try again later.",
            }));
        }
    };

    useEffect(() => {
        if (formState.success || formState.error) {
            const timer = setTimeout(() => {
                setFormState((prev) => ({ ...prev, success: false, error: "" }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [formState.success, formState.error]);

    const getInputError = (field) => {
        if (!formState.touched[field]) return "";
        const errors = validateForm();
        return errors[field] || "";
    };

    return (
        <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden mt-7">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}} />
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Join Our Team
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        We're always looking for passionate individuals to grow with us. Fill out the form and let's build something impactful together.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
                    <div className="space-y-6">
                        {/* Name and Email Row */}
                        {/* Full Name + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        getInputError("fullName")
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-gray-600 focus:ring-purple-500/50 focus:border-purple-500"
                                    }`}
                                />
                                {getInputError("fullName") && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{getInputError("fullName")}</span>
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        getInputError("email")
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-gray-600 focus:ring-purple-500/50 focus:border-purple-500"
                                    }`}
                                />
                                {getInputError("email") && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{getInputError("email")}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Department + Roll Number */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Department */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <GraduationCap className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Department"
                                    value={formData.department}
                                    onChange={(e) => handleInputChange("department", e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        getInputError("department")
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-gray-600 focus:ring-purple-500/50 focus:border-purple-500"
                                    }`}
                                />
                                {getInputError("department") && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{getInputError("department")}</span>
                                    </p>
                                )}
                            </div>

                            {/* Roll Number */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Hash className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Roll Number"
                                    value={formData.rollNumber}
                                    onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        getInputError("rollNumber")
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-gray-600 focus:ring-purple-500/50 focus:border-purple-500"
                                    }`}
                                />
                                {getInputError("rollNumber") && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{getInputError("rollNumber")}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Year of Study + Domain Preference */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Year of Study */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Year of Study (e.g., 2nd Year)"
                                    value={formData.yearOfStudy}
                                    onChange={(e) => handleInputChange("yearOfStudy", e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        getInputError("yearOfStudy")
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-gray-600 focus:ring-purple-500/50 focus:border-purple-500"
                                    }`}
                                />
                                {getInputError("yearOfStudy") && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{getInputError("yearOfStudy")}</span>
                                    </p>
                                )}
                            </div>

                            {/* Domain Preference */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Code className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Preferred Domain (e.g., Web, AI)"
                                    value={formData.domainPreference}
                                    onChange={(e) => handleInputChange("domainPreference", e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                                        getInputError("domainPreference")
                                            ? "border-red-500 focus:ring-red-500/50"
                                            : "border-gray-600 focus:ring-purple-500/50 focus:border-purple-500"
                                    }`}
                                />
                                {getInputError("domainPreference") && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{getInputError("domainPreference")}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Reason Textarea */}
                        <div className="relative mt-6">
                            <div className="absolute top-4 left-4 pointer-events-none">
                                <MessageSquare className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                                placeholder="Why do you want to join CSAU? Tell us about your interests, goals, and what you hope to contribute..."
                                rows="4"
                                value={formData.reason}
                                onChange={(e) => handleInputChange("reason", e.target.value)}
                                className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                                    getInputError("reason")
                                        ? "border-red-500 focus:ring-red-500/50"
                                        : "border-gray-600 focus:ring-purple-500/50 focus:border-purple-500"
                                }`}
                            />
                            <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                                {formData.reason.length}/500
                            </div>
                            {getInputError("reason") && (
                                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{getInputError("reason")}</span>
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
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
                                    <span>Submitting Application...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5" />
                                    <span>Submit Application</span>
                                </>
                            )}
                        </button>

                        {/* Status Messages */}
                        {(formState.error || formState.success) && (
                            <div
                                className={`p-4 rounded-xl flex items-center space-x-2 transition-all duration-300 ${
                                    formState.success
                                        ? "bg-green-500/20 border border-green-500/30 text-green-300"
                                        : "bg-red-500/20 border border-red-500/30 text-red-300"
                                }`}
                            >
                                {formState.success ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                <span className="text-sm font-medium">
                  {formState.success
                      ? "Application submitted successfully! We'll get back to you soon."
                      : formState.error
                  }
                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;