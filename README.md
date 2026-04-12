# 🧠 NeuroAdaptive Learning System (NeuroLearn)

An **AI-driven adaptive learning platform** that dynamically adjusts educational content based on **real-time user behavioral signals** — without using physical sensors.

## 🚀 Project Overview

NeuroLearn is an intelligent learning system that analyzes user interaction patterns such as:

* Typing speed
* Mouse movement
* Idle time
* Error patterns

Using these signals, the system predicts the learner’s **cognitive state** (Focused, Confused, Distracted) and **adapts content, difficulty, and flow in real-time**.


## 💡 Key Innovation

> “Adaptive Learning Without Sensors”

Unlike traditional systems that rely on eye tracking or hardware sensors, NeuroLearn uses **pure software-based behavioral analytics** to personalize learning.


## 🧠 Features

### 🔍 Cognitive State Detection

* Focused
* Confused
* Distracted
* Neutral

### 📚 Adaptive Learning Flow

* Automatically adjusts lesson difficulty
* Suggests hints, quizzes, or challenges
* Dynamic content switching

### 📝 Smart Quiz System

* Evaluates understanding
* Automatically navigates to next lesson
* Tracks progress

### 💻 Code Analysis (AI Assisted)

* Users write code
* Backend analyzes and gives hints

### 📊 Behavior Tracking

* Typing speed (WPM)
* Backspace usage
* Mouse movement speed
* Idle time

## 🏗️ Tech Stack

### Frontend

* React + TypeScript
* Tailwind CSS
* Framer Motion
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose


## 📂 Project Structure


backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── trackingController.js
│   ├── learningController.js
│
├── models/
│   ├── User.js
│   ├── BehaviorLog.js
│   ├── Session.js
│
├── routes/
│   ├── authRoutes.js
│   ├── trackingRoutes.js
│   ├── learningRoutes.js
│
├── services/
│   ├── cognitiveService.js
│   ├── adaptiveService.js
│   ├── trackingService.js
│
├── middleware/
│   └── authMiddleware.js
│
├── utils/
│   └── featureExtractor.js
│
├── app.js
├── server.js
└── package.json


## ⚙️ Installation & Setup

### 2️⃣ Backend Setup


cd backend
npm install


Create a `.env` file:


PORT=3001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key


Run backend:

npm start


### 3️⃣ Frontend Setup


cd frontend
npm install
npm run dev


## 🔗 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Behavior Tracking

* POST `/api/tracking`

### Learning

* GET `/api/learning?level=basic|intermediate|advanced`


## 🧠 System Workflow

User Interaction
      ↓
Behavior Tracking
      ↓
Cognitive Analysis (AI)
      ↓
Adaptive Engine
      ↓
Dynamic Content + UI Update


## 🎯 Lessons Included

1. Neural Networks (Basic)
2. Machine Learning (Intermediate)
3. Deep Learning (Advanced)

## 📈 Future Enhancements

* AI-based recommendation engine
* Personalized learning paths
* Emotion detection (advanced)
* Gamification system
* Leaderboard and achievements

## 🏆 Use Cases

* EdTech platforms
* Personalized learning systems
* Online course platforms
* AI-driven tutoring systems

## 🔐 Patent Scope

This project can be extended into a patent under:

* Behavioral-based adaptive learning
* Sensor-free cognitive state detection
* Real-time AI learning personalization

## 👩‍💻 Author

**Dhiviya Chandrasekaran**
Computer Science Student | AI & Product Enthusiast

## 📜 License

This project is for educational and research purposes.
