import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from './brand';

export type Word = {text: string; start: number; end: number};

const KEYWORDS = new Set(
  [
    'dropped', 'school', 'yasha', '17', 'russian', 'pattaya', 'thailand', '16', 'knowledge',
    '5', '10', '15', '2025', 'idea', 'prefab', 'movable', 'saunas', 'early', 'hard', 'owner',
    'running', 'everything', 'bills', 'workers', 'trailer', 'custom', 'wheels', 'rotate', 'lift',
    'easily', 'sleepless', 'nights', 'finally', 'months', 'standing', 'fully', 'own', 'soon',
  ],
);

const clean = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

// Group words into short pages: max 3 words or ~16 chars, break on sentence punctuation
const paginate = (words: Word[]) => {
  const pages: Word[][] = [];
  let cur: Word[] = [];
  for (const w of words) {
    const len = cur.map((x) => x.text).join(' ').length + w.text.length;
    const gap = cur.length ? w.start - cur[cur.length - 1].end : 0;
    if (cur.length && (cur.length >= 3 || len > 16 || gap > 0.45)) {
      pages.push(cur);
      cur = [];
    }
    cur.push(w);
    if (/[.!?]$/.test(w.text)) {
      pages.push(cur);
      cur = [];
    }
  }
  if (cur.length) pages.push(cur);
  return pages;
};

export const Captions: React.FC<{words: Word[]; top?: number}> = ({words, top = 1420}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const pages = paginate(words);
  const idx = pages.findIndex(
    (p, i) => t >= p[0].start - 0.05 && t < (pages[i + 1]?.[0].start ?? p[p.length - 1].end + 0.6),
  );
  if (idx < 0) return null;
  const page = pages[idx];
  const enter = interpolate(t, [page[0].start - 0.05, page[0].start + 0.12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: 96,
        right: 96,
        top,
        textAlign: 'center',
        fontFamily: fonts.sans,
        fontWeight: 700,
        fontSize: 64,
        lineHeight: 1.12,
        letterSpacing: '-0.01em',
        textShadow: '0 2px 12px rgba(0,0,0,.6), 0 0 2px rgba(0,0,0,.5)',
        transform: `translateY(${(1 - enter) * 12}px) scale(${0.96 + 0.04 * enter})`,
        opacity: enter,
      }}
    >
      {page.map((w, i) => {
        const active = t >= w.start && t < w.end + 0.08;
        const key = KEYWORDS.has(clean(w.text));
        return (
          <span
            key={i}
            style={{
              color: key ? colors.gold : colors.cream,
              opacity: t >= w.start - 0.02 ? 1 : 0.55,
              display: 'inline-block',
              transform: `scale(${active ? 1.06 : 1})`,
              margin: '0 0.14em',
            }}
          >
            {w.text.replace(/,$/, '')}
          </span>
        );
      })}
    </div>
  );
};
