import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./constant";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-pro" });
