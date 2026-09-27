import React, { useMemo } from 'react';
import './_background-grid.scss';

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP GRID — canvas 1738 × 1131 px
// Column widths derived from vertical line positions in Figma SVG:
// Lines at: 0, 62, 103, 141, 181, 221, 260, 301, 340, 379, 435, 475, 514, 553,
//           594, 633, 687, 726, 768, 825, 864, 903, 957, 997, 1038, 1086, 1127,
//           1164, 1232, 1271, 1319, 1361, 1398, 1446, 1494, 1535, 1575, 1615,
//           1663, 1703, 1738
// ─────────────────────────────────────────────────────────────────────────────
const DCOLS = [
  //  1   2   3   4   5   6   7   8   9  10
  62, 41, 38, 40, 40, 39, 41, 39, 39, 56,
  // 11  12  13  14  15  16  17  18  19  20
  40, 39, 39, 41, 39, 54, 39, 42, 57, 39,
  // 21  22  23  24  25  26  27  28  29  30
  39, 54, 40, 41, 48, 41, 37, 68, 39, 48,
  // 31  32  33  34  35  36  37  38  39  40
  42, 37, 48, 48, 41, 40, 40, 48, 40, 35,
];

// Row heights derived from horizontal line positions in Figma SVG:
// Lines at: 0, 49, 91, 137, 183, 229, 269, 317, 363, 410, 451, 496, 543, 587,
//           628, 674, 717, 761, 803, 846, 896, 930, 974, 1023, 1057, 1084, 1131
const DROWS = [
  //  1   2   3   4   5   6   7   8   9  10
  49, 42, 46, 46, 46, 40, 48, 46, 47, 41,
  // 11  12  13  14  15  16  17  18  19  20
  45, 47, 44, 41, 46, 43, 44, 42, 43, 50,
  // 21  22  23  24  25  26
  34, 44, 49, 34, 27, 47,
];

// Desktop black blocks: [colStart, colEnd, rowStart, rowEnd] (CSS grid line numbers, 1-indexed)
// Mapped from exact Figma SVG path data e.g. M594 719H633V761H594Z → col 15/16 row 17/18
const DESKTOP_BLOCKS = [
  [15, 16, 17, 18], // M594 719H633V761H594Z
  [2, 3, 12, 13], // M62 496H102V543H62Z
  [3, 4, 3, 4], // M101 92H141V137H101Z
  [17, 18, 2, 3], // M687 50H729V91H687Z
  [28, 29, 4, 5], // M1164 138H1232V183H1164Z  ← wide block
  [3, 4, 21, 22], // M103 896H141V930H103Z
  [1, 2, 17, 18], // M7 719H63V760H7Z
  [10, 11, 13, 14], // M379 545H435V586H379Z
  [6, 7, 8, 9], // M260 319H300V363H260Z
  [13, 14, 6, 7], // M516 230H558V270H516Z
  [19, 20, 22, 23], // M768 931H824V975H768Z
  [23, 24, 19, 20], // M959 802H999V847H959Z
  [29, 30, 18, 19], // M1232 762H1271V802H1232Z
  [22, 23, 15, 16], // M903 629H959V672H903Z
  [25, 26, 10, 11], // M1038 410H1086V452H1038Z
  [32, 33, 14, 15], // M1361 588H1398V627H1361Z
  [23, 24, 3, 4], // M957 92H999V137H957Z
  [7, 8, 22, 23], // M300 931H340V975H300Z
  [5, 6, 19, 20], // M179 804H221V847H179Z
  [8, 9, 2, 3], // M300 52H340V92H300Z
  [27, 28, 21, 22], // M1127 897H1164V930H1127Z
  [33, 34, 19, 20], // M1400 804H1446V847H1400Z
  [30, 31, 8, 9], // M1270 318H1319V363H1270Z
  [32, 33, 5, 6], // M1361 186H1398V231H1361Z
  [30, 31, 23, 24], // M1270 975H1319V1024H1270Z
  [2, 3, 5, 6], // M181 183H221V231H181Z
  [13, 14, 20, 21], // M514 847H552V893H514Z
  [16, 17, 7, 8], // M825 275H864V317H825Z
  [4, 5, 10, 11], // M139 411H181V452H139Z
  [11, 12, 15, 16], // M435 626H475V672H435Z
  [14, 15, 3, 4], // M563 94H600V137H563Z
  [12, 13, 9, 10], // M473 365H514V411H473Z
  [18, 19, 19, 20], // M726 805H768V847H726Z
  [36, 37, 5, 6], // M997 184H1038V231H997Z
  [26, 27, 16, 17], // M1086 675H1127V718H1086Z
  [31, 32, 12, 13], // M1319 497H1359V543H1319Z
  [2, 3, 24, 25], // M63 1020H103V1057H63Z
  [9, 10, 25, 26], // M339 1058H385V1085H339Z
  [6, 7, 26, 27], // M224 1083H260V1117H224Z
  [25, 26, 24, 25], // M1038 1024H1086V1058H1038Z
  [34, 35, 26, 27], // M1446 1085H1495V1117H1446Z
  [35, 36, 2, 3], // M1494 51H1535V92H1494Z
  [36, 37, 11, 12], // M1535 451H1575V497H1535Z
  [37, 38, 17, 18], // M1575 718H1618V762H1575Z
  [38, 39, 22, 23], // M1616 930H1664V975H1616Z
  [40, 41, 25, 26], // M1706 1058H1734V1084H1706Z
  [39, 40, 3, 4], // M1663 92H1704V137H1663Z
  [27, 28, 1, 2], // M1127 0H1165V51H1127Z  ← top block
];

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE GRID — canvas 730 × 1600 px
// 16 uniform columns (45px each) × 36 uniform rows (44px each)
// ─────────────────────────────────────────────────────────────────────────────
const MCOLS = Array(16).fill(45);
const MROWS = Array(36).fill(44);

