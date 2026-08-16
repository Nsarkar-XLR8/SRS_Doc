# TeleVitality - System Architecture & UML 2.5 Diagrams

> **Module**: 04  
> **Section**: Complete UML 2.5 System Specifications, Data Flow, Class Structure, ERD, and CRC Cards  
> **Original Document Reference**: [SRS_Doc.pdf](file:///home/nayem/Personal/SRS/SRS_Doc/SRS_Doc.pdf) (Pages 29–42)  

---

## 1. Architectural Overview

TeleVitality uses standard Unified Modeling Language (UML 2.5) specifications categorized into Structural, Behavioral, and Interaction models.

---

## 2. Context Diagram (Level 0 Overview)

The Context Diagram defines system boundaries and communication channels with external entities:

```mermaid
graph TD
    System((TeleVitality Telemedicine Service System))

    User[Patient / User] -->|Video Consultation / Vitals Data| System
    System -->|Electronic Prescriptions / Health Status| User

    Doctor[Doctor / Medical Specialist] -->|Consultation Feedback & E-Prescriptions| System
    System -->|Patient Records & Appointments| Doctor

    Insurance[Insurance Provider] -->|Coverage Eligibility & Approval| System
    System -->|Claims Submission & Verification| Insurance

    Pharmacy[Pharmacy Network] -->|Medication Availability| System
    System -->|Electronically Generated Prescriptions| Pharmacy

    Admin[System Administrator] -->|Platform Supervision & User Management| System
    System -->|System Logs & Audit Reports| Admin
```

---

## 3. Data Flow Diagram (DFD Level 1)

Represents data movement, internal processing nodes, and data stores:

```mermaid
graph TD
    Patient[Patient]
    Doctor[Doctor]
    Admin[Admin]

    P1[1.0 User Authentication]
    P2[2.0 Appointment Management]
    P3[3.0 Doctor Assignment & E-Consultation]
    P4[4.0 E-Prescription & Lab Reports]
    P5[5.0 Reporting & Analytics]
    P6[6.0 Billing & Payment Processing]

    D1[(D1: Patient Data)]
    D2[(D2: Appointment Records)]
    D3[(D3: Doctor Data)]
    D4[(D4: Health & Medical Records)]
    D5[(D5: Payment Records)]

    Patient -->|Auth Credentials| P1
    P1 -->|Store User Details| D1
    Patient -->|Book Slot| P2
    P2 -->|Save Booking| D2
    Doctor -->|Set Availability| P2

    Doctor -->|Accept Session| P3
    P3 -->|Query Doctor Profile| D3
    P3 -->|Read History| D4

    Doctor -->|Issue Prescription| P4
    P4 -->|Save Prescription| D4

    Admin -->|System Audit| P5
    P5 -->|Read Records| D4

    Patient -->|Make Payment| P6
    P6 -->|Save Transaction| D5
```

---

## 4. System State Diagram

Defines state transitions of a patient's session lifecycle:

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated: Open Application
    Unauthenticated --> Authenticated: Register / Mobile OTP Login
    
    state Authenticated {
        [*] --> IdleDashboard
        IdleDashboard --> Questionnaire: Select Virtual Consult
        Questionnaire --> DiagnosticTest: Submit Initial Symptoms
        DiagnosticTest --> FinalQuestions: Process Vitals & Questions
        FinalQuestions --> ConsultPending: Request Doctor Session
        ConsultPending --> ActiveVideoCall: Doctor Accepts Session
        ActiveVideoCall --> PrescriptionIssued: Conduct Video Call
        PrescriptionIssued --> EHRUpdated: Doctor Saves E-Prescription
    }

    EHRUpdated --> [*]: Session Complete / Logout
```

---

## 5. Domain Class Diagram

Core object-oriented domain models, attributes, methods, and relationships:

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +String fatherName
        +String motherName
        +String gender
        +String dateOfBirth
        +String photo
        +String contact
        +String email
        +String password
        +verifyLogin(): Boolean
        +login(): Void
        +register(): Void
        +updateProfile(): Void
    }

    class ProfileRecovery {
        +String id
        +String name
        +String gender
        +String dateOfBirth
        +String contact
        +String email
        +verifyLogin(): Boolean
        +login(): Void
        +updateProfile(): Void
    }

    class Homepage {
        +String id
        +String name
        +String information
        +logout(): Void
    }

    class MedicineStore {
        +String id
        +String name
        +patientInformation()
        +doctorPrescription()
        +verifyPrescription(id, string): Boolean
        +addMedicine(string, int): Void
    }

    class DoctorAppointments {
        +String id
        +String name
        +patientInformation()
        +doctorName()
        +dateTime()
    }

    class Report {
        +String id
        +String name
        +patientInformation()
        +doctorPrescription()
        +testInfo()
        +paymentReceipt(): Int
        +deliveryDate: Date
        +reportArrivalCheck(int): Boolean
    }

    class Consultation {
        +String userId
        +String contact
        +patientInformation()
        +doctorInformation()
        +joiningId: String
        +runTime: Duration
    }

    User <|-- ProfileRecovery : Inherits
    User --> Homepage : Navigates
    Homepage --> DoctorAppointments : Schedules
    Homepage --> MedicineStore : Orders
    Homepage --> Report : Accesses
    Homepage --> Consultation : Joins
```

---

## 6. Activity Diagram

Execution workflow for user authentication, insurance processing, and e-consultations:

```mermaid
flowchart TD
    Start([Start]) --> LoginChoice{Membership Login?}
    LoginChoice -- No --> FreeRegister[Free User Registration] --> AuthCheck
    LoginChoice -- Yes --> AuthCheck[User Authenticated]

    AuthCheck --> InsuranceCheck{Has Health Insurance?}
    InsuranceCheck -- Yes --> ExternalInsurance[External Web Service: Health Insurance Reg] --> Index[Membership Index]
    InsuranceCheck -- No --> Index

    Index --> RecordCheck{Medical Record Exists?}
    RecordCheck -- No --> CreateRecord[External Web Service: Create New Medical Record] --> ConsultService
    RecordCheck -- Yes --> ConsultService[Web Service: E-Consultation & Drug Prescription]

    ConsultService --> PharmacyService[Web Service: Pharmacy Fulfillment]
    PharmacyService --> Delivery[Courier Services: Drug Delivery]
    Delivery --> End([End])
```

---

## 7. Sequence Diagram (Doctor-Patient E-Consultation)

Detailed step-by-step interaction between actors and system controllers during consultation:

```mermaid
sequenceDiagram
    autonumber
    actor Patient
    participant Portal as Web Portal
    actor Doctor
    actor Provider as Healthcare Provider

    Patient->>Portal: Log in to platform
    Patient->>Portal: Select E-Consultation & enter details
    Portal->>Doctor: Notify new consultation request
    Doctor-->>Portal: Confirm availability & fee
    Portal->>Patient: Prompt for payment
    Patient->>Portal: Submit payment details
    Portal->>Doctor: Notify payment received & request accepted

    alt Request Accepted
        Doctor->>Portal: Confirm appointment schedule
        Portal->>Patient: Send appointment confirmation
    else Request Declined
        Doctor->>Portal: Decline request
        Portal->>Patient: Notify patient of decline & refund
    end

    Note over Patient,Doctor: Appointment Time Reached
    Patient->>Portal: Join video consultation room
    Doctor->>Portal: Conduct E-Consultation
    Doctor->>Portal: Provide medical advice & E-Prescription
    Portal->>Provider: Record feedback, prescription & rating
    Provider-->>Patient: Deliver electronic receipt & record
```

---

## 8. Swimlane Diagram

Multi-actor operational responsibility flow across System Roles:

```mermaid
graph TB
    subgraph Patients Lane
        A1[Schedule Appointment] --> A2[Secure Messaging]
    end

    subgraph Doctors Lane
        B1[Virtual Consultation] --> B2[Issue E-Prescription] --> B3[Teletherapy Session]
    end

    subgraph Admin Lane
        C1[Multilingual Support] --> C2[Insurance Authorization] --> C3[Digital Health Records] --> C4[Remote Monitoring]
    end

    A1 --> B1
    B2 --> C3
    C2 --> B1
    C4 --> EndNode([Session Complete])
```

---

## 9. Use Case Diagram & UC-01 Descriptive Form

### Use Case Diagram

```mermaid
graph LR
    Patient((Patient))
    Doctor((Doctor))
    Admin((Admin))
    Provider((Healthcare Provider))

    subgraph TeleVitality System
        UC1(Authentication & User Profile)
        UC2(Appointment Management)
        UC3(Health Record EMR Management)
        UC4(TeleService & Video Consult)
        UC5(Insurance Verification & Claims)
    end

    Patient --> UC1
    Patient --> UC2
    Patient --> UC3
    Patient --> UC4
    Patient --> UC5

    Doctor --> UC2
    Doctor --> UC3
    Doctor --> UC4

    Admin --> UC1
    Admin --> UC2
    Admin --> UC3

    Provider --> UC3
    Provider --> UC5
```

### UC-01: TeleService Descriptive Specification Form

- **Use Case ID**: `UC-01`
- **Use Case Name**: TeleService - Online Consultation & E-Prescription
- **Primary Actor**: Patient
- **Stakeholders & Interests**:
  - *Patient*: Wants convenient online specialist consultations and instant digital prescriptions.
  - *Doctor*: Wants efficient remote vital tracking and structured consultation tools.
  - *Healthcare Provider*: Wants accurate billing and medical history tracking.
  - *Admin*: Wants high system uptime and security audit logging.
- **Preconditions**: Patient is authenticated via mobile OTP or password login.
- **Main Success Scenario**:
  1. Patient logs into TeleVitality portal.
  2. Patient selects doctor specialty and books appointment slot.
  3. Patient completes video consultation with assigned doctor.
  4. Doctor generates and electronically signs e-prescription.
  5. Patient receives prescription in profile EHR and options for pharmacy delivery.
  6. Session completes and receipt is archived.
- **Alternative Scenarios**:
  - *a) Login Failure*: System prompts OTP resend option.
  - *b) Insurance Rejection*: System displays eligibility error message and allows manual payment.

