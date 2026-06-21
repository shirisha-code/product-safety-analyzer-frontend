# 🛡️ Product Safety Analyzer Frontend

Frontend application for the Product Safety Analyzer platform.

This application allows users to search products, analyze ingredient safety, compare products, view recommendations, and interact with the AI-powered product safety assistant.

---

# 🚀 Features

## Home Page
- Product search
- Search suggestions
- Quick navigation to analysis

## Product Analysis
- Product safety score
- Safe ingredients
- Caution ingredients
- High-risk ingredients
- Analysis summary

## Ingredient Details
- Clickable ingredients
- Ingredient risk score
- Safety explanation
- Warning messages
- Effects on body

## Product Recommendations
- Safer alternatives
- Product recommendation cards
- Shopping links

## Product Comparison
- Compare two products side by side
- Safety score comparison
- Ingredient comparison
- Recommended winner

## AI Product Chat
- Ask safety questions
- AI-generated responses

---

# 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React

---

# 📂 Project Structure

src/

- components/
- pages/
- services/
- assets/

---

# ⚙️ Setup

## Clone Repository

```bash
git clone https://github.com/shirisha-code/product-safety-analyzer-frontend.git
cd product-safety-analyzer-frontend
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:5173
```

---

# 🔗 Backend Connection

Configure API URL inside:

```text
src/services/api.js
```

Example:

```javascript
const api = axios.create({
  baseURL: "http://localhost:8080"
});
```

---

# 📱 Pages

### Home
- Product search
- Suggestions

### Analysis
- Safety score
- Ingredient details
- Recommendations
- AI chat

### Compare Products
- Product comparison
- Recommendation engine

---

# 📈 Version 1.0

Completed Features:

- Product Search
- Product Analysis
- Ingredient Details Modal
- Product Recommendations
- Product Comparison
- AI Product Chat
- Responsive UI
- Backend Integration

---

# 👨‍💻 Author

**Kudikyala Shirisha**

---

# 📄 License

Educational and portfolio project.
