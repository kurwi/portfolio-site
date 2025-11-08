'use client';

import { useLanguageCtx } from "@/contexts/LanguageCtx";
import { t } from "@/lib/translations";
import { useState } from "react";

export default function CVDownload() {
	const { locale } = useLanguageCtx();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Map locales to CV file names (professional naming convention)
	const cvFileMap: Record<string, string> = {
		en: "Wojciech_Staniszewski_CV_English.pdf",
		es: "Wojciech_Staniszewski_CV_Spanish.pdf",
		fr: "Wojciech_Staniszewski_CV_French.pdf",
		de: "Wojciech_Staniszewski_CV_German.pdf",
		pl: "Wojciech_Staniszewski_CV_English.pdf", // Polish version downloads English CV
	};

	const cvFile = cvFileMap[locale as keyof typeof cvFileMap] || cvFileMap.en;

	const handleDownload = async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const response = await fetch(`/cv/${cvFile}`);
			
			if (!response.ok) {
				throw new Error(`File not found: ${response.status}`);
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = cvFile;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (err) {
			setError("CV file not available. Please contact me directly.");
			console.error("Download error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<button
				onClick={handleDownload}
				disabled={isLoading}
				className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
				title={t('Download my CV in PDF format', locale as any)}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
					<polyline points="7 10 12 15 17 10"></polyline>
					<line x1="12" y1="15" x2="12" y2="3"></line>
				</svg>
				<span>{isLoading ? 'Loading...' : t('Download CV', locale as any)}</span>
			</button>
			{error && (
				<div className="text-red-600 text-sm mt-2">
					{error}
				</div>
			)}
		</>
	);
}
