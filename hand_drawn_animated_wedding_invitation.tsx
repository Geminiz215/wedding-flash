'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  MapPin,
  Copy,
  Check,
  Calendar,
  Clock,
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Send,
  MailOpen,
  Gift,
  Music,
  UserCheck,
  Users,
  MessageSquareHeart,
  ChevronDown,
  ExternalLink,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';

// ============================================================================
// 1. CENTRALIZED WEDDING CONFIGURATION (WEDDING_CONFIG)
// ============================================================================
const WEDDING_CONFIG = {
  couple: {
    brideFull: "Juliet Paladino",
    brideShort: "Juliet",
    brideParents: "Mr. Lorenzo Paladino & Mrs. Sofia Paladino",
    brideBio: "The daydreamer, pastry lover & sketchbook artist",
    brideIg: "@juliet.paladino",
    groomFull: "Christian Morelli",
    groomShort: "Christian",
    groomParents: "Mr. Marco Morelli & Mrs. Elena Morelli",
    groomBio: "The vinyl collector, espresso enthusiast & late-night guitarist",
    groomIg: "@christian.morelli",
    combinedNames: "Juliet Paladino & Christian Morelli",
    shortCombined: "Juliet & Christian",
  },
  weddingDate: {
    fullText: "Saturday, August 25th, 2026",
    shortText: "August 25th, 2026",
    isoDate: "2026-08-25T09:00:00",
    month: "AUGUST 2026",
    days: [
      { dayName: "FRIDAY", dateNum: "24", label: "Welcome Dinner" },
      { dayName: "SATURDAY", dateNum: "25", label: "The Wedding Day", isWeddingDay: true },
      { dayName: "SUNDAY", dateNum: "26", label: "Farewell Brunch" },
    ],
  },
  events: {
    akad: {
      title: "Akad Nikah / Holy Matrimony",
      date: "Saturday, August 25th, 2026",
      time: "09:00 AM — 11:00 AM",
      venue: "Castello Brancaccio Chapel",
      address: "Via del Corso 120, Historic Garden Quarter, Rome / Jakarta",
      note: "Intimate vows followed by morning flower toss & acoustic strings.",
    },
    resepsi: {
      title: "Resepsi / Evening Reception",
      date: "Saturday, August 25th, 2026",
      time: "06:00 PM — 11:00 PM",
      venue: "The Grand Conservatory Hall, Castello Brancaccio",
      address: "Via del Corso 120, Historic Garden Quarter, Rome / Jakarta",
      note: "There will be food, candlelight & dancing throughout the evening!",
    },
    eveningTimeline: [
      { time: "4:00 PM", title: "Wedding Breakfast", icon: "plate" },
      { time: "6:00 PM", title: "Drinks & Photos", icon: "champagne" },
      { time: "7:00 PM", title: "Evening Reception", icon: "disco" },
      { time: "8:30 PM", title: "Evening Food & Fries", icon: "fries" },
      { time: "11:00 PM", title: "Carriages at 11pm", icon: "carriage" },
    ],
    mapUrl: "https://maps.google.com/?q=Castello+Brancaccio+Rome",
  },
  musicTracks: [
    {
      id: 1,
      title: "Can't Help Falling in Love",
      artist: "Music Box Waltz — Juliet & Christian",
      duration: "2:45",
      tempo: 420,
      notes: [261.63, 329.63, 392.00, 523.25, 493.88, 440.00, 392.00, 349.23, 329.63, 293.66, 329.63, 392.00],
    },
    {
      id: 2,
      title: "La Vie En Rose (Acoustic Doodle)",
      artist: "Vintage Vinyl Quartet",
      duration: "3:12",
      tempo: 360,
      notes: [392.00, 369.99, 329.63, 293.66, 246.94, 329.63, 392.00, 493.88, 440.00, 392.00, 329.63, 293.66],
    },
    {
      id: 3,
      title: "Midnight Saxophone & Champagne",
      artist: "Castle Leoch Evening Band",
      duration: "2:58",
      tempo: 310,
      notes: [293.66, 349.23, 440.00, 523.25, 587.33, 523.25, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63],
    },
  ],
  loveStory: [
    {
      year: "OCTOBER 2021",
      title: "First Met at a Rainy Bookshop",
      description:
        "We reached for the exact same illustrated vintage cookbook on a drizzled Saturday afternoon. One shared umbrella and three hours of talking over warm cinnamon lattes changed everything.",
      doodle: "coffee",
    },
    {
      year: "MAY 2022",
      title: "First Date & Vinyl Record Night",
      description:
        "Christian cooked homemade pasta while spinning old 70s soul records on his turntable, and Juliet sketched our first silly caricature on a paper napkin that we still keep framed.",
      doodle: "vinyl",
    },
    {
      year: "DECEMBER 2024",
      title: "The Candlelight Proposal",
      description:
        "Under a string of warm fairy lights and paper lanterns in Rome, with a hand-drawn flipbook of our favorite memories, the final page asked: 'Will you marry me?'",
      doodle: "ring",
    },
    {
      year: "AUGUST 2026",
      title: "Forever Begins Together",
      description:
        "Now we invite our dearest family and friends to celebrate with cake, saxophone jazz, late-night french fries, and dancing under the stars!",
      doodle: "carriage",
    },
  ],
  gallery: [
    {
      id: 1,
      src: "/images/couple_portrait.jpg",
      title: "Under the Floral Arch",
      caption:
        "Promising forever surrounded by dusty roses, draped linen & warm afternoon light.",
      category: "THE COUPLE",
      dateStamp: "PORTRAIT • 01",
      tilt: "-rotate-1",
      tapeRotate: "-rotate-2",
      frameStyle: "navy",
    },
    {
      id: 2,
      src: "/images/aisle_walk.jpg",
      title: "Walking Down the Aisle",
      caption:
        "Hand in hand through glowing candlelight, scattered petals & joyful applause.",
      category: "CEREMONY",
      dateStamp: "HOLY VOWS • 02",
      tilt: "rotate-1",
      tapeRotate: "rotate-2",
      frameStyle: "burgundy",
    },
    {
      id: 3,
      src: "/images/wedding_rings.jpg",
      title: "Two Golden Bands",
      caption:
        "Nestled in a dusty peach velvet box among rose petals — our symbol of endless love.",
      category: "THE RINGS",
      dateStamp: "FOREVER • 03",
      tilt: "rotate-1",
      tapeRotate: "-rotate-1",
      frameStyle: "burgundy",
    },
    {
      id: 4,
      src: "/images/reception_table.jpg",
      title: "Candlelight & Crystal",
      caption:
        "Our long banquet table dressed with roses, taper candles & crystal glasses for the evening toast.",
      category: "RECEPTION",
      dateStamp: "BANQUET • 04",
      tilt: "-rotate-1",
      tapeRotate: "rotate-1",
      frameStyle: "navy",
    },
  ],
  bankAccounts: [
    {
      id: "bca",
      bankName: "BANK BCA",
      accountNumber: "8472910482",
      accountHolder: "Juliet Paladino",
      branch: "KCP Main Boulevard",
    },
    {
      id: "mandiri",
      bankName: "BANK MANDIRI",
      accountNumber: "1290048291024",
      accountHolder: "Christian Morelli",
      branch: "KCP Heritage Square",
    },
  ],
  initialWishes: [
    {
      id: 1,
      name: "Paula & Chris",
      attendance: "Joyfully Accepts",
      guests: 2,
      message: "So excited to dance the night away with you two! Save us a cone of midnight french fries and a glass of bubbly! ♥",
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "Owen & Jacqueline",
      attendance: "Joyfully Accepts",
      guests: 2,
      message: "Your invitation looks just like a fairytale storybook! Wishing Juliet & Christian a lifetime of laughter and vinyl records.",
      date: "Yesterday",
    },
    {
      id: 3,
      name: "Aunt Sofia & Uncle Lorenzo",
      attendance: "Joyfully Accepts",
      guests: 4,
      message: "Counting down the days until August 25th at Castello Brancaccio. Endless love and blessings to our dearest couple!",
      date: "2 days ago",
    },
  ],
};

// ============================================================================
// 2. CUSTOM HAND-DRAWN SVG DOODLE COMPONENTS
// ============================================================================

