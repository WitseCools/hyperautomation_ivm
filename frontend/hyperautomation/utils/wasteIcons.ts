// utils/wasteIcons.ts

import plasticIcon from '../assets/images/icon_pmd.png';
import glassIcon from '../assets/images/icon_glas.png';
import paperIcon from '../assets/images/icon_karton.png';
import organicIcon from '../assets/images/icon_rest.png';
import defaultIcon from '../assets/images/icon_andere.png';

/**
 * Returns the appropriate waste icon based on the item name.
 * @param {string} name - The name of the waste item.
 * @returns {string} - The corresponding icon image.
 */
export const getWasteIcon = (icon?: string): string => {
  switch (icon?.toUpperCase() ?? '') {
    case 'RESTAFVAL':
      return organicIcon;
    case 'PLASTIC':
      return plasticIcon;
    case 'GLASS':
      return glassIcon;
    case 'PAPER':
      return paperIcon;
    default:
      return defaultIcon;
  }
};
