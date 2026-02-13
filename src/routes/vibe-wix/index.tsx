import { useMemo, useState } from 'react';
import { buildVibeWixDraft, buildVibeWixJsx, type VibeWixTone } from '@/utils/vibe-wix';

const toneOptions: Array<{ label: string; value: VibeWixTone }> = [
	{ label: 'Clean', value: 'clean' },
	{ label: 'Playful', value: 'playful' },
	{ label: 'Luxury', value: 'luxury' },
];

const featurePresets = ['Booking', 'Email capture', 'Analytics', 'CMS blog', 'Payments'];

export default function VibeWixPage() {
	const [brandName, setBrandName] = useState('Studio Pulse');
	const [audience, setAudience] = useState('independent creators');
	const [primaryGoal, setPrimaryGoal] = useState('Convert visitors into booked consultation calls');
	const [tone, setTone] = useState<VibeWixTone>('clean');
	const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Booking', 'Analytics']);

	const draft = useMemo(() => buildVibeWixDraft({
		brandName,
		audience,
		primaryGoal,
		tone,
		features: selectedFeatures,
	}), [audience, brandName, primaryGoal, selectedFeatures, tone]);

	const jsxPreview = useMemo(() => buildVibeWixJsx(draft), [draft]);

	const toggleFeature = (feature: string) => {
		setSelectedFeatures((current) => (
			current.includes(feature)
				? current.filter((item) => item !== feature)
				: [...current, feature]
		));
	};

	return (
		<div className="container mx-auto px-4 py-10 space-y-8">
			<div>
				<h1 className="text-4xl font-bold text-accent mb-2">Vibe-Wix Starter Studio</h1>
				<p className="text-text-tertiary">Use this generator to draft a landing page structure inspired by Vibe-Wix workflows.</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<section className="rounded-lg border border-border p-5 bg-bg-2 space-y-4">
					<h2 className="text-xl font-semibold">Project brief</h2>
					<label className="block space-y-1">
						<span className="text-sm text-text-tertiary">Brand name</span>
						<input className="w-full rounded-md bg-bg-3 border border-border px-3 py-2" value={brandName} onChange={(event) => setBrandName(event.target.value)} />
					</label>
					<label className="block space-y-1">
						<span className="text-sm text-text-tertiary">Target audience</span>
						<input className="w-full rounded-md bg-bg-3 border border-border px-3 py-2" value={audience} onChange={(event) => setAudience(event.target.value)} />
					</label>
					<label className="block space-y-1">
						<span className="text-sm text-text-tertiary">Primary goal</span>
						<textarea className="w-full rounded-md bg-bg-3 border border-border px-3 py-2 min-h-24" value={primaryGoal} onChange={(event) => setPrimaryGoal(event.target.value)} />
					</label>

					<div>
						<p className="text-sm text-text-tertiary mb-2">Tone</p>
						<div className="flex flex-wrap gap-2">
							{toneOptions.map((option) => (
								<button
									type="button"
									key={option.value}
									onClick={() => setTone(option.value)}
									className={`px-3 py-1.5 rounded-md border ${tone === option.value ? 'bg-accent text-white border-accent' : 'border-border bg-bg-3'}`}
								>
									{option.label}
								</button>
							))}
						</div>
					</div>

					<div>
						<p className="text-sm text-text-tertiary mb-2">Feature blocks</p>
						<div className="flex flex-wrap gap-2">
							{featurePresets.map((feature) => (
								<button
									type="button"
									key={feature}
									onClick={() => toggleFeature(feature)}
									className={`px-3 py-1.5 rounded-md border ${selectedFeatures.includes(feature) ? 'bg-emerald-500/20 border-emerald-400' : 'border-border bg-bg-3'}`}
								>
									{feature}
								</button>
							))}
						</div>
					</div>
				</section>

				<section className="rounded-lg border border-border p-5 bg-bg-2 space-y-4">
					<h2 className="text-xl font-semibold">Generated draft</h2>
					<div className="rounded-md bg-bg-3 p-4 border border-border">
						<h3 className="text-lg font-semibold">{draft.headline}</h3>
						<p className="text-sm text-text-tertiary mt-1">{draft.subHeadline}</p>
					</div>

					<ul className="space-y-3">
						{draft.sections.map((section) => (
							<li key={section.id} className="rounded-md border border-border bg-bg-3 p-3">
								<p className="font-medium">{section.title}</p>
								<p className="text-sm text-text-tertiary">{section.description}</p>
								{section.cta && <p className="text-xs mt-1 text-accent">CTA: {section.cta}</p>}
							</li>
						))}
					</ul>
				</section>
			</div>

			<section className="rounded-lg border border-border p-5 bg-[#0f1115]">
				<h2 className="text-xl font-semibold mb-3">React output</h2>
				<pre className="text-xs md:text-sm overflow-x-auto text-[#d1d5db] whitespace-pre-wrap">{jsxPreview}</pre>
			</section>
		</div>
	);
}
