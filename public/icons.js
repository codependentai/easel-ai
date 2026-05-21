// Lucide-style inline SVG icons. All share: viewBox 24x24, stroke=currentColor, linecap+linejoin round.
// Usage: icon('star', { size: 16 }) — returns a string.

const PATHS = {
  'folder': '<path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"/>',
  'folder-plus': '<path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"/><path d="M12 11v6M9 14h6"/>',
  'folders': '<path d="M20 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3l2 2h9a2 2 0 0 1 2 2v10z"/><path d="M22 19V9a2 2 0 0 0-2-2h-1"/>',
  'images': '<rect x="2" y="2" width="16" height="16" rx="2"/><path d="M22 8v12a2 2 0 0 1-2 2H8"/><path d="M2 14l4-4 6 6M14 10l4 4"/>',
  'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'star-filled': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>',
  'trash': '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  'sparkles': '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 14l.8 2.4L22 17l-2.2.6L19 20l-.8-2.4L16 17l2.2-.6L19 14z"/><path d="M5 14l.8 2.4L8 17l-2.2.6L5 20l-.8-2.4L2 17l2.2-.6L5 14z"/>',
  'plus': '<path d="M12 5v14M5 12h14"/>',
  'minus': '<path d="M5 12h14"/>',
  'x': '<path d="M18 6L6 18M6 6l12 12"/>',
  'check': '<polyline points="20 6 9 17 4 12"/>',
  'check-square': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-5"/>',
  'square': '<rect x="3" y="3" width="18" height="18" rx="2"/>',
  'arrow-up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
  'arrow-left': '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
  'paperclip': '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  'ratio': '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M3 12h18"/>',
  'layout-grid': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'user-square': '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="10" r="3"/><path d="M7 20a5 5 0 0 1 10 0"/>',
  'palette': '<circle cx="12" cy="12" r="10"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16.5" cy="10.5" r="1"/><path d="M12 22c-5 0-9-3-9-8 0-2 1-3 3-3h1a2 2 0 0 0 2-2v-1"/>',
  'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  'copy': '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  'refresh-cw': '<path d="M21 4v6h-6"/><path d="M3 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L21 10"/><path d="M3 14l2.64 4.36A9 9 0 0 0 20.49 15"/>',
  'circle-dot': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  'archive': '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  'corner-up-left': '<polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>',
  'image': '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  'aperture': '<circle cx="12" cy="12" r="10"/><path d="M14.31 8L20.05 17.94"/><path d="M9.69 8H21.17"/><path d="M7.38 12l5.74-9.94"/><path d="M9.69 16L3.95 6.06"/><path d="M14.31 16H2.83"/><path d="M16.62 12l-5.74 9.94"/>',
  'gauge': '<path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  'send': '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
  'search': '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
  'more-horizontal': '<circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/>',
  'clock': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  'eye': '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>',
  'crown': '<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zM2 20h20"/>',
  'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  'lightbulb': '<path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7a6 6 0 1 0-12 0c0 2 .3 3.2 1.5 4.5C8.5 12.5 9 13 9 14"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  'image-plus': '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/><path d="M19 5v4M17 7h4"/>',
  'pen-tool': '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
};

export function icon(name, opts = {}) {
  const path = PATHS[name];
  if (!path) return '';
  const size = opts.size ?? 18;
  const strokeWidth = opts.strokeWidth ?? 1.75;
  const classAttr = opts.class ? ` class="icon ${opts.class}"` : ' class="icon"';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${classAttr} aria-hidden="true">${path}</svg>`;
}
