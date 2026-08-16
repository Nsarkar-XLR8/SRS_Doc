/* ==========================================================================
   TeleVitality - High-Performance Lenis + GSAP Logic (Zero Scroll Friction)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lenis Smooth Scroll with Snappy, Responsive Physics
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. Initialize Mermaid.js
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      fontFamily: 'Inter, sans-serif',
      securityLevel: 'loose',
    });
  }

  // 3. Fast One-Time Entrance Animations (No Continuous Scroll-Frame Ticks)
  if (typeof gsap !== 'undefined') {
    gsap.from('.main-header', { y: -30, opacity: 0, duration: 0.6, ease: 'power2.out' });
    gsap.from('.hero-badge', { scale: 0.9, opacity: 0, duration: 0.5, delay: 0.1 });
    gsap.from('.hero-title', { y: 20, opacity: 0, duration: 0.6, delay: 0.2 });
    gsap.from('.hero-subtitle', { y: 15, opacity: 0, duration: 0.6, delay: 0.3 });
    gsap.from('.stat-card', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.4 });
  }

  // 4. Tab Navigation Interactivity
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTabId = tab.getAttribute('data-tab');

      // Update Nav Tab UI
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update Tab Content View
      tabContents.forEach(content => {
        if (content.id === targetTabId) {
          content.classList.add('active');

          if (typeof gsap !== 'undefined') {
            gsap.fromTo(content, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
          }
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // 5. PDF Page Jump Shortcuts
  const pdfFrame = document.getElementById('pdfFrame');
  const jumpButtons = document.querySelectorAll('.btn-jump');

  jumpButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pageNum = btn.getAttribute('data-page');
      if (pdfFrame) {
        pdfFrame.src = `SRS_Doc.pdf#page=${pageNum}&toolbar=1&navpanes=1`;
      }
    });
  });

  // 6. Fullscreen Toggle for PDF Viewport
  const toggleFullscreenBtn = document.getElementById('toggleFullscreen');
  const pdfWrapper = document.getElementById('pdfWrapper');

  if (toggleFullscreenBtn && pdfWrapper) {
    toggleFullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (pdfWrapper.requestFullscreen) {
          pdfWrapper.requestFullscreen();
        } else if (pdfWrapper.webkitRequestFullscreen) {
          pdfWrapper.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // 7. Smart PDF Scroll Pass-Through & Interactive Unlock
  if (pdfWrapper) {
    // Unlock PDF interactivity when user clicks overlay badge or viewport
    pdfWrapper.addEventListener('click', () => {
      pdfWrapper.classList.add('interactive');
    });

    // Automatically re-enable smooth page scroll when cursor leaves PDF viewport
    pdfWrapper.addEventListener('mouseleave', () => {
      pdfWrapper.classList.remove('interactive');
    });

    // Automatically re-enable smooth page scroll on window wheel scroll
    window.addEventListener('scroll', () => {
      if (pdfWrapper.classList.contains('interactive')) {
        pdfWrapper.classList.remove('interactive');
      }
    }, { passive: true });
  }

  // 8. Interactive Mermaid.js UML Diagram Switcher
  const umlButtons = document.querySelectorAll('.uml-btn');
  const mermaidTarget = document.getElementById('mermaid-target');

  const umlDiagramMap = {
    context: `
      graph TD
      System((TeleVitality Telemedicine Service System))
      User[Patient / User] -->|Video Consultation / Vitals| System
      System -->|Prescriptions / Health Status| User
      Doctor[Doctor / Specialist] -->|E-Prescriptions| System
      System -->|Patient Records| Doctor
      Insurance[Insurance Provider] -->|Eligibility| System
      System -->|Claims Submission| Insurance
    `,
    dfd: `
      graph TD
      Patient[Patient] -->|Auth Credentials| P1[1.0 User Authentication]
      P1 -->|Store User Details| D1[(D1: Patient Data)]
      Patient -->|Book Slot| P2[2.0 Appointment Management]
      P2 -->|Save Booking| D2[(D2: Appointment Records)]
      Doctor[Doctor] -->|Set Availability| P2
      Doctor -->|Accept Session| P3[3.0 Doctor Assignment]
      P3 -->|Query Doctor Profile| D3[(D3: Doctor Data)]
      Doctor -->|Issue Prescription| P4[4.0 E-Prescription & Reports]
      P4 -->|Save Prescription| D4[(D4: Health Records)]
    `,
    class: `
      classDiagram
      class User {
        +String id
        +String name
        +String contact
        +verifyLogin(): Boolean
        +login(): Void
        +register(): Void
      }
      class DoctorAppointments {
        +String id
        +String name
        +patientInformation()
        +dateTime()
      }
      class MedicineStore {
        +String id
        +verifyPrescription(): Boolean
        +addMedicine(): Void
      }
      class Report {
        +String id
        +deliveryDate: Date
        +reportArrivalCheck(): Boolean
      }
      User --> DoctorAppointments : Schedules
      User --> MedicineStore : Orders
      User --> Report : Accesses
    `,
    sequence: `
      sequenceDiagram
      autonumber
      actor Patient
      participant Portal as Web Portal
      actor Doctor
      actor Provider as Healthcare Provider

      Patient->>Portal: Log in to platform
      Patient->>Portal: Select E-Consultation & details
      Portal->>Doctor: Notify consultation request
      Doctor-->>Portal: Confirm availability & fee
      Portal->>Patient: Prompt payment
      Patient->>Portal: Submit payment
      Portal->>Doctor: Notify payment received

      Note over Patient,Doctor: Consultation Session
      Patient->>Portal: Join video call
      Doctor->>Portal: Conduct E-Consultation & issue E-Prescription
      Portal->>Provider: Save prescription & receipt
    `,
    erd: `
      erDiagram
      USER ||--o{ DOCTOR : "search / view"
      ADMIN ||--o{ USER : "remove"
      ADMIN ||--o{ DOCTOR : "update"
      DOCTOR ||--o{ PATIENT : "prescribe"
      PATIENT ||--o{ DOCTOR : "appointment"
    `,
    activity: `
      flowchart TD
      Start([Start]) --> LoginChoice{Membership Login?}
      LoginChoice -- No --> FreeRegister[Free User Registration] --> AuthCheck
      LoginChoice -- Yes --> AuthCheck[User Authenticated]
      AuthCheck --> InsuranceCheck{Has Health Insurance?}
      InsuranceCheck -- Yes --> ExternalInsurance[External Web Service: Insurance Reg] --> Index[Membership Index]
      InsuranceCheck -- No --> Index
      Index --> ConsultService[Web Service: E-Consultation & Drug Prescription]
      ConsultService --> PharmacyService[Web Service: Pharmacy Fulfillment]
      PharmacyService --> End([End])
    `,
    state: `
      stateDiagram-v2
      [*] --> Unauthenticated: Open App
      Unauthenticated --> Authenticated: Register / Mobile OTP
      state Authenticated {
        [*] --> IdleDashboard
        IdleDashboard --> Questionnaire: Select Virtual Consult
        Questionnaire --> DiagnosticTest: Submit Symptoms
        DiagnosticTest --> ConsultPending: Request Doctor
        ConsultPending --> ActiveVideoCall: Accept Call
        ActiveVideoCall --> PrescriptionIssued: E-Prescription
      }
      PrescriptionIssued --> [*]: Session Complete
    `,
    deployment: `
      graph TD
      subgraph Client Tier
        Client[Patient / Doctor Browser & Mobile App]
      end
      subgraph Server Infrastructure
        subgraph Caching Layer
          Cache[Processor: Caching Server - HTTPS / login.exe]
        end
        subgraph Database Tier
          AppServer[Processor: Database Server - dbadmin.exe]
          DB[(MongoDB Atlas Cluster)]
        end
      end
      Client <-->|HTTPS / WSS| Cache
      Cache <-->|Internal Network| AppServer
      AppServer <-->|TLS Encryption| DB
    `
  };

  umlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const umlKey = btn.getAttribute('data-uml');

      // Update button active state
      umlButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (umlDiagramMap[umlKey] && mermaidTarget) {
        // Clear and re-render Mermaid diagram
        mermaidTarget.removeAttribute('data-processed');
        mermaidTarget.innerHTML = umlDiagramMap[umlKey].trim();
        if (typeof mermaid !== 'undefined') {
          mermaid.contentLoaded();
        }
      }
    });
  });

});