// 8-Point Hand-Drawn Starburst Sparkle (like the reference cards)
const DoodleStarburst = ({ className = "w-8 h-8", color = "#102F70", delay = 0 }) => (
  <motion.svg
    viewBox="0 0 60 60"
    fill="none"
    className={className}
    initial={{ scale: 0.8, rotate: -8, opacity: 0.85 }}
    animate={{ scale: [0.85, 1.08, 0.85], rotate: [-8, 8, -8], opacity: [0.8, 1, 0.8] }}
    transition={{ duration: 3.8, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <path
      d="M30 4 C30 22, 30 38, 30 56 M4 30 C22 29, 38 31, 56 30 M11 11 C24 24, 36 36, 49 49 M49 11 C36 24, 24 36, 11 49"
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <circle cx="30" cy="30" r="2.5" fill={color} />
    <circle cx="14" cy="22" r="1.4" fill={color} />
    <circle cx="47" cy="39" r="1.4" fill={color} />
  </motion.svg>
);

// Hand-Drawn Floating Heart
const DoodleHeart = ({ className = "w-6 h-6", color = "#941F25", filled = true, delay = 0 }) => (
  <motion.svg
    viewBox="0 0 50 50"
    fill="none"
    className={className}
    animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
    transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <path
      d="M25 42 C25 42, 7 30, 7 17 C7 10, 13 6, 19 8 C22 9, 24 12, 25 15 C26 12, 28 9, 31 8 C37 6, 43 10, 43 17 C43 30, 25 42, 25 42 Z"
      fill={filled ? color : "none"}
      fillOpacity={filled ? "0.88" : "0"}
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

// Reference Image 1 Loop-Corner Hand-Drawn Card Frame
const LoopCornerFrame = ({ children, className = "", strokeColor = "#102F70" }) => (
  <div className={`relative p-6 sm:p-10 md:p-12 ${className}`}>
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 540"
      preserveAspectRatio="none"
      fill="none"
    >
      {/* Hand-drawn organic rectangle with signature corner loops inspired by Juliet & Christian card */}
      <motion.path
        d="M 28 18 
           C 140 14, 260 16, 372 18 
           C 386 18, 388 8, 378 8 
           C 368 8, 372 24, 374 36 
           C 378 180, 375 360, 374 504 
           C 374 518, 386 524, 380 512 
           C 374 500, 360 518, 348 518 
           C 230 522, 120 519, 28 518 
           C 14 518, 12 530, 22 528 
           C 30 526, 26 510, 25 496 
           C 22 350, 24 170, 25 32 
           C 25 16, 12 12, 18 22 
           C 24 30, 34 19, 42 18"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      />
    </svg>
    <div className="relative z-10">{children}</div>
  </div>
);

// Illustration 1: Wedding Cake, Candelabra, Flower Vase & Champagne Table (Reference Image 1)
const WeddingTableDoodle = ({ className = "w-full max-w-md mx-auto" }) => (
  <motion.svg
    viewBox="0 0 420 220"
    fill="none"
    className={className}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9 }}
  >
    {/* Left Wine Bottle with Bow */}
    <motion.path
      d="M55 110 C55 102, 65 102, 65 110 L68 130 L68 185 C68 189, 52 189, 52 185 L52 130 Z"
      stroke="#102F70"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.8 }}
    />
    {/* Ribbon bow on bottle */}
    <path
      d="M60 116 C45 106, 42 122, 58 119 C74 122, 72 106, 60 116 Z M58 119 L48 135 M62 119 L72 134"
      stroke="#941F25"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="55" y="142" width="10" height="20" rx="1" fill="#102F70" />

    {/* Botanical Flower Vase */}
    <path
      d="M115 115 C115 130, 102 142, 105 158 C108 168, 134 168, 137 158 C140 142, 127 130, 127 115 Z"
      stroke="#102F70"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Flowers & Stems */}
    <path
      d="M121 115 C120 90, 105 70, 96 58 M121 115 C124 92, 136 78, 142 66 M118 96 C108 92, 98 95, 92 100"
      stroke="#102F70"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="95" cy="56" r="5" stroke="#941F25" strokeWidth="1.8" fill="#E7CFC1" />
    <circle cx="143" cy="64" r="5" stroke="#102F70" strokeWidth="1.8" fill="#E7CFC1" />
    <circle cx="91" cy="100" r="4" stroke="#941F25" strokeWidth="1.8" />

    {/* Small Slice of Cake on Plate */}
    <ellipse cx="115" cy="188" rx="22" ry="7" stroke="#102F70" strokeWidth="1.8" />
    <path d="M104 186 L104 172 L126 177 L126 186 Z" stroke="#102F70" strokeWidth="1.8" fill="#E7CFC1" />

    {/* Center 3-Tiered Wedding Cake with Candles & Bow */}
    <ellipse cx="212" cy="176" rx="46" ry="11" stroke="#102F70" strokeWidth="2" fill="#FAF7F2" />
    {/* Bottom Tier */}
    <path
      d="M174 172 L177 128 C195 123, 230 123, 247 128 L250 172 C230 179, 194 179, 174 172 Z"
      stroke="#102F70"
      strokeWidth="2.2"
      fill="#FFFFFF"
    />
    {/* Cake Frosting Scallops */}
    <path
      d="M177 131 Q186 138 195 131 Q204 138 213 131 Q222 138 231 131 Q240 138 247 131"
      stroke="#102F70"
      strokeWidth="2"
      fill="none"
    />
    {/* Burgundy Bow on Cake */}
    <path
      d="M212 150 C198 140, 198 160, 212 152 C226 160, 226 140, 212 150 Z M210 152 L201 166 M214 152 L223 166"
      stroke="#941F25"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Top Tier */}
    <path
      d="M188 126 L190 96 C202 92, 222 92, 234 96 L236 126"
      stroke="#102F70"
      strokeWidth="2"
      fill="#FAF7F2"
    />
    {/* 3 Candles on Cake */}
    <line x1="198" y1="94" x2="198" y2="76" stroke="#102F70" strokeWidth="2" strokeLinecap="round" />
    <line x1="212" y1="93" x2="212" y2="72" stroke="#102F70" strokeWidth="2" strokeLinecap="round" />
    <line x1="226" y1="94" x2="226" y2="76" stroke="#102F70" strokeWidth="2" strokeLinecap="round" />
    {/* Animated Candle Flames */}
    <motion.path
      d="M198 73 C195 68, 198 63, 198 63 C198 63, 201 68, 198 73 Z M212 69 C209 64, 212 59, 212 59 C212 59, 215 64, 212 69 Z M226 73 C223 68, 226 63, 226 63 C226 63, 229 68, 226 73 Z"
      fill="#941F25"
      animate={{ scaleY: [1, 1.2, 0.9, 1] }}
      transition={{ duration: 1.4, repeat: Infinity }}
    />

    {/* Cake Server Knife */}
    <path d="M235 194 L256 178 L264 181 L240 198 Z" stroke="#102F70" strokeWidth="1.6" />

    {/* Tall Champagne Flute */}
    <path
      d="M278 96 L285 96 L284 124 C284 130, 279 130, 279 124 Z M281.5 129 L281.5 152 M274 152 L289 152"
      stroke="#102F70"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* 3-Arm Vintage Candelabra */}
    <path
      d="M332 75 L332 165 M316 165 C324 158, 340 158, 348 165 Z M310 92 C310 116, 354 116, 354 92 M318 100 C318 122, 346 122, 346 100"
      stroke="#102F70"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Candelabra Candles */}
    <line x1="310" y1="92" x2="310" y2="66" stroke="#102F70" strokeWidth="2" />
    <line x1="332" y1="75" x2="332" y2="50" stroke="#102F70" strokeWidth="2" />
    <line x1="354" y1="92" x2="354" y2="68" stroke="#102F70" strokeWidth="2" />
    <circle cx="310" cy="61" r="2.5" fill="#941F25" />
    <circle cx="332" cy="45" r="2.5" fill="#941F25" />
    <circle cx="354" cy="63" r="2.5" fill="#941F25" />

    {/* Two Wine Glasses in Front */}
    <path
      d="M312 145 C312 158, 326 158, 326 145 L325 138 L313 138 Z M319 156 L319 175 M312 175 L326 175"
      stroke="#102F70"
      strokeWidth="1.8"
      fill="#941F25"
      fillOpacity="0.2"
    />
    <path
      d="M342 162 C342 170, 358 170, 358 162 L358 158 L342 158 Z M350 169 L350 184 M344 184 L356 184"
      stroke="#102F70"
      strokeWidth="1.8"
    />
  </motion.svg>
);

// Illustration 2: Whimsical Cartoon Bride & Groom Holding Invitations / Hands
const CartoonCoupleDoodle = ({ showInvitation = true, className = "w-64 h-64 mx-auto" }) => (
  <motion.svg
    viewBox="0 0 280 260"
    fill="none"
    className={className}
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Floating Sparkles & Hearts around Couple */}
    <path
      d="M140 42 C140 42, 128 32, 128 23 C128 18, 133 15, 137 17 C139 18, 140 20, 140 22 C140 20, 141 18, 143 17 C147 15, 152 18, 152 23 C152 32, 140 42, 140 42 Z"
      fill="#941F25"
    />
    {/* Left: Bride in Flowing Hand-Drawn Gown */}
    {/* Bride Veil & Hair */}
    <path
      d="M72 68 C52 72, 42 98, 48 125 C55 118, 66 112, 74 105"
      stroke="#102F70"
      strokeWidth="2"
      strokeDasharray="3 2"
      fill="#FAF7F2"
    />
    <circle cx="88" cy="76" r="18" stroke="#102F70" strokeWidth="2.4" fill="#FAF7F2" />
    {/* Cute Hair Bun & Tiara */}
    <circle cx="75" cy="62" r="8" stroke="#102F70" strokeWidth="2.2" fill="#252323" />
    <path d="M74 68 Q88 58 103 70" stroke="#252323" strokeWidth="3" strokeLinecap="round" />
    {/* Happy Eyes & Blush */}
    <path d="M82 75 Q84 72 86 75 M94 75 Q96 72 98 75" stroke="#102F70" strokeWidth="2" strokeLinecap="round" />
    <path d="M85 83 Q90 88 95 83" stroke="#941F25" strokeWidth="2" strokeLinecap="round" />
    <circle cx="79" cy="80" r="2.5" fill="#E7CFC1" />
    <circle cx="99" cy="80" r="2.5" fill="#E7CFC1" />

    {/* Bride Dress */}
    <path
      d="M78 95 L98 95 L104 128 L124 215 C98 224, 65 224, 48 215 L72 128 Z"
      stroke="#102F70"
      strokeWidth="2.4"
      fill="#FFFFFF"
      strokeLinejoin="round"
    />
    {/* Dress Scallop Details */}
    <path
      d="M52 208 Q68 215 84 208 Q100 215 120 208"
      stroke="#C49A7D"
      strokeWidth="1.8"
      fill="none"
    />

    {/* Right: Groom in Hand-Drawn Tuxedo & Bowtie */}
    <circle cx="186" cy="72" r="18" stroke="#102F70" strokeWidth="2.4" fill="#FAF7F2" />
    {/* Groom Wavy Hair */}
    <path
      d="M168 68 C170 52, 195 48, 204 62 C200 58, 182 58, 168 68 Z"
      fill="#102F70"
      stroke="#102F70"
      strokeWidth="2"
    />
    {/* Groom Face */}
    <path d="M178 72 Q180 69 182 72 M190 72 Q192 69 194 72" stroke="#102F70" strokeWidth="2" strokeLinecap="round" />
    <path d="M180 80 Q186 85 192 80" stroke="#102F70" strokeWidth="2" strokeLinecap="round" />

    {/* Groom Suit Jacket & Trousers */}
    <path
      d="M168 92 L206 92 L212 158 L162 158 Z"
      stroke="#102F70"
      strokeWidth="2.4"
      fill="#102F70"
      strokeLinejoin="round"
    />
    {/* White Shirt V & Burgundy Bowtie */}
    <path d="M178 92 L187 118 L196 92 Z" fill="#FFFFFF" stroke="#102F70" strokeWidth="1.5" />
    <path d="M181 96 L193 102 L193 96 L181 102 Z" fill="#941F25" stroke="#941F25" strokeWidth="1.5" />
    {/* Groom Legs & Shoes */}
    <path d="M170 158 L170 214 M186 158 L186 214 M202 158 L202 214" stroke="#102F70" strokeWidth="2.4" strokeLinecap="round" />
    <ellipse cx="168" cy="216" rx="8" ry="4" fill="#252323" />
    <ellipse cx="204" cy="216" rx="8" ry="4" fill="#252323" />

    {/* Connecting Hands & Envelope Card in Middle */}
    <path d="M101 115 C115 126, 128 128, 138 125" stroke="#102F70" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M166 112 C154 124, 146 126, 138 125" stroke="#102F70" strokeWidth="2.4" strokeLinecap="round" />

    {showInvitation ? (
      <g transform="translate(116, 114)">
        <rect x="0" y="0" width="44" height="30" rx="3" fill="#E7CFC1" stroke="#941F25" strokeWidth="2" />
        <path d="M2 2 L22 17 L42 2" stroke="#941F25" strokeWidth="1.8" fill="none" />
        <circle cx="22" cy="16" r="4" fill="#941F25" />
      </g>
    ) : (
      <motion.g
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <path
          d="M138 118 C138 118, 128 110, 128 103 C128 99, 132 96, 135 98 C137 99, 138 101, 138 102 C138 101, 139 99, 141 98 C144 96, 148 99, 148 103 C148 110, 138 118, 138 118 Z"
          fill="#941F25"
        />
      </motion.g>
    )}
  </motion.svg>
);

