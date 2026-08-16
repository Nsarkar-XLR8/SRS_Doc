# TeleVitality - Master Document Index & SRS Navigation

> **Document Version**: 1.0  
> **System Type**: Telemedicine & Healthcare Enterprise Resource Planning (ERP) System  
> **Original Reference**: [SRS_Doc.pdf](file:///home/nayem/Personal/SRS/SRS_Doc/SRS_Doc.pdf)  
> **Authors**: Tairin Islam, Fatema Tuz Zohra, Nayem Sarkar, Nur Hossain Rabbi, Anindita Chakma, Rafi Islam (Group 1, UIU)  

---

## Executive Overview

**TeleVitality** is an enterprise-grade telemedicine and health-management platform designed to transcend geographical barriers and deliver accessible, high-quality medical care. The system integrates virtual consultations, remote patient monitoring, digital health records (EMR/EHR), automated e-prescriptions, insurance verification, and teletherapy into a unified digital ecosystem.

This repository serves as a **Systems Architecture & Product Engineering SRS Showcase**, providing a complete specification of business logic, software requirements, financial feasibility, UI/UX design rules, and UML 2.5 system architecture diagrams.

---

## Document Index & Module Mapping

```
TeleVitality SRS Repository
├── README.md                              # Main Showcase & Enterprise Overview
├── INDEX.md                               # Master Index & Navigation Guide
├── CAREER_SHOWCASE_GUIDE.md               # Resume & LinkedIn Positioning Playbook for Recruiters
├── SRS_Doc.pdf                            # Original 63-Page Complete PDF Specification
└── docs/                                  # Structured Technical Documentation
    ├── 01_Executive_Summary_and_Vision.md  # Vision, Problem Statement, & Strategic Objectives
    ├── 02_Feasibility_and_Market_Analysis.md # Cash Flow Analysis, Survey Statistics, SWOT, & GAP
    ├── 03_Software_Requirements_Specification.md # Functional & Non-Functional Requirements (NFRs)
    ├── 04_System_Architecture_and_UML.md  # 12 Interactive UML Diagrams (Mermaid.js) & CRC Cards
    ├── 05_UI_UX_Design_System.md          # UI Rules, Figma Mockup References, & UX Principles
    └── 06_Tech_Stack_and_Deployment_Roadmap.md # MERN Stack Specs, Gantt Schedule, & CI/CD Strategy
```

---

## 1. Vision & Objectives Summary ([docs/01](file:///home/nayem/Personal/SRS/SRS_Doc/docs/01_Executive_Summary_and_Vision.md))

- **Core Problem Addressed**: Preventable medical errors, high mortality rates, lack of healthcare transparency, difficulty finding specialists, and regional health access inequality.
- **Key Strategic Goals**:
  1. Enhance rural & underserved healthcare accessibility.
  2. Increase patient engagement via interactive tools & messaging.
  3. Ensure HIPAA compliance, data security, and end-to-end encryption.
  4. Optimize real-time remote diagnostics and vitals monitoring.
  5. Promote continuity of care between virtual and physical healthcare providers.

---

## 2. System Feasibility & Market Insights ([docs/02](file:///home/nayem/Personal/SRS/SRS_Doc/docs/02_Feasibility_and_Market_Analysis.md))

- **Economic Feasibility & Cash Flow**:
  - Initial Capital Expenditure (CapEx): **$200,000**
  - Working Capital Investment: **$78,000**
  - Project Life: **5 Years**
  - Annual Revenue: **$240,000/year** (60% COGS, $5,000 cash op-ex)
  - Annual Net Operating Profit After Taxes (NOPAT): **$35,700/year**
  - Annual Operating Cash Flow: **$75,700/year** (Free Cash Flow Y1-4: $75,700; Y5: $153,700)
  - Required Rate of Return: **20%** | Tax Rate: **30%**
- **Market Survey & User Statistics**:
  - Survey sample size: 10 target respondents across age brackets (18-50+).
  - 70% prioritized Video Consultations & Prescription Delivery.
  - 40% cited Medical Data Privacy as their primary concern.
  - 90% preferred Video as their primary healthcare communication channel.
  - 70% rated online appointment scheduling as "Very Important".
- **Benchmarking**: Evaluated against existing Bangladesh/Regional Telehealth leaders (*DocTime*, *Hospitalin*, *HealthX*). TeleVitality introduces unique capabilities in Teletherapy, Remote Monitoring, Insurance Integration, and Customizable Platform features.

---

## 3. Requirements Specification Summary ([docs/03](file:///home/nayem/Personal/SRS/SRS_Doc/docs/03_Software_Requirements_Specification.md))

| Feature Module | Functional Requirement Benchmark | Non-Functional Benchmark (NFR) |
| :--- | :--- | :--- |
| **Virtual Consultations** | Response time < 3 seconds; support min. 100 concurrent sessions | Latency < 2 seconds; 500 max peak sessions |
| **Secure Messaging** | End-to-end encryption (E2EE); delivery time < 1 second | AES-256 / RSA Encryption standards |
| **Digital Health Records** | EMR retrieval < 2 seconds; error rate < 0.1% | Strict data integrity & audit logging |
| **Remote Patient Monitoring** | Real-time sensor/vitals data streaming | IoT device cross-compatibility |
| **Appointment Scheduling** | Booking confirmation < 1 minute | Digital calendar synchronization |
| **E-Prescriptions** | 99% accuracy rate in dosage/medicine entries | Pharmacy ERP API integration |
| **Teletherapy Services** | High Definition (HD) video stream support | Therapist response window < 24 hours |
| **Insurance Verification** | Real-time eligibility verification | Automated claim processing within 48 hours |
| **System Uptime & Recovery** | 99.9% High Availability SLA | Automated failover < 5s; 24h disaster recovery |

---

## 4. System Architecture & UML Directory ([docs/04](file:///home/nayem/Personal/SRS/SRS_Doc/docs/04_System_Architecture_and_UML.md))

The SRS details **12 core UML diagrams** modeled according to standard visual modeling rules:

1. **Context Diagram**: External actor connections (Insurance, Teletherapy, E-Prescriptions, Appointments, EHR).
2. **Data Flow Diagram (DFD Level 0 & 1)**: Data processes between Patient, Doctor, Admin, Authentication, Prescriptions, and Billing.
3. **State Diagram**: Patient lifecycle states (Registration -> Login -> Diagnostic Questions -> Video Consultation -> Prescription/Exit).
4. **Class Diagram**: Object structure for `User`, `ProfileRecovery`, `DoctorAppointments`, `MedicineStore`, `Report`, and `Consultation`.
5. **Activity Diagram**: Procedural flow of user authentication, insurance verification, and e-consultation.
6. **Sequence Diagram**: Detailed step-by-step interactions between Patient, Web Portal, Doctor, and Healthcare Provider during e-consultation.
7. **Swimlane Diagram**: Multi-actor operational responsibility flow across Patient, Doctor, and Admin lanes.
8. **Use Case Diagram**: System boundaries, primary actors (Patient, Doctor, Admin, Provider), and extended use cases.
9. **Use Case Descriptive Forms**: Formal UC-01 specification for TeleService execution, preconditions, and edge cases.
10. **CRC Diagram**: Class Responsibility Collaborators for User Authentication, TeleService, and Health Record Management.
11. **Entity-Relationship (ER) Diagram**: Relational database schema with entities `User`, `Doctor`, `Patient`, and `Admin`.
12. **Deployment Diagram**: Client-Server topology featuring HTTPS Caching Server, Application Server (`.exe`/runtime), and Database Server.

---

## 5. UI/UX Design System ([docs/05](file:///home/nayem/Personal/SRS/SRS_Doc/docs/05_UI_UX_Design_System.md))

- **Design Rules Applied**:
  - *Golden Rules*: Modeless control, flexibility, error forgiveness, progressive disclosure.
  - *Shneiderman’s 8 Golden Rules*: Consistency, informative feedback, error prevention, easy reversal of actions.
  - *Norman’s Design Principles*: Visibility, feedback, affordance, natural mapping, constraints.
- **Figma Implementation**: Includes full UI mockups for Portal Landing, OTP Phone Authentication, Patient Dashboard, Doctor Directory & Filters, Doctor Detail & Reviews, Patient E-Report View, and Insurance Application Form.
- **Figma Workspace Link**: [TeleVitality Figma Design](https://www.figma.com/file/Hn4UH9sctX308WHB5w9d0O/TeleVitality?type=design&node-id=0%3A1&mode=design&t=jwfXgcdlECXVicNg-1)

---

## 6. Tech Stack & Implementation Plan ([docs/06](file:///home/nayem/Personal/SRS/SRS_Doc/docs/06_Tech_Stack_and_Deployment_Roadmap.md))

- **Frontend Technology**: React.js, React Router, Redux, Axios, Bootstrap / CSS.
- **Backend Technology**: Node.js, Express.js, JWT Authentication, RESTful APIs.
- **Database & Cloud**: MongoDB Atlas, Mongoose ODM.
- **Deployment Lifecycle**: 7-Phase Timeline over 10-20 Weeks (Initiation, Planning, Analysis, Design, Frontend/Backend Development, Integration Testing, Cloud Deployment to AWS/Vercel).
- **Gantt Chart Roadmap**: [TeleVitality GanttPRO Schedule](https://app.ganttpro.com/shared/token/94ef6e4c0e712696077e3ed40f25763e0acc3645cc847ebb1a580e5ca843762d/1430582)
