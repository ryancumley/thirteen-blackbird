import type { APIRoute } from 'astro';
import { site, contact, packages, formatPrice } from '../config/site';

export const GET: APIRoute = () => {
  const pkgLines = packages.map(
    (p) => `- ${p.label}: ${formatPrice(p.price)}${p.unit ?? ''} (${p.sub}). Includes ${p.bullets.join(', ')}.`,
  );
  const body = `# ${site.name}

> ${site.description}

${site.name} is an answer engine optimization (AEO) service based in ${site.location}. Instead of rewriting a company's existing website, we interview its top salespeople and publish what they know (objections, competitive comparisons, pricing logic, fit and implementation details) where AI assistants can find it.

## How it works

1. Interview your reps: recorded 60-minute calls with top sellers covering objections, competitive wins, pricing logic and who is and isn't a fit.
2. Build the knowledge base: every answer organized by question, buyer type and competitor, approved by the client before anything goes live.
3. Deliver it everywhere: public answer pages for ChatGPT, Perplexity and Google AI; an MCP server and ChatGPT / Claude app; the client's website chatbot and reps' AI tools.

## Deliverables

- Sales knowledge base
- Public answer pages with structured data
- Your own AI connector (MCP server and ChatGPT / Claude app, listed in public app directories)
- Internal reuse in the website chatbot and reps' AI tools
- AI visibility report (before and after)

## Packages

${pkgLines.join('\n')}

## How results are measured

- Share of AI answers that mention the client across their 25 most important buyer questions
- Citations of new pages in ChatGPT, Perplexity and Google AI answers
- Visitors and leads arriving from AI tools
- Questions the AI connector and chatbot answer each month

## Contact

- ${contact.name}, ${contact.email}, ${contact.phone}
- Website: ${site.url}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