// Illustration 3: Evening Party Doodles from Reference Images 2, 3 & 4 (Saxophone, Clinking Champagne, Fries Cone, Disco Ball, Guitar, Carriage)
const PartyDoodleIcon = ({ type, className = "w-16 h-16", color = "#102F70" }) => {
  switch (type) {
    case "saxophone":
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className}>
          <path
            d="M20 18 C28 16, 32 20, 34 28 L42 56 C44 65, 54 66, 56 56 L58 44 L48 42 L62 40 L56 62 C52 74, 36 72, 32 58 L26 28 C25 22, 22 20, 16 20 Z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="36" cy="36" r="2" fill="#941F25" />
          <circle cx="38" cy="43" r="2" fill="#941F25" />
          <circle cx="40" cy="50" r="2" fill="#941F25" />
        </svg>
      );
    case "champagne":
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className}>
          {/* Left Clinking Glass */}
          <path
            d="M22 20 L34 24 L29 44 C27 49, 20 47, 21 41 Z M24 47 L19 64 M13 62 L25 66"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Right Clinking Glass */}
          <path
            d="M46 24 L58 20 L59 41 C60 47, 53 49, 51 44 Z M56 47 L61 64 M55 66 L67 62"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Sparkle between glasses */}
          <path d="M40 10 L40 18 M36 14 L44 14" stroke="#941F25" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "fries":
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className}>
          {/* Paper Cone */}
          <path
            d="M24 34 L40 72 L56 34 C45 38, 35 38, 24 34 Z"
            stroke={color}
            strokeWidth="2.2"
            fill="#E7CFC1"
            strokeLinejoin="round"
          />
          {/* Criss-Cross Fries on Top */}
          <path
            d="M28 34 L25 20 L31 19 L34 34 M35 35 L35 16 L41 16 L41 35 M43 35 L46 18 L52 20 L48 34 M50 34 L56 24 L60 27 L54 34"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "disco":
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className}>
          <line x1="40" y1="6" x2="40" y2="20" stroke={color} strokeWidth="2.2" />
          <circle cx="40" cy="44" r="24" stroke={color} strokeWidth="2.2" fill="#FAF7F2" />
          <ellipse cx="40" cy="44" rx="24" ry="9" stroke={color} strokeWidth="1.6" />
          <ellipse cx="40" cy="44" rx="24" ry="17" stroke={color} strokeWidth="1.6" />
          <ellipse cx="40" cy="44" rx="10" ry="24" stroke={color} strokeWidth="1.6" />
          <line x1="40" y1="20" x2="40" y2="68" stroke={color} strokeWidth="1.6" />
        </svg>
      );
    case "carriage":
      return (
        <svg viewBox="0 0 110 80" fill="none" className={className}>
          {/* Royal Vintage Carriage inspired by Image 4 */}
          <rect x="26" y="20" width="54" height="32" rx="6" stroke={color} strokeWidth="2.2" fill="#FAF7F2" />
          <line x1="22" y1="20" x2="84" y2="20" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
          {/* Windows with Curtains */}
          <rect x="32" y="25" width="12" height="14" stroke={color} strokeWidth="1.6" />
          <rect x="48" y="25" width="11" height="18" stroke={color} strokeWidth="1.6" />
          <rect x="63" y="25" width="12" height="14" stroke={color} strokeWidth="1.6" />
          {/* Spoked Wheels */}
          <circle cx="34" cy="58" r="12" stroke="#941F25" strokeWidth="2.2" fill="#FFFFFF" />
          <circle cx="74" cy="56" r="14" stroke="#941F25" strokeWidth="2.2" fill="#FFFFFF" />
          <path d="M34 46 L34 70 M22 58 L46 58 M74 42 L74 70 M60 56 L88 56" stroke="#941F25" strokeWidth="1.5" />
          <path d="M12 46 Q20 46 26 52" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "plate":
    default:
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className}>
          <circle cx="40" cy="42" r="20" stroke={color} strokeWidth="2.2" />
          <circle cx="40" cy="42" r="13" stroke="#941F25" strokeWidth="1.6" strokeDasharray="3 2" />
          {/* Fork & Knife */}
          <path d="M13 24 L13 58 M10 24 L10 34 Q13 38 16 34 L16 24" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M66 24 C69 28, 69 40, 66 44 L66 58" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};

