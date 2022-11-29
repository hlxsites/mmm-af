import { readBlockConfig } from '../../scripts/scripts.js';

/**
 * Handles footer links
 * - sets a default aria-label attribute when it has no discernible name
 * @param {Element} footer The footer element
 */
 function handleLinks(footer) {
  footer.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href && a.textContent.trim() === '' && !a.hasAttribute('aria-label')) {
      const u = new URL(href);
      a.setAttribute('aria-label', u.hostname);
    }
  });
}


/**
 * Loads and decorates the footer
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  handleLinks(footer);
  // await decorateIcons(footer);
  block.append(footer);
}