// Mobile blocks: [colStart, colEnd, rowStart, rowEnd]
// Mapped from provided mobile design screenshot
const MOBILE_BLOCKS = [
  [5, 6, 1, 2], // row 1  mid
  [2, 3, 2, 3], // row 2  left
  [11, 12, 3, 4], // row  3 left
  [13, 14, 5, 6], // row 5  right
  [10, 11, 7, 8], // row 7  center-right
  [6, 7, 8, 9], // row 8  left
  [15, 16, 10, 11], // row 10 center
  [7, 8, 11, 12], // row 11 center-right
  [1, 2, 13, 14], // row 13 far-left edge
  [10, 11, 13, 14], // row 13 far-right
  [15, 16, 16, 17], // row 16 center-right
  [2, 3, 17, 18], // row 17 center-left
  [10, 11, 19, 20], // row 19 left
  [6, 7, 20, 21], // row 20 center
  [3, 4, 21, 22], // row 21 left
  [8, 9, 22, 23], // row 22 center-right
  [6, 7, 24, 25], // row 24 right
  [9, 10, 26, 27], // row 26 center-right
  [1, 2, 27, 28], // row 27 left
  [15, 16, 29, 30], // row 29 center
  [11, 12, 31, 32], // row 31 right
  [16, 17, 32, 33], // row 32 far-right
  [4, 5, 35, 36], // row 35 center-left
  [12, 13, 36, 37], // row 36 right-bottom
];

// ─────────────────────────────────────────────────────────────────────────────

export const BackgroundGrid = () => {
  const desktopGridStyle = useMemo(() => ({
    gridTemplateColumns: DCOLS.map(w => `${w}fr`).join(' '),
    gridTemplateRows: DROWS.map(h => `${h}fr`).join(' '),
  }), []);

  const mobileGridStyle = useMemo(() => ({
    gridTemplateColumns: MCOLS.map(w => `${w}fr`).join(' '),
    gridTemplateRows: MROWS.map(h => `${h}fr`).join(' '),
  }), []);

  // Total cell counts: 40 cols × 26 rows = 1040 desktop, 16 × 36 = 576 mobile
  const dCellCount = useMemo(() => DCOLS.length * DROWS.length, []);
  const mCellCount = useMemo(() => MCOLS.length * MROWS.length, []);

  return (
    <div className="background-grid" aria-hidden="true">

      {/* ── Desktop ─────────────────────────────────────────────────────── */}
      <div
        className="background-grid__canvas background-grid__canvas--desktop"
        style={desktopGridStyle}
      >
        {/* Grid cells — create the visible non-uniform grid lines via borders */}
        {Array.from({ length: dCellCount }, (_, i) => (
          <div key={`dc-${i}`} className="background-grid__cell" />
        ))}

        {/* Black blocks — explicitly placed over specific cells */}
        {DESKTOP_BLOCKS.map(([cs, ce, rs, re], i) => (
          <div
            key={`db-${i}`}
            className="background-grid__block"
            style={{ gridColumn: `${cs} / ${ce}`, gridRow: `${rs} / ${re}` }}
          />
        ))}
      </div>

      {/* ── Mobile ──────────────────────────────────────────────────────── */}
      <div
        className="background-grid__canvas background-grid__canvas--mobile"
        style={mobileGridStyle}
      >
        {Array.from({ length: mCellCount }, (_, i) => (
          <div key={`mc-${i}`} className="background-grid__cell" />
        ))}

        {MOBILE_BLOCKS.map(([cs, ce, rs, re], i) => (
          <div
            key={`mb-${i}`}
            className="background-grid__block"
            style={{ gridColumn: `${cs} / ${ce}`, gridRow: `${rs} / ${re}` }}
          />
        ))}
      </div>

    </div>
  );
};

export default BackgroundGrid;
