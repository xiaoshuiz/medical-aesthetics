#!/usr/bin/env node
/**
 * Style Audit: scan src/ for spacing values not on 8pt grid (T025)
 * 48px for CTA-to-Image (special-gap) is compliant.
 * Output: specs/002-design-system-tokens/style-audit-report.md
 */
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const srcDir = join(repoRoot, 'src');
const outputPath = join(repoRoot, 'specs/002-design-system-tokens/style-audit-report.md');

const GRID_UNIT = 8;
const COMPLIANT_SPECIAL = 48;

function getSpacingValues(str) {
  const findings = [];
  const regex = /(?:margin|padding|gap|top|bottom|left|right):\s*([^;}\s]+)/g;
  const pxRegex = /(\d+)px/;
  const remRegex = /([\d.]+)rem/;
  let m;
  while ((m = regex.exec(str)) !== null) {
    const val = m[1].trim();
    let num = null;
    const px = val.match(pxRegex);
    const rem = val.match(remRegex);
    if (px) num = parseInt(px[1], 10);
    else if (rem) num = Math.round(parseFloat(rem[1]) * 16);
    if (num !== null && num > 0 && num !== COMPLIANT_SPECIAL) {
      if (num % GRID_UNIT !== 0) {
        findings.push({ value: val, num });
      }
    } else if (num === COMPLIANT_SPECIAL) {
      findings.push({ value: val, num, compliant: true });
    }
  }
  return findings;
}

function scanDir(dir, base = '') {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const rel = join(base, e.name);
    const full = join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') {
      results.push(...scanDir(full, rel));
    } else if (e.isFile() && /\.(tsx?|css)$/.test(e.name)) {
      const content = readFileSync(full, 'utf-8');
      const findings = getSpacingValues(content);
      if (findings.filter((f) => !f.compliant).length > 0) {
        results.push({ file: rel, findings: findings.filter((f) => !f.compliant) });
      }
    }
  }
  return results;
}

const results = scanDir(srcDir, 'src');

let md = `# Style Audit Report

**Branch**: 002-design-system-tokens  
**Generated**: ${new Date().toISOString().slice(0, 10)}

## Rules

- Spacing (margin, padding, gap) MUST be multiples of 8pt
- 48px (special-gap for CTA-to-Image) is compliant

## Findings (values not on 8pt grid)

| File | Property Value |
|------|----------------|
`;

for (const r of results) {
  for (const f of r.findings) {
    md += `| ${r.file} | ${f.value} (${f.num}px) |\n`;
  }
}

if (results.length === 0) {
  md += `(No deviations found)\n`;
}

writeFileSync(outputPath, md);
console.log('Style audit written to', outputPath);
