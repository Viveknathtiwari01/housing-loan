import React, { useState, useMemo } from 'react';
import './App.css';
import Features from './Features';
import Products from './Products';
import Documents from './Documents';
import Hero from './Hero';
import Faq from './Faq';
import TestimonialSlider from './TestimonialSlider';
import Footer from './Footer';

function App() {
  

  // EMI Calculator State
  const [emiCalculator, setEmiCalculator] = useState({
    loanAmount: 7500000,
    tenure: 180,
    interestRate: 9.0
  });

  // Calculate EMI and related values
  const calculateEMI = (principal, rate, time) => {
    if (!principal || !rate || !time) return 0;
    const monthlyRate = rate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, time) / (Math.pow(1 + monthlyRate, time) - 1);
    return emi || 0;
  };

  // Calculate donut chart data
  const donutChartData = useMemo(() => {
    const monthlyEMI = calculateEMI(emiCalculator.loanAmount, emiCalculator.interestRate, emiCalculator.tenure);
    const totalPayable = monthlyEMI * emiCalculator.tenure;
    const totalInterest = totalPayable - emiCalculator.loanAmount;
    
    const totalCircumference = 2 * Math.PI * 80; // 2πr where r=80
    
    // Safety checks to prevent division by zero or NaN
    let totalPayableCircumference = 0;
    let totalInterestCircumference = 0;
    
    if (totalPayable > 0) {
      totalPayableCircumference = (emiCalculator.loanAmount / totalPayable) * totalCircumference;
      totalInterestCircumference = (totalInterest / totalPayable) * totalCircumference;
    }
    
    return {
      monthlyEMI: monthlyEMI || 0,
      totalPayable: totalPayable || 0,
      totalInterest: totalInterest || 0,
      totalCircumference,
      totalPayableCircumference: totalPayableCircumference || 0,
      totalInterestCircumference: totalInterestCircumference || 0
    };
  }, [emiCalculator]);

  // Handle EMI input changes
  const handleEMIInputChange = (field, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setEmiCalculator(prev => ({
        ...prev,
        [field]: numValue
      }));
    }
  };

  // Tooltip state for donut chart
  const [tooltip, setTooltip] = useState({
    show: false,
    text: '',
    x: 0,
    y: 0,
    type: ''
  });

  // Handle chart hover
  const handleChartHover = (event, segmentType, value) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setTooltip({
      show: true,
      text: `${segmentType}: ${Math.round(value).toLocaleString()}`,
      x: x + 10,
      y: y - 10,
      type: segmentType
    });
  };

  const handleChartLeave = () => {
    setTooltip({
      show: false,
      text: '',
      x: 0,
      y: 0,
      type: ''
    });
  };

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
        <Hero/>
        
        {/* ======= separator-section  ========= */}


        <section className="separator-section">
          <div className="separator-content">
            <div className="separator-text">
              <h2>We have served <span className="highlight">30 Lakhs+</span> families</h2>
            </div>
            <div className="separator-image">
              <img src="/happy_family.png" alt="Happy Family" />
            </div>
          </div>
        </section>


        {/* ======= promotional-section  ========= */}

        
        <section className="promotional-section">
          <div className="container promotional-content">
            <div className="family-image-container">
              <img src="/family.jpg" alt="Happy Family" />
            </div>
            <div className="promotional-info">
              <h2>At LIC Housing Finance we help families to achieve their dream home</h2>
              <div className="stats-container">
                <div className="stat-box">
                  <div className="stat-number">7.50%* ROI</div>
                  <div className="stat-label">Starting ROI for Home Loan</div>
                  
                </div>
                <div className="stat-box">
                  <div className="stat-number">3.05 Lakhs Crore+</div>
                  <div className="stat-label">Loan Portfolio</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">450+</div>
                  <div className="stat-label">Operating Center</div>
                </div>
              </div>
              <button className="cta-button">Apply For Home Loan Now →</button>
            </div>
          </div>
          <div className="decorative-elements">
            <div className="yellow-circle"></div>
            <div className="yellow-stripes"></div>
          </div>
        </section>

        {/* ========  EMI Calculator Section  ========= */}


        {/* EMI Calculator Section */}

        <section className="emi-calculator-section">
          <div className="emi-calculator-container">
            <div className="emi-outer-card">
              <div className="emi-header">
                <h2>We have made our Home Loan process simple and transparent</h2>
                <p>It's that sense of freedom people feel with their own homes that inspire us to do better</p>
              </div>
              
              <div className="emi-calculator-card">
                <h3>Customise Your Offer</h3>
                
                {/* ======   Loan Summary Bar ======= */}

                <div className="loan-summary-bar">
                  <div className="summary-item">
                    <span className="summary-label">Monthly EMI</span>
                    <span className="summary-value">₹{Math.round(donutChartData?.monthlyEMI || 0).toLocaleString()}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Interest</span>
                    <span className="summary-value">₹{Math.round(donutChartData?.totalInterest || 0).toLocaleString()}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Payable</span>
                    <span className="summary-value">₹{Math.round(donutChartData?.totalPayable || 0).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="calculator-content">

                  {/* =====   Input Fields - Left Side  ======= */}


                  <div className="input-fields">
                    <div className="input-group">
                      <div className="input-row">
                        <label>Required Loan Amount *</label>
                        <input 
                          type="number" 
                          value={emiCalculator.loanAmount} 
                          onChange={(e) => handleEMIInputChange('loanAmount', e.target.value)}
                          min="100000" 
                          max="10000000"
                        />
                      </div>
                      <div className="slider-container">
                        <input 
                          type="range" 
                          min="100000" 
                          max="10000000" 
                          value={emiCalculator.loanAmount}
                          onChange={(e) => handleEMIInputChange('loanAmount', e.target.value)}
                          className="slider"
                          style={{
                            '--fill-percentage': `${((emiCalculator.loanAmount - 100000) / (10000000 - 100000)) * 100}%`
                          }}
                        />
                        <div className="slider-labels">
                          <span>Min: ₹100,000</span>
                          <span>Max: ₹1,00,00,000</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="input-group">
                      <div className="input-row">
                        <label>Required Tenure (months) *</label>
                        <input 
                          type="number" 
                          value={emiCalculator.tenure} 
                          onChange={(e) => handleEMIInputChange('tenure', e.target.value)}
                          min="12" 
                          max="360"
                        />
                      </div>
                      <div className="slider-container">
                        <input 
                          type="range" 
                          min="12" 
                          max="360" 
                          value={emiCalculator.tenure}
                          onChange={(e) => handleEMIInputChange('tenure', e.target.value)}
                          className="slider"
                          style={{
                            '--fill-percentage': `${((emiCalculator.tenure - 12) / (360 - 12)) * 100}%`
                          }}
                        />
                        <div className="slider-labels">
                          <span>Min: 12</span>
                          <span>Max: 360</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="input-group">
                      <div className="input-row">
                        <label>Interest Rate *</label>
                        <div className="interest-input">
                          <input 
                            type="number" 
                            value={Math.round(emiCalculator.interestRate)} 
                            onChange={(e) => handleEMIInputChange('interestRate', e.target.value)}
                            min="7" 
                            max="15"
                            step="1"
                          />
                          <span className="percent-symbol">%</span>
                        </div>
                      </div>
                      <div className="slider-container">
                        <input 
                          type="range" 
                          min="7" 
                          max="15" 
                          value={Math.round(emiCalculator.interestRate)}
                          onChange={(e) => handleEMIInputChange('interestRate', e.target.value)}
                          className="slider"
                          step="1"
                          style={{
                            '--fill-percentage': `${((Math.round(emiCalculator.interestRate) - 7) / (15 - 7)) * 100}%`
                          }}
                        />
                        <div className="slider-labels">
                          <span>Min: 7%</span>
                          <span>Max: 15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Donut Chart - Right Side */}
                  <div className="donut-chart-container">
                    <div className="donut-chart">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <circle 
                          cx="100" 
                          cy="100" 
                          r="80" 
                          fill="none" 
                          stroke="#f0f0f0" 
                          strokeWidth="20"
                        />
                        <circle 
                          cx="100" 
                          cy="100" 
                          r="80" 
                          fill="none" 
                          stroke="#FFD700" 
                          strokeWidth="20"
                          strokeDasharray={`${donutChartData?.totalPayableCircumference || 0} ${donutChartData?.totalCircumference || 502.65}`}
                          strokeDashoffset="0"
                          transform="rotate(-90 100 100)"
                          onMouseEnter={(e) => handleChartHover(e, 'Total Payable', donutChartData?.totalPayable || 0)}
                          onMouseLeave={handleChartLeave}
                          className="chart-segment"
                        />
                        <circle 
                          cx="100" 
                          cy="100" 
                          r="80" 
                          fill="none" 
                          stroke="#0a4aa6" 
                          strokeWidth="20"
                          strokeDasharray={`${donutChartData?.totalInterestCircumference || 0} ${donutChartData?.totalCircumference || 502.65}`}
                          strokeDashoffset={-(donutChartData?.totalPayableCircumference || 0)}
                          transform="rotate(-90 100 100)"
                          onMouseEnter={(e) => handleChartHover(e, 'Total Interest', donutChartData?.totalInterest || 0)}
                          onMouseLeave={handleChartLeave}
                          className="chart-segment"
                        />
                      </svg>
                      
                      {/* Tooltip */}
                      {tooltip.show && (
                        <div 
                          className={`chart-tooltip show ${tooltip.type === 'Total Payable' ? 'yellow-tooltip' : 'blue-tooltip'}`}
                          style={{
                            left: tooltip.x,
                            top: tooltip.y
                          }}
                        >
                          {tooltip.text}
                        </div>
                      )}
                    </div>
                    <div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-color yellow"></span>
                        <span>Total Payable</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color blue"></span>
                        <span>Total Interest</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Features />

        <Products />

        <Documents />

        <Faq />

        <TestimonialSlider />
        
        <Footer />

      </main>

    </div>
  );
}

export default App;
