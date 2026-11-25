import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GALLERY_ITEMS, GalleryPhotoId } from '../types/pula';
import { usePula } from '../context/PulaContext';

export function MalotiMountainsSvg({ className = 'w-44 h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 140"
      className={className}
      stroke="#1C1B1B"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Copperplate engraving of Maloti mountain peaks and summit mist"
    >
      {/* Drifting summit mist clouds */}
      <motion.g
        animate={{ x: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 18,32 C 30,20 48,20 60,29 C 70,22 86,23 94,32" strokeWidth="1.0" />
        <path d="M 108,24 C 120,15 138,16 150,25 C 158,20 168,23 172,30" strokeWidth="0.95" />
      </motion.g>
      <motion.g
        animate={{ x: [2, -2, 2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 10,64 C 24,57 40,59 50,66" strokeWidth="0.8" />
        <path d="M 134,58 C 148,51 162,53 174,60" strokeWidth="0.8" />
      </motion.g>
      {/* Shimmering ochre sun rays */}
      <motion.g
        stroke="#C86D1F"
        strokeWidth="0.85"
        animate={{ opacity: [0.4, 0.95, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="42" y1="32" x2="36" y2="46" />
        <line x1="56" y1="31" x2="50" y2="45" />
        <line x1="126" y1="27" x2="120" y2="41" />
        <line x1="140" y1="28" x2="134" y2="42" />
      </motion.g>
      <motion.path
        d="M 8,124 L 36,80 L 48,90 L 66,54 L 78,66 L 98,24 L 118,62 L 130,50 L 152,86 L 162,76 L 174,124 Z"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0.4 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <path d="M 98,24 L 92,52 L 100,74 L 90,98 L 98,124" strokeWidth="1.25" />
      <path d="M 66,54 L 70,80 L 60,104 L 66,124" strokeWidth="1.0" />
      <path d="M 130,50 L 124,78 L 134,100 L 126,124" strokeWidth="1.0" />
      <path d="M 36,80 L 40,102 L 32,124" strokeWidth="0.9" />
      <path d="M 152,86 L 146,106 L 154,124" strokeWidth="0.9" />
      <g strokeWidth="0.72">
        <line x1="96" y1="34" x2="84" y2="48" />
        <line x1="94" y1="44" x2="78" y2="62" />
        <line x1="93" y1="54" x2="74" y2="74" />
        <line x1="96" y1="64" x2="70" y2="90" />
        <line x1="98" y1="74" x2="68" y2="104" />
        <line x1="95" y1="86" x2="70" y2="112" />
        <line x1="93" y1="98" x2="74" y2="118" />
        <line x1="95" y1="108" x2="82" y2="122" />
        <line x1="80" y1="64" x2="94" y2="74" />
        <line x1="74" y1="80" x2="92" y2="94" />
        <line x1="72" y1="96" x2="90" y2="110" />
        <line x1="65" y1="64" x2="50" y2="82" />
        <line x1="67" y1="74" x2="46" y2="98" />
        <line x1="66" y1="86" x2="44" y2="112" />
        <line x1="62" y1="100" x2="46" y2="120" />
        <line x1="35" y1="90" x2="20" y2="108" />
        <line x1="37" y1="102" x2="16" y2="122" />
        <line x1="128" y1="60" x2="116" y2="74" />
        <line x1="126" y1="72" x2="110" y2="90" />
        <line x1="128" y1="84" x2="108" y2="108" />
        <line x1="131" y1="96" x2="110" y2="120" />
        <line x1="150" y1="96" x2="136" y2="114" />
      </g>
      <g fill="#1C1B1B" stroke="none">
        <circle cx="105" cy="48" r="0.9" />
        <circle cx="109" cy="64" r="0.9" />
        <circle cx="104" cy="82" r="0.9" />
        <circle cx="111" cy="96" r="0.9" />
        <circle cx="138" cy="78" r="0.9" />
        <circle cx="141" cy="96" r="0.9" />
        <circle cx="48" cy="108" r="0.9" />
        <circle cx="76" cy="92" r="0.9" />
      </g>
    </svg>
  );
}

export function RaincloudSvg({ className = 'w-44 h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 140"
      className={className}
      stroke="#1C1B1B"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Copperplate engraving of cumulus raincloud showering over highland hills"
    >
      {/* Floating cumulus cloud */}
      <motion.g
        animate={{ y: [-1.8, 1.8, -1.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M 38,68 C 22,68 12,58 14,45 C 16,34 27,27 38,28 C 42,16 54,8 68,9 C 76,3 89,3 98,9 C 109,15 115,25 114,35 C 120,31 128,30 135,32 C 146,35 154,44 154,54 C 165,56 171,66 168,75 C 165,83 156,88 146,88 L 36,88 C 25,88 18,79 21,69"
          strokeWidth="1.4"
        />
        <path d="M 42,28 C 50,18 64,15 76,18" strokeWidth="0.9" />
        <path d="M 76,13 C 88,9 100,13 106,22" strokeWidth="0.9" />
        <path d="M 108,38 C 118,35 130,37 136,44" strokeWidth="0.85" />
        <path d="M 28,50 C 37,43 50,43 58,50" strokeWidth="0.85" />
        <path d="M 64,48 C 76,40 92,41 102,49" strokeWidth="0.85" />
        <g strokeWidth="0.7">
          <line x1="25" y1="64" x2="156" y2="64" strokeDasharray="14 4 8 4" />
          <line x1="22" y1="70" x2="162" y2="70" />
          <line x1="21" y1="76" x2="162" y2="76" strokeDasharray="20 4 10 4" />
          <line x1="24" y1="82" x2="158" y2="82" />
        </g>
      </motion.g>
      {/* Falling diagonal rain showers */}
      <motion.g
        strokeWidth="0.95"
        animate={{ x: [1.5, -2.5], y: [-2, 4], opacity: [0.35, 1, 0.25] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: 'linear' }}
      >
        <line x1="36" y1="92" x2="26" y2="118" />
        <line x1="50" y1="92" x2="39" y2="122" />
        <line x1="64" y1="92" x2="54" y2="119" />
        <line x1="78" y1="92" x2="67" y2="123" />
        <line x1="92" y1="92" x2="82" y2="119" />
        <line x1="106" y1="92" x2="95" y2="122" />
        <line x1="120" y1="92" x2="110" y2="118" />
        <line x1="134" y1="92" x2="124" y2="120" />
        <line x1="146" y1="92" x2="137" y2="115" />
      </motion.g>
      <motion.g
        strokeWidth="0.55"
        strokeDasharray="6 4"
        animate={{ x: [1.5, -2.5], y: [-2, 4], opacity: [0.2, 0.9, 0.2] }}
        transition={{ duration: 1.9, delay: 0.95, repeat: Infinity, ease: 'linear' }}
      >
        <line x1="43" y1="94" x2="33" y2="120" />
        <line x1="71" y1="94" x2="61" y2="121" />
        <line x1="99" y1="94" x2="89" y2="121" />
        <line x1="127" y1="94" x2="117" y2="119" />
      </motion.g>
      <motion.path
        d="M 10,132 Q 46,112 86,125 Q 124,111 170,132"
        strokeWidth="1.25"
        initial={{ pathLength: 0, opacity: 0.4 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <path d="M 24,132 Q 60,121 98,131" strokeWidth="0.7" />
      <path d="M 108,130 Q 138,122 162,132" strokeWidth="0.7" />
    </svg>
  );
}

export function EucalyptusSvg({ className = 'w-36 h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 210"
      className={className}
      stroke="#1C1B1B"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Copperplate botanical engraving of a eucalyptus sprig"
    >
      <motion.g
        style={{ transformOrigin: '88px 198px' }}
        animate={{ rotate: [-1.4, 1.6, -1.4] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path
          d="M 88,198 C 90,154 96,102 104,28"
          strokeWidth="2.0"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <path d="M 91,198 C 92,155 98,104 105,34" strokeWidth="0.85" />
        <g>
          <path d="M 89,166 C 60,174 30,158 24,132 C 48,118 78,132 90,160" strokeWidth="1.4" />
          <path d="M 88,163 C 66,154 46,144 27,134" strokeWidth="0.95" />
          <line x1="72" y1="156" x2="62" y2="164" strokeWidth="0.7" />
          <line x1="58" y1="149" x2="46" y2="158" strokeWidth="0.7" />
          <line x1="44" y1="142" x2="34" y2="150" strokeWidth="0.7" />
        </g>
        <g>
          <path d="M 93,146 C 122,152 152,136 158,110 C 134,96 104,110 94,140" strokeWidth="1.4" />
          <path d="M 94,143 C 115,134 135,124 155,112" strokeWidth="0.95" />
          <line x1="112" y1="135" x2="122" y2="143" strokeWidth="0.7" />
          <line x1="126" y1="128" x2="138" y2="136" strokeWidth="0.7" />
        </g>
        <g strokeWidth="1.1">
          <path d="M 90,126 L 74,118" />
          <path d="M 74,118 L 68,113 L 65,120 L 72,123 Z" />
          <path d="M 97,104 L 114,96" />
          <path d="M 114,96 L 120,91 L 123,98 L 116,101 Z" />
        </g>
        <g>
          <path d="M 94,114 C 66,120 38,104 34,80 C 56,66 84,80 95,108" strokeWidth="1.35" />
          <path d="M 94,111 C 74,102 54,92 37,82" strokeWidth="0.9" />
        </g>
        <g>
          <path d="M 98,90 C 125,94 150,80 154,56 C 132,44 108,58 99,84" strokeWidth="1.35" />
          <path d="M 99,87 C 118,78 136,68 151,58" strokeWidth="0.9" />
        </g>
        <g>
          <path d="M 100,62 C 76,66 54,54 51,34 C 70,22 92,34 101,56" strokeWidth="1.3" />
          <path d="M 103,42 C 122,44 139,33 141,16 C 125,7 108,18 104,37" strokeWidth="1.25" />
          <path d="M 104,28 C 100,14 109,4 119,4 C 125,14 118,26 104,29" strokeWidth="1.2" />
        </g>
      </motion.g>
    </svg>
  );
}

export function JojobaSvg({ className = 'w-28 h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 140"
      className={className}
      stroke="#1C1B1B"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Copperplate botanical engraving of Golden Jojoba leaves and seed capsules"
    >
      {/* Main curving desert twig + swaying leaves */}
      <motion.g
        style={{ transformOrigin: '22px 118px' }}
        animate={{ rotate: [-1.1, 1.3, -1.1] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path
          d="M 22,118 C 52,102 82,78 134,34"
          strokeWidth="1.7"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
        <path d="M 26,120 C 56,104 86,80 135,38" strokeWidth="0.75" />

        {/* Left paired leathery jojoba leaves */}
        <g>
          <path d="M 56,97 C 32,88 18,66 26,48 C 44,44 62,64 60,92" strokeWidth="1.35" />
          <path d="M 55,93 C 44,77 35,63 29,51" strokeWidth="0.85" />
          <line x1="45" y1="78" x2="35" y2="79" strokeWidth="0.65" />
          <line x1="39" y1="68" x2="29" y2="68" strokeWidth="0.65" />
          <line x1="48" y1="74" x2="54" y2="66" strokeWidth="0.65" />
        </g>
        <g>
          <path d="M 88,73 C 70,56 64,34 78,20 C 96,22 104,46 92,69" strokeWidth="1.3" />
          <path d="M 88,69 C 84,52 81,38 79,24" strokeWidth="0.85" />
          <line x1="84" y1="51" x2="75" y2="45" strokeWidth="0.65" />
          <line x1="86" y1="43" x2="93" y2="37" strokeWidth="0.65" />
        </g>

        {/* Right lower leaf */}
        <g>
          <path d="M 110,55 C 128,48 150,55 158,72 C 142,84 120,76 112,59" strokeWidth="1.3" />
          <path d="M 114,58 C 129,62 142,66 154,71" strokeWidth="0.85" />
          <line x1="129" y1="62" x2="136" y2="55" strokeWidth="0.65" />
          <line x1="136" y1="64" x2="128" y2="71" strokeWidth="0.65" />
        </g>
      </motion.g>

      {/* Primary acorn-like jojoba capsule with 3-valved calyx */}
      <g>
        <path d="M 76,83 C 82,92 84,104 82,116" strokeWidth="1.1" />
        <path d="M 73,94 C 78,89 88,89 93,95" strokeWidth="1.1" />
        <path d="M 70,96 C 68,112 75,126 83,128 C 92,126 98,112 95,96 Z" strokeWidth="1.45" />
        {/* Copperplate hatching inside seed capsule */}
        <line x1="74" y1="103" x2="79" y2="123" strokeWidth="0.7" />
        <line x1="78" y1="100" x2="83" y2="125" strokeWidth="0.7" />
        <line x1="83" y1="99" x2="87" y2="124" strokeWidth="0.7" />
        <line x1="88" y1="101" x2="91" y2="119" strokeWidth="0.7" />
      </g>

      {/* Secondary split jojoba pod + glistening golden oil droplet */}
      <g>
        <path d="M 118,86 C 110,94 109,110 118,120 C 127,122 135,114 134,102 C 132,92 125,86 118,86 Z" strokeWidth="1.35" />
        <path d="M 114,91 C 119,102 121,111 119,120" strokeWidth="0.85" />
        <path d="M 122,90 C 127,99 128,109 125,118" strokeWidth="0.7" />
        <motion.g
          style={{ transformOrigin: '148px 115px' }}
          animate={{ scale: [0.95, 1.07, 0.95], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M 148,104 C 148,104 141,113 141,118 C 141,122 144.1,125 148,125 C 151.9,125 155,122 155,118 C 155,113 148,104 148,104 Z"
            stroke="#C86D1F"
            strokeWidth="1.25"
          />
          <line x1="146" y1="115" x2="146" y2="121" stroke="#C86D1F" strokeWidth="0.8" />
        </motion.g>
      </g>

      {/* Stippling */}
      <g fill="#1C1B1B" stroke="none">
        <circle cx="102" cy="98" r="0.9" />
        <circle cx="105" cy="108" r="0.85" />
        <circle cx="64" cy="112" r="0.85" />
        <circle cx="148" cy="96" r="0.85" />
      </g>
    </svg>
  );
}

export function MarulaSvg({ className = 'w-28 h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 140"
      className={className}
      stroke="#1C1B1B"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Copperplate botanical engraving of Virgin Marula fruit, leaves, and nut"
    >
      {/* Branch stem */}
      <motion.path
        d="M 18,46 C 58,34 106,30 160,36"
        strokeWidth="1.7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />
      <path d="M 24,48 C 62,37 108,33 154,38" strokeWidth="0.7" />

      {/* Compound marula leaflets fluttering in breeze */}
      <motion.g
        style={{ transformOrigin: '96px 32px' }}
        animate={{ rotate: [-1.8, 1.8, -1.8] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 96,32 C 110,18 128,14 148,16" strokeWidth="1.1" />
        <path d="M 106,26 C 102,16 110,8 120,11 C 122,19 114,26 106,26 Z" strokeWidth="1.15" />
        <path d="M 124,20 C 122,10 132,5 140,10 C 140,18 131,22 124,20 Z" strokeWidth="1.15" />
        <path d="M 140,16 C 144,8 156,7 161,14 C 156,21 146,21 140,16 Z" strokeWidth="1.15" />
        <path d="M 118,24 C 124,29 135,28 139,20" strokeWidth="1.0" />
      </motion.g>

      {/* Primary plump marula fruit hanging from stem */}
      <motion.g
        style={{ transformOrigin: '64px 37px' }}
        animate={{ rotate: [-1.4, 1.4, -1.4] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 64,37 C 66,46 66,52 65,57" strokeWidth="1.2" />
        <ellipse cx="64" cy="84" rx="25" ry="28" strokeWidth="1.5" />
        {/* Curved shading hatches */}
        <path d="M 46,70 C 44,82 46,94 53,104" strokeWidth="0.7" />
        <path d="M 52,65 C 50,80 52,96 59,107" strokeWidth="0.7" />
        <path d="M 78,66 C 83,76 84,88 80,99" strokeWidth="0.65" />
        <path d="M 60,57 C 64,60 68,60 71,57" strokeWidth="0.9" />
      </motion.g>

      {/* Second smaller marula fruit */}
      <motion.g
        style={{ transformOrigin: '112px 33px' }}
        animate={{ rotate: [1.5, -1.5, 1.5] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 112,33 C 114,44 115,52 114,60" strokeWidth="1.15" />
        <ellipse cx="114" cy="80" rx="19" ry="22" strokeWidth="1.4" />
        <path d="M 101,69 C 99,78 100,88 106,96" strokeWidth="0.7" />
        <path d="M 107,65 C 105,76 107,89 112,98" strokeWidth="0.65" />
      </motion.g>

      {/* Cracked Marula nut & ochre oil drop */}
      <g>
        <path d="M 134,114 C 128,104 134,94 146,96 C 156,98 160,109 154,118 C 148,125 138,123 134,114 Z" strokeWidth="1.35" />
        <circle cx="142" cy="107" r="3.2" strokeWidth="0.9" />
        <circle cx="149" cy="111" r="2.8" strokeWidth="0.9" />
        <motion.path
          d="M 92,112 C 92,112 87,119 87,123 C 87,126 89.2,128.5 92,128.5 C 94.8,128.5 97,126 97,123 C 97,119 92,112 92,112 Z"
          stroke="#C86D1F"
          strokeWidth="1.25"
          style={{ transformOrigin: '92px 120px' }}
          animate={{ scale: [0.94, 1.08, 0.94], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>

      <g fill="#1C1B1B" stroke="none">
        <circle cx="72" cy="95" r="0.9" />
        <circle cx="75" cy="88" r="0.85" />
        <circle cx="122" cy="86" r="0.85" />
        <circle cx="38" cy="108" r="0.9" />
      </g>
    </svg>
  );
}

export function ArganSvg({ className = 'w-28 h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 140"
      className={className}
      stroke="#1C1B1B"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Copperplate botanical engraving of Moroccan Argan twig, thorns, leaves, and fruit"
    >
      {/* Gnarled argan branch + characteristic thorns */}
      <motion.path
        d="M 20,98 C 52,82 96,62 152,42"
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />
      <path d="M 48,84 L 40,66" strokeWidth="1.25" />
      <path d="M 104,59 L 112,42" strokeWidth="1.25" />

      {/* Narrow clustered lanceolate leaves swaying gently */}
      <motion.g
        style={{ transformOrigin: '66px 76px' }}
        animate={{ rotate: [-1.5, 1.7, -1.5] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 64,77 C 52,58 54,34 68,18 C 76,34 76,58 66,76" strokeWidth="1.25" />
        <path d="M 65,73 C 64,54 66,36 68,21" strokeWidth="0.75" />
        <path d="M 68,75 C 74,54 84,34 96,24 C 94,44 82,64 69,75" strokeWidth="1.2" />
        <path d="M 69,72 C 78,54 86,39 94,27" strokeWidth="0.7" />
        <path d="M 122,52 C 134,34 150,24 166,22 C 158,38 142,50 124,53" strokeWidth="1.2" />
        <path d="M 125,51 C 139,40 151,31 163,24" strokeWidth="0.7" />
      </motion.g>

      {/* Pointed spindle-shaped argan fruits */}
      <g>
        <path d="M 88,68 C 84,74 82,84 85,95 C 91,105 101,105 106,94 C 109,83 103,71 91,67 Z" strokeWidth="1.45" />
        <path d="M 90,72 C 88,82 89,91 93,99" strokeWidth="0.7" />
        <path d="M 95,71 C 94,81 95,91 98,99" strokeWidth="0.7" />
      </g>
      <g>
        <path d="M 124,56 C 118,65 117,77 123,86 C 131,93 141,89 144,78 C 146,67 137,57 124,56 Z" strokeWidth="1.35" />
        <path d="M 126,62 C 124,70 126,78 130,85" strokeWidth="0.7" />
      </g>

      {/* Cross-section kernel revealing inner argan nut + ochre drop */}
      <g>
        <path d="M 52,102 C 42,108 42,122 54,126 C 66,127 73,115 66,105 C 62,100 56,99 52,102 Z" strokeWidth="1.35" />
        <motion.ellipse
          cx="56"
          cy="113"
          rx="6"
          ry="4"
          transform="rotate(-18 56 113)"
          stroke="#C86D1F"
          strokeWidth="1.15"
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 148,100 C 148,100 142,108 142,113 C 142,117 144.7,120 148,120 C 151.3,120 154,117 154,113 C 154,108 148,100 148,100 Z"
          stroke="#C86D1F"
          strokeWidth="1.2"
          style={{ transformOrigin: '148px 111px' }}
          animate={{ scale: [0.94, 1.07, 0.94], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>

      <g fill="#1C1B1B" stroke="none">
        <circle cx="101" cy="86" r="0.85" />
        <circle cx="137" cy="75" r="0.85" />
        <circle cx="76" cy="115" r="0.9" />
      </g>
    </svg>
  );
}

export function SweetAlmondSvg({ className = 'w-28 h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 140"
      className={className}
      stroke="#1C1B1B"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Copperplate botanical engraving of Sweet Almond blossom, serrated leaves, and almonds"
    >
      {/* Branch */}
      <motion.path
        d="M 16,108 C 56,88 102,60 152,24"
        strokeWidth="1.65"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Serrated lanceolate leaves swaying gently */}
      <motion.g
        style={{ transformOrigin: '48px 91px' }}
        animate={{ rotate: [-1.4, 1.6, -1.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 46,92 C 30,68 32,38 50,20 C 60,40 60,68 48,91" strokeWidth="1.3" />
        <path d="M 47,87 C 46,64 47,42 50,24" strokeWidth="0.8" />
        <line x1="47" y1="68" x2="39" y2="58" strokeWidth="0.65" />
        <line x1="48" y1="54" x2="40" y2="45" strokeWidth="0.65" />
        <line x1="48" y1="60" x2="55" y2="51" strokeWidth="0.65" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: '112px 54px' }}
        animate={{ rotate: [1.4, -1.2, 1.4] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 110,52 C 128,44 150,48 164,62 C 148,74 126,70 112,55" strokeWidth="1.25" />
        <path d="M 115,54 C 131,56 146,59 160,62" strokeWidth="0.75" />
      </motion.g>

      {/* 5-petaled almond blossom with pulsing ochre stamens */}
      <motion.g
        transform="translate(82,38)"
        style={{ transformOrigin: '0px 0px' }}
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 0,-5 C -6,-18 6,-18 0,-5" strokeWidth="1.15" />
        <path d="M 5,-2 C 18,-8 20,4 5,2" strokeWidth="1.15" />
        <path d="M 3,4 C 12,16 0,20 -2,5" strokeWidth="1.15" />
        <path d="M -3,4 C -14,16 -20,4 -5,2" strokeWidth="1.15" />
        <path d="M -5,-2 C -18,-8 -10,-18 -2,-5" strokeWidth="1.15" />
        <motion.g
          stroke="#C86D1F"
          strokeWidth="0.9"
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <line x1="0" y1="0" x2="0" y2="-8" />
          <line x1="0" y1="0" x2="7" y2="-4" />
          <line x1="0" y1="0" x2="5" y2="6" />
          <line x1="0" y1="0" x2="-6" y2="5" />
          <line x1="0" y1="0" x2="-7" y2="-4" />
        </motion.g>
      </motion.g>

      {/* Classic teardrop sweet almonds with pitted shell hatching */}
      <g>
        <path d="M 88,80 C 74,90 74,114 88,124 C 102,114 102,90 88,80 Z" strokeWidth="1.45" />
        <path d="M 84,88 C 81,98 81,109 85,118" strokeWidth="0.7" />
        <path d="M 88,85 C 88,97 88,110 88,120" strokeWidth="0.7" />
        <path d="M 92,89 C 94,99 94,109 91,118" strokeWidth="0.7" />
      </g>
      <g>
        <path d="M 122,88 C 110,95 108,113 118,122 C 131,117 134,99 122,88 Z" strokeWidth="1.35" />
        <path d="M 118,96 C 116,104 116,112 118,118" strokeWidth="0.7" />
        <path d="M 123,95 C 124,103 123,111 121,117" strokeWidth="0.7" />
      </g>

      <g fill="#1C1B1B" stroke="none">
        <circle cx="88" cy="100" r="0.85" />
        <circle cx="121" cy="106" r="0.85" />
        <circle cx="68" cy="112" r="0.85" />
      </g>
    </svg>
  );
}

export function VitaminESvg({ className = 'w-28 h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 140"
      className={className}
      stroke="#1C1B1B"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Copperplate botanical and apothecary engraving of wheat-germ stalks, sunflower seed, and Vitamin E pipette"
    >
      {/* Arching botanical wheat-germ stalks & sheathing leaves swaying gently */}
      <motion.g
        style={{ transformOrigin: '38px 124px' }}
        animate={{ rotate: [-1.5, 1.8, -1.5] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Main arching culm & secondary culm */}
        <motion.path
          d="M 38,124 C 42,96 52,66 72,34"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <path d="M 41,124 C 45,98 54,70 72,38" strokeWidth="0.65" />
        <path d="M 28,124 C 30,104 34,86 44,64" strokeWidth="1.2" />

        {/* Arching blade leaves */}
        <path d="M 42,110 C 26,102 16,90 14,76 C 24,82 34,92 43,104" strokeWidth="1.2" />
        <path d="M 40,106 C 30,97 22,89 17,80" strokeWidth="0.65" />
        <path d="M 47,96 C 60,88 73,88 84,94 C 72,100 58,100 46,98" strokeWidth="1.2" />
        <path d="M 48,96 C 60,94 70,94 80,94" strokeWidth="0.65" />

        {/* Overlapping engraved wheat spikelets along primary ear (bottom-left to top-right) */}
        {[
          { x: 52, y: 74, a: -42, s: 1.0 },
          { x: 61, y: 70, a: 12, s: 1.0 },
          { x: 57, y: 63, a: -40, s: 0.96 },
          { x: 66, y: 59, a: 14, s: 0.96 },
          { x: 62, y: 52, a: -38, s: 0.92 },
          { x: 70, y: 48, a: 16, s: 0.92 },
          { x: 66, y: 42, a: -34, s: 0.86 },
          { x: 74, y: 38, a: 18, s: 0.84 },
        ].map((g, i) => (
          <g key={i} transform={`translate(${g.x},${g.y}) rotate(${g.a}) scale(${g.s})`}>
            <path d="M 0,0 C -5,-5 -4,-13 0,-17 C 4,-13 5,-5 0,0 Z" strokeWidth="1.15" />
            <path d="M 0,-2 L 0,-14" strokeWidth="0.6" />
            <path d="M -2,-6 L -1,-11" strokeWidth="0.5" />
            {/* Sweeping wheat awn */}
            <path d="M 0,-17 C -1,-24 -3,-29 -6,-34" strokeWidth="0.65" />
          </g>
        ))}

        {/* Secondary smaller wheat ear */}
        {[
          { x: 38, y: 76, a: -36, s: 0.82 },
          { x: 44, y: 72, a: 10, s: 0.8 },
          { x: 41, y: 66, a: -32, s: 0.78 },
          { x: 47, y: 62, a: 14, s: 0.76 },
        ].map((g, i) => (
          <g key={i} transform={`translate(${g.x},${g.y}) rotate(${g.a}) scale(${g.s})`}>
            <path d="M 0,0 C -4.5,-4.5 -3.5,-11.5 0,-15 C 3.5,-11.5 4.5,-4.5 0,0 Z" strokeWidth="1.05" />
            <path d="M 0,-2 L 0,-12" strokeWidth="0.55" />
            <path d="M 0,-15 C -1,-21 -3,-25 -5,-29" strokeWidth="0.6" />
          </g>
        ))}
      </motion.g>

      {/* Apothecary glass dropper pipette with ribbed collar & oil meniscus */}
      <g>
        {/* Rubber squeeze bulb with shading hatches */}
        <path d="M 118,16 C 122,10 132,10 136,16 L 138,31 L 116,31 Z" strokeWidth="1.45" />
        <path d="M 121,16 C 121,21 121,26 120,30" strokeWidth="0.7" />
        <path d="M 125,14 C 125,20 125,26 124,30" strokeWidth="0.65" />
        <path d="M 132,16 C 133,21 133,26 134,30" strokeWidth="0.65" />

        {/* Ribbed knurled collar */}
        <rect x="113" y="31" width="28" height="7" rx="1.2" strokeWidth="1.35" />
        <line x1="118" y1="31" x2="118" y2="38" strokeWidth="0.75" />
        <line x1="122" y1="31" x2="122" y2="38" strokeWidth="0.75" />
        <line x1="127" y1="31" x2="127" y2="38" strokeWidth="0.75" />
        <line x1="132" y1="31" x2="132" y2="38" strokeWidth="0.75" />
        <line x1="136" y1="31" x2="136" y2="38" strokeWidth="0.75" />

        {/* Tapered glass pipette barrel */}
        <path d="M 120,38 L 120,74 L 125,91 L 129,91 L 134,74 L 134,38" strokeWidth="1.35" />
        {/* Glass refraction highlight & graduated tick marks */}
        <line x1="122" y1="42" x2="122" y2="72" strokeWidth="0.6" />
        <line x1="129" y1="46" x2="134" y2="46" strokeWidth="0.75" />
        <line x1="127" y1="54" x2="134" y2="54" strokeWidth="0.75" />
        <line x1="129" y1="62" x2="134" y2="62" strokeWidth="0.75" />
        {/* Shimmering golden Tocopherol oil level inside tip */}
        <motion.g
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M 121,67 Q 127,70 133,67" stroke="#C86D1F" strokeWidth="1.1" />
          <path d="M 123,74 L 131,74" stroke="#C86D1F" strokeWidth="0.7" />
          <path d="M 124,80 L 130,80" stroke="#C86D1F" strokeWidth="0.7" />
        </motion.g>
      </g>

      {/* Suspended Vitamin E antioxidant droplet & expanding concentric preservation ripple */}
      <g>
        <motion.g
          style={{ transformOrigin: '127px 108px' }}
          animate={{ scale: [0.95, 1.07, 0.95], y: [0, 1.5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M 127,96 C 127,96 119,106.5 119,112 C 119,116.5 122.6,120 127,120 C 131.4,120 135,116.5 135,112 C 135,106.5 127,96 127,96 Z"
            stroke="#C86D1F"
            strokeWidth="1.5"
          />
          <path d="M 123.5,109 C 122.5,112 123.5,115.5 126.5,116.5" stroke="#C86D1F" strokeWidth="0.9" />
          {/* Radiating antioxidant protection ticks */}
          <motion.g
            stroke="#C86D1F"
            strokeWidth="0.8"
            animate={{ opacity: [0.35, 0.95, 0.35] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <line x1="112" y1="111" x2="105" y2="111" />
            <line x1="142" y1="111" x2="149" y2="111" />
            <line x1="114" y1="102" x2="108" y2="97" />
            <line x1="140" y1="102" x2="146" y2="97" />
          </motion.g>
        </motion.g>
        {/* Expanding concentric ripple beneath droplet */}
        <motion.ellipse
          cx="127"
          cy="124"
          rx="14"
          ry="2.2"
          stroke="#C86D1F"
          strokeWidth="0.75"
          style={{ transformOrigin: '127px 124px' }}
          animate={{ scale: [0.8, 1.18, 0.8], opacity: [0.85, 0.2, 0.85] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>

      {/* Hatched sunflower seed (natural tocopherol source) at base */}
      <g>
        <path d="M 88,122 C 80,118 76,109 82,102 C 88,101 97,106 101,115 C 98,121 93,124 88,122 Z" strokeWidth="1.3" />
        <path d="M 83,104 C 89,109 94,114 97,120" strokeWidth="0.75" />
        <path d="M 81,109 C 86,113 90,117 93,122" strokeWidth="0.7" />
        <path d="M 87,103 C 92,107 96,111 99,117" strokeWidth="0.65" />
      </g>

      {/* Ground copperplate line hatching & stippling */}
      <path d="M 16,125 Q 88,122 162,126" strokeWidth="0.85" />
      <line x1="28" y1="129" x2="66" y2="128" strokeWidth="0.6" />
      <line x1="78" y1="129" x2="110" y2="129" strokeWidth="0.55" />
      <line x1="138" y1="129" x2="156" y2="129" strokeWidth="0.6" />
      <g fill="#1C1B1B" stroke="none">
        <circle cx="96" cy="96" r="0.85" />
        <circle cx="104" cy="118" r="0.9" />
        <circle cx="146" cy="121" r="0.85" />
        <circle cx="62" cy="116" r="0.85" />
      </g>
    </svg>
  );
}

export function MonogramSealSvg({ className = 'w-28 h-28' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 180"
      className={className}
      role="img"
      aria-label="Circular PŪLA Grooming Maseru Lesotho monogram seal stamp"
    >
      <defs>
        <path id="pulaTopArc" d="M 32,90 A 58,58 0 1,1 148,90" />
        <path id="pulaBottomArc" d="M 148,92 A 58,58 0 1,1 32,92" />
      </defs>
      <circle cx="90" cy="90" r="85" fill="#F5F1E8" stroke="#1C1B1B" strokeWidth="2.6" />
      <circle cx="90" cy="90" r="79" fill="none" stroke="#1C1B1B" strokeWidth="1.1" />
      <motion.circle
        cx="90"
        cy="90"
        r="74"
        fill="none"
        stroke="#1C1B1B"
        strokeWidth="1.2"
        strokeDasharray="1.8 4.2"
        strokeLinecap="round"
        style={{ transformOrigin: '90px 90px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      />
      <circle cx="90" cy="90" r="50" fill="none" stroke="#1C1B1B" strokeWidth="1.1" />
      <text
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="700"
        fontSize="11.5"
        letterSpacing="3.2"
        fill="#1C1B1B"
      >
        <textPath href="#pulaTopArc" startOffset="50%" textAnchor="middle">
          PŪLA · GROOMING
        </textPath>
      </text>
      <text
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="700"
        fontSize="10.8"
        letterSpacing="2.8"
        fill="#1C1B1B"
      >
        <textPath href="#pulaBottomArc" startOffset="50%" textAnchor="middle">
          MASERU · LESOTHO
        </textPath>
      </text>
      <g stroke="#1C1B1B" fill="none" strokeWidth="0.9" strokeLinecap="round">
        <path d="M 27,96 Q 27,89 27,82" />
        <path d="M 27,92 C 23,90 23,86 27,87" />
        <path d="M 27,89 C 31,87 31,83 27,84" />
        <path d="M 153,96 Q 153,89 153,82" />
        <path d="M 153,92 C 149,90 149,86 153,87" />
        <path d="M 153,89 C 157,87 157,83 153,84" />
      </g>
      <text
        x="90"
        y="102"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="800"
        fontSize="38"
        letterSpacing="2"
        fill="#1C1B1B"
      >
        PŪ
      </text>
      <g stroke="#1C1B1B" fill="none" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 76,120 L 84,111 L 87,114 L 90,109 L 94,114 L 97,111 L 104,120" />
        <path
          d="M 90,118 C 90,118 86.2,123.4 86.2,126.2 C 86.2,128.4 87.9,130 90,130 C 92.1,130 93.8,128.4 93.8,126.2 C 93.8,123.4 90,118 90,118 Z"
          fill="#F5F1E8"
        />
      </g>
    </svg>
  );
}

export function PaoSymbolSvg({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 42 42"
      className={className}
      stroke="#1C1B1B"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="12M Period After Opening symbol"
    >
      <path d="M 6,13 L 34,5" />
      <path d="M 7,17 L 35,17 L 32,37 L 10,37 Z" />
      <text
        x="21"
        y="31"
        textAnchor="middle"
        stroke="none"
        fill="#1C1B1B"
        fontFamily="'DM Sans', sans-serif"
        fontWeight="700"
        fontSize="10.5"
      >
        12M
      </text>
    </svg>
  );
}

function AmberBottleGroup({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Soft Ground Contact Shadow */}
      <ellipse cx="64" cy="274" rx="50" ry="9" fill="#0B0A09" opacity="0.55" />
      {/* Pipette Rubber Bulb */}
      <path
        d="M 49,28 C 49,12 79,12 79,28 L 81,56 L 47,56 Z"
        fill="url(#rubberBulb)"
        stroke="#2B2927"
        strokeWidth="1"
      />
      {/* Ribbed Matte Collar */}
      <rect x="40" y="54" width="48" height="24" rx="3" fill="url(#capCollar)" stroke="#2C2A28" strokeWidth="1" />
      <g stroke="#0D0C0B" strokeWidth="0.9" opacity="0.6">
        <line x1="45" y1="56" x2="45" y2="76" />
        <line x1="50" y1="56" x2="50" y2="76" />
        <line x1="55" y1="56" x2="55" y2="76" />
        <line x1="60" y1="56" x2="60" y2="76" />
        <line x1="65" y1="56" x2="65" y2="76" />
        <line x1="70" y1="56" x2="70" y2="76" />
        <line x1="75" y1="56" x2="75" y2="76" />
        <line x1="80" y1="56" x2="80" y2="76" />
        <line x1="84" y1="56" x2="84" y2="76" />
      </g>
      {/* Glass Neck */}
      <rect x="44" y="78" width="40" height="12" fill="url(#amberGlass)" />
      {/* Amber Glass Body */}
      <path
        d="M 44,90 C 44,104 20,108 20,128 L 20,258 C 20,268 28,274 38,274 L 90,274 C 100,274 108,268 108,258 L 108,128 C 108,108 84,104 84,90 Z"
        fill="url(#amberGlass)"
        stroke="#4B250C"
        strokeWidth="1.2"
      />
      {/* Warm Golden Oil Glow inside Lower Bottle */}
      <path
        d="M 24,136 L 104,136 L 104,256 C 104,264 98,269 90,269 L 38,269 C 30,269 24,264 24,256 Z"
        fill="url(#amberLiquid)"
        opacity="0.55"
      />
      {/* Specular Vertical Glass Highlights */}
      <path d="M 28,118 C 27,132 27,246 29,260" stroke="#F6C88C" strokeWidth="3.5" strokeLinecap="round" opacity="0.28" />
      <path d="M 99,122 C 100,136 100,248 98,260" stroke="#F6C88C" strokeWidth="1.8" strokeLinecap="round" opacity="0.22" />
      {/* Matte Cream Apothecary Label */}
      <rect x="22" y="138" width="84" height="114" rx="1.5" fill="#F5F1E8" stroke="#1C1B1B" strokeWidth="1" />
      <rect x="26" y="142" width="76" height="106" fill="none" stroke="#1C1B1B" strokeWidth="0.9" />
      <text
        x="64"
        y="164"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="800"
        fontSize="16"
        letterSpacing="4"
        fill="#1C1B1B"
      >
        PŪLA
      </text>
      <line x1="34" y1="171" x2="94" y2="171" stroke="#1C1B1B" strokeWidth="0.7" />
      <text
        x="64"
        y="184"
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontWeight="700"
        fontSize="6.2"
        letterSpacing="0.8"
        fill="#1C1B1B"
      >
        CONDITIONING
      </text>
      <text
        x="64"
        y="193"
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontWeight="700"
        fontSize="6.2"
        letterSpacing="0.8"
        fill="#1C1B1B"
      >
        BEARD OIL
      </text>
      <text
        x="64"
        y="208"
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontWeight="700"
        fontSize="5.6"
        fill="#C86D1F"
      >
        01 · CITRUS &amp; WOODS
      </text>
      <text
        x="64"
        y="222"
        textAnchor="middle"
        fontFamily="'DM Sans', sans-serif"
        fontSize="5.4"
        fill="#4A4845"
      >
        JOJOBA · ARGAN · MARULA
      </text>
      <line x1="34" y1="231" x2="94" y2="231" stroke="#1C1B1B" strokeWidth="0.6" />
      <text
        x="64"
        y="241"
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontSize="5.5"
        fill="#1C1B1B"
      >
        30 ML · MASERU
      </text>
    </g>
  );
}

function StudioArtworkSvg({ photoId }: { photoId: GalleryPhotoId }) {
  const effectiveId = photoId === 'gift-kit' || photoId === 'twin-pack' ? 'hero-box' : photoId;
  return (
    <svg viewBox="0 0 640 480" className="w-full h-full object-cover" role="img" aria-label={`PŪLA studio composition: ${photoId}`}>
      <defs>
        <linearGradient id="slateBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#262422" />
          <stop offset="55%" stopColor="#191816" />
          <stop offset="100%" stopColor="#121110" />
        </linearGradient>
        <radialGradient id="studioSpot" cx="52%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#C86D1F" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#3B2A1A" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#121110" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="amberGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4F2309" />
          <stop offset="28%" stopColor="#9A4A12" />
          <stop offset="62%" stopColor="#6D310B" />
          <stop offset="100%" stopColor="#2F1304" />
        </linearGradient>
        <linearGradient id="amberLiquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D67A27" />
          <stop offset="100%" stopColor="#6D2F0A" />
        </linearGradient>
        <linearGradient id="rubberBulb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#181716" />
          <stop offset="40%" stopColor="#34312E" />
          <stop offset="100%" stopColor="#121110" />
        </linearGradient>
        <linearGradient id="capCollar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#171615" />
          <stop offset="50%" stopColor="#2D2B29" />
          <stop offset="100%" stopColor="#100F0E" />
        </linearGradient>
        <linearGradient id="boxFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FAF8F3" />
          <stop offset="100%" stopColor="#EAE3D5" />
        </linearGradient>
        <linearGradient id="boxSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DED6C6" />
          <stop offset="100%" stopColor="#CBC1AE" />
        </linearGradient>
      </defs>

      {effectiveId === 'hero-box' && (
        <>
          <rect width="640" height="480" fill="url(#slateBg)" />
          <rect width="640" height="480" fill="url(#studioSpot)" />
          {/* Dark Basalt Pedestal Horizon */}
          <rect x="0" y="348" width="640" height="132" fill="#141312" />
          <line x1="0" y1="348" x2="640" y2="348" stroke="#3A3632" strokeWidth="1" />
          {/* Textured Cream Retail Box */}
          <g transform="translate(152, 86)">
            <ellipse cx="94" cy="296" rx="92" ry="12" fill="#080707" opacity="0.65" />
            {/* Box Front Face */}
            <rect x="0" y="0" width="144" height="292" fill="url(#boxFront)" stroke="#1C1B1B" strokeWidth="1.2" />
            {/* Box Right 3D Perspective Side */}
            <polygon points="144,0 186,16 186,278 144,292" fill="url(#boxSide)" stroke="#1C1B1B" strokeWidth="1.1" />
            {/* Box Inner Architectural Frame */}
            <rect x="10" y="10" width="124" height="272" fill="none" stroke="#1C1B1B" strokeWidth="1" />
            <text x="72" y="46" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="22" letterSpacing="5" fill="#1C1B1B">
              PŪLA
            </text>
            <line x1="22" y1="58" x2="122" y2="58" stroke="#1C1B1B" strokeWidth="0.9" />
            <text x="72" y="76" textAnchor="middle" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="8" letterSpacing="1.3" fill="#1C1B1B">
              CONDITIONING
            </text>
            <text x="72" y="88" textAnchor="middle" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="8" letterSpacing="1.3" fill="#1C1B1B">
              BEARD OIL
            </text>
            {/* Mini Mountain Engraving Inside Carton */}
            <path d="M 30,148 L 54,118 L 66,128 L 80,104 L 96,130 L 114,148 Z" fill="none" stroke="#1C1B1B" strokeWidth="1.1" />
            <line x1="80" y1="104" x2="76" y2="148" stroke="#1C1B1B" strokeWidth="0.8" />
            <line x1="60" y1="112" x2="55" y2="122" stroke="#C86D1F" strokeWidth="0.9" />
            <line x1="92" y1="110" x2="87" y2="120" stroke="#C86D1F" strokeWidth="0.9" />
            <text x="72" y="176" textAnchor="middle" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="7.6" fill="#C86D1F">
              01 · FRESH CITRUS
            </text>
            <text x="72" y="188" textAnchor="middle" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="7.6" fill="#C86D1F">
              &amp; WOODS
            </text>
            <text x="72" y="214" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="7.2" fill="#4A4845">
              COLD-PRESSED BOTANICALS
            </text>
            <text x="72" y="226" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="7.2" fill="#4A4845">
              JOJOBA · ARGAN · MARULA
            </text>
            <line x1="22" y1="246" x2="122" y2="246" stroke="#1C1B1B" strokeWidth="0.8" />
            <text x="72" y="262" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="7.2" fill="#1C1B1B">
              30 ML / 1.0 FL. OZ.
            </text>
            <text x="72" y="274" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6.5" fill="#4A4845">
              MASERU, LESOTHO
            </text>
            {/* Side Panel Vertical Stamp */}
            <text
              x="165"
              y="154"
              textAnchor="middle"
              transform="rotate(-90 165 154)"
              fontFamily="'Space Mono', monospace"
              fontSize="7"
              letterSpacing="2.4"
              fill="#4A4845"
            >
              BATCH 001 · 100% NATURAL
            </text>
          </g>
          {/* 30ml Amber Glass Dropper Bottle Beside Box */}
          <AmberBottleGroup x={352} y={108} scale={1.03} />
        </>
      )}

      {photoId === 'bottle-solo' && (
        <>
          <rect width="640" height="480" fill="url(#slateBg)" />
          <rect width="640" height="480" fill="url(#studioSpot)" />
          {/* Architectural Pedestal */}
          <rect x="170" y="370" width="300" height="24" fill="#23211F" stroke="#3B3732" strokeWidth="1" />
          <rect x="0" y="394" width="640" height="86" fill="#131211" />
          <AmberBottleGroup x={244} y={64} scale={1.16} />
          {/* Minimal Spec Callouts */}
          <g stroke="#C86D1F" strokeWidth="0.9" opacity="0.8">
            <line x1="115" y1="150" x2="255" y2="150" />
            <line x1="395" y1="255" x2="520" y2="255" />
          </g>
          <text x="115" y="142" fontFamily="'Space Mono', monospace" fontSize="9.5" fill="#F5F1E8" letterSpacing="1.2">
            GLASS PIPETTE
          </text>
          <text x="115" y="164" fontFamily="'DM Sans', sans-serif" fontSize="10" fill="#B7AFA4">
            Precision drop control
          </text>
          <text x="520" y="247" textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="9.5" fill="#F5F1E8" letterSpacing="1.2">
            UV AMBER GLASS
          </text>
          <text x="520" y="269" textAnchor="end" fontFamily="'DM Sans', sans-serif" fontSize="10" fill="#B7AFA4">
            Protects cold-pressed oils
          </text>
        </>
      )}

      {photoId === 'box-back' && (
        <>
          <rect width="640" height="480" fill="#EAE3D5" />
          <rect x="0" y="388" width="640" height="92" fill="#DDD4C3" />
          {/* Back Panel of Retail Carton */}
          <g transform="translate(175, 44)">
            <rect x="14" y="14" width="270" height="368" fill="#1C1B1B" opacity="0.14" />
            <rect x="0" y="0" width="270" height="368" fill="#FAF8F3" stroke="#1C1B1B" strokeWidth="1.4" />
            <rect x="12" y="12" width="246" height="344" fill="none" stroke="#1C1B1B" strokeWidth="0.9" />
            <text x="135" y="38" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="15" letterSpacing="4" fill="#1C1B1B">
              PŪLA
            </text>
            <line x1="28" y1="48" x2="242" y2="48" stroke="#1C1B1B" strokeWidth="0.8" />
            <text x="28" y="68" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="8.5" fill="#C86D1F">
              DIRECTIONS
            </text>
            <text x="28" y="84" fontFamily="'DM Sans', sans-serif" fontSize="9.5" fill="#4A4845">
              Apply 3–6 drops into palms after a warm shower.
            </text>
            <text x="28" y="98" fontFamily="'DM Sans', sans-serif" fontSize="9.5" fill="#4A4845">
              Massage deeply into skin beneath beard and comb.
            </text>
            <line x1="28" y1="114" x2="242" y2="114" stroke="#1C1B1B" strokeWidth="0.6" opacity="0.4" />
            <text x="28" y="134" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="8.5" fill="#1C1B1B">
              INGREDIENTS (INCI)
            </text>
            <text x="28" y="150" fontFamily="'Space Mono', monospace" fontSize="7.6" fill="#4A4845">
              Simmondsia Chinensis (Jojoba) Seed Oil,
            </text>
            <text x="28" y="163" fontFamily="'Space Mono', monospace" fontSize="7.6" fill="#4A4845">
              Prunus Amygdalus Dulcis (Sweet Almond),
            </text>
            <text x="28" y="176" fontFamily="'Space Mono', monospace" fontSize="7.6" fill="#4A4845">
              Argania Spinosa (Argan) Kernel Oil,
            </text>
            <text x="28" y="189" fontFamily="'Space Mono', monospace" fontSize="7.6" fill="#4A4845">
              Sclerocarya Birrea (Marula) Seed Oil,
            </text>
            <text x="28" y="202" fontFamily="'Space Mono', monospace" fontSize="7.6" fill="#4A4845">
              Tocopherol, Bergamot, Cedarwood,
            </text>
            <text x="28" y="215" fontFamily="'Space Mono', monospace" fontSize="7.6" fill="#4A4845">
              Eucalyptus Smithii, Frankincense Oil.
            </text>
            <line x1="28" y1="232" x2="242" y2="232" stroke="#1C1B1B" strokeWidth="0.6" opacity="0.4" />
            <text x="28" y="250" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="8" fill="#C86D1F">
              CAUTION · NUT OILS
            </text>
            <text x="28" y="265" fontFamily="'DM Sans', sans-serif" fontSize="8.8" fill="#4A4845">
              External use only. Contains Sweet Almond oil.
            </text>
            <text x="28" y="278" fontFamily="'DM Sans', sans-serif" fontSize="8.8" fill="#4A4845">
              Store cool &amp; dark. Best within 12M of opening.
            </text>
            <rect x="28" y="302" width="44" height="34" fill="none" stroke="#1C1B1B" strokeWidth="1" />
            <text x="50" y="323" textAnchor="middle" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="11" fill="#1C1B1B">
              12M
            </text>
            <text x="84" y="315" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="8.5" fill="#1C1B1B">
              BATCH 001 · 30 ML e
            </text>
            <text x="84" y="330" fontFamily="'Space Mono', monospace" fontSize="8" fill="#4A4845">
              CRAFTED IN MASERU, LESOTHO
            </text>
          </g>
        </>
      )}

      {photoId === 'botanicals' && (
        <>
          <rect width="640" height="480" fill="#EFEAE0" />
          <rect x="24" y="24" width="592" height="432" fill="#F5F1E8" stroke="#1C1B1B" strokeWidth="1" />
          {/* Subtle Botanical Grid Lines */}
          <line x1="320" y1="24" x2="320" y2="456" stroke="#1C1B1B" strokeWidth="0.5" opacity="0.2" />
          <line x1="24" y1="240" x2="616" y2="240" stroke="#1C1B1B" strokeWidth="0.5" opacity="0.2" />
          {/* Golden Oil Drop Dish */}
          <circle cx="176" cy="148" r="64" fill="#FAF8F3" stroke="#1C1B1B" strokeWidth="1.2" />
          <circle cx="176" cy="148" r="46" fill="#C86D1F" opacity="0.24" />
          <circle cx="176" cy="148" r="30" fill="#C86D1F" opacity="0.6" />
          <circle cx="164" cy="136" r="7" fill="#FAF8F3" opacity="0.65" />
          <text x="176" y="228" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="9.5" fill="#1C1B1B">
            VIRGIN MARULA &amp; JOJOBA
          </text>
          {/* Bergamot Citrus Slice Study */}
          <g transform="translate(468, 138)">
            <circle cx="0" cy="0" r="56" fill="#FAF8F3" stroke="#1C1B1B" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="46" fill="none" stroke="#C86D1F" strokeWidth="1.4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="0"
                x2={Math.cos((deg * Math.PI) / 180) * 44}
                y2={Math.sin((deg * Math.PI) / 180) * 44}
                stroke="#1C1B1B"
                strokeWidth="0.9"
              />
            ))}
            <circle cx="0" cy="0" r="7" fill="#F5F1E8" stroke="#1C1B1B" strokeWidth="1" />
          </g>
          <text x="468" y="220" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="9.5" fill="#1C1B1B">
            CALABRIAN BERGAMOT
          </text>
          {/* Cedarwood Ring Study */}
          <g transform="translate(176, 342)">
            <ellipse cx="0" cy="0" rx="68" ry="44" fill="#E3D7C3" stroke="#1C1B1B" strokeWidth="1.2" />
            <ellipse cx="0" cy="0" rx="52" ry="32" fill="none" stroke="#4A4845" strokeWidth="0.9" />
            <ellipse cx="0" cy="0" rx="36" ry="21" fill="none" stroke="#4A4845" strokeWidth="0.8" />
            <ellipse cx="0" cy="0" rx="20" ry="11" fill="none" stroke="#C86D1F" strokeWidth="1" />
          </g>
          <text x="176" y="416" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="9.5" fill="#1C1B1B">
            VIRGINIAN CEDARWOOD
          </text>
          {/* Eucalyptus Sprig Study */}
          <g transform="translate(468, 340) scale(0.72) translate(-90, -105)">
            <path d="M 88,198 C 90,154 96,102 104,28" stroke="#1C1B1B" strokeWidth="2.2" fill="none" />
            <path d="M 89,166 C 60,174 30,158 24,132 C 48,118 78,132 90,160" stroke="#1C1B1B" strokeWidth="1.5" fill="#EDE7DB" />
            <path d="M 93,146 C 122,152 152,136 158,110 C 134,96 104,110 94,140" stroke="#1C1B1B" strokeWidth="1.5" fill="#EDE7DB" />
            <path d="M 94,114 C 66,120 38,104 34,80 C 56,66 84,80 95,108" stroke="#1C1B1B" strokeWidth="1.5" fill="#EDE7DB" />
            <path d="M 98,90 C 125,94 150,80 154,56 C 132,44 108,58 99,84" stroke="#1C1B1B" strokeWidth="1.5" fill="#EDE7DB" />
          </g>
          <text x="468" y="424" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="9.5" fill="#1C1B1B">
            EUCALYPTUS SMITHII
          </text>
          {/* Center Glass Dropper Pill */}
          <circle cx="320" cy="240" r="34" fill="#1C1B1B" />
          <path d="M 320,218 C 320,218 308,233 308,243 C 308,250 313.4,256 320,256 C 326.6,256 332,250 332,243 C 332,233 320,218 320,218 Z" fill="#C86D1F" />
        </>
      )}

      {photoId === 'ritual' && (
        <>
          <rect width="640" height="480" fill="#211F1D" />
          <rect width="640" height="480" fill="url(#studioSpot)" />
          {/* Warm Travertine Vanity Counter */}
          <rect x="0" y="330" width="640" height="150" fill="#E9E1D3" />
          <line x1="0" y1="330" x2="640" y2="330" stroke="#1C1B1B" strokeWidth="1.2" />
          {/* Subtle Morning Window Light Beams */}
          <polygon points="0,0 240,0 130,330 0,330" fill="#FAF8F3" opacity="0.06" />
          {/* Amber Bottle on Left */}
          <AmberBottleGroup x={140} y={102} scale={0.95} />
          {/* Hardwood Beard Comb on Right */}
          <g transform="translate(310, 296)">
            <ellipse cx="110" cy="64" rx="115" ry="10" fill="#1C1B1B" opacity="0.18" />
            <path d="M 0,14 C 0,4 12,0 26,0 L 194,0 C 208,0 220,4 220,14 L 220,26 L 0,26 Z" fill="#6E4427" stroke="#1C1B1B" strokeWidth="1.2" />
            {Array.from({ length: 24 }).map((_, idx) => (
              <rect
                key={idx}
                x={8 + idx * 8.6}
                y={26}
                width="4.2"
                height="34"
                rx="1.5"
                fill="#5E381F"
                stroke="#1C1B1B"
                strokeWidth="0.6"
              />
            ))}
            <text x="110" y="16" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="7.5" letterSpacing="2" fill="#F5F1E8">
              PŪLA HARDWOOD
            </text>
          </g>
          {/* Water Droplet Accents */}
          <circle cx="292" cy="392" r="5" fill="#FAF8F3" stroke="#C86D1F" strokeWidth="1" opacity="0.8" />
          <circle cx="308" cy="404" r="3" fill="#FAF8F3" stroke="#C86D1F" strokeWidth="1" opacity="0.7" />
        </>
      )}

      {photoId === 'barbershop' && (
        <>
          <rect width="640" height="480" fill="#171615" />
          <rect width="640" height="480" fill="url(#studioSpot)" />
          {/* Barber Mirror Frame */}
          <rect x="64" y="34" width="512" height="278" fill="#23211F" stroke="#4A4845" strokeWidth="2" />
          <rect x="78" y="48" width="484" height="250" fill="#1C1A19" stroke="#C86D1F" strokeWidth="0.8" opacity="0.55" />
          {/* Warm Pendant Reflection */}
          <circle cx="502" cy="96" r="24" fill="#C86D1F" opacity="0.22" />
          <circle cx="502" cy="96" r="10" fill="#F5F1E8" opacity="0.65" />
          {/* Walnut Barber Station Counter */}
          <rect x="0" y="312" width="640" height="168" fill="#3A271B" />
          <line x1="0" y1="312" x2="640" y2="312" stroke="#6B4A32" strokeWidth="2" />
          {/* Station Display Tray */}
          <rect x="148" y="334" width="344" height="14" rx="2" fill="#1C1B1B" stroke="#C86D1F" strokeWidth="0.8" />
          {/* Trio of PŪLA Bottles + Box on Station */}
          <AmberBottleGroup x={188} y={96} scale={0.9} />
          <AmberBottleGroup x={294} y={96} scale={0.9} />
          <g transform="translate(414, 154) scale(0.66)">
            <rect x="0" y="0" width="136" height="272" fill="#F5F1E8" stroke="#1C1B1B" strokeWidth="1.4" />
            <rect x="10" y="10" width="116" height="252" fill="none" stroke="#1C1B1B" strokeWidth="1" />
            <text x="68" y="54" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="22" letterSpacing="4" fill="#1C1B1B">
              PŪLA
            </text>
            <text x="68" y="138" textAnchor="middle" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="11" fill="#C86D1F">
              TESTER
            </text>
            <text x="68" y="232" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="9.5" fill="#1C1B1B">
              MASERU STOCKIST
            </text>
          </g>
        </>
      )}
    </svg>
  );
}

export function StudioMedia({
  photoId,
  alt,
  className = 'w-full h-full object-cover',
  priority = false,
  sizes = '(min-width: 1024px) 46vw, 96vw',
}: {
  photoId: GalleryPhotoId;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { customPhotos } = usePula();
  const [imgFailed, setImgFailed] = useState(false);

  const galleryEntry = GALLERY_ITEMS.find((item) => item.id === photoId);
  const customSrc = customPhotos[photoId];
  const src = customSrc || galleryEntry?.imageFallbackSrc || galleryEntry?.imageSrc;
  const webpSrcSet =
    !customSrc && galleryEntry
      ? galleryEntry.imageSrcSm
        ? `${galleryEntry.imageSrcSm} 480w, ${galleryEntry.imageSrc} ${galleryEntry.width || 1200}w`
        : galleryEntry.imageSrc
      : undefined;

  useEffect(() => {
    setImgFailed(false);
  }, [src, photoId]);

  if (src && !imgFailed) {
    const imgEl = (
      <img
        src={src}
        alt={alt}
        width={galleryEntry?.width}
        height={galleryEntry?.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className={className}
      />
    );

    if (webpSrcSet) {
      return (
        <picture className="block w-full h-full">
          <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
          {imgEl}
        </picture>
      );
    }

    return imgEl;
  }

  return <StudioArtworkSvg photoId={photoId} />;
}
