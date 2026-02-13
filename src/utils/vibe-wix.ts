export type VibeWixTone = 'clean' | 'playful' | 'luxury';

export interface VibeWixSection {
	id: string;
	title: string;
	description: string;
	cta?: string;
}

export interface VibeWixBrief {
	brandName: string;
	audience: string;
	primaryGoal: string;
	tone: VibeWixTone;
	features: string[];
}

export interface VibeWixDraft {
	headline: string;
	subHeadline: string;
	sections: VibeWixSection[];
}

const toneDescriptors: Record<VibeWixTone, string> = {
	clean: 'Clear message, minimal visual noise, sharp structure',
	playful: 'Friendly language, vibrant energy, lightweight interactions',
	luxury: 'Premium tone, elegant spacing, confidence-building copy',
};

const sectionTemplates: Array<Omit<VibeWixSection, 'id'>> = [
	{
		title: 'Hero',
		description: 'Lead with value and one focused call to action',
		cta: 'Start now',
	},
	{
		title: 'Proof',
		description: 'Show testimonials, client logos, or measurable outcomes',
	},
	{
		title: 'Offer',
		description: 'Explain packages, pricing, and what is included',
		cta: 'View plans',
	},
	{
		title: 'FAQ',
		description: 'Reduce objections with concise Q&A content',
	},
];

export function buildVibeWixDraft(brief: VibeWixBrief): VibeWixDraft {
	const features = brief.features.length > 0 ? brief.features.join(', ') : 'fast setup';
	const toneDescriptor = toneDescriptors[brief.tone];

	return {
		headline: `${brief.brandName} for ${brief.audience}`,
		subHeadline: `${brief.primaryGoal}. Style: ${toneDescriptor}. Core features: ${features}.`,
		sections: sectionTemplates.map((section, index) => ({
			id: `${section.title.toLowerCase()}-${index + 1}`,
			...section,
		})),
	};
}

export function buildVibeWixJsx(draft: VibeWixDraft): string {
	const sections = draft.sections
		.map((section) => {
			const ctaBlock = section.cta ? `\n      <button className=\"cta\">${section.cta}</button>` : '';
			return `    <section id=\"${section.id}\">\n      <h2>${section.title}</h2>\n      <p>${section.description}</p>${ctaBlock}\n    </section>`;
		})
		.join('\n\n');

	return `export function LandingPage() {\n  return (\n    <main>\n      <header>\n        <h1>${draft.headline}</h1>\n        <p>${draft.subHeadline}</p>\n      </header>\n\n${sections}\n    </main>\n  );\n}`;
}
