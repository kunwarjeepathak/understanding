// src/components/MermaidChart.tsx
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidChartProps {
  chart: string;
}

/** escape HTML for safe <pre> display */
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const MermaidChart: React.FC<MermaidChartProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderContainer = containerRef.current;
    renderContainer.innerHTML = ''; // clear previous

    // Normalize the source: strip leading/trailing whitespace, normalize CRLF -> LF
    let src = String(chart ?? '').replace(/\r/g, '\n').trim();

    // Defensive: remove leading/trailing ```mermaid fences if present by mistake
    if (src.startsWith('```')) {
      src = src.replace(/^```(?:mermaid)?\s*/, '').replace(/```$/, '').trim();
    }

    // Initialize mermaid with safe, explicit settings
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose', // allow svg insertion; change to 'strict' if you need more sandboxing
        flowchart: { useMaxWidth: true, htmlLabels: true },
        sequence: { actorMargin: 50, noteMargin: 10 },
      });
    } catch (err) {
      // initialization rarely fails, but if it does show useful message
      console.error('mermaid.initialize error', err);
    }

    const tryRender = async (input: string) => {
      const id = 'm' + Math.random().toString(36).slice(2);
      try {
        const result = await (mermaid as any).render(id, input);
        // result.svg is a string
        renderContainer.innerHTML = result.svg ?? '';
        // ensure responsive
        const svgEl = renderContainer.querySelector('svg');
        if (svgEl) {
          svgEl.setAttribute('width', '100%');
          svgEl.setAttribute('height', 'auto');
          svgEl.style.maxWidth = '100%';
          svgEl.style.height = 'auto';
        }
        return true;
      } catch (err: any) {
        console.error('Mermaid render error', err);
        return err;
      }
    };

    (async () => {
      // First attempt
      let first = await tryRender(src);
      if (first === true) return;

      // Attempt a conservative sanitize: remove trailing semicolons at ends of lines
      const sanitized = src.replace(/;+\s*$/gm, '').trim();
      if (sanitized !== src) {
        const second = await tryRender(sanitized);
        if (second === true) return;
        // still failed: show details
        const err = second;
        renderContainer.innerHTML = `
          <div style="border:1px solid #c0392b;padding:8px;background:#fff6f6;color:#a94442">
            <strong>Error rendering diagram.</strong>
            <div style="margin-top:8px"><em>Mermaid error:</em></div>
            <pre style="white-space:pre-wrap;word-break:break-word;max-height:200px;overflow:auto">${escapeHtml(String(err && err.message ? err.message : err))}</pre>
            <div style="margin-top:8px"><em>Sanitized source used for attempt:</em></div>
            <pre style="white-space:pre-wrap;word-break:break-word;max-height:300px;overflow:auto">${escapeHtml(sanitized)}</pre>
          </div>
        `;
        return;
      }

      // Last resort: show original source + error
      const err = first;
      renderContainer.innerHTML = `
        <div style="border:1px solid #c0392b;padding:8px;background:#fff6f6;color:#a94442">
          <strong>Error rendering diagram.</strong>
          <div style="margin-top:8px"><em>Mermaid error:</em></div>
          <pre style="white-space:pre-wrap;word-break:break-word;max-height:200px;overflow:auto">${escapeHtml(String(err && err.message ? err.message : err))}</pre>
          <div style="margin-top:8px"><em>Original source:</em></div>
          <pre style="white-space:pre-wrap;word-break:break-word;max-height:300px;overflow:auto">${escapeHtml(src)}</pre>
        </div>
      `;
    })();

    // Clean-up not strictly necessary for mermaid.render, but keep ref safe
    return () => {
      // nothing special to teardown
    };
  }, [chart]);

  return <div ref={containerRef} className="mermaid-container" />;
};

export default MermaidChart;
