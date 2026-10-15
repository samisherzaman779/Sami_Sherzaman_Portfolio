import openaiIcon from '../assets/tech-icons/openai.svg';
import groqIcon from '../assets/tech-icons/groq.svg';

/**
 * skillicons.dev returns empty ~256b images for some ids — use overrides here.
 * Optional per-item `iconSrc` in stackLogoGroups wins over everything.
 */
const SKILLICON_OVERRIDES = {
  openai: openaiIcon,
  huggingface: 'https://cdn.simpleicons.org/huggingface/FFD21E',
  pandas:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
  google: 'https://cdn.simpleicons.org/google/4285F4',
  anthropic: 'https://cdn.simpleicons.org/anthropic/191919',
  groq: groqIcon,
};

export function getTechIconSrc(tech) {
  if (tech?.iconSrc) return tech.iconSrc;
  const id = tech?.iconId;
  if (id && SKILLICON_OVERRIDES[id]) return SKILLICON_OVERRIDES[id];
  return `https://skillicons.dev/icons?i=${id}&theme=light`;
}
