import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedImage } from '../components/AnimatedImage'

type RoofStyle = 'natural' | 'soft' | 'flat'
type WallMaterial = 'brick' | 'gasblock'
type FacadeStyle = 'brick' | 'combined' | 'ventilated'

// SVG Icons
const Icons = {
  house: (
    <svg viewBox="0 274.42 22.58 22.58" fill="currentColor">
      <path d="m 15.948527,281.05091 v -0.33156 c 1.3e-5,-0.54755 -0.449703,-0.99985 -0.997257,-0.99985 h -1.33206 v -0.32895 c 0,-0.15838 -0.06741,-0.23325 -0.197346,-0.30828 -2.161878,-0.97188 -4.3264716,-1.94673 -6.4883466,-2.91966 -0.1046928,-0.43891 -0.5019052,-0.77036 -0.9833047,-0.77025 -0.5045157,0.0128 -0.9123895,0.39071 -0.976154,0.86932 l -3.9272051,4.91674 c -0.0815351,0.0999 -0.0980014,0.23799 -0.042256,0.3543 l 1.0005075,1.99777 c 0.056291,0.11259 0.1712492,0.18374 0.2970941,0.18398 h 1.3314093 v 0.9979 c 0,0.61617 0.4263307,1.13897 0.997908,1.28851 v 6.0336 c -0.5475553,0 -0.9979212,0.4523 -0.997908,0.99985 v 0.99726 h -0.33415 c -0.3637344,0 -0.6657013,0.30264 -0.6657046,0.66636 v 0.6657 H 1.3023444 c -0.1840839,3.7e-4 -0.33292228,0.15007 -0.33220332,0.33415 6.6575e-4,0.18307 0.14913462,0.3312 0.33220332,0.33155 H 21.273484 c 0.18383,7.3e-4 0.333435,-0.14772 0.334152,-0.33155 7.33e-4,-0.18484 -0.149306,-0.33488 -0.334152,-0.33415 h -0.332202 v -1.66361 c 0.363719,0 0.66636,-0.30199 0.666354,-0.66571 v -0.66571 c 6e-6,-0.36373 -0.30262,-0.66635 -0.666354,-0.66635 v -1.66295 c 0.363703,0 0.66636,-0.30265 0.666354,-0.66637 v -0.66569 c 6e-6,-0.36372 -0.30262,-0.66571 -0.666354,-0.66571 v -1.66361 h 0.332202 c 0.184846,7.3e-4 0.334876,-0.14931 0.334152,-0.33416 -7.32e-4,-0.18382 -0.150322,-0.33227 -0.334152,-0.33155 h -0.332202 v -0.6657 c 7.32e-4,-0.18383 -0.147723,-0.33344 -0.331552,-0.33416 -0.184847,-7.2e-4 -0.334876,0.14931 -0.334153,0.33416 v 0.6657 h -3.329173 v -0.6657 c 7.32e-4,-0.18383 -0.147723,-0.33344 -0.331553,-0.33416 -0.184846,-7.2e-4 -0.334876,0.14931 -0.334152,0.33416 v 0.99725 1.99777 h -5.324988 c -0.363719,0 -0.665709,0.30199 -0.665704,0.66571 v 0.66569 c -5e-6,0.36372 0.301985,0.66637 0.665704,0.66637 v 1.66295 c -0.363719,0 -0.665709,0.30262 -0.665704,0.66635 v 0.66571 c -5e-6,0.36372 0.30197,0.66571 0.665704,0.66571 v 1.66361 H 9.2927501 v -0.6657 c -2.5e-6,-0.36372 -0.3026204,-0.66636 -0.6663543,-0.66636 H 8.2922431 v -0.99726 c 1.39e-5,-0.54755 -0.4497035,-0.99985 -0.9972575,-0.99985 2.14e-5,-2.01976 2.5e-6,-4.21583 0,-5.99071 H 7.626538 c 0.3637213,0 0.6657101,-0.30197 0.6657051,-0.6657 8.68e-5,-0.55533 0,-1.10893 0,-1.66361 h 3.3298239 v 0.6657 c -0.363722,0 -0.666356,0.30264 -0.666356,0.66636 v 1.66296 c 0,0.36372 0.302634,0.66635 0.666356,0.66635 h 3.329173 c 0.36372,0 0.665705,-0.30263 0.665705,-0.66635 v -1.66296 c 0,-0.36372 -0.301985,-0.66636 -0.665705,-0.66636 v -0.6657 h 4.32708 c 0.306731,0 0.433317,-0.24411 0.275072,-0.51819 l -1.329459,-1.99777 c -0.0627,-0.10857 -0.172813,-0.14759 -0.276343,-0.14759 z M 5.9628634,276.0582 c 0.187769,0 0.3322028,0.14637 0.3322015,0.33415 -2.5e-6,0.18778 -0.144425,0.33156 -0.3322015,0.33156 -0.1877728,0 -0.3315511,-0.14381 -0.3315511,-0.33156 -3.8e-6,-0.18779 0.1437783,-0.33415 0.3315511,-0.33415 z m 0.883488,0.79572 6.1070596,2.74734 v 0.11838 h -1.331408 c -0.547556,0 -0.997921,0.4523 -0.997907,0.99985 v 0.33156 H 7.8371074 c -0.1539885,-0.135 -0.3386136,-0.23558 -0.5421847,-0.28865 v -2.04068 c 0,-0.3637 -0.3019712,-0.66569 -0.6657051,-0.66569 H 6.2950649 v -0.72357 c 0.2374345,-0.0848 0.434728,-0.25768 0.5512865,-0.47847 z m -1.6402087,0.18528 c 0.1128574,0.13169 0.2590889,0.23392 0.4251696,0.2932 v 0.72357 h -0.334154 c -0.3637342,0 -0.6657045,0.30198 -0.6657045,0.66569 v 1.99777 h -0.331551 c -0.242373,0 -0.4575388,0.13439 -0.5740404,0.33155 H 1.9952898 Z m 0.091018,1.68246 H 6.62922 v 0.15408 l -1.3320593,0.88675 z m 1.3320593,0.95435 v 1.04342 H 5.2971608 v -0.15472 z m 4.992785,0.70928 h 1.662961 1.666212 c 0.187775,0 0.331557,0.14637 0.331552,0.33414 v 0.33155 h -3.994878 v -0.33155 c -5e-6,-0.18777 0.146378,-0.33414 0.334153,-0.33414 z m -7.3220998,0.99985 h 2.6608647 c 0.2498286,0 0.464591,0.13218 0.5785907,0.33155 H 5.9628634 c -0.1830602,7.3e-4 -0.3311788,0.14914 -0.3315511,0.33221 v 1.66556 c 0,0.54754 0.4503564,0.9979 0.9979053,0.9979 h 0.9972575 v 0.66571 H 4.9656075 c -0.371603,0 -0.6657047,-0.29411 -0.6657047,-0.66571 z m -2.4573889,0.33155 h 1.1682351 l -0.6676551,1.0018 z m 6.407408,0 h 1.0856715 l -0.88869,1.33206 H 8.2921815 v -0.99141 c 0,-0.12278 -0.014731,-0.23466 -0.042257,-0.34065 z m 2.3286667,0 h 1.420473 l -0.709911,1.06487 z m 2.663469,0 h 1.417873 l -0.708612,1.06292 z m 2.663468,0 h 1.417873 l -0.708611,1.06292 z m -12.2719798,0.26654 v 1.06552 H 2.9236375 Z m 6.3235457,6.7e-4 0.7105611,1.06486 H 9.2465315 Z m 2.6634681,0 0.709261,1.06486 h -1.419822 z m 2.662168,0.003 0.709912,1.06292 h -1.419176 z m 2.66347,0 0.709911,1.06292 h -1.419174 z m -11.6511327,0.39722 h 1.3314102 v 1.66241 h -0.99726 c -0.1877715,0 -0.3341527,-0.14378 -0.3341527,-0.33156 z m 5.9926427,1.33141 h 1.997764 v 0.66571 H 12.28771 Z m -0.665705,1.33206 h 3.329173 v 1.66296 h -3.329173 z m -6.3248443,0.99726 H 6.62922 v 1.04276 l -1.3320618,-0.8886 z m 11.6491813,0.33414 h 3.329173 v 1.66361 h -3.329173 z m -11.6491813,0.62085 1.0648675,0.70992 -1.0648675,0.70991 z m 1.3320593,1.33142 v 1.41851 l -1.0648687,-0.70861 z m 4.326431,0.37705 h 9.98557 v 0.66571 h -9.98557 z m -5.6584903,0.95501 1.0629163,0.7086 -0.581191,0.38812 c -0.1537986,0.10152 -0.1957688,0.30879 -0.09361,0.46222 0.1017867,0.15357 0.3089721,0.19525 0.4622196,0.093 l 0.4817266,-0.32049 v 1.04081 H 5.2971633 Z m 6.3248443,0.37705 h 3.329173 v 1.66296 h -3.329173 z m 3.994878,0 h 0.663754 v 1.66296 h -0.663754 z m 1.329459,0 h 3.329173 v 1.66296 h -3.329173 z m -5.990691,2.32932 h 9.98557 v 0.6657 h -9.98557 z m -6.3241948,0.33156 h 2.663469 c 0.1877741,0 0.3315562,0.14637 0.3315524,0.33414 v 0.99726 H 6.96077 v -0.33155 c 7.322e-4,-0.18384 -0.1477223,-0.33344 -0.3315524,-0.33416 -0.1848466,-7.3e-4 -0.3348761,0.1493 -0.3341527,0.33416 v 0.33155 H 5.6313123 v -0.33155 c 6.654e-4,-0.18486 -0.1493074,-0.33488 -0.334154,-0.33416 -0.1838275,7.3e-4 -0.3322697,0.15032 -0.3315508,0.33416 v 0.33155 H 4.2999028 v -0.99726 c -6.7e-6,-0.18777 0.1437756,-0.33414 0.331551,-0.33414 z m 6.9905488,0.99985 h 3.329173 v 1.66361 h -3.329173 z m 3.994878,0 h 0.663754 v 1.66361 h -0.663754 z m 1.329459,0 h 3.329173 v 1.66361 H 16.94634 Z m -13.6469468,0.99735 h 5.3269364 v 0.66571 H 3.2993953 Z"/>
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/>
      <path d="M5 2L6 5L9 6L6 7L5 10L4 7L1 6L4 5L5 2Z" opacity="0.6"/>
      <path d="M19 14L20 17L23 18L20 19L19 22L18 19L15 18L18 17L19 14Z" opacity="0.6"/>
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <path d="M9 22V12h6v10"/>
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 2,7 12,12 22,7 12,2"/>
      <polyline points="2,17 12,22 22,17"/>
      <polyline points="2,12 12,17 22,12"/>
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  brick: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="1"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
      <line x1="1" y1="16" x2="23" y2="16"/>
      <line x1="12" y1="4" x2="12" y2="10"/>
      <line x1="6" y1="10" x2="6" y2="16"/>
      <line x1="18" y1="10" x2="18" y2="16"/>
      <line x1="12" y1="16" x2="12" y2="20"/>
    </svg>
  ),
  roof: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12L12 3l10 9"/>
      <path d="M5 10v10h14V10"/>
      <rect x="9" y="14" width="6" height="6"/>
    </svg>
  ),
  roofGable: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12L12 4l10 8"/>
      <path d="M4 11v9h16v-9"/>
    </svg>
  ),
  roofHip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14L7 8h10l5 6"/>
      <path d="M12 4L7 8M12 4l5 4"/>
      <path d="M4 13v7h16v-7"/>
    </svg>
  ),
  roofFlat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h20"/>
      <path d="M4 8v12h16V8"/>
      <rect x="8" y="12" width="3" height="4"/>
      <rect x="13" y="12" width="3" height="4"/>
    </svg>
  ),
  roofMansard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14L5 6h14l3 8"/>
      <path d="M8 6V4h8v2"/>
      <path d="M4 13v7h16v-7"/>
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14v-5l-2-4H7l-2 4v5z"/>
      <circle cx="7.5" cy="17.5" r="1.5"/>
      <circle cx="16.5" cy="17.5" r="1.5"/>
      <path d="M5 12h14"/>
      <path d="M7 8l1-3h8l1 3"/>
    </svg>
  ),
  balcony: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="8" rx="1"/>
      <line x1="4" y1="12" x2="20" y2="12"/>
      <line x1="6" y1="12" x2="6" y2="20"/>
      <line x1="10" y1="12" x2="10" y2="20"/>
      <line x1="14" y1="12" x2="14" y2="20"/>
      <line x1="18" y1="12" x2="18" y2="20"/>
      <line x1="4" y1="20" x2="20" y2="20"/>
    </svg>
  ),
  wand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M12.2 11.8L11 13M12.2 6.2L11 5"/>
      <path d="M9 18l6-6-3-3-6 6 3 3z"/>
      <path d="M3 21l3-3"/>
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  ruler: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3a2.4 2.4 0 01 0 3.4l-2.6 2.6a2.4 2.4 0 01-3.4 0L2.7 8.7a2.4 2.4 0 010-3.4l2.6-2.6a2.4 2.4 0 013.4 0z"/>
      <path d="M14 9l-1 1M11 6l-1 1M8 3l-1 1M17 12l-1 1M20 15l-1 1"/>
    </svg>
  ),
  rooms: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  bathroom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6z"/>
      <path d="M6 12V6a2 2 0 012-2h1a1 1 0 011 1v1"/>
      <path d="M6 20v2"/>
      <path d="M18 20v2"/>
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v12M9 9h4.5a1.5 1.5 0 010 3H9h4.5a1.5 1.5 0 110 3H9"/>
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  cube3d: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
    </svg>
  ),
  gallery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  terrace: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/>
      <path d="M5 21V11"/>
      <path d="M19 21V11"/>
      <path d="M3 11h18"/>
      <path d="M12 11V7"/>
      <path d="M8 11V9"/>
      <path d="M16 11V9"/>
      <circle cx="12" cy="5" r="2"/>
    </svg>
  ),
  wardrobe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="12" y1="2" x2="12" y2="22"/>
      <circle cx="9" cy="12" r="1" fill="currentColor"/>
      <circle cx="15" cy="12" r="1" fill="currentColor"/>
    </svg>
  )
}

