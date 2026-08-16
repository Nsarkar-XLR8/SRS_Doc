# TeleVitality - UI/UX Design System & Principles

> **Module**: 05  
> **Section**: Interface Architecture, Design Principles, Figma Wireframes & UX Standards  
> **Original Document Reference**: [SRS_Doc.pdf](file:///home/nayem/Personal/SRS/SRS_Doc/SRS_Doc.pdf) (Pages 42–51)  
> **Live Figma Mockups**: [Figma Workspace Link](https://www.figma.com/file/Hn4UH9sctX308WHB5w9d0O/TeleVitality?type=design&node-id=0%3A1&mode=design&t=jwfXgcdlECXVicNg-1)  

---

## 1. UI/UX Core Design Strategy

TeleVitality's user interface is engineered to accommodate diverse user personas ranging from tech-savvy doctors to elderly patients seeking virtual consultations. The UI/UX framework guarantees high visibility, low cognitive load, and accessible navigation.

---

## 2. Universal UI Design Rules Applied

### 2.1. The 3 Golden Rules (Theo Mandel)

```
                            ┌──────────────────────────────────────────┐
                            │          3 Golden UI Rules               │
                            └────────────────────┬─────────────────────┘
                                                 │
        ┌────────────────────────────────────────┼────────────────────────────────────────┐
        ▼                                        ▼                                        ▼
┌───────────────────────────────┐     ┌───────────────────────────────┐     ┌───────────────────────────────┐
│ 1. Place Users in Control     │     │ 2. Reduce Users' Memory Load  │     │ 3. Make Interface Consistent  │
│ • Modeless interactions       │     │ • Recognition over recall     │     │ • Uniform typography & layout │
│ • Flexible & interruptible    │     │ • Visual cues & metaphors     │     │ • Standardized button states  │
│ • Forgiving with clear UNDO   │     │ • Progressive disclosure      │     │ • Continuity across screens   │
└───────────────────────────────┘     └───────────────────────────────┘     └───────────────────────────────┘
```

1. **Place Users in Control**:
   - *Modeless Navigation*: Users can switch freely between consultation search, health record viewing, and profile settings without being locked in rigid modals.
   - *Flexibility & Interruptibility*: Patients can pause, reschedule, or exit appointment booking flows at any point.
   - *Forgiving Actions*: Clear inline validation and confirmation prompts prevent unintended appointment cancellations.

2. **Reduce Users’ Memory Load**:
   - *Recognition over Recall*: Standard visual icons (video camera, prescription pad, shield for insurance) replace complex text labels.
   - *Progressive Disclosure*: Complex medical forms are broken down into step-by-step accordion views.
   - *Real-world Metaphors*: Prescriptions are formatted visually like physical medical pads.

3. **Make the Interface Consistent**:
   - *Continuity*: Shared navigation headers, blue primary color system (`#0066B2`), and consistent button placement across all screen states.

---

### 2.2. Shneiderman’s 8 Golden Rules

1. **Strive for Consistency**: Uniform action sequences, color schemes, fonts, and layout structures across all portals.
2. **Seek Universal Usability**: Accessible font scaling, screen reader support, and multi-lingual language selection.
3. **Offer Informative Feedback**: Clear toast notifications for action outcomes (e.g., *"Booking Confirmed"*, *"Report Arrived"*).
4. **Design Dialogs to Yield Closure**: Multi-step booking processes feature clear completed state confirmation screens.
5. **Prevent Errors**: Form fields include real-time regex input validation for phone numbers, dates, and medical IDs.
6. **Permit Easy Reversal of Actions**: "Cancel" and "Back" controls on all multi-stage wizard forms.
7. **Keep Users in Control**: Provide explicit control over video camera, microphone, and data sharing during consultations.
8. **Reduce Short-term Memory Load**: Retain search filters (specialty, price range, gender) when navigating back from doctor profiles.

---

### 2.3. Norman’s 6 Design Principles (Don Norman)

1. **Visibility**: Primary calls-to-action (*"Book Now"*, *"Consult Now"*, *"Apply for Insurance"*) are visually prominent.
2. **Feedback**: Immediate visual highlights on hover/press states and instant video connection loading indicators.
3. **Affordance**: Buttons exhibit raised shadows and distinct clickable boundaries; inputs feature clear text fields.
4. **Mapping**: Intuitive spatial layout (sidebar navigation maps logically to main content display).
5. **Constraints**: Grayed-out inactive states prevent submitting incomplete appointment forms.
6. **Consistency**: Reused component libraries (cards, badges, modal dialogs) throughout the web platform.

---

## 3. Figma Wireframes & Screen Flow Directory

The UI system encompasses 7 core user screen implementations:

### Screen 1: Platform Home & Portal Landing Page
- Top navigation bar featuring brand identity (*TeleVitality*), navigation links (*Consultation*, *Health Records*, *Insurance*), and Login button.
- Hero banner with headline *"Complete Health Solution - Empowering Health, One screen at a time"*.
- Quick action feature cards: **Live Video Consultation**, **See Health Records**, and **Insurance Registration**.

### Screen 2: Phone Authentication & OTP Login
- Clean split layout featuring healthcare illustration on the left and input form on the right.
- Mobile phone number entry with international country code dropdown (`+88`) and instant OTP request button.

### Screen 3: Patient Dashboard / Welcome Overview
- Personalized welcome greeting (*"Welcome, Anika"*).
- Patient profile card displaying age, gender, contact number, and avatar.
- Featured specialist recommendation grid with doctor cards (*Dr. Samantha - Cardiologist*, *Dr. Suzanne - Neurologist*, *Dr. Michael - Otolaryngologist*).

### Screen 4: Specialist Search & Consultation Directory
- Filter bar allowing multi-criteria filtering by **Specialty**, **Gender**, **Price Range**, and **Rating**.
- Doctor card grid displaying fee rates (`$50`), ratings (`★ 4.5`), and instant *"Make Appointment"* call-to-action buttons.

### Screen 5: Doctor Detail Profile & Review Modal
- Detailed doctor profile view showcasing credentials (e.g., *MBBS, MBA, MD - Internal Medicine*), years of experience, total patients served (`4,690`), and fee details (`$50`).
- Patient review sidebar listing rated feedback and star ratings from past consultation patients.

### Screen 6: Electronic Health Report Arrived View
- Patient notification center displaying instant alert card: *"Report Arrived - Your Complete Blood Count (CBC) report as arrived. Please contact your doctor regarding next steps."* with a *"View"* action button.

### Screen 7: Health Insurance Application Form
- Form layout collecting **Full Name**, **Date of Birth**, **Phone**, **Email**, **Gender**, **Current Address**, **Permanent Address**, and **Emergency Contact**, with a unified *"Submit"* button.
