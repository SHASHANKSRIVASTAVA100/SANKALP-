// Utility for robust photo handling, fallback SVG placeholders, and cross-platform image downloads

// Clean high-contrast SVG fallback for garbage/waste reporting photos
export const FALLBACK_WASTE_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="#0f172a">
  <rect width="600" height="400" fill="#090d16"/>
  <rect x="20" y="20" width="560" height="360" rx="16" fill="#1e293b" stroke="#334155" stroke-width="2"/>
  <g transform="translate(250, 130)" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" transform="scale(4)" />
    <circle cx="34" cy="34" r="6" fill="#10b981" />
    <path d="M78 58 L54 34 L14 74" />
  </g>
  <text x="300" y="270" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16" font-weight="600" text-anchor="middle">
    Swachhta Sangam Evidence Image
  </text>
  <text x="300" y="295" fill="#64748b" font-family="monospace" font-size="12" text-anchor="middle">
    AICTE PS-26195 Geostamped Photographic Record
  </text>
</svg>
`)}`;

export const FALLBACK_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
  <rect width="150" height="150" rx="75" fill="#1e293b"/>
  <circle cx="75" cy="55" r="30" fill="#10b981"/>
  <path d="M25 135 C25 100 50 95 75 95 C100 95 125 100 125 135 Z" fill="#10b981"/>
</svg>
`)}`;

/**
 * Downloads an image cleanly to device storage across both mobile and desktop browsers.
 * Handles cross-origin images by fetching as blob, with canvas rendering as robust fallback.
 */
export const downloadPhoto = async (imgUrl, filename = 'swachhta-evidence.jpg') => {
  if (!imgUrl) return;

  try {
    // 1. Try direct fetch with blob (works for same-origin or CORS-enabled hosts)
    const response = await fetch(imgUrl, { mode: 'cors' });
    if (!response.ok) throw new Error('Fetch failed');
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    triggerDownload(blobUrl, filename);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  } catch (e) {
    // 2. Fallback: Draw onto an off-screen HTML5 Canvas and export as JPEG Data URL
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 800;
          canvas.height = img.naturalHeight || 600;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          triggerDownload(dataUrl, filename);
        } catch (canvasErr) {
          // If canvas is tainted by strict CORS, fallback to opening direct link
          window.open(imgUrl, '_blank');
        }
      };
      img.onerror = () => {
        window.open(imgUrl, '_blank');
      };
      img.src = imgUrl;
    } catch (err) {
      window.open(imgUrl, '_blank');
    }
  }
};

function triggerDownload(hrefUrl, filename) {
  const link = document.createElement('a');
  link.href = hrefUrl;
  link.download = filename;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
