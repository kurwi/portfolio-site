"use client";
import React, { useState } from "react";

export function CreditRiskDemo() {
  const [form, setForm] = useState({ age: 35, income: 50000, creditScore: 650, creditHistoryMonths: 60, existingLoans: 1, employmentStatus: "Employed" });
  const [result, setResult] = useState<any>(null);
  const [theme, setTheme] = useState("light");

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: type === "range" || type === "number" ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let score = 0;
    if (form.age < 25) score += 0.15;
    if (form.age > 60) score += 0.1;
    if (form.creditScore < 600) score += 0.3;
    if (form.creditScore < 700) score += 0.15;
    if (form.creditHistoryMonths < 24) score += 0.1;
    if (form.existingLoans > 3) score += 0.1;
    if (form.employmentStatus === "Unemployed") score += 0.2;
    const risk = Math.min(0.95, Math.max(0.05, score));
    setResult({ risk, decision: risk >= 0.5 ? "DECLINED" : "APPROVED", category: risk >= 0.75 ? "HIGH" : risk >= 0.4 ? "MEDIUM" : "LOW" });
  };

  return (
    <div className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white"}>
      <nav className={`px-6 py-3 flex justify-between ${theme === "dark" ? "bg-slate-900" : "bg-blue-50"}`}>
        <h1 className="font-bold">Credit Risk</h1>
        <div className="flex gap-2">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="px-3 py-1 text-sm bg-blue-600 text-white rounded">T</button>
          <a href="/demos" className="px-3 py-1 text-sm bg-gray-600 text-white rounded">←</a>
        </div>
      </nav>
      <div className="flex">
        <div className={`w-48 p-4 ${theme === "dark" ? "bg-slate-900" : "bg-gray-50"} border-r`}>
          <label className="text-xs font-bold block mb-2">Language</label>
          <select className={`w-full px-2 py-1 text-sm ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}><option>English</option><option>Polski</option></select>
        </div>
        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
            <h2 className="text-xl font-bold mb-6">Assessment</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Age: {form.age}</label>
                <input type="range" name="age" min="18" max="75" value={form.age} onChange={handleChange} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Income: ${form.income}</label>
                <input type="number" name="income" value={form.income} onChange={handleChange} className={`w-full px-2 py-1 border ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"}`} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Credit: {form.creditScore}</label>
                <input type="range" name="creditScore" min="300" max="850" value={form.creditScore} onChange={handleChange} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">History: {form.creditHistoryMonths}mo</label>
                <input type="range" name="creditHistoryMonths" min="0" max="360" value={form.creditHistoryMonths} onChange={handleChange} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Loans: {form.existingLoans}</label>
                <input type="range" name="existingLoans" min="0" max="10" value={form.existingLoans} onChange={handleChange} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Employment</label>
                <select name="employmentStatus" value={form.employmentStatus} onChange={handleChange} className={`w-full px-2 py-1 border ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white"}`}>
                  <option>Employed</option>
                  <option>Self-Employed</option>
                  <option>Unemployed</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded mt-4">Assess</button>
          </form>
          {result && (
            <div className="mt-8 space-y-4">
              <div className={`p-6 rounded text-center font-bold ${result.decision === "APPROVED" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>{result.decision}</div>
              <div className="grid grid-cols-3 gap-4">
                <div className={`p-4 rounded text-center ${theme === "dark" ? "bg-slate-800" : "bg-gray-100"}`}>
                  <div className="text-2xl font-bold">{Math.round(result.risk * 100)}%</div>
                  <div className="text-xs text-gray-500">Default Risk</div>
                </div>
                <div className={`p-4 rounded text-center ${theme === "dark" ? "bg-slate-800" : "bg-gray-100"}`}>
                  <div className="text-2xl font-bold text-green-600">{Math.round((1 - result.risk) * 100)}%</div>
                  <div className="text-xs text-gray-500">Repay Prob</div>
                </div>
                <div className={`p-4 rounded text-center ${theme === "dark" ? "bg-slate-800" : "bg-gray-100"}`}>
                  <div className="text-xl font-bold">{result.category}</div>
                  <div className="text-xs text-gray-500">Category</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreditRiskDemo;
