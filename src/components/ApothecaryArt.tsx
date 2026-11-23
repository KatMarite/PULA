import React, { useEffect, useState } from 'react';
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
      <path d="M 18,32 C 30,20 48,20 60,29 C 70,22 86,23 94,32" strokeWidth="1.0" />
      <path d="M 108,24 C 120,15 138,16 150,25 C 158,20 168,23 172,30" strokeWidth="0.95" />
      <path d="M 10,64 C 24,57 40,59 50,66" strokeWidth="0.8" />
      <path d="M 134,58 C 148,51 162,53 174,60" strokeWidth="0.8" />
      <g stroke="#C86D1F" strokeWidth="0.85" opacity="0.85">
        <line x1="42" y1="32" x2="36" y2="46" />
        <line x1="56" y1="31" x2="50" y2="45" />
        <line x1="126" y1="27" x2="120" y2="41" />
        <line x1="140" y1="28" x2="134" y2="42" />
      </g>
      <path
        d="M 8,124 L 36,80 L 48,90 L 66,54 L 78,66 L 98,24 L 118,62 L 130,50 L 152,86 L 162,76 L 174,124 Z"
        strokeWidth="1.5"
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
      <g strokeWidth="0.95">
        <line x1="36" y1="92" x2="26" y2="118" />
        <line x1="50" y1="92" x2="39" y2="122" />
        <line x1="64" y1="92" x2="54" y2="119" />
        <line x1="78" y1="92" x2="67" y2="123" />
        <line x1="92" y1="92" x2="82" y2="119" />
        <line x1="106" y1="92" x2="95" y2="122" />
        <line x1="120" y1="92" x2="110" y2="118" />
        <line x1="134" y1="92" x2="124" y2="120" />
        <line x1="146" y1="92" x2="137" y2="115" />
      </g>
      <g strokeWidth="0.55" strokeDasharray="6 4">
        <line x1="43" y1="94" x2="33" y2="120" />
        <line x1="71" y1="94" x2="61" y2="121" />
        <line x1="99" y1="94" x2="89" y2="121" />
        <line x1="127" y1="94" x2="117" y2="119" />
      </g>
      <path d="M 10,132 Q 46,112 86,125 Q 124,111 170,132" strokeWidth="1.25" />
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
      <path d="M 88,198 C 90,154 96,102 104,28" strokeWidth="2.0" />
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
      <circle
        cx="90"
        cy="90"
        r="74"
        fill="none"
        stroke="#1C1B1B"
        strokeWidth="1.2"
        strokeDasharray="1.8 4.2"
        strokeLinecap="round"
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
}: {
  photoId: GalleryPhotoId;
  alt: string;
  className?: string;
}) {
  const { customPhotos } = usePula();
  const [imgFailed, setImgFailed] = useState(false);

  const galleryEntry = GALLERY_ITEMS.find((item) => item.id === photoId);
  const src = customPhotos[photoId] || galleryEntry?.imageSrc;

  useEffect(() => {
    setImgFailed(false);
  }, [src, photoId]);

  if (src && !imgFailed) {
    return (
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className={className}
      />
    );
  }

  return <StudioArtworkSvg photoId={photoId} />;
}