---

## 10. Class Responsibility Collaborator (CRC) Cards

```
+-------------------------------------------------------------------------+
| Class Name: User Authentication                                         |
+---------------------------------------------------+---------------------+
| Responsibilities                                  | Collaborators       |
+---------------------------------------------------+---------------------+
| • Process user registration & mobile OTP          | User, Admin         |
| • Verify credentials & issue JWT token            |                     |
+---------------------------------------------------+---------------------+

+-------------------------------------------------------------------------+
| Class Name: TeleService Engine                                          |
+---------------------------------------------------+---------------------+
| Responsibilities                                  | Collaborators       |
+---------------------------------------------------+---------------------+
| • Establish WebRTC video consultation streams     | Doctor, Patient     |
| • Handle secure messaging & chat logs             |                     |
+---------------------------------------------------+---------------------+

+-------------------------------------------------------------------------+
| Class Name: Health Record Management                                    |
+---------------------------------------------------+---------------------+
| Responsibilities                                  | Collaborators       |
+---------------------------------------------------+---------------------+
| • Store & retrieve electronic health records      | Patient, Doctor,    |
| • Archive e-prescriptions & diagnostic lab reports| Provider            |
+---------------------------------------------------+---------------------+
```

---

## 11. Entity-Relationship (ER) Diagram

