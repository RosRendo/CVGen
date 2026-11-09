# 📄 CVGen — Reactive Career Document Engine & Multi-Page PDF Compiler

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC.svg?logo=tailwind-css)
![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-f69220.svg?logo=pnpm)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**High-performance, reactive developer resume and CV synthesizer with real-time schema parsing, instant typography adjustments, and multi-page vector PDF generation.**

[System Architecture](#-system-architecture) • [Resume Schema ERD](#-reactive-resume-schema-erd) • [Compilation Flow](#-reactive-compilation--export-flow) • [Quick Start](#-quick-start)

</div>

---

## ⚡ Overview

**CVGen** is built for engineers and creatives who demand exact typographical control over their professional documentation. Featuring a reactive JSON schema architecture, it automatically balances section breaks, computes multi-page margins, and generates crisp, ATS-friendly vector PDF downloads directly inside the browser.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph UIClient["🖥️ Frontend App (React 19 + Vite + Tailwind 4)"]
        FormPanel["Section Form Editors (Experience / Education / Skills)"]
        LiveCanvas["Real-Time Multi-Page Layout Canvas (Paged CSS)"]
        StyleControls["Typography, Margins, Palette & Spacing Controls"]
        PDFRenderer["High-DPI Vector Print & PDF Exporter"]
        
        FormPanel --> LiveCanvas
        StyleControls --> LiveCanvas
        LiveCanvas --> PDFRenderer
    end

    subgraph StateEngine["⚡ Reactive Schema Engine"]
        ResumeStore["Reactive Resume State Store (Zustand)"]
        SchemaValidator["JSON Schema Validator & Sanitizer"]
        LocalStorageSync["Local Storage Auto-Save Engine"]
        
        FormPanel <--> ResumeStore
        ResumeStore <--> SchemaValidator
        ResumeStore <--> LocalStorageSync
    end
```

---

## 📊 Reactive Resume Schema ERD

```mermaid
erDiagram
    RESUME ||--|| BASICS : contains
    RESUME ||--o{ EXPERIENCE : lists
    RESUME ||--o{ EDUCATION : lists
    RESUME ||--o{ SKILLS : groups
    RESUME ||--o{ PROJECTS : showcases
    RESUME ||--o{ CUSTOM_SECTIONS : supports

    RESUME {
        string id PK "cuid"
        string templateId "MODERN | CLASSIC | MINIMAL"
        json themeSettings "colors, fonts, margins"
        datetime updatedAt
    }

    BASICS {
        string fullName
        string headline
        string email
        string phone
        string location
        string website
        text summary
    }

    EXPERIENCE {
        string id PK
        string company
        string role
        string startDate
        string endDate
        boolean isCurrent
        string location
        json highlights "string[]"
    }

    EDUCATION {
        string id PK
        string institution
        string degree
        string fieldOfStudy
        string graduationDate
    }

    SKILLS {
        string id PK
        string categoryName
        json skillList "string[]"
    }

    PROJECTS {
        string id PK
        string title
        string description
        string liveUrl
        string githubUrl
        json techStack "string[]"
    }

    CUSTOM_SECTIONS {
        string id PK
        string sectionTitle
        text markdownContent
    }
```

---

## 🔄 Reactive Compilation & Export Flow

```mermaid
sequenceDiagram
    autonumber
    actor Dev as 👩‍💻 Developer
    participant Form as 📝 Form Inputs
    participant Store as ⚡ State Store (Zustand)
    participant Canvas as 🖼️ Live Preview Canvas
    participant PDF as 🖨️ PDF Exporter

    Dev->>Form: Modifies Work Experience bullet points
    Form->>Store: Update experience[0].highlights
    Store->>Store: Validate schema & persist to LocalStorage
    Store->>Canvas: Trigger instantaneous re-render (<16ms)
    
    Canvas->>Canvas: Dynamic page-break calculation (A4 boundary)
    Dev->>Canvas: Adjusts line-height slider & theme color
    Canvas->>Dev: Instant visual preview update
    
    Dev->>PDF: Click Download High-DPI Vector PDF
    PDF->>PDF: Apply @media print typography rules & vector SVG fonts
    PDF-->>Dev: Download Ros_Rendo_Resume.pdf
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm run dev
```

Visit `http://localhost:5173` to start creating your resume.

---

## 📄 License
MIT License © **[Ros Rendo](https://github.com/RosRendo)**