// Illustration 4: Two White Doves Holding a Flowing Ribbon Banner
const DovesRibbonDoodle = ({ className = "w-72 h-28 mx-auto" }) => (
  <motion.svg
    viewBox="0 0 320 110"
    fill="none"
    className={className}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
  >
    {/* Left Dove */}
    <motion.g
      animate={{ y: [0, -4, 0], rotate: [0, -2, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M58 46 C46 32, 28 30, 18 38 C28 44, 34 52, 26 62 C38 62, 52 58, 62 50 C68 44, 66 36, 60 36 C56 36, 55 40, 58 46 Z"
        fill="#FFFFFF"
        stroke="#102F70"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M44 38 C42 22, 54 16, 62 24 C56 30, 52 36, 44 38 Z" fill="#FAF7F2" stroke="#102F70" strokeWidth="1.8" />
      <circle cx="61" cy="39" r="1.5" fill="#102F70" />
      <path d="M65 40 L72 42 L65 44" stroke="#941F25" strokeWidth="1.8" strokeLinecap="round" />
    </motion.g>

    {/* Right Dove */}
    <motion.g
      animate={{ y: [0, -4, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
    >
      <path
        d="M262 46 C274 32, 292 30, 302 38 C292 44, 286 52, 294 62 C282 62, 268 58, 258 50 C252 44, 254 36, 260 36 C264 36, 265 40, 262 46 Z"
        fill="#FFFFFF"
        stroke="#102F70"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M276 38 C278 22, 266 16, 258 24 C264 30, 268 36, 276 38 Z" fill="#FAF7F2" stroke="#102F70" strokeWidth="1.8" />
      <circle cx="259" cy="39" r="1.5" fill="#102F70" />
      <path d="M255 40 L248 42 L255 44" stroke="#941F25" strokeWidth="1.8" strokeLinecap="round" />
    </motion.g>

    {/* Flowing Hand-Drawn Ribbon Between Beaks */}
    <motion.path
      d="M70 43 C105 74, 135 30, 160 54 C185 78, 215 30, 250 43"
      stroke="#941F25"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.8 }}
    />
    <path
      d="M160 50 C160 50, 151 42, 151 36 C151 32, 155 30, 158 32 C159 33, 160 34, 160 36 C160 34, 161 33, 162 32 C165 30, 169 32, 169 36 C169 42, 160 50, 160 50 Z"
      fill="#941F25"
    />
  </motion.svg>
);

// Illustration 5: Intertwined Wedding Rings & Bow Divider
const IntertwinedRingsDoodle = ({ className = "w-36 h-24 mx-auto" }) => (
  <svg viewBox="0 0 160 100" fill="none" className={className}>
    <circle cx="66" cy="56" r="24" stroke="#102F70" strokeWidth="2.6" />
    <circle cx="94" cy="56" r="24" stroke="#941F25" strokeWidth="2.6" />
    {/* Diamond on Left Ring */}
    <polygon points="66,20 58,28 66,33 74,28" stroke="#102F70" strokeWidth="2" fill="#E7CFC1" />
    <path d="M66 12 L66 16 M54 18 L57 21 M78 18 L75 21" stroke="#941F25" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Decorative Hand-Drawn Bow Header
const RibbonBowDivider = ({ className = "w-48 h-12 mx-auto", color = "#941F25" }) => (
  <svg viewBox="0 0 220 50" fill="none" className={className}>
    <path
      d="M12 25 C50 22, 80 28, 110 25 C140 22, 170 28, 208 25"
      stroke="#102F70"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    <path
      d="M110 25 C92 10, 82 28, 106 27 C110 27, 110 25, 110 25 C128 10, 138 28, 114 27 M107 27 L94 44 M113 27 L126 44"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#E7CFC1"
      fillOpacity="0.4"
    />
    <circle cx="110" cy="25" r="3.5" fill={color} />
  </svg>
);

// Illustration 6: Hand-Drawn Vintage Polaroid Camera Doodle for Scrapbook Gallery
const VintageCameraDoodle = ({ className = "w-36 h-28 mx-auto" }) => (
  <motion.svg
    viewBox="0 0 180 130"
    fill="none"
    className={className}
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {/* Camera Flash Sparkle Rays */}
    <motion.g
      animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M132 10 L132 22 M122 16 L142 16 M125 11 L139 21 M139 11 L125 21"
        stroke="#941F25"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </motion.g>

    {/* Top Viewfinder & Shutter Button */}
    <rect
      x="54"
      y="28"
      width="32"
      height="14"
      rx="3"
      fill="#E7CFC1"
      stroke="#102F70"
      strokeWidth="2.2"
    />
    <path d="M112 34 L126 34 L126 42 L112 42 Z" fill="#941F25" stroke="#102F70" strokeWidth="2" />

    {/* Main Camera Body */}
    <path
      d="M36 42 C68 40, 112 40, 144 42 C150 42, 152 46, 152 52 L152 98 C152 104, 148 106, 142 106 C110 108, 70 108, 38 106 C32 106, 28 102, 28 96 L28 52 C28 46, 31 42, 36 42 Z"
      fill="#FAF7F2"
      stroke="#102F70"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />

    {/* Decorative Dusty Peach Stripe Across Body */}
    <path d="M30 62 L150 62 M30 84 L150 84" stroke="#C49A7D" strokeWidth="1.6" strokeDasharray="4 3" />

    {/* Outer & Inner Camera Lens */}
    <circle cx="90" cy="74" r="22" fill="#FFFFFF" stroke="#102F70" strokeWidth="2.4" />
    <circle cx="90" cy="74" r="15" fill="#E7CFC1" fillOpacity="0.55" stroke="#941F25" strokeWidth="2" />
    {/* Heart Reflection Inside Lens */}
    <path
      d="M90 80 C90 80, 82 74, 82 69 C82 66, 85 64, 88 66 C89 67, 90 68, 90 69 C90 68, 91 67, 92 66 C95 64, 98 66, 98 69 C98 74, 90 80, 90 80 Z"
      fill="#941F25"
    />

    {/* Little Red Recording/Flash Dot */}
    <circle cx="44" cy="53" r="3.5" fill="#941F25" />

    {/* Ejecting Mini Polaroid Photo Strip at Bottom */}
    <path
      d="M64 106 L62 124 L118 124 L116 106"
      fill="#FFFFFF"
      stroke="#102F70"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </motion.svg>
);

// ============================================================================
// 3. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(28);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Scrapbook Photo Gallery State
  const [activeGalleryCategory, setActiveGalleryCategory] = useState("ALL MOMENTS");
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(null);

  // RSVP & Guestbook State
  const [wishes, setWishes] = useState(WEDDING_CONFIG.initialWishes);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    attendance: "Joyfully Accepts",
    guests: "2",
    songRequest: "",
    message: "",
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Countdown Timer State
  const [countdown, setCountdown] = useState({
    days: 296,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  // Web Audio API Music Box Synthesizer Ref
  const audioCtxRef = useRef(null);
  const noteIntervalRef = useRef(null);
  const noteStepRef = useRef(0);

  const currentTrack = WEDDING_CONFIG.musicTracks[currentTrackIndex];

  // Show temporary custom toast notification
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Reliable Web Audio API Music Box Player (plays warm romantic arpeggios without external MP3 404s)
  const playMusicBoxNote = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const track = WEDDING_CONFIG.musicTracks[currentTrackIndex];
      const freq = track.notes[noteStepRef.current % track.notes.length];
      noteStepRef.current += 1;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Gentle music-box bell envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.15);
    } catch (e) {
      // Ignore audio policy restrictions if blocked
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (isPlaying) {
      const track = WEDDING_CONFIG.musicTracks[currentTrackIndex];
      playMusicBoxNote();
      noteIntervalRef.current = setInterval(() => {
        playMusicBoxNote();
        setTrackProgress((prev) => (prev >= 100 ? 0 : prev + 1.5));
      }, track.tempo);
    } else {
      if (noteIntervalRef.current) clearInterval(noteIntervalRef.current);
    }
    return () => {
      if (noteIntervalRef.current) clearInterval(noteIntervalRef.current);
    };
  }, [isPlaying, currentTrackIndex, playMusicBoxNote]);

  // Countdown Timer Effect
  useEffect(() => {
    const target = new Date(WEDDING_CONFIG.weddingDate.isoDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        // Fallback celebratory countdown if date has passed
        setCountdown((prev) => ({
          ...prev,
          seconds: (prev.seconds + 59) % 60,
        }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Opening Invitation Cover
  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Copy Bank Account Number
  const handleCopyAccount = (id, number, holder) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(number);
    }
    setCopiedId(id);
    triggerToast(`Copied ${holder}'s account (${number}) with love! ♥`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Handle RSVP Form Submit
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) {
      triggerToast("Please write your name on the invitation card ♥");
      return;
    }
    const newWish = {
      id: Date.now(),
      name: rsvpForm.name.trim(),
      attendance: rsvpForm.attendance,
      guests: Number(rsvpForm.guests) || 1,
      message:
        rsvpForm.message.trim() ||
        "Can't wait to celebrate with Juliet & Christian!",
      date: "Just now",
    };
    setWishes([newWish, ...wishes]);
    setRsvpSubmitted(true);
    triggerToast("Your RSVP & wishes have been pinned to our scrapbook! ♥");
    setRsvpForm({
      name: "",
      attendance: "Joyfully Accepts",
      guests: "2",
      songRequest: "",
      message: "",
    });
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % WEDDING_CONFIG.musicTracks.length);
    setTrackProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? WEDDING_CONFIG.musicTracks.length - 1 : prev - 1
    );
    setTrackProgress(0);
  };

  // Filtered Gallery Photos
  const galleryCategories = [
    "ALL MOMENTS",
    "THE COUPLE",
    "CEREMONY",
    "THE RINGS",
    "RECEPTION",
  ];

  const filteredGallery =
    activeGalleryCategory === "ALL MOMENTS"
      ? WEDDING_CONFIG.gallery
      : WEDDING_CONFIG.gallery.filter(
          (item) => item.category === activeGalleryCategory
        );

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    if (lightboxPhotoIndex === null) return;
    setLightboxPhotoIndex(
      (prev) => (prev + 1) % WEDDING_CONFIG.gallery.length
    );
  };

  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    if (lightboxPhotoIndex === null) return;
    setLightboxPhotoIndex((prev) =>
      prev === 0 ? WEDDING_CONFIG.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden selection:bg-[#E7CFC1] selection:text-[#102F70]"
      style={{
        backgroundColor: "#FAF7F2",
        color: "#252323",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >

      {/* ====================================================================
          TOAST NOTIFICATION BANNER
      ==================================================================== */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#941F25] text-white px-6 py-3 organic-pill shadow-lg flex items-center gap-2.5 border-2 border-[#FAF7F2]"
          >
            <Heart className="w-4 h-4 fill-current text-[#E7CFC1]" />
            <span className="font-hand-playful text-sm sm:text-base font-medium">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          SECTION 01 — OPENING INVITATION MODAL / COVER SCREEN
      ==================================================================== */}
      <AnimatePresence>
        {!isInvitationOpened && (
          <motion.section
            key="opening-cover"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: "-100%",
              rotate: -2,
              transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-40 overflow-y-auto paper-texture flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-xl bg-white shadow-[0_20px_60px_rgba(16,47,112,0.12)] my-auto relative">
              {/* Decorative Washi Tape at Top */}
              <div className="w-32 h-7 bg-[#E7CFC1]/80 border border-[#C49A7D]/40 -rotate-2 mx-auto -mt-3.5 relative z-20" />

              <LoopCornerFrame strokeColor="#102F70">
                <div className="text-center flex flex-col items-center">
                  {/* Curved-style Top Invitation Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-hand-heading tracking-[0.22em] text-xs sm:text-sm text-[#102F70] uppercase mb-1"
                  >
                    PLEASE JOIN US
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="font-hand-script text-2xl sm:text-3xl text-[#102F70] -rotate-1 mb-2"
                  >
                    for the wedding of
                  </motion.p>

                  {/* Main Handwritten Heading */}
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="font-hand-heading text-3xl sm:text-5xl text-[#102F70] font-bold tracking-wide uppercase leading-tight mb-3"
                  >
                    WE ARE GETTING MARRIED!
                  </motion.h1>

                  {/* Center Illustration: Cartoon Bride & Groom + Sparkles */}
                  <div className="relative w-full max-w-xs mx-auto my-1">
                    <DoodleStarburst
                      className="w-9 h-9 absolute -top-2 left-2"
                      color="#102F70"
                    />
                    <DoodleStarburst
                      className="w-8 h-8 absolute top-6 right-2"
                      color="#941F25"
                      delay={0.6}
                    />
                    <DoodleHeart
                      className="w-6 h-6 absolute bottom-8 left-4"
                      color="#941F25"
                    />
                    <DoodleHeart
                      className="w-5 h-5 absolute bottom-10 right-6"
                      color="#C49A7D"
                      delay={0.8}
                    />

                    <CartoonCoupleDoodle
                      showInvitation={true}
                      className="w-56 h-52 sm:w-64 sm:h-60 mx-auto"
                    />
                  </div>

                  {/* Couple Names (Like Reference Image 1: Juliet Paladino & Christian Morelli) */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="my-2"
                  >
                    <h2 className="font-hand-script text-4xl sm:text-5xl text-[#102F70] font-bold leading-none -rotate-1">
                      {WEDDING_CONFIG.couple.brideFull}
                    </h2>
                    <span className="font-hand-script text-2xl sm:text-3xl text-[#941F25] block my-0.5">
                      &amp;
                    </span>
                    <h2 className="font-hand-script text-4xl sm:text-5xl text-[#102F70] font-bold leading-none rotate-1">
                      {WEDDING_CONFIG.couple.groomFull}
                    </h2>
                  </motion.div>

                  {/* Wedding Date & Venue Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-3 mb-5 text-[#102F70] font-hand-heading tracking-[0.14em] text-xs sm:text-sm uppercase space-y-0.5"
                  >
                    <p>{WEDDING_CONFIG.weddingDate.fullText}</p>
                    <p className="text-[#C49A7D]">6 O'CLOCK IN THE EVENING</p>
                    <p>CASTELLO BRANCACCIO • ROME / JAKARTA</p>
                  </motion.div>

                  {/* Burgundy Pill-Shaped OPEN Button with Breathing Animation */}
                  <motion.button
                    onClick={handleOpenInvitation}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.08, rotate: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#941F25] hover:bg-[#7c181d] text-white font-hand-heading tracking-[0.18em] text-lg sm:text-xl px-9 py-3.5 organic-pill shadow-md flex items-center gap-3 cursor-pointer border-2 border-[#102F70]/20"
                  >
                    <MailOpen className="w-5 h-5" />
                    <span>OPEN INVITATION</span>
                  </motion.button>

                  <p className="mt-2.5 text-xs italic text-[#C49A7D]">
                    Tap to open scrapbook &amp; play wedding melody ♪
                  </p>
                </div>
              </LoopCornerFrame>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ====================================================================
          PERSISTENT FLOATING MINI VINYL PLAYER (BOTTOM RIGHT)
      ==================================================================== */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isPlaying ? "Pause Wedding Music" : "Play Wedding Music"}
          className="bg-[#FFFFFF] border-2 border-[#102F70] p-2.5 rounded-full shadow-lg flex items-center gap-2.5 pr-4 cursor-pointer"
        >
          <div
            className={`w-10 h-10 rounded-full bg-[#252323] border-2 border-[#941F25] flex items-center justify-center relative ${
              isPlaying ? "vinyl-spin" : ""
            }`}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#E7CFC1] border border-[#941F25]" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="font-hand-heading text-xs text-[#102F70] leading-none">
              {isPlaying ? "NOW SPINNING ♪" : "MUSIC PAUSED"}
            </p>
            <p className="font-serif-body text-[11px] text-[#941F25] truncate max-w-[115px]">
              {currentTrack.title}
            </p>
          </div>
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#941F25]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#C49A7D]" />
          )}
        </motion.button>
      </div>

      {/* ====================================================================
          MAIN SCROLLABLE SCRAPBOOK CONTAINER
      ==================================================================== */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-24 space-y-20">
        {/* Top Re-open Cover Pill Bar */}
        <div className="flex items-center justify-between border-b border-dashed border-[#C49A7D] pb-3 text-xs sm:text-sm font-hand-heading text-[#102F70] tracking-wider">
          <span>♥ JULIET &amp; CHRISTIAN'S WEDDING SCRAPBOOK</span>
          <button
            onClick={() => setIsInvitationOpened(false)}
            className="text-[#941F25] underline hover:opacity-80 cursor-pointer"
          >
            View Cover Card
          </button>
        </div>

        {/* ==================================================================
            SECTION 02 — YOU ARE INVITED!
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white organic-box p-6 sm:p-12 shadow-sm relative overflow-hidden"
        >
          <DoodleStarburst className="w-10 h-10 absolute top-5 left-5" color="#102F70" />
          <DoodleStarburst className="w-9 h-9 absolute top-6 right-6" color="#941F25" delay={0.5} />

          <div className="text-center max-w-xl mx-auto">
            <span className="inline-block bg-[#E7CFC1] text-[#941F25] font-hand-heading text-xs sm:text-sm tracking-[0.2em] px-4 py-1 organic-pill mb-3">
              CHAPTER 01 • THE INVITATION
            </span>

            <h2 className="font-hand-heading text-4xl sm:text-6xl text-[#102F70] font-bold uppercase tracking-wide -rotate-1">
              YOU ARE INVITED!
            </h2>

            <p className="font-hand-script text-2xl sm:text-3xl text-[#941F25] mt-1">
              To celebrate love, laughter &amp; happily ever after
            </p>

            {/* Bride & Groom Holding Hands with Pulsing Heart */}
            <div className="my-6 relative">
              <CartoonCoupleDoodle
                showInvitation={false}
                className="w-64 h-60 mx-auto"
              />
            </div>

            <p className="font-serif-body text-lg sm:text-xl text-[#252323] leading-relaxed italic">
              “With joyful hearts and hand-drawn dreams,{" "}
              <strong className="text-[#102F70] not-italic font-semibold">
                {WEDDING_CONFIG.couple.brideShort} &amp;{" "}
                {WEDDING_CONFIG.couple.groomShort}
              </strong>{" "}
              invite you to join them at their wedding ceremony and evening
              reception. Expect warm candlelight, tiered cake, saxophone melodies,
              and dancing until carriages arrive at 11pm!”
            </p>

            <div className="mt-6">
              <RibbonBowDivider />
            </div>
          </div>
        </motion.section>

        {/* ==================================================================
            SECTION 03 — VINTAGE VINYL WEDDING MUSIC PLAYER
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-[#E7CFC1]/65 organic-box-burgundy p-6 sm:p-10 shadow-sm relative"
        >
          <div className="text-center mb-6">
            <span className="font-hand-heading text-xs tracking-[0.2em] text-[#941F25] uppercase">
              OUR SOUNDTRACK • SPIN THE RECORD
            </span>
            <h2 className="font-hand-heading text-3xl sm:text-4xl text-[#102F70] uppercase mt-1">
              WEDDING VINYL JUKEBOX
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white organic-box p-5 sm:p-7">
            {/* Left: Square Illustrated Album Cover + Spinning Vinyl Record */}
            <div className="md:col-span-5 flex items-center justify-center relative py-2">
              {/* Square Album Sleeve */}
              <div className="w-40 h-40 sm:w-44 sm:h-44 bg-[#FAF7F2] border-2 border-[#102F70] p-3 relative z-10 shadow-md flex flex-col justify-between -rotate-2">
                <div className="flex justify-between items-center text-[10px] font-hand-heading text-[#941F25]">
                  <span>SIDE A • 33 RPM</span>
                  <span>25.08.26</span>
                </div>
                <div className="my-auto text-center">
                  <DoodleHeart className="w-8 h-8 mx-auto mb-1" color="#941F25" />
                  <p className="font-hand-script text-xl text-[#102F70] leading-none">
                    Juliet &amp; Christian
                  </p>
                  <p className="font-serif-body text-[11px] italic text-[#C49A7D]">
                    Love Songs on Vinyl
                  </p>
                </div>
                <div className="border-t border-dashed border-[#102F70]/40 pt-1 text-[10px] font-hand-heading text-[#102F70] text-center">
                  CASTELLO RECORDS
                </div>
              </div>

              {/* Spinning Vintage Vinyl Record Peeking Out on the Right */}
              <div
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#252323] border-4 border-[#102F70] -ml-14 shadow-xl flex items-center justify-center cursor-pointer relative ${
                  isPlaying ? "vinyl-spin" : ""
                }`}
                title="Click to Play/Pause Vinyl"
              >
                {/* Vinyl Grooves SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#C49A7D"
                    strokeOpacity="0.25"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="18 8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="34"
                    stroke="#FFFFFF"
                    strokeOpacity="0.2"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="12 10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="26"
                    stroke="#E7CFC1"
                    strokeOpacity="0.25"
                    strokeWidth="0.8"
                    fill="none"
                  />
                </svg>
                {/* Center Dusty Peach Vinyl Label */}
                <div className="w-14 h-14 rounded-full bg-[#E7CFC1] border-2 border-[#941F25] flex flex-col items-center justify-center text-center p-1">
                  <span className="font-hand-heading text-[8px] text-[#941F25] leading-none">
                    J &amp; C
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#252323] my-0.5" />
                  <span className="font-hand-heading text-[7px] text-[#102F70] leading-none">
                    STEREO
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Track Info, Progress Bar & Controls */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-hand-heading tracking-widest text-[#941F25] uppercase">
                    TRACK 0{currentTrack.id} OF 0{WEDDING_CONFIG.musicTracks.length}
                  </span>
                  <h3 className="font-hand-heading text-2xl sm:text-3xl text-[#102F70]">
                    {currentTrack.title}
                  </h3>
                  <p className="font-serif-body italic text-sm sm:text-base text-[#C49A7D]">
                    {currentTrack.artist}
                  </p>
                </div>
                <Music className="w-6 h-6 text-[#941F25] shrink-0" />
              </div>

              {/* Hand-Drawn Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-3 bg-[#FAF7F2] border-2 border-[#102F70] rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className="h-full bg-[#941F25] rounded-full"
                    style={{ width: `${trackProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-hand-heading text-[#102F70]">
                  <span>{isPlaying ? "Playing Music Box..." : "Paused"}</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center sm:justify-start gap-4 pt-1">
                <button
                  onClick={prevTrack}
                  className="p-2 text-[#102F70] hover:text-[#941F25] transition cursor-pointer"
                  aria-label="Previous Track"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                <button
                  onClick={prevTrack}
                  className="p-2 border-2 border-[#102F70] rounded-full text-[#102F70] hover:bg-[#E7CFC1]/50 transition cursor-pointer"
                  aria-label="Skip Back"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6 py-2.5 bg-[#941F25] text-white organic-pill font-hand-heading tracking-wider flex items-center gap-2 shadow cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>PAUSE VINYL</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>PLAY VINYL</span>
                    </>
                  )}
                </motion.button>
                <button
                  onClick={nextTrack}
                  className="p-2 border-2 border-[#102F70] rounded-full text-[#102F70] hover:bg-[#E7CFC1]/50 transition cursor-pointer"
                  aria-label="Next Track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTrackProgress(0)}
                  className="p-2 text-[#102F70] hover:text-[#941F25] transition cursor-pointer"
                  aria-label="Repeat Track"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Track Selector Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-dashed border-[#C49A7D]">
                {WEDDING_CONFIG.musicTracks.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTrackIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`text-xs font-hand-heading px-3 py-1 rounded-full border transition cursor-pointer ${
                      currentTrackIndex === idx
                        ? "bg-[#102F70] text-white border-[#102F70]"
                        : "bg-[#FAF7F2] text-[#102F70] border-[#C49A7D] hover:bg-[#E7CFC1]"
                    }`}
                  >
                    0{t.id}. {t.title.split("(")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==================================================================
            SECTION 04 — BRIDE & GROOM PROFILE
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white organic-box p-6 sm:p-12 shadow-sm text-center relative"
        >
          <RibbonBowDivider className="w-48 h-12 mx-auto mb-2" />

          <span className="font-hand-heading text-xs tracking-[0.2em] text-[#941F25] uppercase">
            THE HAPPY COUPLE
          </span>
          <h2 className="font-hand-heading text-4xl sm:text-5xl text-[#102F70] font-bold uppercase mt-1 mb-10">
            BRIDE &amp; GROOM
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-11 gap-8 items-center">
            {/* Bride Card */}
            <motion.div
              whileHover={{ y: -4, rotate: -1 }}
              className="md:col-span-5 bg-[#FAF7F2] organic-box-burgundy p-6 relative"
            >
              <DoodleHeart className="w-6 h-6 absolute top-4 right-4" color="#941F25" />
              {/* Hand-Drawn Bride Portrait Medallion */}
              <div className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-[#941F25] p-2 mb-4 bg-white flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="44" fill="#E7CFC1" fillOpacity="0.4" />
                  {/* Bride Face Doodle */}
                  <circle cx="50" cy="46" r="18" fill="#FFFFFF" stroke="#102F70" strokeWidth="2.4" />
                  <circle cx="36" cy="32" r="8" fill="#102F70" />
                  <path d="M34 40 Q50 28 66 40" stroke="#102F70" strokeWidth="3" fill="none" />
                  <path d="M43 45 Q45 42 47 45 M53 45 Q55 42 57 45" stroke="#102F70" strokeWidth="2" strokeLinecap="round" />
                  <path d="M45 52 Q50 57 55 52" stroke="#941F25" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M32 82 C36 66, 64 66, 68 82" stroke="#102F70" strokeWidth="2.4" fill="#FFFFFF" />
                </svg>
              </div>

              <h3 className="font-hand-script text-4xl text-[#102F70] font-bold">
                {WEDDING_CONFIG.couple.brideFull}
              </h3>
              <p className="font-hand-playful text-xs text-[#941F25] mt-1">
                {WEDDING_CONFIG.couple.brideBio}
              </p>
              <div className="my-3 border-t border-dashed border-[#C49A7D] pt-3">
                <p className="font-serif-body italic text-sm text-[#C49A7D]">
                  Beloved Daughter of:
                </p>
                <p className="font-serif-body font-semibold text-base text-[#252323]">
                  {WEDDING_CONFIG.couple.brideParents}
                </p>
              </div>
              <span className="inline-block text-xs font-hand-heading text-[#102F70] bg-[#E7CFC1]/60 px-3 py-1 rounded-full">
                {WEDDING_CONFIG.couple.brideIg}
              </span>
            </motion.div>

            {/* Center Decorative Ampersand */}
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <span className="font-hand-script text-6xl text-[#941F25] font-bold">
                &amp;
              </span>
            </div>

            {/* Groom Card */}
            <motion.div
              whileHover={{ y: -4, rotate: 1 }}
              className="md:col-span-5 bg-[#FAF7F2] organic-box-burgundy p-6 relative"
            >
              <DoodleStarburst className="w-7 h-7 absolute top-4 left-4" color="#102F70" />
              {/* Hand-Drawn Groom Portrait Medallion */}
              <div className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-[#102F70] p-2 mb-4 bg-white flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="44" fill="#E7CFC1" fillOpacity="0.4" />
                  <circle cx="50" cy="46" r="18" fill="#FFFFFF" stroke="#102F70" strokeWidth="2.4" />
                  <path d="M33 38 C36 24, 62 24, 67 36 C60 32, 42 32, 33 38 Z" fill="#102F70" />
                  <path d="M43 45 Q45 42 47 45 M53 45 Q55 42 57 45" stroke="#102F70" strokeWidth="2" strokeLinecap="round" />
                  <path d="M45 52 Q50 56 55 52" stroke="#102F70" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M32 82 C36 66, 64 66, 68 82" stroke="#102F70" strokeWidth="2.4" fill="#102F70" />
                  {/* Bowtie */}
                  <polygon points="44,66 56,72 56,66 44,72" fill="#941F25" />
                </svg>
              </div>

              <h3 className="font-hand-script text-4xl text-[#102F70] font-bold">
                {WEDDING_CONFIG.couple.groomFull}
              </h3>
              <p className="font-hand-playful text-xs text-[#941F25] mt-1">
                {WEDDING_CONFIG.couple.groomBio}
              </p>
              <div className="my-3 border-t border-dashed border-[#C49A7D] pt-3">
                <p className="font-serif-body italic text-sm text-[#C49A7D]">
                  Beloved Son of:
                </p>
                <p className="font-serif-body font-semibold text-base text-[#252323]">
                  {WEDDING_CONFIG.couple.groomParents}
                </p>
              </div>
              <span className="inline-block text-xs font-hand-heading text-[#102F70] bg-[#E7CFC1]/60 px-3 py-1 rounded-full">
                {WEDDING_CONFIG.couple.groomIg}
              </span>
            </motion.div>
          </div>

          <div className="mt-10">
            <RibbonBowDivider className="w-48 h-12 mx-auto" />
          </div>
        </motion.section>

        {/* ==================================================================
            SECTION 05 — SAVE THE DATE & HAND-DRAWN CALENDAR
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white organic-box p-6 sm:p-12 shadow-sm text-center relative"
        >
          <DovesRibbonDoodle className="w-64 h-24 mx-auto -mt-2 mb-2" />

          <h2 className="font-hand-heading text-4xl sm:text-6xl text-[#102F70] font-bold uppercase tracking-wide">
            SAVE THE DATE!
          </h2>
          <p className="font-hand-script text-2xl text-[#941F25] mb-6">
            {WEDDING_CONFIG.weddingDate.month} • Circle it in red ink!
          </p>

          {/* Hand-Drawn 3-Column Horizontal Calendar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto my-8">
            {WEDDING_CONFIG.weddingDate.days.map((d) => (
              <div
                key={d.dateNum}
                className={`p-4 sm:p-6 relative flex flex-col items-center justify-center ${
                  d.isWeddingDay
                    ? "bg-[#E7CFC1]/55 organic-box-burgundy shadow-md scale-105"
                    : "bg-[#FAF7F2] organic-box opacity-85"
                }`}
              >
                <span className="font-hand-heading text-xs sm:text-sm tracking-widest text-[#102F70]">
                  {d.dayName}
                </span>

                <div className="relative my-2 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
                  <span
                    className={`font-hand-heading text-3xl sm:text-5xl font-bold z-10 ${
                      d.isWeddingDay ? "text-[#941F25]" : "text-[#102F70]"
                    }`}
                  >
                    {d.dateNum}
                  </span>

                  {/* Hand-Drawn Burgundy Heart Circling Date 25 */}
                  {d.isWeddingDay && (
                    <motion.svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path
                        d="M50 86 C50 86, 10 64, 10 34 C10 18, 24 10, 36 15 C44 18, 48 24, 50 30 C52 24, 56 18, 64 15 C76 10, 90 18, 90 34 C90 64, 50 86, 50 86 Z"
                        fill="none"
                        stroke="#941F25"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray="6 3"
                      />
                    </motion.svg>
                  )}
                </div>

                <span className="font-serif-body italic text-xs sm:text-sm text-[#252323]">
                  {d.label}
                </span>
              </div>
            ))}
          </div>

          {/* Live Countdown Sketch Boxes */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto mt-6">
            {[
              { label: "DAYS", value: countdown.days },
              { label: "HOURS", value: countdown.hours },
              { label: "MINUTES", value: countdown.minutes },
              { label: "SECONDS", value: countdown.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#FAF7F2] border-2 border-[#102F70] rounded-xl p-3 text-center"
              >
                <div className="font-hand-heading text-2xl sm:text-3xl text-[#941F25] font-bold">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="font-hand-heading text-[10px] sm:text-xs tracking-widest text-[#102F70]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ==================================================================
            SECTION 06 — WEDDING CEREMONY & RECEPTION (AKAD NIKAH & RESEPSI)
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="bg-white organic-box p-6 sm:p-12 shadow-sm relative"
        >
          {/* Reference Image 1 Wedding Cake, Candelabra & Champagne Table Doodle */}
          <WeddingTableDoodle className="w-full max-w-md mx-auto mb-4" />

          <div className="text-center mb-10">
            <span className="font-hand-heading text-xs tracking-[0.2em] text-[#941F25] uppercase">
              WHERE &amp; WHEN TO CELEBRATE
            </span>
            <h2 className="font-hand-heading text-4xl sm:text-5xl text-[#102F70] font-bold uppercase mt-1">
              CEREMONY &amp; RECEPTION
            </h2>
          </div>

          {/* Two Event Cards: Akad Nikah & Resepsi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Card 1: Akad Nikah */}
            <div className="bg-[#FAF7F2] organic-box p-6 flex flex-col justify-between relative">
              <DoodleStarburst className="w-7 h-7 absolute top-4 right-4" color="#102F70" />
              <div>
                <span className="inline-block bg-[#102F70] text-white font-hand-heading text-xs px-3 py-1 rounded-full mb-3">
                  01 • HOLY MATRIMONY
                </span>
                <h3 className="font-hand-script text-4xl text-[#941F25] font-bold mb-2">
                  Akad Nikah
                </h3>
                <div className="space-y-2 text-sm sm:text-base font-serif-body text-[#252323]">
                  <p className="flex items-center gap-2 font-semibold text-[#102F70]">
                    <Calendar className="w-4 h-4 text-[#941F25] shrink-0" />
                    {WEDDING_CONFIG.events.akad.date}
                  </p>
                  <p className="flex items-center gap-2 font-semibold text-[#102F70]">
                    <Clock className="w-4 h-4 text-[#941F25] shrink-0" />
                    {WEDDING_CONFIG.events.akad.time}
                  </p>
                  <p className="flex items-start gap-2 pt-1">
                    <MapPin className="w-4 h-4 text-[#941F25] shrink-0 mt-1" />
                    <span>
                      <strong className="text-[#102F70] block">
                        {WEDDING_CONFIG.events.akad.venue}
                      </strong>
                      {WEDDING_CONFIG.events.akad.address}
                    </span>
                  </p>
                </div>
              </div>
              <p className="mt-4 pt-3 border-t border-dashed border-[#C49A7D] text-xs italic text-[#C49A7D]">
                {WEDDING_CONFIG.events.akad.note}
              </p>
            </div>

            {/* Card 2: Resepsi */}
            <div className="bg-[#E7CFC1]/45 organic-box-burgundy p-6 flex flex-col justify-between relative">
              <DoodleStarburst className="w-7 h-7 absolute top-4 right-4" color="#941F25" />
              <div>
                <span className="inline-block bg-[#941F25] text-white font-hand-heading text-xs px-3 py-1 rounded-full mb-3">
                  02 • EVENING PARTY
                </span>
                <h3 className="font-hand-script text-4xl text-[#102F70] font-bold mb-2">
                  Resepsi Malam
                </h3>
                <div className="space-y-2 text-sm sm:text-base font-serif-body text-[#252323]">
                  <p className="flex items-center gap-2 font-semibold text-[#102F70]">
                    <Calendar className="w-4 h-4 text-[#941F25] shrink-0" />
                    {WEDDING_CONFIG.events.resepsi.date}
                  </p>
                  <p className="flex items-center gap-2 font-semibold text-[#102F70]">
                    <Clock className="w-4 h-4 text-[#941F25] shrink-0" />
                    {WEDDING_CONFIG.events.resepsi.time}
                  </p>
                  <p className="flex items-start gap-2 pt-1">
                    <MapPin className="w-4 h-4 text-[#941F25] shrink-0 mt-1" />
                    <span>
                      <strong className="text-[#102F70] block">
                        {WEDDING_CONFIG.events.resepsi.venue}
                      </strong>
                      {WEDDING_CONFIG.events.resepsi.address}
                    </span>
                  </p>
                </div>
              </div>
              <p className="mt-4 pt-3 border-t border-dashed border-[#941F25]/40 text-xs italic text-[#941F25]">
                {WEDDING_CONFIG.events.resepsi.note}
              </p>
            </div>
          </div>

          {/* Reference Images 2 & 3 Evening Order-of-the-Day Doodle Strip */}
          <div className="bg-[#FAF7F2] organic-box p-6 mb-8">
            <p className="text-center font-hand-script text-2xl sm:text-3xl text-[#102F70] mb-6">
              “There will be food, saxophone jazz + dancing throughout the evening!”
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center text-center relative">
              {WEDDING_CONFIG.events.eveningTimeline.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <PartyDoodleIcon
                    type={item.icon}
                    className="w-14 h-14 mb-2"
                    color="#102F70"
                  />
                  <span className="font-hand-heading text-sm text-[#941F25] font-bold">
                    {item.time}
                  </span>
                  <span className="font-hand-playful text-xs text-[#102F70]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Burgundy Google Maps Location Button */}
          <div className="text-center">
            <motion.a
              href={WEDDING_CONFIG.events.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 bg-[#941F25] hover:bg-[#7a181d] text-white font-hand-heading tracking-[0.15em] text-base sm:text-lg px-8 py-3.5 organic-pill shadow-md"
            >
              <MapPin className="w-5 h-5" />
              <span>OPEN GOOGLE MAPS LOCATION</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </motion.a>
          </div>
        </motion.section>

        {/* ==================================================================
            SECTION 07 — LOVE STORY TIMELINE
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="bg-white organic-box p-6 sm:p-12 shadow-sm relative"
        >
          <div className="text-center mb-10">
            <span className="font-hand-heading text-xs tracking-[0.2em] text-[#941F25] uppercase">
              HOW WE GOT HERE
            </span>
            <h2 className="font-hand-heading text-4xl sm:text-5xl text-[#102F70] font-bold uppercase mt-1">
              OUR LOVE STORY
            </h2>
            <p className="font-hand-script text-2xl text-[#C49A7D]">
              Every little doodle along our journey
            </p>
          </div>

          {/* Vertical Dotted Navy-Blue Journey Line + Story Cards */}
          <div className="relative pl-6 sm:pl-10 border-l-2 border-dashed border-[#102F70] space-y-8 max-w-xl mx-auto">
            {WEDDING_CONFIG.loveStory.map((story, idx) => (
              <motion.div
                key={story.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative bg-[#FAF7F2] organic-box p-5 sm:p-6"
              >
                {/* Heart Node on Dotted Line */}
                <div className="w-8 h-8 rounded-full bg-[#941F25] text-white flex items-center justify-center absolute -left-[41px] sm:-left-[57px] top-5 border-2 border-white shadow">
                  <Heart className="w-4 h-4 fill-current" />
                </div>

                <span className="inline-block bg-[#E7CFC1] text-[#941F25] font-hand-heading text-xs tracking-widest px-3 py-0.5 rounded-full mb-1">
                  {story.year}
                </span>
                <h3 className="font-hand-heading text-2xl text-[#102F70] font-bold">
                  {story.title}
                </h3>
                <p className="font-serif-body text-base sm:text-lg text-[#252323] mt-1 leading-relaxed">
                  {story.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Intertwined Wedding Rings at the End of the Timeline */}
          <div className="mt-10 text-center">
            <IntertwinedRingsDoodle className="w-36 h-24 mx-auto" />
            <p className="font-hand-script text-2xl text-[#941F25]">
              ...and now onto our greatest chapter yet!
            </p>
          </div>
        </motion.section>

        {/* ==================================================================
            SECTION 08 — SCRAPBOOK PHOTO GALLERY (POLAROID MEMORIES)
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="bg-white organic-box p-6 sm:p-12 shadow-sm relative overflow-hidden"
        >
          {/* Corner Hand-Drawn Sparkles & Hearts */}
          <DoodleStarburst
            className="w-9 h-9 absolute top-5 left-5"
            color="#102F70"
          />
          <DoodleStarburst
            className="w-8 h-8 absolute top-6 right-6"
            color="#941F25"
            delay={0.4}
          />
          <DoodleHeart
            className="w-6 h-6 absolute bottom-6 left-6 hidden sm:block"
            color="#941F25"
          />
          <DoodleHeart
            className="w-5 h-5 absolute bottom-7 right-7 hidden sm:block"
            color="#C49A7D"
            delay={0.6}
          />

          {/* Vintage Camera Doodle & Header */}
          <div className="text-center mb-8">
            <VintageCameraDoodle className="w-36 h-28 mx-auto -mt-2 mb-1" />

            <span className="inline-block bg-[#E7CFC1] text-[#941F25] font-hand-heading text-xs tracking-[0.2em] px-4 py-1 organic-pill uppercase mb-2">
              CAPTURED IN INK &amp; FILM • SCRAPBOOK ALBUM
            </span>

            <h2 className="font-hand-heading text-4xl sm:text-5xl text-[#102F70] font-bold uppercase tracking-wide">
              OUR PHOTO GALLERY
            </h2>

            <p className="font-hand-script text-2xl sm:text-3xl text-[#941F25] mt-1">
              Pinned polaroid memories from our happiest chapters ♥
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {galleryCategories.map((cat) => {
                const isActive = activeGalleryCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveGalleryCategory(cat)}
                    className={`px-4 py-1.5 organic-pill font-hand-heading text-xs sm:text-sm tracking-wider transition cursor-pointer border-2 ${
                      isActive
                        ? "bg-[#941F25] text-white border-[#941F25] shadow-sm"
                        : "bg-[#FAF7F2] text-[#102F70] border-[#102F70]/80 hover:bg-[#E7CFC1]/55"
                    }`}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Scrapbook Polaroid Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-9 pt-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((photo, idx) => {
                const fullIndex = WEDDING_CONFIG.gallery.findIndex(
                  (g) => g.id === photo.id
                );
                const isBurgundy = photo.frameStyle === "burgundy";

                return (
                  <motion.div
                    layout
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    whileHover={{ y: -6, rotate: 0, scale: 1.01 }}
                    onClick={() => setLightboxPhotoIndex(fullIndex)}
                    className={`group cursor-pointer bg-[#FAF7F2] p-4 sm:p-5 pb-6 relative shadow-md transition-shadow hover:shadow-xl ${
                      photo.tilt
                    } ${
                      isBurgundy ? "organic-box-burgundy" : "organic-box"
                    }`}
                  >
                    {/* Top Decorative Washi Tape */}
                    <div
                      className={`w-28 h-6 bg-[#E7CFC1]/85 border border-[#C49A7D]/50 mx-auto -mt-7 mb-3 relative z-20 shadow-xs ${photo.tapeRotate}`}
                    />

                    {/* Polaroid Image Frame with Hand-Drawn Corner Mounts */}
                    <div className="relative overflow-hidden rounded-xl border-2 border-[#102F70] bg-white aspect-[4/3]">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Subtle Warm Vintage Paper Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#102F70]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                        <span className="bg-[#FAF7F2]/95 text-[#102F70] font-hand-heading text-xs px-3 py-1 organic-pill border border-[#102F70] flex items-center gap-1.5 shadow">
                          <ZoomIn className="w-3.5 h-3.5 text-[#941F25]" />
                          VIEW POLAROID
                        </span>
                      </div>

                      {/* Top-Left Category Badge */}
                      <span
                        className={`absolute top-2.5 left-2.5 text-[11px] font-hand-heading tracking-wider px-3 py-0.5 organic-pill shadow-sm ${
                          isBurgundy
                            ? "bg-[#941F25] text-white"
                            : "bg-[#102F70] text-white"
                        }`}
                      >
                        {photo.category}
                      </span>

                      {/* Hand-Drawn Scrapbook Corner Triangles */}
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 absolute top-1.5 right-1.5 text-[#FAF7F2] drop-shadow pointer-events-none"
                      >
                        <polygon points="0,0 24,0 24,24" fill="currentColor" />
                      </svg>
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 absolute bottom-1.5 left-1.5 text-[#FAF7F2] drop-shadow pointer-events-none"
                      >
                        <polygon points="0,0 0,24 24,24" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Handwritten Polaroid Caption Area */}
                    <div className="mt-4 text-center px-1">
                      <div className="flex items-center justify-center gap-2 mb-0.5">
                        <span className="font-hand-heading text-[11px] tracking-[0.18em] text-[#C49A7D] uppercase">
                          {photo.dateStamp}
                        </span>
                        <span className="text-[#941F25] text-xs">♥</span>
                        <span className="font-hand-heading text-[11px] tracking-[0.18em] text-[#C49A7D] uppercase">
                          {WEDDING_CONFIG.couple.shortCombined}
                        </span>
                      </div>

                      <h3 className="font-hand-script text-3xl text-[#102F70] font-bold leading-tight group-hover:text-[#941F25] transition-colors">
                        {photo.title}
                      </h3>

                      <p className="font-serif-body italic text-sm sm:text-base text-[#252323] mt-1 leading-snug">
                        “{photo.caption}”
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Scrapbook Note & Ribbon Divider */}
          <div className="mt-10 pt-6 border-t border-dashed border-[#C49A7D] text-center">
            <p className="font-hand-playful text-xs sm:text-sm text-[#941F25] mb-3">
              Tap any polaroid card above to inspect the full-size memory ♥
            </p>
            <RibbonBowDivider className="w-48 h-12 mx-auto" />
          </div>
        </motion.section>

        {/* ==================================================================
            SECTION 09 — WEDDING GIFT (DUSTY PEACH BANK CARDS)
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white organic-box p-6 sm:p-12 shadow-sm text-center relative"
        >
          <DovesRibbonDoodle className="w-64 h-24 mx-auto -mt-2" />

          <h2 className="font-hand-heading text-4xl sm:text-5xl text-[#102F70] font-bold uppercase mt-1">
            WEDDING GIFT
          </h2>
          <p className="font-serif-body italic text-base sm:text-lg text-[#252323] max-w-lg mx-auto mt-2 mb-8">
            Your presence and warm wishes at our wedding is the greatest gift of
            all. However, if you wish to bless us with a token of love, we have
            provided our digital envelope below:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {WEDDING_CONFIG.bankAccounts.map((acc) => {
              const isCopied = copiedId === acc.id;
              return (
                <motion.div
                  key={acc.id}
                  whileHover={{ y: -4 }}
                  className="bg-[#E7CFC1] organic-box-burgundy p-6 text-left flex flex-col justify-between relative shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-dashed border-[#941F25]/40 pb-3 mb-4">
                    <span className="font-hand-heading text-xl text-[#102F70] font-bold tracking-wider">
                      {acc.bankName}
                    </span>
                    <Gift className="w-5 h-5 text-[#941F25]" />
                  </div>

                  <div className="my-2">
                    <p className="font-hand-heading text-xs text-[#941F25] uppercase tracking-widest">
                      ACCOUNT NUMBER
                    </p>
                    <p className="font-hand-heading text-2xl sm:text-3xl text-[#102F70] font-bold tracking-wider my-1">
                      {acc.accountNumber}
                    </p>
                    <p className="font-serif-body text-sm text-[#252323]">
                      a/n <strong>{acc.accountHolder}</strong> ({acc.branch})
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleCopyAccount(
                        acc.id,
                        acc.accountNumber,
                        acc.accountHolder
                      )
                    }
                    className={`mt-4 w-full py-2.5 px-4 organic-pill font-hand-heading tracking-wider text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                      isCopied
                        ? "bg-[#102F70] text-white"
                        : "bg-[#941F25] hover:bg-[#7d181d] text-white"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>COPIED WITH LOVE! ♥</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY ACCOUNT NUMBER</span>
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ==================================================================
            SECTION 09 — LOVE YOUR WISHES & RSVP FORM
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="bg-white relative shadow-sm"
        >
          <LoopCornerFrame strokeColor="#102F70">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-1">
                <DoodleStarburst className="w-7 h-7" color="#941F25" />
                <span className="font-hand-heading text-xs tracking-[0.2em] text-[#941F25] uppercase">
                  R.S.V.P. BY FEBRUARY / JULY 2026
                </span>
                <DoodleStarburst className="w-7 h-7" color="#102F70" />
              </div>

              <h2 className="font-hand-heading text-4xl sm:text-5xl text-[#102F70] font-bold uppercase">
                LOVE YOUR WISHES!
              </h2>
              <p className="font-hand-script text-2xl sm:text-3xl text-[#941F25] mt-1">
                Kindly Confirm Your Attendance &amp; Leave a Scrapbook Note
              </p>
            </div>

            {/* Interactive Hand-Drawn RSVP Form */}
            <form
              onSubmit={handleRsvpSubmit}
              className="max-w-xl mx-auto bg-[#FAF7F2] organic-box p-6 sm:p-8 space-y-4 text-left"
            >
              <div>
                <label className="block font-hand-heading text-sm text-[#102F70] uppercase tracking-wider mb-1">
                  YOUR FULL NAME(S) *
                </label>
                <input
                  type="text"
                  required
                  value={rsvpForm.name}
                  onChange={(e) =>
                    setRsvpForm({ ...rsvpForm, name: e.target.value })
                  }
                  placeholder="e.g., Paula & Chris"
                  className="w-full px-4 py-2.5 bg-white border-2 border-[#102F70] rounded-xl font-serif-body text-base focus:outline-none focus:border-[#941F25]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-hand-heading text-sm text-[#102F70] uppercase tracking-wider mb-1">
                    WILL YOU JOIN US?
                  </label>
                  <select
                    value={rsvpForm.attendance}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, attendance: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#102F70] rounded-xl font-serif-body text-base focus:outline-none focus:border-[#941F25]"
                  >
                    <option value="Joyfully Accepts">
                      ♥ Joyfully Accepts!
                    </option>
                    <option value="Regretfully Declines">
                      Regretfully Declines
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-hand-heading text-sm text-[#102F70] uppercase tracking-wider mb-1">
                    NUMBER OF GUESTS
                  </label>
                  <select
                    value={rsvpForm.guests}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, guests: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#102F70] rounded-xl font-serif-body text-base focus:outline-none focus:border-[#941F25]"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-hand-heading text-sm text-[#102F70] uppercase tracking-wider mb-1">
                  WEDDING WISHES FOR JULIET &amp; CHRISTIAN *
                </label>
                <textarea
                  rows={3}
                  value={rsvpForm.message}
                  onChange={(e) =>
                    setRsvpForm({ ...rsvpForm, message: e.target.value })
                  }
                  placeholder="Write your sweet note, advice, or song request for the dancefloor..."
                  className="w-full px-4 py-2.5 bg-white border-2 border-[#102F70] rounded-xl font-serif-body text-base focus:outline-none focus:border-[#941F25]"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 bg-[#941F25] hover:bg-[#7c181d] text-white font-hand-heading tracking-[0.18em] text-lg organic-pill shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>SEND RSVP &amp; PIN WISH</span>
              </motion.button>

              {rsvpSubmitted && (
                <p className="text-center font-hand-playful text-xs text-[#941F25]">
                  Thank you! Your wish has been added to the scrapbook wall below ♥
                </p>
              )}
            </form>

            {/* Scrapbook Wishes Wall */}
            <div className="mt-10 max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between border-b border-dashed border-[#C49A7D] pb-2">
                <h3 className="font-hand-heading text-xl text-[#102F70] uppercase">
                  GUESTBOOK NOTES ({wishes.length})
                </h3>
                <span className="font-hand-script text-lg text-[#941F25]">
                  Pinned with love ♥
                </span>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#E7CFC1]/35 border-2 border-[#102F70]/80 rounded-2xl p-4 text-left relative"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-hand-heading text-lg text-[#102F70] font-bold">
                        {w.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-hand-heading px-2.5 py-0.5 rounded-full ${
                            w.attendance === "Joyfully Accepts"
                              ? "bg-[#941F25] text-white"
                              : "bg-[#C49A7D] text-white"
                          }`}
                        >
                          {w.attendance} ({w.guests})
                        </span>
                        <span className="text-xs italic text-[#C49A7D]">
                          {w.date}
                        </span>
                      </div>
                    </div>
                    <p className="font-serif-body text-base text-[#252323] italic">
                      “{w.message}”
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </LoopCornerFrame>
        </motion.section>

        {/* ==================================================================
            SECTION 10 — CLOSING SECTION
        ================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white organic-box p-8 sm:p-14 text-center relative shadow-sm"
        >
          <RibbonBowDivider className="w-48 h-12 mx-auto mb-4" />

          {/* Royal Vintage Carriage Illustration (Inspired by Reference Image 4) */}
          <div className="flex justify-center items-center gap-4 my-2">
            <DoodleHeart className="w-6 h-6" color="#941F25" />
            <PartyDoodleIcon
              type="carriage"
              className="w-32 h-24"
              color="#102F70"
            />
            <DoodleHeart className="w-6 h-6" color="#941F25" delay={0.5} />
          </div>

          <h2 className="font-hand-heading text-3xl sm:text-5xl text-[#102F70] font-bold uppercase tracking-wide mt-2">
            SEE YOU AT OUR WEDDING DAY!
          </h2>

          <p className="font-serif-body italic text-lg sm:text-xl text-[#252323] max-w-md mx-auto my-4">
            “So come prepared to eat cake, clink glasses, and dance under the
            candlelight until the midnight carriages arrive!”
          </p>

          <div className="my-6">
            <p className="font-hand-script text-4xl sm:text-5xl text-[#941F25] font-bold">
              {WEDDING_CONFIG.couple.shortCombined}
            </p>
            <p className="font-hand-heading text-xs tracking-[0.22em] text-[#102F70] uppercase mt-1">
              {WEDDING_CONFIG.weddingDate.fullText} • CASTELLO BRANCACCIO
            </p>
          </div>

          <footer className="pt-6 border-t border-dashed border-[#C49A7D] text-xs font-hand-playful text-[#C49A7D]">
            Hand-Drawn Scrapbook Digital Wedding Invitation • Crafted with ♥ for{" "}
            {WEDDING_CONFIG.couple.combinedNames}
          </footer>
        </motion.section>
      </main>

      {/* ====================================================================
          SCRAPBOOK POLAROID LIGHTBOX MODAL
      ==================================================================== */}
      <AnimatePresence>
        {lightboxPhotoIndex !== null && WEDDING_CONFIG.gallery[lightboxPhotoIndex] && (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhotoIndex(null)}
            className="fixed inset-0 z-50 bg-[#102F70]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, rotate: -1 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#FAF7F2] organic-box p-5 sm:p-8 relative shadow-2xl my-auto"
            >
              {/* Washi Tape at Top */}
              <div className="w-32 h-7 bg-[#E7CFC1]/90 border border-[#C49A7D]/50 -rotate-2 mx-auto -mt-8 mb-4 relative z-20" />

              {/* Close Button */}
              <button
                onClick={() => setLightboxPhotoIndex(null)}
                aria-label="Close Polaroid"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#941F25] text-white flex items-center justify-center border-2 border-[#FAF7F2] shadow hover:bg-[#7c181d] transition cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top Counter & Category Tag */}
              <div className="flex items-center justify-between gap-2 mb-3 pr-10">
                <span className="bg-[#102F70] text-white font-hand-heading text-xs tracking-widest px-3.5 py-1 organic-pill">
                  {WEDDING_CONFIG.gallery[lightboxPhotoIndex].category}
                </span>
                <span className="font-hand-heading text-xs tracking-[0.2em] text-[#941F25]">
                  POLAROID 0{lightboxPhotoIndex + 1} OF 0{WEDDING_CONFIG.gallery.length}
                </span>
              </div>

              {/* Full Polaroid Image */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#102F70] bg-white max-h-[62vh] flex items-center justify-center">
                <img
                  src={WEDDING_CONFIG.gallery[lightboxPhotoIndex].src}
                  alt={WEDDING_CONFIG.gallery[lightboxPhotoIndex].title}
                  className="w-full max-h-[62vh] object-contain"
                />
              </div>

              {/* Caption & Prev/Next Controls */}
              <div className="mt-5 text-center">
                <span className="font-hand-heading text-xs tracking-[0.2em] text-[#C49A7D] uppercase">
                  {WEDDING_CONFIG.gallery[lightboxPhotoIndex].dateStamp} •{" "}
                  {WEDDING_CONFIG.couple.shortCombined}
                </span>
                <h3 className="font-hand-script text-3xl sm:text-4xl text-[#102F70] font-bold mt-0.5">
                  {WEDDING_CONFIG.gallery[lightboxPhotoIndex].title}
                </h3>
                <p className="font-serif-body italic text-base sm:text-lg text-[#252323] max-w-lg mx-auto mt-1">
                  “{WEDDING_CONFIG.gallery[lightboxPhotoIndex].caption}”
                </p>

                <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-dashed border-[#C49A7D]">
                  <button
                    onClick={handlePrevLightbox}
                    className="px-4 py-2 bg-white border-2 border-[#102F70] organic-pill font-hand-heading text-xs sm:text-sm text-[#102F70] hover:bg-[#E7CFC1]/50 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>PREVIOUS</span>
                  </button>

                  <DoodleHeart className="w-5 h-5" color="#941F25" />

                  <button
                    onClick={handleNextLightbox}
                    className="px-4 py-2 bg-[#941F25] text-white border-2 border-[#941F25] organic-pill font-hand-heading text-xs sm:text-sm hover:bg-[#7c181d] flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>NEXT PHOTO</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}