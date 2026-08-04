import React, { useState, useEffect, useRef } from "react";
import {
  Package,
  Truck,
  Plus,
  Edit,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  MapPin,
  Weight,
  Ruler,
  Mail,
  Lock,
  Globe,
  ToggleLeft,
  ToggleRight,
  Save,
  Eye,
  EyeOff,
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../utils/app";

const DeliveryPartnerMaster = () => {
  // Color Schema - Same as HandleOrderTract (Light mode for admin)
  const colors = {
    primary: "#2563eb", // Dark blue
    primaryHover: "#1d4ed8",
    background: "#f3f4f6", // Light gray background
    cardBg: "#ffffff", // White cards
    border: "#e5e7eb", // Light border
    text: "#111827", // Dark text
    textLight: "#6b7280", // Gray text
    muted: "#6b7280",
    success: "#10b981", // Green
    warning: "#f59e0b", // Orange
    danger: "#ef4444", // Red
    info: "#3b82f6", // Blue
  };

  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedPartnerForStatus, setSelectedPartnerForStatus] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Form data state
  const [formData, setFormData] = useState({
    mode: "live",
    status: true,
    base_url: "",
    live_email: "",
    live_password: "",
    pickup_location: "",
    channel_id: "",
    default_weight: 0.5,
    default_length: 10,
    default_breadth: 10,
    default_height: 5,
    token_cache_minutes: 720,
  });

  const formRef = useRef(null);

  // Fetch delivery partners from API
  const fetchDeliveryPartners = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/shiprocket-settings");
      if (res.data.status) {
        setDeliveryPartners(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch delivery partners");
      }
    } catch (error) {
      console.error("Error fetching delivery partners:", error);
      toast.error(error.response?.data?.message || "Failed to fetch delivery partners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Create new delivery partner
  const createDeliveryPartner = async (data) => {
    try {
      setFormSubmitting(true);
      const res = await api.post("/admin/shiprocket-settings/store", data);
      if (res.data.status) {
        toast.success(res.data.message || "Delivery partner added successfully!");
        await fetchDeliveryPartners(); // Refresh the list
        return true;
      } else {
        toast.error(res.data.message || "Failed to add delivery partner");
        return false;
      }
    } catch (error) {
      console.error("Error creating delivery partner:", error);
      toast.error(error.response?.data?.message || "Failed to add delivery partner. Please try again.");
      return false;
    } finally {
      setFormSubmitting(false);
    }
  };

  // Update existing delivery partner
  const updateDeliveryPartner = async (id, data) => {
    try {
      setFormSubmitting(true);
      const res = await api.put(`/admin/shiprocket-settings/update/${id}`, data);
      if (res.data.status) {
        toast.success(res.data.message || "Delivery partner updated successfully!");
        await fetchDeliveryPartners(); // Refresh the list
        return true;
      } else {
        toast.error(res.data.message || "Failed to update delivery partner");
        return false;
      }
    } catch (error) {
      console.error("Error updating delivery partner:", error);
      toast.error(error.response?.data?.message || "Failed to update delivery partner. Please try again.");
      return false;
    } finally {
      setFormSubmitting(false);
    }
  };

  // Update delivery partner status
  const updatePartnerStatus = async (id, status) => {
    try {
      setStatusUpdating(true);
      const res = await api.post(`/admin/shiprocket-settings/status/${id}`, { status });
      if (res.data.status) {
        toast.success(res.data.message || `Status updated to ${status ? "Active" : "Inactive"}`);
        await fetchDeliveryPartners(); // Refresh the list
        return true;
      } else {
        toast.error(res.data.message || "Failed to update status");
        return false;
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Failed to update status. Please try again.");
      return false;
    } finally {
      setStatusUpdating(false);
    }
  };

  // Delete delivery partner
  const deleteDeliveryPartner = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const res = await api.delete(`/admin/shiprocket-settings/delete/${id}`);
      if (res.data.status) {
        toast.success(res.data.message || `${name} deleted successfully!`);
        await fetchDeliveryPartners(); // Refresh the list
      } else {
        toast.error(res.data.message || "Failed to delete delivery partner");
      }
    } catch (error) {
      console.error("Error deleting delivery partner:", error);
      toast.error(error.response?.data?.message || "Failed to delete delivery partner. Please try again.");
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDeliveryPartners();
  }, []);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [deliveryPartners.length]);

  // Scroll to form when showing
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm]);

  // Reset form
  const resetForm = () => {
    setFormData({
      mode: "live",
      status: true,
      base_url: "",
      live_email: "",
      live_password: "",
      pickup_location: "",
      channel_id: "",
      default_weight: 0.5,
      default_length: 10,
      default_breadth: 10,
      default_height: 5,
      token_cache_minutes: 720,
    });
    setEditingPartner(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle number input change
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  // Add new delivery partner
  const handleAddPartner = () => {
    resetForm();
    setShowForm(true);
    setEditingPartner(null);
  };

  // Edit delivery partner - populate form and scroll to top
  const handleEditPartner = (partner) => {
    setEditingPartner(partner);
    setFormData({
      mode: partner.mode,
      status: partner.status,
      base_url: partner.base_url || "",
      live_email: partner.live_email || "",
      live_password: partner.live_password || "",
      pickup_location: partner.pickup_location || "",
      channel_id: partner.channel_id || "",
      default_weight: partner.default_weight || 0.5,
      default_length: partner.default_length || 10,
      default_breadth: partner.default_breadth || 10,
      default_height: partner.default_height || 5,
      token_cache_minutes: partner.token_cache_minutes || 720,
    });
    setShowForm(true);
  };

  // Open status change popup
  const openStatusPopup = (partner) => {
    setSelectedPartnerForStatus(partner);
    setNewStatus(partner.status);
    setShowStatusPopup(true);
  };

  // Update status via popup
  const updateStatus = async () => {
    if (selectedPartnerForStatus) {
      const success = await updatePartnerStatus(selectedPartnerForStatus.id, newStatus);
      if (success) {
        setShowStatusPopup(false);
        setSelectedPartnerForStatus(null);
      }
    }
  };

  // Save form (Add/Update)
  const handleSavePartner = async () => {
    // Validation
    if (!formData.base_url.trim()) {
      toast.error("Base URL is required");
      return;
    }

    let success = false;
    
    if (editingPartner) {
      // Update existing partner
      success = await updateDeliveryPartner(editingPartner.id, formData);
    } else {
      // Add new partner
      success = await createDeliveryPartner(formData);
    }
    
    if (success) {
      setShowForm(false);
      resetForm();
    }
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    resetForm();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(deliveryPartners.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deliveryPartners.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  // Loading state
  if (loading && deliveryPartners.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <RefreshCw size={48} className="animate-spin mx-auto mb-4" style={{ color: colors.primary }} />
          <p style={{ color: colors.textLight }}>Loading delivery partners...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{ backgroundColor: colors.background }}
        className="min-h-screen py-8 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${colors.primary}15`,
                  border: `1px solid ${colors.primary}30`,
                }}
              >
                <Truck size={24} style={{ color: colors.primary }} />
              </div>
              <div className="flex-1">
                <h1
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: colors.text }}
                >
                  Delivery Partner Master
                </h1>
                <p className="text-lg" style={{ color: colors.textLight }}>
                  Manage delivery partner configurations and settings
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchDeliveryPartners}
                  className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                  }}
                  disabled={loading}
                >
                  <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                  Refresh
                </button>
                <button
                  onClick={handleAddPartner}
                  className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: colors.primary,
                    color: "#FFFFFF",
                  }}
                >
                  <Plus size={18} />
                  Add Partner
                </button>
              </div>
            </div>

            {/* Results Count */}
            <p style={{ color: colors.textLight }}>
              Total {deliveryPartners.length} delivery partners configured
            </p>
          </div>

          {/* Add/Edit Form - Shows at top when add/edit clicked */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 rounded-xl overflow-hidden shadow-lg"
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  className="px-6 py-4 border-b flex justify-between items-center"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: `${colors.primary}05`,
                  }}
                >
                  <h2
                    className="text-xl font-bold"
                    style={{ color: colors.text }}
                  >
                    {editingPartner ? "Edit Delivery Partner" : "Add New Delivery Partner"}
                  </h2>
                  <button
                    onClick={handleCancelForm}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} style={{ color: colors.textLight }} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mode */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.text }}
                      >
                        Mode
                      </label>
                      <select
                        name="mode"
                        value={formData.mode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: colors.background,
                          border: `1px solid ${colors.border}`,
                          color: colors.text,
                        }}
                      >
                        <option value="live">Live</option>
                        <option value="test">Test</option>
                      </select>
                    </div>

                    {/* Status Toggle */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.text }}
                      >
                        Status
                      </label>
                      <button
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, status: !prev.status }))
                        }
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
                        style={{
                          backgroundColor: colors.background,
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        {formData.status ? (
                          <ToggleRight size={22} style={{ color: colors.success }} />
                        ) : (
                          <ToggleLeft size={22} style={{ color: colors.textLight }} />
                        )}
                        <span style={{ color: colors.text }}>
                          {formData.status ? "Active" : "Inactive"}
                        </span>
                      </button>
                    </div>

                    {/* Base URL */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.text }}
                      >
                        Base URL *
                      </label>
                      <div className="flex items-center gap-2">
                        <Globe size={18} style={{ color: colors.textLight }} />
                        <input
                          type="text"
                          name="base_url"
                          value={formData.base_url}
                          onChange={handleInputChange}
                          placeholder="https://api.example.com/v1"
                          className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: colors.background,
                            border: `1px solid ${colors.border}`,
                            color: colors.text,
                          }}
                        />
                      </div>
                    </div>

                    {/* Live Email */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.text }}
                      >
                        Email
                      </label>
                      <div className="flex items-center gap-2">
                        <Mail size={18} style={{ color: colors.textLight }} />
                        <input
                          type="email"
                          name="live_email"
                          value={formData.live_email}
                          onChange={handleInputChange}
                          placeholder="api@example.com"
                          className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: colors.background,
                            border: `1px solid ${colors.border}`,
                            color: colors.text,
                          }}
                        />
                      </div>
                    </div>

                    {/* Live Password */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.text }}
                      >
                        Password
                      </label>
                      <div className="flex items-center gap-2">
                        <Lock size={18} style={{ color: colors.textLight }} />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="live_password"
                          value={formData.live_password}
                          onChange={handleInputChange}
                          placeholder="********"
                          className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: colors.background,
                            border: `1px solid ${colors.border}`,
                            color: colors.text,
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-2 rounded-lg hover:bg-gray-100"
                        >
                          {showPassword ? (
                            <EyeOff size={18} style={{ color: colors.textLight }} />
                          ) : (
                            <Eye size={18} style={{ color: colors.textLight }} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Pickup Location */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.text }}
                      >
                        Pickup Location
                      </label>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} style={{ color: colors.textLight }} />
                        <input
                          type="text"
                          name="pickup_location"
                          value={formData.pickup_location}
                          onChange={handleInputChange}
                          placeholder="Primary"
                          className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: colors.background,
                            border: `1px solid ${colors.border}`,
                            color: colors.text,
                          }}
                        />
                      </div>
                    </div>

                    {/* Channel ID */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.text }}
                      >
                        Channel ID
                      </label>
                      <input
                        type="text"
                        name="channel_id"
                        value={formData.channel_id}
                        onChange={handleInputChange}
                        placeholder="CH123456"
                        className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: colors.background,
                          border: `1px solid ${colors.border}`,
                          color: colors.text,
                        }}
                      />
                    </div>

                    {/* Default Weight */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.text }}
                      >
                        Default Weight (kg)
                      </label>
                      <div className="flex items-center gap-2">
                        <Weight size={18} style={{ color: colors.textLight }} />
                        <input
                          type="number"
                          name="default_weight"
                          value={formData.default_weight}
                          onChange={handleNumberChange}
                          step="0.1"
                          className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: colors.background,
                            border: `1px solid ${colors.border}`,
                            color: colors.text,
                          }}
                        />
                      </div>
                    </div>

                    {/* Dimensions Group */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.text }}
                      >
                        Default Package Dimensions (cm)
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Ruler size={18} style={{ color: colors.textLight }} />
                            <input
                              type="number"
                              name="default_length"
                              value={formData.default_length}
                              onChange={handleNumberChange}
                              placeholder="Length"
                              className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                              style={{
                                backgroundColor: colors.background,
                                border: `1px solid ${colors.border}`,
                                color: colors.text,
                              }}
                            />
                          </div>
                          <p className="text-xs mt-1" style={{ color: colors.textLight }}>
                            Length
                          </p>
                        </div>
                        <div>
                          <input
                            type="number"
                            name="default_breadth"
                            value={formData.default_breadth}
                            onChange={handleNumberChange}
                            placeholder="Breadth"
                            className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                            style={{
                              backgroundColor: colors.background,
                              border: `1px solid ${colors.border}`,
                              color: colors.text,
                            }}
                          />
                          <p className="text-xs mt-1" style={{ color: colors.textLight }}>
                            Breadth
                          </p>
                        </div>
                        <div>
                          <input
                            type="number"
                            name="default_height"
                            value={formData.default_height}
                            onChange={handleNumberChange}
                            placeholder="Height"
                            className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                            style={{
                              backgroundColor: colors.background,
                              border: `1px solid ${colors.border}`,
                              color: colors.text,
                            }}
                          />
                          <p className="text-xs mt-1" style={{ color: colors.textLight }}>
                            Height
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Token Cache Minutes */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.text }}
                      >
                        Token Cache (minutes)
                      </label>
                      <div className="flex items-center gap-2">
                        <Clock size={18} style={{ color: colors.textLight }} />
                        <input
                          type="number"
                          name="token_cache_minutes"
                          value={formData.token_cache_minutes}
                          onChange={handleNumberChange}
                          className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: colors.background,
                            border: `1px solid ${colors.border}`,
                            color: colors.text,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Buttons */}
                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t" style={{ borderColor: colors.border }}>
                    <button
                      onClick={handleCancelForm}
                      className="px-4 py-2 rounded-lg transition-all"
                      style={{
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        color: colors.textLight,
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePartner}
                      disabled={formSubmitting}
                      className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
                      style={{
                        backgroundColor: colors.primary,
                        color: "#FFFFFF",
                      }}
                    >
                      {formSubmitting ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      {editingPartner ? "Update Partner" : "Add Partner"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delivery Partners List */}
          <div
            className="rounded-xl overflow-hidden shadow-sm"
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="max-w-[400px] md:max-w-[700px] lg:max-w-[1140px] overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr style={{ backgroundColor: `${colors.background}` }}>
                    <th
                      className="px-6 py-4 text-left text-sm font-semibold"
                      style={{ color: colors.textLight }}
                    >
                      ID
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-semibold"
                      style={{ color: colors.textLight }}
                    >
                      Mode
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-semibold"
                      style={{ color: colors.textLight }}
                    >
                      Base URL
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-semibold"
                      style={{ color: colors.textLight }}
                    >
                      Status
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm font-semibold"
                      style={{ color: colors.textLight }}
                    >
                      Added On
                    </th>
                    {/* <th
                      className="px-6 py-4 text-left text-sm font-semibold"
                      style={{ color: colors.textLight }}
                    >
                      Actions
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((partner) => (
                    <tr
                      key={partner.id}
                      className="border-t"
                      style={{ borderColor: colors.border }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: `${colors.primary}10`,
                            }}
                          >
                            <Truck size={16} style={{ color: colors.primary }} />
                          </div>
                          <span
                            className="font-semibold"
                            style={{ color: colors.text }}
                          >
                            #{partner.id}
                          </span>
                        </div>
                       </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor:
                              partner.mode === "live"
                                ? `${colors.success}15`
                                : `${colors.warning}15`,
                            color:
                              partner.mode === "live" ? colors.success : colors.warning,
                          }}
                        >
                          {partner.mode === "live" ? "Live" : "Test"}
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-sm"
                          style={{ color: colors.textLight }}
                        >
                          {partner.base_url?.length > 40
                            ? `${partner.base_url.substring(0, 40)}...`
                            : partner.base_url || "N/A"}
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openStatusPopup(partner)}
                          className="flex items-center gap-2 px-2 py-1 rounded-full transition-all hover:scale-105"
                          style={{
                            backgroundColor: partner.status
                              ? `${colors.success}15`
                              : `${colors.danger}15`,
                          }}
                        >
                          {partner.status ? (
                            <CheckCircle size={14} style={{ color: colors.success }} />
                          ) : (
                            <AlertCircle size={14} style={{ color: colors.danger }} />
                          )}
                          <span
                            className="text-sm font-medium"
                            style={{
                              color: partner.status ? colors.success : colors.danger,
                            }}
                          >
                            {partner.status ? "Active" : "Inactive"}
                          </span>
                        </button>
                       </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-sm"
                          style={{ color: colors.textLight }}
                        >
                          {formatDate(partner.created_at)}
                        </span>
                       </td>
                      {/* <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditPartner(partner)}
                            className="p-2 rounded-lg transition-all hover:scale-105"
                            title="Edit Partner"
                            style={{
                              color: colors.info,
                              backgroundColor: `${colors.info}10`,
                            }}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => deleteDeliveryPartner(partner.id, `Partner #${partner.id}`)}
                            className="p-2 rounded-lg transition-all hover:scale-105"
                            title="Delete Partner"
                            style={{
                              color: colors.danger,
                              backgroundColor: `${colors.danger}10`,
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                       </td> */}
                     </tr>
                  ))}
                </tbody>
               </table>
            </div>

            {/* Pagination Section */}
            {deliveryPartners.length > 0 && (
              <div
                className="px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
                style={{ borderColor: colors.border }}
              >
                {/* Items per page selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: colors.textLight }}>
                    Show:
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm"
                    style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm" style={{ color: colors.textLight }}>
                    per page
                  </span>
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-2">
                  {/* Previous button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && goToPage(page)}
                        className={`min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? 'text-white'
                            : typeof page === 'number'
                            ? 'hover:bg-gray-100'
                            : 'cursor-default'
                        }`}
                        style={{
                          backgroundColor: currentPage === page ? colors.primary : 'transparent',
                          color: currentPage === page ? '#FFFFFF' : colors.text,
                          border: currentPage === page ? 'none' : `1px solid ${colors.border}`,
                        }}
                        disabled={typeof page !== 'number'}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Info text */}
                <div className="text-sm" style={{ color: colors.textLight }}>
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, deliveryPartners.length)} of {deliveryPartners.length} entries
                </div>
              </div>
            )}

            {/* Empty State */}
            {deliveryPartners.length === 0 && !loading && (
              <div className="text-center py-12">
                <Truck
                  size={48}
                  className="mx-auto mb-4"
                  style={{ color: colors.textLight }}
                />
                <p style={{ color: colors.textLight }}>
                  No delivery partners configured
                </p>
                <button
                  onClick={handleAddPartner}
                  className="mt-4 px-4 py-2 rounded-lg inline-flex items-center gap-2"
                  style={{
                    backgroundColor: colors.primary,
                    color: "#FFFFFF",
                  }}
                >
                  <Plus size={16} />
                  Add your first partner
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Change Popup Modal */}
      <AnimatePresence>
        {showStatusPopup && selectedPartnerForStatus && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowStatusPopup(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl"
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  className="px-6 py-4 border-b flex justify-between items-center"
                  style={{ borderColor: colors.border }}
                >
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                    Update Status
                  </h3>
                  <button
                    onClick={() => setShowStatusPopup(false)}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X size={20} style={{ color: colors.textLight }} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{
                        backgroundColor: `${colors.primary}10`,
                      }}
                    >
                      <Truck size={28} style={{ color: colors.primary }} />
                    </div>
                    <h4 className="text-lg font-semibold" style={{ color: colors.text }}>
                      Partner #{selectedPartnerForStatus.id}
                    </h4>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                      Change the status of this delivery partner
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg mb-6"
                    style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <span style={{ color: colors.text }}>Status</span>
                    <button
                      onClick={() => setNewStatus(!newStatus)}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg transition-all"
                      disabled={statusUpdating}
                    >
                      {newStatus ? (
                        <>
                          <ToggleRight size={24} style={{ color: colors.success }} />
                          <span style={{ color: colors.success }}>Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={24} style={{ color: colors.textLight }} />
                          <span style={{ color: colors.textLight }}>Inactive</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowStatusPopup(false)}
                      className="flex-1 px-4 py-2 rounded-lg transition-all"
                      style={{
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        color: colors.textLight,
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={updateStatus}
                      disabled={statusUpdating}
                      className="flex-1 px-4 py-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: colors.primary,
                        color: "#FFFFFF",
                      }}
                    >
                      {statusUpdating ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        "Update Status"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeliveryPartnerMaster;