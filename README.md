# 🧱 Fysiofresh Kanban Board

![Kanban Board Sample](./public/Kanban_Board_sample.svg)

A simple **Kanban Board** application built with **Vue 3**, **Vuetify**, and the **Composition API**.  
This project was developed as part of a technical assignment for the **Software Developer position at Fysiofresh**.

---

## 🚀 Project Overview

This project demonstrates a lightweight Kanban task management board with basic CRUD operations and drag-and-drop functionality.  
It showcases front-end architecture, component-based design, and adherence to SOLID principles.

---

## 🧩 Tech Stack

- **Vue 3**
- **Vuetify**
- **Composition API**
- **Vite** (build tool)
- **TypeScript** (optional, used where beneficial)
- **Vitest** (for unit testing)
- **Hosted on:** GitHub Pages / Vercel

---

## ⚙️ Features

- 📋 **Kanban Board** with multiple status columns  
  (e.g., To Do, In Progress, Done)

- 🎯 **Task Cards** with:
  - Title  
  - Description  

- 🧠 **Drag & Drop:** Move cards between columns easily

- ✏️ **CRUD Operations:**
  - Add a new card  
  - Edit existing cards  
  - Delete cards  

- 💾 Local storage persistence *(optional feature)*

---

## 🧠 Architecture & Design Principles

- Designed following **SOLID** principles:
  - **S**ingle Responsibility: Each component handles one logical concern.
  - **O**pen/Closed: Components are easily extendable via props and slots.
  - **L**iskov Substitution: Interface-consistent components for reusability.
  - **I**nterface Segregation: Minimal component APIs.
  - **D**ependency Inversion: Separation of logic and presentation.

---

## 🧪 Testing (Optional)

Basic unit tests are implemented using **Vitest** for:
- Component rendering
- Event emission
- State management logic

Run tests locally:

```bash
npm run test
