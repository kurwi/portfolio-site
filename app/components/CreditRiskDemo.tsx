"use client";
import React, { useState } from "react";

// Simple mock model for demo purposes
function calculateRisk({ age, income, loanAmount, creditScore }: { age: number; income: number; loanAmount: number; creditScore: number }) {
  // Fake logic: higher income and credit score = lower risk
  let risk = 0.5;
  if (income > 50000) risk -= 0.15;
  if (creditScore > 700) risk -= 0.2;
  if (age < 25) risk += 0.1;
  if (loanAmount > income * 0.5) risk += 0.2;
  return Math.max(0, Math.min(1, risk));
}

export default function CreditRiskDemo() {
  const [form, setForm] = useState({
    age: 30,
    income: 40000,
    loanAmount: 10000,
    creditScore: 650,
  });
  const [result, setResult] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: Number(value) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const risk = calculateRisk(form);
    setResult(risk);
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8, background: "#fafbfc" }}>
      <h2>Credit Risk Prediction Demo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="number" name="age" value={form.age} onChange={handleChange} min={18} max={100} required />
        </label>
        <br />
        <label>
          Annual Income ($):
          <input type="number" name="income" value={form.income} onChange={handleChange} min={0} step={1000} required />
        </label>
        <br />
        <label>
          Loan Amount ($):
          <input type="number" name="loanAmount" value={form.loanAmount} onChange={handleChange} min={0} step={500} required />
        </label>
        <br />
        <label>
          Credit Score:
          <input type="number" name="creditScore" value={form.creditScore} onChange={handleChange} min={300} max={850} required />
        </label>
        <br />
        <button type="submit" style={{ marginTop: 12 }}>Predict Risk</button>
      </form>
      {result !== null && (
        <div style={{ marginTop: 20 }}>
          <strong>Predicted Risk:</strong> {Math.round(result * 100)}%
          <div style={{ marginTop: 8 }}>
            {result > 0.5 ? (
              <span style={{ color: "#d32f2f" }}>High Risk</span>
            ) : (
              <span style={{ color: "#388e3c" }}>Low Risk</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

