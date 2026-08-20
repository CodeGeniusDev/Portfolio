import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBAtQv8Yctz92zca8Y5nmPDZhxohHMQyRs",
  authDomain: "portfolio-7355f.firebaseapp.com",
  projectId: "portfolio-7355f",
  storageBucket: "portfolio-7355f.firebasestorage.app",
  messagingSenderId: "7591846625",
  appId: "1:7591846625:web:894cef9067dfc095c184b0",
  measurementId: "G-M5ZEDGXTZ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional, ensure window is defined if SSR like Next.js)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

// Export the app instance
export default app;
