import React, { useEffect, useState } from 'react';
import './App.css';

/* global $ */

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    propertyLocation: '',
    preferredOffice: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (/[0-9]/.test(name)) return 'Name cannot contain numbers';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return 'Phone number is required';
    if (!/^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s/g, ''))) return 'Please enter a valid phone number';
    return '';
  };

  const validateSelect = (value, fieldName) => {
    if (!value || value === '') return `${fieldName} is required`;
    return '';
  };

  const validateTerms = (terms) => {
    if (!terms) return 'You must accept the terms and conditions';
    return '';
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle field blur (touched)
  const handleFieldBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
        error = validateName(fieldValue);
        break;
      case 'phone':
        error = validatePhone(fieldValue);
        break;
      case 'propertyLocation':
        error = validateSelect(fieldValue, 'Property Location');
        break;
      case 'preferredOffice':
        error = validateSelect(fieldValue, 'Preferred Office');
        break;
      case 'terms':
        error = validateTerms(fieldValue);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    
    newErrors.firstName = validateName(formData.firstName);
    newErrors.lastName = validateName(formData.lastName);
    newErrors.phone = validatePhone(formData.phone);
    newErrors.propertyLocation = validateSelect(formData.propertyLocation, 'Property Location');
    newErrors.preferredOffice = validateSelect(formData.preferredOffice, 'Preferred Office');
    newErrors.terms = validateTerms(formData.terms);

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const data = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone,
        propertyLocation: formData.propertyLocation,
        preferredOffice: formData.preferredOffice,
        terms: formData.terms
      };
      console.log('Form submitted:', data);
      alert('Form submitted successfully! Check console for data.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        propertyLocation: '',
        preferredOffice: '',
        terms: false
      });
      setErrors({});
      setTouched({});
      
      // Reset Select2 dropdowns
      if (window.$ && window.$.fn.select2) {
        $('#propertyLocation').val('').trigger('change');
        $('#preferredOffice').val('').trigger('change');
      }
    } else {
      // Mark all fields as touched to show errors
      setTouched({
        firstName: true,
        lastName: true,
        phone: true,
        propertyLocation: true,
        preferredOffice: true,
        terms: true
      });
      
      // Show specific message for unchecked terms
      if (!formData.terms) {
        alert('Please accept the terms and conditions to submit the form.');
      }
    }
  };

  useEffect(() => {
    // Fallback list of Indian cities
    const FALLBACK_CITIES = ["Agartala","Agra","Ahmedabad","Ahmednagar","Aizawl","Ajmer","Aligarh","Almora","Alwar","Ambala","Amravati","Amritsar","Anand","Anantapur","Ankleshwar","Asansol","Aurangabad","Ayodhya","Baddi","Baharampur","Bangalore","Bareilly","Belagavi","Bellary","Bhagalpur","Bharatpur","Bharuch","Bhavnagar","Bhilai","Bhilwara","Bhimavaram","Bhopal","Bhubaneswar","Bhuj","Bikaner","Bilaspur","Bokaro","Chandigarh","Chennai","Coimbatore","Cuttack","Darbhanga","Dehradun","Delhi","Dhanbad","Dharwad","Dibrugarh","Durg","Durgapur","Erode","Faridabad","Firozabad","Gandhinagar","Gaya","Ghaziabad","Gorakhpur","Greater Noida","Guntur","Gurgaon","Guwahati","Gwalior","Haldwani","Hisar","Hubballi","Hyderabad","Indore","Jabalpur","Jaipur","Jalandhar","Jammu","Jamnagar","Jamshedpur","Jhansi","Jodhpur","Kakinada","Kalyan","Kannur","Kanpur","Karimnagar","Karur","Katihar","Kochi","Kolhapur","Kolkata","Kollam","Korba","Kota","Kottayam","Kurnool","Lucknow","Ludhiana","Madurai","Mangalore","Mathura","Meerut","Moradabad","Mumbai","Muzaffarpur","Mysuru","Nagpur","Nanded","Nashik","Nellore","Noida","Palakkad","Panchkula","Panipat","Panaji","Patiala","Patna","Pondicherry","Prayagraj","Puducherry","Pune","Raipur","Rajahmundry","Rajkot","Ranchi","Raurkela","Rewa","Rohtak","Saharanpur","Salem","Sangli","Satara","Shillong","Shimla","Sikar","Siliguri","Solapur","Srinagar","Surat","Thane","Thiruvananthapuram","Thrissur","Tiruchirappalli","Tirunelveli","Tirupati","Udaipur","Ujjain","Vadodara","Varanasi","Vijayawada","Visakhapatnam","Warangal"];

    // Load Indian cities (primary: API, fallback: local list)
    const loadIndianCities = async () => {
      setIsLoading(true);
      
      // API with timeout & CORS-friendly endpoint
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 10000);

      let cityList = [];
      try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: 'India' }),
          signal: ctrl.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        if (json && Array.isArray(json.data) && json.data.length) {
          cityList = json.data;
        } else {
          throw new Error('No data in response');
        }
      } catch (e) {
        console.warn('City API failed, using fallback. Reason:', e.message || e);
        cityList = FALLBACK_CITIES;
      }

      // Sort & unique cities
      const uniqueSorted = Array.from(new Set(cityList)).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
      setCities(uniqueSorted);
      setIsLoading(false);
    };

    loadIndianCities();
  }, []);

  useEffect(() => {
    // Initialize intl-tel-input for phone
    if (window.intlTelInput) {
      const phoneInput = document.querySelector("#phone");
      if (phoneInput) {
        window.intlTelInput(phoneInput, {
          initialCountry: "in",
          preferredCountries: ["in", "us", "gb"],
          separateDialCode: true,
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
        });
      }
    }

    // Initialize Select2 for city dropdowns after cities are loaded
    if (window.$ && window.$.fn.select2 && cities.length > 0) {
      $('#propertyLocation').select2({
        placeholder: 'Select Property Location',
        width: '100%',
        allowClear: true,
        searchInputPlaceholder: 'Search cities...',
        minimumResultsForSearch: 0, // Always show search box
        dropdownParent: $('#regForm'), // Keep dropdowns inside the form
        closeOnSelect: true,
        escapeMarkup: function(markup) { return markup; }
      });
      
      $('#preferredOffice').select2({
        placeholder: 'Select Preferred Area Office',
        width: '100%',
        allowClear: true,
        searchInputPlaceholder: 'Search cities...',
        minimumResultsForSearch: 0, // Always show search box
        dropdownParent: $('#regForm'), // Keep dropdowns inside the form
        closeOnSelect: true,
        escapeMarkup: function(markup) { return markup; }
      });

      // Handle Select2 change events to update React state
      $('#propertyLocation').on('select2:select', function(e) {
        const selectedValue = e.params.data.id;
        setFormData(prev => ({ ...prev, propertyLocation: selectedValue }));
        // Clear error when valid selection is made
        if (errors.propertyLocation) {
          setErrors(prev => ({ ...prev, propertyLocation: '' }));
        }
      });

      $('#preferredOffice').on('select2:select', function(e) {
        const selectedValue = e.params.data.id;
        setFormData(prev => ({ ...prev, preferredOffice: selectedValue }));
        // Clear error when valid selection is made
        if (errors.preferredOffice) {
          setErrors(prev => ({ ...prev, preferredOffice: '' }));
        }
      });
    }

    // Cleanup function to destroy Select2 instances
    return () => {
      if (window.$ && window.$.fn.select2) {
        try {
          $('#propertyLocation').select2('destroy');
          $('#preferredOffice').select2('destroy');
        } catch (e) {
          console.log('Select2 cleanup:', e);
        }
      }
    };
  }, [cities, errors.propertyLocation, errors.preferredOffice]);

  return (
    <div className="App">
      <header className="site-header">
        <div className="container header-content">
          <div className="brand">
            <img src="/LIC.png" alt="LIC HFL" className="brand-logo" />
          </div>
          <div className="header-actions">
            <button className="toll-free-btn">
              Toll Free | 18002091989
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero-content">
            <div className="hero-text-container">
              <div className="hero-text-box orange-bg">
                <h2>APNE GHAR KI AZAADI OFFER</h2>
              </div>
              <div className="hero-text-box green-bg">
                <h2>ZERO PROCESSING FEES*</h2>
                <p>(Offer Valid until 31.08.2025)</p>
              </div>
              <div className="hero-headings">
                <h4>Unlock the Door to Your Dream Home<br />with Home Loans Starting</h4>
                <h1>@7.50%*</h1>
              </div>
            </div>
            <div className="hero-form">
              <div className="card">
                <header>
                  <h3>Registration & Login Form</h3>
                </header>
                <form id="regForm" onSubmit={handleSubmit} noValidate>
                  <div className={`field ${touched.firstName && errors.firstName ? 'error' : touched.firstName && !errors.firstName ? 'success' : ''}`}>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      className={touched.firstName && errors.firstName ? 'is-invalid' : touched.firstName && !errors.firstName ? 'is-valid' : ''}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>

                  <div className={`field ${touched.lastName && errors.lastName ? 'error' : touched.lastName && !errors.lastName ? 'success' : ''}`}>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      className={touched.lastName && errors.lastName ? 'is-invalid' : touched.lastName && !errors.lastName ? 'is-valid' : ''}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>

                  <div className={`field ${touched.phone && errors.phone ? 'error' : touched.phone && !errors.phone ? 'success' : ''}`}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      className={touched.phone && errors.phone ? 'is-invalid' : touched.phone && !errors.phone ? 'is-valid' : ''}
                    />
                    {touched.phone && errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div className={`field ${touched.propertyLocation && errors.propertyLocation ? 'error' : touched.propertyLocation && !errors.propertyLocation ? 'success' : ''}`}>
                    <select 
                      id="propertyLocation" 
                      name="propertyLocation" 
                      value={formData.propertyLocation} 
                      onChange={handleInputChange} 
                      onBlur={handleFieldBlur}
                      className={touched.propertyLocation && errors.propertyLocation ? 'is-invalid' : touched.propertyLocation && !errors.propertyLocation ? 'is-valid' : ''}
                    >
                      <option value="" disabled>
                        {isLoading ? 'Loading cities…' : 'Select Property Location'}
                      </option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {touched.propertyLocation && errors.propertyLocation && (
                      <div className="invalid-feedback">{errors.propertyLocation}</div>
                    )}
                  </div>

                  <div className={`field ${touched.preferredOffice && errors.preferredOffice ? 'error' : touched.preferredOffice && !errors.preferredOffice ? 'success' : ''}`}>
                    <select 
                      id="preferredOffice" 
                      name="preferredOffice" 
                      value={formData.preferredOffice} 
                      onChange={handleInputChange} 
                      onBlur={handleFieldBlur}
                      className={touched.preferredOffice && errors.preferredOffice ? 'is-invalid' : touched.preferredOffice && !errors.preferredOffice ? 'is-valid' : ''}
                    >
                      <option value="" disabled>
                        {isLoading ? 'Loading cities…' : 'Select Preferred Area Office'}
                      </option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {touched.preferredOffice && errors.preferredOffice && (
                      <div className="invalid-feedback">{errors.preferredOffice}</div>
                    )}
                  </div>

                  <label className={`terms ${touched.terms && errors.terms ? 'error' : ''}`}>
                    <input 
                      type="checkbox" 
                      name="terms" 
                      checked={formData.terms} 
                      onChange={handleInputChange} 
                      onBlur={handleFieldBlur}
                      className={touched.terms && errors.terms ? 'is-invalid' : ''}
                    />
                    <span>I confirm that the information provided by me here is accurate. I authorize LjCHFL or its Authorized representatives to contact me for any queries and or my documents collection for loon application. This will override registry on DND/NDNC</span>
                  </label>
                  {touched.terms && errors.terms && (
                    <div className="invalid-feedback">{errors.terms}</div>
                  )}

                  <button type="submit">Submit</button>
                  <small className="muted">This site may be protected by reCAPTCHA and the Google's Privacy Policy and Terms of Service apply.</small>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="features">
          <div className="container">
            <h2>Why Choose Us</h2>
            <div className="grid">
              <div className="feature card">
                <h3>Attractive Interest Rates</h3>
                <p>Competitive rates tailored to your needs.</p>
              </div>
              <div className="feature card">
                <h3>Minimal Documentation</h3>
                <p>Simple and transparent process.</p>
              </div>
              <div className="feature card">
                <h3>Quick Processing</h3>
                <p>Fast approvals to help you move in sooner.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="eligibility" className="cta">
          <div className="container">
            <h2>Check Your Eligibility</h2>
            <p>Find out the loan amount you can get in minutes.</p>
            <a href="#" className="btn btn-secondary">Calculate Now</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <div>
            <strong>LIC Housing Finance</strong>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
