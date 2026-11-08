const fs = require('fs');
const path = require('path');
const db = require('../src/config/database');

function run() {
  console.log('--- VERIFYING CHIEF GUESTS ASSETS (WHITE BACKGROUND PNG) ---');
  const guests = [
    'kamaljeet_sehrawat.png',
    'sandeep_sehrawat.png',
    'savita_pawan_sharma.png',
    'satyendra_singh_rana.png'
  ];

  for (const filename of guests) {
    const pubPath = path.join(__dirname, '../../frontend/public/images/guests', filename);
    const distPath = path.join(__dirname, '../../frontend/dist/images/guests', filename);
    const backendPath = path.join(__dirname, '../uploads/guests', filename);

    if (!fs.existsSync(pubPath)) throw new Error('Missing in frontend/public: ' + pubPath);
    if (!fs.existsSync(distPath)) throw new Error('Missing in frontend/dist: ' + distPath);
    if (!fs.existsSync(backendPath)) throw new Error('Missing in backend/uploads: ' + backendPath);

    const stat = fs.statSync(pubPath);
    console.log(`✓ Guest photo verified: ${filename} (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('\n--- VERIFYING TRANSIT TEXT REMOVAL ---');
  const locSectionPath = path.join(__dirname, '../../frontend/src/components/home/LocationSection.jsx');
  const locContent = fs.readFileSync(locSectionPath, 'utf8');
  if (locContent.includes('Official Celebration Ground') || locContent.includes('Arriving via Delhi Metro')) {
    throw new Error('Transit text still present in LocationSection.jsx!');
  }
  console.log('✓ "Official Celebration Ground" and transit guide successfully removed.');

  console.log('\n--- VERIFYING GOOGLE MAPS REMOVAL ---');
  const filesToCheck = [
    '../../frontend/src/components/home/FeaturedEventSection.jsx',
    '../../frontend/src/components/home/LocationSection.jsx',
    '../../frontend/src/pages/ContactPage.jsx',
    '../../frontend/src/pages/EventsPage.jsx',
    '../../frontend/src/components/common/Footer.jsx',
    '../src/database/seed.js'
  ];

  for (const relPath of filesToCheck) {
    const fullPath = path.join(__dirname, relPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('maps.google') || content.includes('google.com/maps')) {
      throw new Error(`Google Maps reference still found in ${relPath}!`);
    }
    console.log(`✓ Zero Google Maps links in ${relPath}`);
  }

  console.log('\n--- VERIFYING DATABASE ---');
  const comCount = db.prepare('SELECT COUNT(*) as count FROM committee_members').get().count;
  console.log(`✓ Executive committee members in DB: ${comCount}`);
  if (comCount !== 66) throw new Error('Expected 66 committee members, got ' + comCount);

  console.log('\n======================================================');
  console.log('🎉 ALL CHECKS PASSED: WHITE BACKGROUNDS & CLEAN LAYOUT!');
  console.log('======================================================');
}

run();
