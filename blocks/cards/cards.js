import { createOptimizedPicture } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row, i) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
        li.prepend(div);
      } else if (div.querySelector('.icon')) {
        div.className = 'cards-card-icon';
      } else {
        div.className = 'cards-card-body';
        // TODO - if replacing h4 by h3 is ok change it directly in the content and remove following code
        const h4Title = div.querySelector('h4');
        const h3Title = document.createElement('h3');
        h3Title.innerHTML = h4Title.innerHTML;
        h4Title.replaceWith(h3Title);
      }
    });
    setTimeout(() => {
      li.classList.add('cards-card-appear');
    }, (i + 1) * 100);
    if (block.classList.contains('highlight')) {
      block.parentElement.classList.add('highlight');
    }
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