Database relational schema entities, attributes, and cardinality:

```mermaid
erDiagram
    USER {
        string u_id PK
        string name
        int age
    }

    DOCTOR {
        string d_id PK
        string name
        int experience_years
        string mobile_number
    }

    PATIENT {
        string p_id PK
        string name
        int age
    }

    ADMIN {
        string a_id PK
        string name
    }

    USER ||--o{ DOCTOR : "search / view"
    ADMIN ||--o{ USER : "remove"
    ADMIN ||--o{ DOCTOR : "update"
    DOCTOR ||--o{ PATIENT : "prescribe"
    PATIENT ||--o{ DOCTOR : "appointment"
```

---

## 12. Client-Server Deployment Diagram

Physical deployment infrastructure showing client nodes, caching servers, app servers, and database instances:

```mermaid
graph TD
    subgraph Client Tier
        Client[Patient / Doctor Browser & Mobile App]
    end

    subgraph Server Infrastructure
        subgraph Web & Caching Server
            Cache[Processor: Caching Server - HTTPS / login.exe]
        end

        subgraph Database & API Server
            AppServer[Processor: Database Server - dbadmin.exe / log.exe]
            DB[(MongoDB Atlas Cluster)]
        end
    end

    Client <-->|HTTPS / WSS| Cache
    Cache <-->|Internal Network| AppServer
    AppServer <-->|TLS Encryption| DB
```