export function ConstructorPage() {
  // Основные параметры проекта
  const [_projectName] = useState('Мой проект')
  const [areaLength] = useState(10) // длина по осям (м)
  const [areaWidth] = useState(12) // ширина по осям (м)
  const [rooms, _setRooms] = useState(4)
  const [bathrooms, _setBathrooms] = useState(2)

  // Параметры дома
  const [isExterior, setIsExterior] = useState(true) // true = снаружи, false = внутри
  const [roofStyle, setRoofStyle] = useState<RoofStyle>('natural')
  const [wallMaterial, setWallMaterial] = useState<WallMaterial>('brick')
  const [facadeStyle, setFacadeStyle] = useState<FacadeStyle>('brick')
  const [hasGarage, setHasGarage] = useState(false)
  const [hasTerrace, setHasTerrace] = useState(true)
  const [isSummer, setIsSummer] = useState(true) // Сезонность: лето/зима
  const [isDay, setIsDay] = useState(true) // Время суток: день/ночь

  // Suppress unused warnings (these are for future functionality)
  void _projectName; void wallMaterial; void setWallMaterial; void hasGarage; void setHasGarage; void hasTerrace; void setHasTerrace

  // Галерея изображений проекта по комбинации фасад + кровля (ДЕНЬ)
  const houseImagesByConfigDay: Record<FacadeStyle, Record<RoofStyle, string[]>> = {
    brick: {
      natural: [
        '/houses/brick/natural/house_brick_roof1.jpg',
        '/houses/brick/natural/house_brick_roof2.jpg',
        '/houses/brick/natural/house_brick_roof3.jpg',
        '/houses/brick/natural/house_brick_roof4.jpg',
        '/houses/brick/natural/house_brick_roof5.jpg',
      ],
      soft: [
        '/houses/brick/soft/house_brick_soft1.jpg',
        '/houses/brick/soft/house_brick_soft2.jpg',
        '/houses/brick/soft/house_brick_soft3.jpg',
        '/houses/brick/soft/house_brick_soft4.jpg',
        '/houses/brick/soft/house_brick_soft5.jpg',
      ],
      flat: [
        '/houses/brick/flat/house_brick1.jpg',
        '/houses/brick/flat/house_brick2.jpg',
        '/houses/brick/flat/house_brick3.jpg',
        '/houses/brick/flat/house_brick4.jpg',
        '/houses/brick/flat/house_brick5.jpg',
      ],
    },
    combined: {
      natural: [
        '/houses/combined/natural/house_roof1.jpg',
        '/houses/combined/natural/house_roof2.jpg',
        '/houses/combined/natural/house_roof3.jpg',
        '/houses/combined/natural/house_roof4.jpg',
        '/houses/combined/natural/house_roof5.jpg',
      ],
      soft: [
        '/houses/combined/soft/house_combined_soft1.jpg',
        '/houses/combined/soft/house_combined_soft2.jpg',
        '/houses/combined/soft/house_combined_soft3.jpg',
        '/houses/combined/soft/house_combined_soft4.jpg',
        '/houses/combined/soft/house_combined_soft5.jpg',
      ],
      flat: [
        '/houses/combined/flat/house1.jpg',
        '/houses/combined/flat/house2.jpg',
        '/houses/combined/flat/house3.jpg',
        '/houses/combined/flat/house4.jpg',
        '/houses/combined/flat/house5.jpg',
      ],
    },
    ventilated: {
      natural: [
        '/houses/ventilated/natural/house_vent_roof1.jpg',
        '/houses/ventilated/natural/house_vent_roof2.jpg',
        '/houses/ventilated/natural/house_vent_roof3.jpg',
        '/houses/ventilated/natural/house_vent_roof4.jpg',
        '/houses/ventilated/natural/house_vent_roof5.jpg',
      ],
      soft: [
        '/houses/ventilated/soft/house_vent_soft1.jpg',
        '/houses/ventilated/soft/house_vent_soft2.jpg',
        '/houses/ventilated/soft/house_vent_soft3.jpg',
        '/houses/ventilated/soft/house_vent_soft4.jpg',
        '/houses/ventilated/soft/house_vent_soft5.jpg',
      ],
      flat: [
        '/houses/ventilated/flat/house_vent1.jpg',
        '/houses/ventilated/flat/house_vent2.jpg',
        '/houses/ventilated/flat/house_vent3.jpg',
        '/houses/ventilated/flat/house_vent4.jpg',
        '/houses/ventilated/flat/house_vent5.jpg',
      ],
    },
  }

  // Галерея изображений проекта по комбинации фасад + кровля (НОЧЬ)
  const houseImagesByConfigNight: Record<FacadeStyle, Record<RoofStyle, string[]>> = {
    brick: {
      natural: [
        '/houses/night/brick/natural/house_brick_roof_night1.jpg',
        '/houses/night/brick/natural/house_brick_roof_night2.jpg',
        '/houses/night/brick/natural/house_brick_roof_night3.jpg',
        '/houses/night/brick/natural/house_brick_roof_night4.jpg',
        '/houses/night/brick/natural/house_brick_roof_night5.jpg',
      ],
      soft: [
        '/houses/night/brick/soft/house_brick_soft_night1.jpg',
        '/houses/night/brick/soft/house_brick_soft_night2.jpg',
        '/houses/night/brick/soft/house_brick_soft_night3.jpg',
        '/houses/night/brick/soft/house_brick_soft_night4.jpg',
        '/houses/night/brick/soft/house_brick_soft_night5.jpg',
      ],
      flat: [
        '/houses/night/brick/flat/house_brick_night1.jpg',
        '/houses/night/brick/flat/house_brick_night2.jpg',
        '/houses/night/brick/flat/house_brick_night3.jpg',
        '/houses/night/brick/flat/house_brick_night4.jpg',
        '/houses/night/brick/flat/house_brick_night5.jpg',
      ],
    },
    combined: {
      natural: [
        '/houses/night/combined/natural/house_roof_night1.jpg',
        '/houses/night/combined/natural/house_roof_night2.jpg',
        '/houses/night/combined/natural/house_roof_night3.jpg',
        '/houses/night/combined/natural/house_roof_night4.jpg',
        '/houses/night/combined/natural/house_roof_night5.jpg',
      ],
      soft: [
        '/houses/night/combined/soft/house_combined_soft_night1.jpg',
        '/houses/night/combined/soft/house_combined_soft_night2.jpg',
        '/houses/night/combined/soft/house_combined_soft_night3.jpg',
        '/houses/night/combined/soft/house_combined_soft_night4.jpg',
        '/houses/night/combined/soft/house_combined_soft_night5.jpg',
      ],
      flat: [
        '/houses/night/combined/flat/house_combined_night1.jpg',
        '/houses/night/combined/flat/house_combined_night2.jpg',
        '/houses/night/combined/flat/house_combined_night3.jpg',
        '/houses/night/combined/flat/house_combined_night4.jpg',
        '/houses/night/combined/flat/house_combined_night5.jpg',
      ],
    },
    ventilated: {
      natural: [
        '/houses/night/ventilated/natural/house_vent_roof_night1.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night2.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night3.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night4.jpg',
        '/houses/night/ventilated/natural/house_vent_roof_night5.jpg',
      ],
      soft: [
        '/houses/night/ventilated/soft/house_vent_soft_night1.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night2.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night3.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night4.jpg',
        '/houses/night/ventilated/soft/house_vent_soft_night5.jpg',
      ],
      flat: [
        '/houses/night/ventilated/flat/house_vent_night1.jpg',
        '/houses/night/ventilated/flat/house_vent_night2.jpg',
        '/houses/night/ventilated/flat/house_vent_night3.jpg',
        '/houses/night/ventilated/flat/house_vent_night4.jpg',
        '/houses/night/ventilated/flat/house_vent_night5.jpg',
      ],
    },
  }

  // Галерея изображений проекта по комбинации фасад + кровля (ЗИМА)
  const houseImagesByConfigWinter: Record<FacadeStyle, Record<RoofStyle, string[]>> = {
    brick: {
      natural: [
        '/houses/winter/brick/natural/house_brick_roof_winter1.jpg',
        '/houses/winter/brick/natural/house_brick_roof_winter2.jpg',
        '/houses/winter/brick/natural/house_brick_roof_winter3.jpg',
        '/houses/winter/brick/natural/house_brick_roof_winter4.jpg',
        '/houses/winter/brick/natural/house_brick_roof_winter5.jpg',
      ],
      soft: [
        '/houses/winter/brick/soft/house_brick_soft_winter1.jpg',
        '/houses/winter/brick/soft/house_brick_soft_winter2.jpg',
        '/houses/winter/brick/soft/house_brick_soft_winter3.jpg',
        '/houses/winter/brick/soft/house_brick_soft_winter4.jpg',
        '/houses/winter/brick/soft/house_brick_soft_winter5.jpg',
      ],
      flat: [
        '/houses/winter/brick/flat/house_brick_winter1.jpg',
        '/houses/winter/brick/flat/house_brick_winter2.jpg',
        '/houses/winter/brick/flat/house_brick_winter3.jpg',
        '/houses/winter/brick/flat/house_brick_winter4.jpg',
        '/houses/winter/brick/flat/house_brick_winter5.jpg',
      ],
    },
    combined: {
      natural: [
        '/houses/winter/combined/natural/house_roof_winter1.jpg',
        '/houses/winter/combined/natural/house_roof_winter2.jpg',
        '/houses/winter/combined/natural/house_roof_winter3.jpg',
        '/houses/winter/combined/natural/house_roof_winter4.jpg',
        '/houses/winter/combined/natural/house_roof_winter5.jpg',
      ],
      soft: [
        '/houses/winter/combined/soft/house_combined_soft_winter1.jpg',
        '/houses/winter/combined/soft/house_combined_soft_winter2.jpg',
        '/houses/winter/combined/soft/house_combined_soft_winter3.jpg',
        '/houses/winter/combined/soft/house_combined_soft_winter4.jpg',
        '/houses/winter/combined/soft/house_combined_soft_winter5.jpg',
      ],
      flat: [
        '/houses/winter/combined/flat/house_winter1.jpg',
        '/houses/winter/combined/flat/house_winter2.jpg',
        '/houses/winter/combined/flat/house_winter3.jpg',
        '/houses/winter/combined/flat/house_winter4.jpg',
        '/houses/winter/combined/flat/house_winter5.jpg',
      ],
    },
    ventilated: {
      natural: [
        '/houses/winter/ventilated/natural/house_vent_roof_winter1.jpg',
        '/houses/winter/ventilated/natural/house_vent_roof_winter2.jpg',
        '/houses/winter/ventilated/natural/house_vent_roof_winter3.jpg',
        '/houses/winter/ventilated/natural/house_vent_roof_winter4.jpg',
        '/houses/winter/ventilated/natural/house_vent_roof_winter5.jpg',
      ],
      soft: [
        '/houses/winter/ventilated/soft/house_vent_soft_winter1.jpg',
        '/houses/winter/ventilated/soft/house_vent_soft_winter2.jpg',
        '/houses/winter/ventilated/soft/house_vent_soft_winter3.jpg',
        '/houses/winter/ventilated/soft/house_vent_soft_winter4.jpg',
        '/houses/winter/ventilated/soft/house_vent_soft_winter5.jpg',
      ],
      flat: [
        '/houses/winter/ventilated/flat/house_vent_winter1.jpg',
        '/houses/winter/ventilated/flat/house_vent_winter2.jpg',
        '/houses/winter/ventilated/flat/house_vent_winter3.jpg',
        '/houses/winter/ventilated/flat/house_vent_winter4.jpg',
        '/houses/winter/ventilated/flat/house_vent_winter5.jpg',
      ],
    },
  }

  // Интерьерные фото (одинаковые для всех фасадов)
  const interiorImages: Record<FacadeStyle, string[]> = {
    brick: [
      '/houses/interior/brick/1. Прихожая.jpg',
      '/houses/interior/brick/2.Гардероб.jpg',
      '/houses/interior/brick/3.Кухня-столовая.jpg',
      '/houses/interior/brick/4. Кухня.jpg',
      '/houses/interior/brick/5. Спальня.jpg',
      '/houses/interior/brick/6.Спальня.jpg',
      '/houses/interior/brick/7.Ванная.jpg',
      '/houses/interior/brick/8.Кладовая.jpg',
      '/houses/interior/brick/9.Сан.узел.jpg',
      '/houses/interior/brick/9.Терраса.jpg',
      '/houses/interior/brick/10. Терраса.jpg',
      '/houses/interior/brick/11.Крыльцо.jpg',
    ],
    combined: [
      '/houses/interior/combined/1. Прихожая.jpg',
      '/houses/interior/combined/2.Гардероб.jpg',
      '/houses/interior/combined/3.Кухня-столовая.jpg',
      '/houses/interior/combined/4. Кухня.jpg',
      '/houses/interior/combined/5. Спальня.jpg',
      '/houses/interior/combined/6.Спальня.jpg',
      '/houses/interior/combined/7.Ванная.jpg',
      '/houses/interior/combined/8.Кладовая.jpg',
      '/houses/interior/combined/9.Сан.узел.jpg',
      '/houses/interior/combined/9.Терраса.jpg',
      '/houses/interior/combined/10. Терраса.jpg',
      '/houses/interior/combined/11.Крыльцо.jpg',
    ],
    ventilated: [
      '/houses/interior/ventilated/1. Прихожая.jpg',
      '/houses/interior/ventilated/2.Гардероб.jpg',
      '/houses/interior/ventilated/3.Кухня-столовая.jpg',
      '/houses/interior/ventilated/4. Кухня.jpg',
      '/houses/interior/ventilated/5. Спальня.jpg',
      '/houses/interior/ventilated/6.Спальня.jpg',
      '/houses/interior/ventilated/7.Ванная.jpg',
      '/houses/interior/ventilated/8.Кладовая.jpg',
      '/houses/interior/ventilated/9.Сан.узел.jpg',
      '/houses/interior/ventilated/9.Терраса.jpg',
      '/houses/interior/ventilated/10. Терраса.jpg',
      '/houses/interior/ventilated/11.Крыльцо.jpg',
    ],
  }

  // Текущие изображения на основе выбранного фасада, кровли, сезона и времени суток
  const getHouseImages = () => {
    // Если выбран интерьер - возвращаем фото комнат
    if (!isExterior) {
      return interiorImages[facadeStyle]
    }
    // Экстерьер
    if (isSummer) {
      return isDay
        ? houseImagesByConfigDay[facadeStyle][roofStyle]
        : houseImagesByConfigNight[facadeStyle][roofStyle]
    } else {
      // Зима - пока только дневные фото, ночные используем летние
      return isDay
        ? houseImagesByConfigWinter[facadeStyle][roofStyle]
        : houseImagesByConfigNight[facadeStyle][roofStyle]
    }
  }
  const houseImages = getHouseImages()

  // Внешние URL для API анимации (Cloudinary - без сжатия, оригинальное качество)
  const houseImagesExternal: Record<string, string> = {
    // Комбинированный фасад
    '/houses/house1.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house1_qys0gs.jpg',
    '/houses/house2.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house2_lsg8yf.jpg',
    '/houses/house3.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house3_btut5t.jpg',
    '/houses/house4.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691540/house4_tigzup.jpg',
    '/houses/house5.jpg': 'https://res.cloudinary.com/dmuvp39ed/image/upload/v1769691541/house5_ow5onz.jpg',
    // TODO: добавить URL для кирпичного и вентилируемого фасадов
  }

  // Pre-generated local videos (from scripts/generate-animations.js)
  const houseVideos: Record<string, string | undefined> = {
    '/houses/house1.jpg': '/videos/house1.mp4',
    '/houses/house2.jpg': undefined,
    '/houses/house3.jpg': undefined,
    '/houses/house4.jpg': undefined,
    '/houses/house5.jpg': undefined,
  }

  // Видео для интерьерных фото (воспроизводятся при наведении)
  const interiorVideos: Record<string, string> = {
    '/houses/interior/brick/1. Прихожая.jpg': '/videos/rooms/1. Прихожая.mp4',
    '/houses/interior/brick/2.Гардероб.jpg': '/videos/rooms/2.Гардероб.mp4',
    '/houses/interior/brick/3.Кухня-столовая.jpg': '/videos/rooms/3.Кухня-столовая.mp4',
    '/houses/interior/brick/4. Кухня.jpg': '/videos/rooms/4. Кухня.mp4',
    '/houses/interior/brick/5. Спальня.jpg': '/videos/rooms/5. Спальня.mp4',
    '/houses/interior/brick/6.Спальня.jpg': '/videos/rooms/6.Спальня.mp4',
    '/houses/interior/brick/7.Ванная.jpg': '/videos/rooms/7.Ванная.mp4',
    '/houses/interior/brick/8.Кладовая.jpg': '/videos/rooms/8.Кладовая.mp4',
    '/houses/interior/brick/9.Сан.узел.jpg': '/videos/rooms/9.Сан.узел.mp4',
    '/houses/interior/brick/9.Терраса.jpg': '/videos/rooms/9.Терраса.mp4',
    '/houses/interior/brick/10. Терраса.jpg': '/videos/rooms/10. Терраса.mp4',
    '/houses/interior/brick/11.Крыльцо.jpg': '/videos/rooms/11.Крыльцо.mp4',
    '/houses/interior/combined/1. Прихожая.jpg': '/videos/rooms/1. Прихожая.mp4',
    '/houses/interior/combined/2.Гардероб.jpg': '/videos/rooms/2.Гардероб.mp4',
    '/houses/interior/combined/3.Кухня-столовая.jpg': '/videos/rooms/3.Кухня-столовая.mp4',
    '/houses/interior/combined/4. Кухня.jpg': '/videos/rooms/4. Кухня.mp4',
    '/houses/interior/combined/5. Спальня.jpg': '/videos/rooms/5. Спальня.mp4',
    '/houses/interior/combined/6.Спальня.jpg': '/videos/rooms/6.Спальня.mp4',
    '/houses/interior/combined/7.Ванная.jpg': '/videos/rooms/7.Ванная.mp4',
    '/houses/interior/combined/8.Кладовая.jpg': '/videos/rooms/8.Кладовая.mp4',
    '/houses/interior/combined/9.Сан.узел.jpg': '/videos/rooms/9.Сан.узел.mp4',
    '/houses/interior/combined/9.Терраса.jpg': '/videos/rooms/9.Терраса.mp4',
    '/houses/interior/combined/10. Терраса.jpg': '/videos/rooms/10. Терраса.mp4',
    '/houses/interior/combined/11.Крыльцо.jpg': '/videos/rooms/11.Крыльцо.mp4',
    '/houses/interior/ventilated/1. Прихожая.jpg': '/videos/rooms/1. Прихожая.mp4',
    '/houses/interior/ventilated/2.Гардероб.jpg': '/videos/rooms/2.Гардероб.mp4',
    '/houses/interior/ventilated/3.Кухня-столовая.jpg': '/videos/rooms/3.Кухня-столовая.mp4',
    '/houses/interior/ventilated/4. Кухня.jpg': '/videos/rooms/4. Кухня.mp4',
    '/houses/interior/ventilated/5. Спальня.jpg': '/videos/rooms/5. Спальня.mp4',
    '/houses/interior/ventilated/6.Спальня.jpg': '/videos/rooms/6.Спальня.mp4',
    '/houses/interior/ventilated/7.Ванная.jpg': '/videos/rooms/7.Ванная.mp4',
    '/houses/interior/ventilated/8.Кладовая.jpg': '/videos/rooms/8.Кладовая.mp4',
    '/houses/interior/ventilated/9.Сан.узел.jpg': '/videos/rooms/9.Сан.узел.mp4',
    '/houses/interior/ventilated/9.Терраса.jpg': '/videos/rooms/9.Терраса.mp4',
    '/houses/interior/ventilated/10. Терраса.jpg': '/videos/rooms/10. Терраса.mp4',
    '/houses/interior/ventilated/11.Крыльцо.jpg': '/videos/rooms/11.Крыльцо.mp4',
  }

  // Получить видео для текущего изображения
  const getCurrentVideo = (imagePath: string): string | undefined => {
    if (!isExterior) {
      return interiorVideos[imagePath]
    }
    return houseVideos[imagePath]
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [_activeTab, _setActiveTab] = useState('about')
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [_mobileMenuOpen, _setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const svgRef = useRef<HTMLObjectElement>(null)

  // Сброс индекса изображения при смене фасада, кровли или вида (снаружи/внутри)
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [facadeStyle, roofStyle, isExterior])

  // Функция подсветки комнаты на SVG
  const highlightRoom = (roomId: string, highlight: boolean) => {
    const svgObject = svgRef.current
    if (!svgObject?.contentDocument) return

    const room = svgObject.contentDocument.querySelector(`[data-room="${roomId}"]`)
    if (room) {
      ;(room as SVGRectElement).style.fill = highlight
        ? (darkMode ? 'rgba(0, 255, 255, 0.25)' : 'rgba(46, 90, 60, 0.2)')
        : 'transparent'
    }
  }

  // Обработка кликов на комнаты в SVG
  useEffect(() => {
    const svgObject = svgRef.current
    if (!svgObject) return

    const handleLoad = () => {
      const svgDoc = svgObject.contentDocument
      if (!svgDoc) return

      const clickableRooms = svgDoc.querySelectorAll('.room-clickable')
      clickableRooms.forEach((room) => {
        const roomId = room.getAttribute('data-room')

        room.addEventListener('click', (e: Event) => {
          e.stopPropagation()
          if (roomId) setSelectedRoom(roomId)
        })

        room.addEventListener('mouseenter', () => {
          ;(room as SVGRectElement).style.fill = darkMode
            ? 'rgba(0, 255, 255, 0.25)'
            : 'rgba(46, 90, 60, 0.2)'
        })

        room.addEventListener('mouseleave', () => {
          ;(room as SVGRectElement).style.fill = 'transparent'
        })
      })
    }

    svgObject.addEventListener('load', handleLoad)
    // Если уже загружен
    if (svgObject.contentDocument) handleLoad()

    return () => svgObject.removeEventListener('load', handleLoad)
  }, [darkMode])

  // Данные комнат для планировки согласно plan.pdf
  // Позиции в процентах относительно изображения плана (viewBox: 230 175 680 480)
  const floorPlanRooms = [
    // Верхний ряд (слева направо)
    { id: 'boiler', name: 'Котельная', area: 6.92, description: 'Техническое помещение', features: ['Газовый котёл', 'Бойлер', 'Вентиляция'], image: '/rooms/boiler.jpg' },
    { id: 'bedroom-parents', name: 'Спальня', area: 13.83, description: 'Спальня родителей', features: ['Большое окно', 'Гардеробная зона'], image: '/rooms/5. Спальня.jpg' },

    // Второй ряд
    { id: 'wardrobe', name: 'Гардероб', area: 9.12, description: 'Вместительный гардероб', features: ['Системы хранения', 'Освещение', 'Зеркало'], image: '/rooms/2.Гардероб.jpg' },
    { id: 'bathroom-small', name: 'С/У', area: 6.08, description: 'Гостевой санузел', features: ['Унитаз', 'Раковина', 'Зеркало'], image: '/rooms/9.Сан.узел.jpg' },
    { id: 'kitchen', name: 'Кухня', area: 11.88, description: 'Функциональная кухня', features: ['Современная техника', 'Рабочая зона', 'Кухонный остров'], image: '/rooms/4. Кухня.jpg' },
    { id: 'storage', name: 'Кладовая', area: 6.08, description: 'Кладовая для хранения', features: ['Стеллажи', 'Вентиляция'], image: '/rooms/8.Кладовая.jpg' },

    // Средний ряд
    { id: 'porch', name: 'Крыльцо', area: 8.07, description: 'Входная группа', features: ['Навес', 'Освещение'], image: '/rooms/11.Крыльцо.jpg' },
    { id: 'hallway', name: 'Прихожая', area: 10.87, description: 'Просторная прихожая', features: ['Встроенные шкафы', 'Зеркало', 'Банкетка'], image: '/rooms/1. Прихожая.jpg' },
    { id: 'living-room', name: 'Кухня-гостиная', area: 43.60, description: 'Просторная кухня-гостиная - сердце дома', features: ['Открытая планировка', 'Зона отдыха', 'Обеденная зона', 'Выход на террасу'], image: '/rooms/3.Кухня-столовая.jpg' },
    { id: 'corridor', name: 'Коридор', area: 4.63, description: 'Коридор', features: ['Освещение'], image: '/rooms/1. Прихожая.jpg' },
    { id: 'bathroom-large', name: 'С/У', area: 8.47, description: 'Основной санузел', features: ['Ванна', 'Душевая', 'Раковина', 'Тёплый пол'], image: '/rooms/7.Ванная.jpg' },

    // Нижний ряд
    { id: 'bedroom-left', name: 'Спальня', area: 16.72, description: 'Главная спальня', features: ['Большое окно', 'Гардеробная зона', 'Выход на террасу'], image: '/rooms/5. Спальня.jpg' },
    { id: 'terrace', name: 'Терраса', area: 26.27, description: 'Просторная терраса для отдыха', features: ['Зона барбекю', 'Мебель для отдыха', 'Освещение'], image: '/rooms/10. Терраса.jpg' },
    { id: 'bedroom-right', name: 'Спальня', area: 16.72, description: 'Вторая спальня', features: ['Большое окно', 'Рабочая зона'], image: '/rooms/6.Спальня.jpg' },
  ]

  
  // Вычисляемые значения
  const totalArea = areaLength * areaWidth * 2 // 2 этажа по умолчанию
  const pricePerSqm = wallMaterial === 'brick' ? 85000 : 65000 // руб/м²
  const estimatedCost = totalArea * pricePerSqm

  // Навигация по слайдеру
  const goToPrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? houseImages.length - 1 : prev - 1)
  }

  const goToNextImage = () => {
    setCurrentImageIndex(prev => prev === houseImages.length - 1 ? 0 : prev + 1)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const _roofLabels: Record<RoofStyle, { label: string }> = {
    natural: { label: 'Натуральная черепица' },
    soft: { label: 'Мягкая черепица' },
    flat: { label: 'Плоская кровля' }
  }

  const materialLabels: Record<WallMaterial, { label: string; color: string }> = {
    brick: { label: 'Кирпич', color: '#c84c32' },
    gasblock: { label: 'Газобетон', color: '#a8a8a8' }
  }

  const _facadeLabels: Record<FacadeStyle, { label: string; desc: string }> = {
    brick: { label: 'Кирпичный', desc: 'Классический кирпичный фасад' },
    combined: { label: 'Комбинированный', desc: 'С отделкой под дерево' },
    ventilated: { label: 'Вентилируемый', desc: 'Вентилируемый фасад' }
  }

  // Suppress unused warnings (these are for future functionality)
  void _roofLabels; void _facadeLabels; void _activeTab; void _setActiveTab; void _mobileMenuOpen; void _setMobileMenuOpen; void _setRooms; void _setBathrooms

  const _navTabs = [
    { id: 'about', label: 'О проекте' },
    { id: 'gallery', label: 'Галерея' },
    { id: 'plans', label: 'Планировки' },
    { id: 'config', label: 'Комплектация' },
    { id: 'video', label: 'Видео' },
  ]
  void _navTabs

  return (
    <div className={`premium-constructor ${darkMode ? 'dark-theme' : ''}`}>
      {/* Clean Navigation Header */}
      <header className="clean-header">
        <div className="clean-header-top">
          <Link to="/" className="clean-logo">
            <span className="logo-icon">{Icons.house}</span>
            <span className="logo-text">Родные Края</span>
          </Link>

          {/* Theme Toggle */}
          <button
            className={`theme-toggle-btn ${darkMode ? 'dark' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Переключить тему"
          >
            <div className="theme-toggle-track">
              <span className="theme-icon sun">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              </span>
              <span className="theme-icon moon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              </span>
              <div className="theme-toggle-thumb"></div>
            </div>
          </button>

        </div>
      </header>

      <div className="premium-layout">
        {/* Preview Section */}
        <div className="preview-section">
          {/* Variant 3 Slider */}
          <div className="slider-wrapper">
            <div className="slider-container">
              <AnimatedImage
                key={currentImageIndex}
                src={houseImages[currentImageIndex]}
                externalSrc={houseImagesExternal[houseImages[currentImageIndex]]}
                localVideo={getCurrentVideo(houseImages[currentImageIndex])}
                alt="Ваш дом"
                className="slider-main-image"
                enableAnimation={true}
              />

              {/* Navigation Buttons */}
              <button className="nav-btn nav-prev" onClick={goToPrevImage}>
                {Icons.chevronLeft}
              </button>
              <button className="nav-btn nav-next" onClick={goToNextImage}>
                {Icons.chevronRight}
              </button>

              {/* Fullscreen Button */}
              <button className="fullscreen-btn-v3" onClick={() => setIsFullscreen(true)} title="Полноэкранный просмотр">
                {Icons.expand}
              </button>
            </div>

            {/* Thumbnails Strip */}
            <div className="thumbnails-strip">
              {houseImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-v3 ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => selectImage(idx)}
                >
                  <img src={img} alt={`Фото ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Info Column - Card + Buttons */}
        <div className="info-column">
          {/* Project Info Section */}
          <div className="project-info-section">
            {/* Left Column - Specs */}
            <div className="info-specs">
              {/* Area + Material Row */}
              <div className="spec-row-double">
                <div className="spec-block">
                  <span className="spec-label">Площадь по осям</span>
                  <span className="spec-value-large">{totalArea} м<sup>2</sup></span>
                </div>
                <div className="spec-block">
                  <span className="spec-label">Материал стен</span>
                  <span className="spec-value-medium">{materialLabels[wallMaterial].label}</span>
                </div>
              </div>

              {/* Параметры настройки */}
              <div className="config-params">
                {/* Фасад */}
                <div className="config-row">
                  <span className="config-label">Фасад</span>
                  <div className="custom-select-wrapper">
                    <select
                      className="custom-select"
                      value={facadeStyle}
                      onChange={(e) => setFacadeStyle(e.target.value as FacadeStyle)}
                    >
                      <option value="brick">Кирпичный</option>
                      <option value="combined">Комбинированный</option>
                      <option value="ventilated">Вентилируемый</option>
                    </select>
                    <span className="select-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Кровля */}
                <div className="config-row">
                  <span className="config-label">Кровля</span>
                  <div className="custom-select-wrapper">
                    <select
                      className="custom-select"
                      value={roofStyle}
                      onChange={(e) => setRoofStyle(e.target.value as RoofStyle)}
                    >
                      <option value="natural">Натуральная черепица</option>
                      <option value="soft">Мягкая черепица</option>
                      <option value="flat">Плоская кровля</option>
                    </select>
                    <span className="select-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Снаружи/Внутри */}
                <div className="config-toggle-row" onClick={() => setIsExterior(!isExterior)}>
                  <div className="toggle-info">
                    <span className="toggle-icon-box">
                      {isExterior ? (
                        <svg viewBox="0 0 256 256" fill="currentColor">
                          <path d="M239.98828,210h-18V115.53882a14.03222,14.03222,0,0,0-4.582-10.35889L137.40039,32.44458a13.94491,13.94491,0,0,0-18.83594.001L38.57031,105.17969a14.02742,14.02742,0,0,0-4.582,10.35888V210h-18a6,6,0,0,0,0,12h224a6,6,0,1,0,0-12Zm-194-94.46143a2.00429,2.00429,0,0,1,.6543-1.48l79.99414-72.73437a1.99291,1.99291,0,0,1,2.6914-.00049L209.333,114.05786a2.00817,2.00817,0,0,1,.65527,1.481V210H157.98242V151.9917a6.00014,6.00014,0,0,0-6-6h-48a6.00015,6.00015,0,0,0-6,6V210H45.98828ZM145.98242,210h-36V157.9917h36Z"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 32 32" fill="currentColor">
                          <path d="M23,30H21V28a3.0033,3.0033,0,0,0-3-3H14a3.0033,3.0033,0,0,0-3,3v2H9V28a5.0059,5.0059,0,0,1,5-5h4a5.0059,5.0059,0,0,1,5,5Z"/>
                          <path d="M16,13a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,16,11Z"/>
                          <path d="M30,30H28V14.4639L16,4.31,4,14.4639V30H2V14a1,1,0,0,1,.354-.7634l13-11a1,1,0,0,1,1.292,0l13,11A1,1,0,0,1,30,14Z"/>
                        </svg>
                      )}
                    </span>
                    <span className="toggle-label">{isExterior ? 'Снаружи' : 'Внутри'}</span>
                  </div>
                  <div className="toggle-right">
                    <div className={`custom-toggle ${isExterior ? 'active' : ''}`}>
                      <div className="toggle-track-inner"></div>
                      <div className="toggle-thumb-inner"></div>
                    </div>
                  </div>
                </div>

                {/* Сезон */}
                <div className="config-toggle-row" onClick={() => setIsSummer(!isSummer)}>
                  <div className="toggle-info">
                    <span className="toggle-icon-box">
                      {isSummer ? (
                        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M27,31c-2.9-3.6-7.4-6-12.5-6S4.9,27.4,2,31H27z"/>
                          <path d="M8.6,12v1H17c-1.6-2.4-4.2-4-7-4s-5.4,1.6-7,4h3.6L8.6,12z"/>
                          <path d="M10.9,5.5l-0.7,0.8l6.2,5.7C17,9,16.2,6,14.1,4.1S9,1.7,6.1,2.5l2.6,2.4L10.9,5.5z"/>
                          <path d="M21.6,9.5l0.5,0.9l7.5-3.8c-2.6-1.4-5.5-1.7-8.1-0.4s-4.1,3.8-4.4,6.7l3.2-1.6L21.6,9.5z"/>
                          <path d="M16,13L16,13c1.3,3.8,0.7,7.9-1.5,11.3L14,25"/>
                          <path d="M18,13l0.9,1.5c2,3.5,2.4,7.7,1.1,11.5l0,0"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11.9033,54.5322a1,1,0,0,1-1-1V39.7583a1,1,0,0,1,2,0V53.5322A1,1,0,0,1,11.9033,54.5322Z"/>
                          <path d="M16.6973,52.5469a.9969.9969,0,0,1-.7071-.293l-9.7392-9.74A1,1,0,0,1,7.665,41.1l9.7393,9.74a1,1,0,0,1-.707,1.7071Z"/>
                          <path d="M18.6836,47.7524H4.9092a1,1,0,0,1,0-2H18.6836a1,1,0,1,1,0,2Z"/>
                          <path d="M6.958,52.6982a1,1,0,0,1-.707-1.707l9.7392-9.74a1,1,0,1,1,1.4141,1.414l-9.7393,9.74A.9966.9966,0,0,1,6.958,52.6982Z"/>
                          <path d="M34.6416,63a1,1,0,0,1-1-1V48.2261a1,1,0,0,1,2,0V62A1,1,0,0,1,34.6416,63Z"/>
                          <path d="M39.4355,61.0142a.9969.9969,0,0,1-.707-.293l-9.7392-9.74a1,1,0,0,1,1.414-1.414l9.7393,9.74a1,1,0,0,1-.7071,1.7071Z"/>
                          <path d="M41.4219,56.22H27.6475a1,1,0,0,1,0-2H41.4219a1,1,0,0,1,0,2Z"/>
                          <path d="M29.6963,61.166a1,1,0,0,1-.707-1.707l9.7392-9.74a1,1,0,1,1,1.4141,1.4141l-9.7393,9.74A.9964.9964,0,0,1,29.6963,61.166Z"/>
                          <path d="M54.0283,55.356a1,1,0,0,1-1-1V40.582a1,1,0,1,1,2,0V54.356A1,1,0,0,1,54.0283,55.356Z"/>
                          <path d="M58.8223,53.37a.9965.9965,0,0,1-.7071-.293l-9.74-9.74a1,1,0,1,1,1.4141-1.4141l9.74,9.74a1,1,0,0,1-.707,1.707Z"/>
                          <path d="M60.8076,48.5762H47.0342a1,1,0,0,1,0-2H60.8076a1,1,0,1,1,0,2Z"/>
                          <path d="M49.082,53.522a1,1,0,0,1-.707-1.7071l9.74-9.74a1,1,0,0,1,1.4141,1.4141l-9.74,9.74A.9969.9969,0,0,1,49.082,53.522Z"/>
                          <path d="M48.1738,36.2144H13.1289a10.9366,10.9366,0,0,1-.123-21.8726A10.9167,10.9167,0,0,1,27.4434,8.5957a13.8994,13.8994,0,0,1,26.2871,6.3032c0,.3057-.0117.6192-.0362.9473a10.9306,10.9306,0,0,1-5.52,20.3682ZM13.1289,16.3413a8.9366,8.9366,0,0,0,0,17.8731H48.1738a8.9307,8.9307,0,0,0,4.0108-16.9131,1.0011,1.0011,0,0,1-.543-1.01,11.8953,11.8953,0,0,0-22.7988-5.958.9995.9995,0,0,1-1.4121.4878,8.9191,8.9191,0,0,0-12.8037,4.875,1.0077,1.0077,0,0,1-1.001.6719l-.1748-.0113C13.3438,16.3491,13.2373,16.3413,13.1289,16.3413Z"/>
                        </svg>
                      )}
                    </span>
                    <span className="toggle-label">{isSummer ? 'Лето' : 'Зима'}</span>
                  </div>
                  <div className="toggle-right">
                    <div className={`custom-toggle ${isSummer ? 'active' : ''}`}>
                      <div className="toggle-track-inner"></div>
                      <div className="toggle-thumb-inner"></div>
                    </div>
                  </div>
                </div>

                {/* Время суток */}
                <div className="config-toggle-row" onClick={() => setIsDay(!isDay)}>
                  <div className="toggle-info">
                    <span className="toggle-icon-box">
                      {isDay ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="5"/>
                          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                        </svg>
                      )}
                    </span>
                    <span className="toggle-label">{isDay ? 'День' : 'Ночь'}</span>
                  </div>
                  <div className="toggle-right">
                    <div className={`custom-toggle ${isDay ? 'active' : ''}`}>
                      <div className="toggle-track-inner"></div>
                      <div className="toggle-thumb-inner"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Icons Row */}
              <div className="spec-icons-row">
                <div className="spec-icon-item">
                  <span className="spec-icon-value">{rooms}</span>
                  <span className="spec-icon-img">{Icons.rooms}</span>
                  <span className="spec-icon-label">Комнат</span>
                </div>
                <div className="spec-icon-item">
                  <span className="spec-icon-value">{bathrooms}</span>
                  <span className="spec-icon-img">{Icons.bathroom}</span>
                  <span className="spec-icon-label">Санузла</span>
                </div>
                <div className="spec-icon-item">
                  <span className="spec-icon-value">1</span>
                  <span className="spec-icon-img">{Icons.terrace}</span>
                  <span className="spec-icon-label">Терраса</span>
                </div>
                <div className="spec-icon-item">
                  <span className="spec-icon-value">1</span>
                  <span className="spec-icon-img">{Icons.wardrobe}</span>
                  <span className="spec-icon-label">Гардеробная</span>
                </div>
              </div>
            </div>

            {/* Right Column - Price */}
            <div className="info-price">
              <div className="price-header">
                <span className="price-label">Цена</span>
              </div>
              <div className="price-current">
                <span className="price-value">{(estimatedCost / 1000000).toFixed(2)} млн ₽</span>
              </div>
            </div>

          </div>

          {/* CTA Buttons - Outside card */}
          <div className="cta-buttons-section">
            <button className="cta-minimal telegram">
              <span className="cta-icon">{Icons.telegram}</span>
              <span className="cta-text">Презентация в Telegram</span>
              <span className="cta-line"></span>
            </button>
            <button className="cta-minimal email">
              <span className="cta-icon">{Icons.email}</span>
              <span className="cta-text">Презентация на почту</span>
              <span className="cta-line"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Floor Plan Section */}
      <div className="floor-plan-section">
        <div className="floor-plan-header" style={{ justifyContent: 'center' }}>
          <h2>Планировка</h2>
        </div>
        <div className="floor-plan-container">
          <div className="floor-plan-wrapper">
            {/* Floor Plan SVG with Clickable Areas */}
            <div className="floor-plan-image-container">
              <object
                ref={svgRef}
                data="/floor-plan.svg"
                type="image/svg+xml"
                className="floor-plan-image"
                aria-label="План этажа"
              />
            </div>

            {/* Floor indicator */}
            <div className="floor-indicator">
              <span className="floor-label">1 этаж</span>
              <span className="floor-total-area">189.05 м²</span>
            </div>
          </div>

          {/* Room List */}
          <div className="room-list">
            <h3>Помещения</h3>
            {floorPlanRooms.map(room => (
              <button
                key={room.id}
                className={`room-list-item ${selectedRoom === room.id ? 'active' : ''}`}
                onClick={() => setSelectedRoom(room.id)}
                onMouseEnter={() => highlightRoom(room.id, true)}
                onMouseLeave={() => highlightRoom(room.id, false)}
              >
                <span className="room-list-name">{room.name}</span>
                <span className="room-list-area">{room.area} м²</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Material Options Section */}
      <div className="material-options-section">
        <h2 className="material-options-title">Выберите технологию строительства</h2>
        <div className="material-options-grid">
          {/* Каркасный дом */}
          <div className="material-card">
            <h3 className="material-card-title">Каркасный дом</h3>
            <p className="material-card-description">
              Уютный каркасный дом, готовый для постоянного проживания. В доме будет тепло зимой и комфортно летом. В доме уже есть внешняя и внутренняя отделка.
            </p>
            <div className="material-card-price">от 5.6 ₽ млн</div>
            <button className="material-card-btn">Получить Смету</button>
            <ul className="material-card-features">
              <li>Фундамент - Железобетонные сваи</li>
              <li>Каркас - строганая доска камерной сушки</li>
              <li>Перекрестное утепление 200мм</li>
              <li>Влаговетрозащитные пленки</li>
              <li>Внутренняя отделка</li>
              <li>Внешняя отделка - Имитация бруса</li>
            </ul>
            <ul className="material-card-excluded">
              <li>Геология</li>
              <li>Монолитная плита</li>
            </ul>
          </div>

          {/* Газобетонный дом */}
          <div className="material-card">
            <h3 className="material-card-title">Газобетонный дом</h3>
            <p className="material-card-description">
              Стены толщиной 400мм не нуждаются в дополнительном утеплении. Теплый контур уже готов к внешней и внутренней отделке.
            </p>
            <div className="material-card-price">от 4.96 ₽ млн</div>
            <button className="material-card-btn">Получить Смету</button>
            <ul className="material-card-features">
              <li>Геология</li>
              <li>Фундамент - монолитная плита</li>
              <li>Закладные под инженерные системы</li>
              <li>Наружные стены - блоки Bonolit 400 мм</li>
              <li>Внутренние стены - блоки Bonolit 250 мм</li>
              <li>Перегородки - блоки Bonolit 100 мм</li>
            </ul>
            <ul className="material-card-excluded">
              <li>Внутренняя отделка</li>
              <li>Внешняя отделка</li>
            </ul>
          </div>

          {/* Керамический дом */}
          <div className="material-card">
            <h3 className="material-card-title">Керамический дом</h3>
            <p className="material-card-description">
              Блоки Porotherm Thermo 380мм подходят для круглогодичного проживания. Уникальная технология обладает повышенными теплотехническими характеристиками.
            </p>
            <div className="material-card-price">от 5.06 ₽ млн</div>
            <button className="material-card-btn">Получить Смету</button>
            <ul className="material-card-features">
              <li>Геология</li>
              <li>Фундамент - монолитная плита</li>
              <li>Закладные под инженерные системы</li>
              <li>Наружные стены - блоки Porotherm Thermo 38</li>
              <li>Внутренние стены - блоки Porotherm 250 мм</li>
              <li>Перегородки - блоки Porotherm Thermo 120/80 мм</li>
            </ul>
            <ul className="material-card-excluded">
              <li>Внутренняя отделка</li>
              <li>Внешняя отделка</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What's Included & Payment Terms Section - ВРЕМЕННО СКРЫТО
      <div className="included-payment-section">
        <div className="included-payment-grid">
          <div className="included-card">
            <h3 className="included-card-title">Что входит в стоимость</h3>
            <div className="included-card-content">
              <div className="included-group">
                <h4 className="included-group-title">Проектирование</h4>
                <ul className="included-list">
                  <li>Архитектурный проект</li>
                  <li>Конструктивный раздел</li>
                  <li>Инженерные разделы (ВК, ОВ, ЭО)</li>
                  <li>3D-визуализация экстерьера</li>
                </ul>
              </div>
              <div className="included-group">
                <h4 className="included-group-title">Строительство</h4>
                <ul className="included-list">
                  <li>Фундамент под ключ</li>
                  <li>Возведение стен и перегородок</li>
                  <li>Кровельные работы</li>
                  <li>Установка окон и дверей</li>
                  <li>Фасадная отделка</li>
                </ul>
              </div>
              <div className="included-group">
                <h4 className="included-group-title">Инженерия</h4>
                <ul className="included-list">
                  <li>Электромонтажные работы</li>
                  <li>Водоснабжение и канализация</li>
                  <li>Система отопления</li>
                  <li>Вентиляция</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="payment-card">
            <h3 className="payment-card-title">Условия оплаты</h3>
            <div className="payment-stages">
              <div className="payment-stage">
                <div className="payment-stage-number">1</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">10%</span>
                  <span className="payment-stage-desc">Предоплата при заключении договора</span>
                </div>
              </div>
              <div className="payment-stage">
                <div className="payment-stage-number">2</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">25%</span>
                  <span className="payment-stage-desc">После завершения фундамента</span>
                </div>
              </div>
              <div className="payment-stage">
                <div className="payment-stage-number">3</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">30%</span>
                  <span className="payment-stage-desc">После возведения стен и кровли</span>
                </div>
              </div>
              <div className="payment-stage">
                <div className="payment-stage-number">4</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">25%</span>
                  <span className="payment-stage-desc">После завершения инженерных работ</span>
                </div>
              </div>
              <div className="payment-stage">
                <div className="payment-stage-number">5</div>
                <div className="payment-stage-content">
                  <span className="payment-stage-percent">10%</span>
                  <span className="payment-stage-desc">При сдаче объекта</span>
                </div>
              </div>
            </div>
            <div className="payment-note">
              <span className="payment-note-icon">💡</span>
              <p>Возможна оплата в рассрочку до 12 месяцев без переплат. Также работаем с ипотекой и материнским капиталом.</p>
            </div>
          </div>
        </div>
      </div>
      */}

      {/* Room Detail Modal - Split Screen */}
      {selectedRoom && (
        <div className="room-modal-overlay-v2" onClick={() => setSelectedRoom(null)}>
          <div className="room-modal-v2" onClick={e => e.stopPropagation()}>
            {(() => {
              const room = floorPlanRooms.find(r => r.id === selectedRoom)
              if (!room) return null
              return (
                <>
                  <div className="room-modal-v2-left">
                    <img src={room.image} alt={room.name} />
                  </div>
                  <div className="room-modal-v2-right">
                    <button className="room-modal-close-v2" onClick={() => setSelectedRoom(null)}>
                      {Icons.close}
                    </button>
                    <div className="room-modal-v2-content">
                      <span className="room-modal-v2-label">Помещение</span>
                      <h2>{room.name}</h2>
                      <div className="room-modal-v2-area">
                        <span className="area-number">{room.area}</span>
                        <span className="area-unit">м²</span>
                      </div>
                      <p className="room-modal-v2-description">{room.description}</p>
                      <div className="room-modal-v2-features">
                        <h4>Особенности</h4>
                        <ul>
                          {room.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fullscreen-modal" onClick={() => setIsFullscreen(false)}>
          <div className="fullscreen-content" onClick={e => e.stopPropagation()}>
            <img src={houseImages[currentImageIndex]} alt="Ваш дом" className="fullscreen-image" />

            {/* Fullscreen Navigation */}
            <button className="fullscreen-nav fullscreen-prev" onClick={goToPrevImage}>
              {Icons.chevronLeft}
            </button>
            <button className="fullscreen-nav fullscreen-next" onClick={goToNextImage}>
              {Icons.chevronRight}
            </button>

            {/* Fullscreen Controls */}
            <div className="fullscreen-controls">
              <span className="fullscreen-counter">
                {currentImageIndex + 1} / {houseImages.length}
              </span>
              <button className="fullscreen-btn" onClick={() => setIsFullscreen(false)} title="Закрыть">
                {Icons.close}
              </button>
            </div>

            {/* Fullscreen Thumbnails */}
            <div className="fullscreen-thumbs">
              {houseImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`fullscreen-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => selectImage(idx)}
                >
                  <img src={img} alt={`Фото ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
