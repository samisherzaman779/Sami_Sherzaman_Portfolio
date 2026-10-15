import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stackLogoGroups } from '../data/siteContent';
import { getTechIconSrc } from '../utils/techIconSrc';

const TechLogo = ({ tech }) => {
  const { name } = tech;
  const [imgError, setImgError] = useState(false);
  const src = getTechIconSrc(tech);
  const initials = name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase();

  const handleImgLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth < 8 || naturalHeight < 8) {
      setImgError(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:shadow-lg hover:shadow-brand/10 hover:border-brand/20 transition-shadow duration-300"
    >
      <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
        {!imgError ? (
          <img
            src={src}
            alt={name}
            width={56}
            height={56}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            onLoad={handleImgLoad}
          />
        ) : (
          <span
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-brand/10 text-brand font-black text-sm flex items-center justify-center"
            aria-label={name}
          >
            {initials}
          </span>
        )}
      </div>
      <span className="text-[11px] md:text-xs font-semibold text-gray-700 text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
};

const SkillsTechStack = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = stackLogoGroups[activeIndex];

  return (
    <div className="mt-16 md:mt-20 pt-14 md:pt-16 border-t border-black/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-10"
      >
        <span className="inline-block text-xs font-semibold text-brand uppercase tracking-widest px-3 py-1.5 bg-brand/5 border border-brand/15 rounded-full mb-4">
          Visual stack
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight mb-2">
          Platforms & frameworks I use daily
        </h3>
        <p className="text-sm text-black/55 max-w-2xl">
          Browse by area — same stack as my skills list, with recognizable tool logos and a clean grid on every screen size.
        </p>
      </motion.div>

      <div
        className="flex flex-wrap gap-2 mb-8"
        role="tablist"
        aria-label="Technology categories"
      >
        {stackLogoGroups.map((group, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
                isActive
                  ? 'bg-brand text-white border-brand shadow-md shadow-brand/15'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand/25 hover:text-brand'
              }`}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-[#f4f6f9] via-white to-[#f8fafc] border border-black/[0.04] p-5 md:p-8"
        >
          <p className="text-xs font-medium text-gray-500 mb-5 md:mb-6">
            {activeGroup.description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {activeGroup.items.map((tech) => (
              <TechLogo key={`${activeGroup.id}-${tech.name}`} tech={tech} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SkillsTechStack;
