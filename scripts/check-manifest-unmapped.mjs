#!/usr/bin/env node
/**
 * Lists unmapped components and unmapped specs from component-manifest.json (T024)
 * Run: node scripts/check-manifest-unmapped.mjs
 */
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const manifestPath = join(repoRoot, 'specs/002-design-system-tokens/component-manifest.json');
const componentsDir = join(repoRoot, 'src/components');

const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
const mappedPaths = new Set(manifest.patterns.map((p) => p.componentPath));
const mappedSpecs = new Set(manifest.patterns.map((p) => p.specId));

const componentFiles = readdirSync(componentsDir)
  .filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'))
  .map((f) => `src/components/${f}`);

const unmappedComponents = componentFiles.filter((p) => !mappedPaths.has(p));
const knownSpecs = ['TreatmentCard', 'FloatingPriceCard', 'CTAButton', 'BeforeAfterSlider', 'DoctorCard', 'PriceDisplay', 'BookingCTA'];
const unmappedSpecs = knownSpecs.filter((s) => !mappedSpecs.has(s));

console.log('=== Manifest Unmapped Check ===\n');
console.log('Unmapped components (in src/components/ but not in manifest):');
unmappedComponents.length ? unmappedComponents.forEach((c) => console.log('  -', c)) : console.log('  (none)');
console.log('\nUnmapped specs (known patterns not in manifest):');
unmappedSpecs.length ? unmappedSpecs.forEach((s) => console.log('  -', s)) : console.log('  (none)');
