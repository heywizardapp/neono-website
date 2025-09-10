#!/usr/bin/env node

/**
 * Post-build script for SEO optimization
 * Generates sitemaps and optimizes built files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Running post-build optimizations...');

const distDir = path.join(__dirname, '../dist');

// 1. Generate sitemaps
console.log('📄 Generating sitemaps...');
try {
  execSync('node scripts/generate-sitemaps.js', { stdio: 'inherit' });
} catch (error) {
  console.warn('⚠️ Sitemap generation failed:', error.message);
}

// 2. Copy robots.txt
console.log('🤖 Copying robots.txt...');
try {
  const robotsSource = path.join(__dirname, '../public/robots.txt');
  const robotsDest = path.join(distDir, 'robots.txt');
  
  if (fs.existsSync(robotsSource)) {
    fs.copyFileSync(robotsSource, robotsDest);
    console.log('✅ robots.txt copied');
  }
} catch (error) {
  console.warn('⚠️ robots.txt copy failed:', error.message);
}

// 3. Validate HTML files have proper meta tags
console.log('🔍 Validating HTML files...');
try {
  const htmlFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));
  
  for (const file of htmlFiles) {
    const filePath = path.join(distDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check for essential meta tags
    const hasTitle = content.includes('<title>');
    const hasDescription = content.includes('name="description"');
    const hasCanonical = content.includes('rel="canonical"');
    const hasOG = content.includes('property="og:');
    
    if (!hasTitle || !hasDescription) {
      console.warn(`⚠️ ${file} missing essential meta tags`);
    }
    
    if (hasTitle && hasDescription && hasCanonical && hasOG) {
      console.log(`✅ ${file} has proper SEO meta tags`);
    }
  }
} catch (error) {
  console.warn('⚠️ HTML validation failed:', error.message);
}

// 4. Generate performance report
console.log('📊 Generating build report...');
try {
  const stats = {
    timestamp: new Date().toISOString(),
    files: {}
  };
  
  function getFilesRecursive(dir, baseDir = dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      const relativePath = path.relative(baseDir, filePath);
      
      if (file.isDirectory()) {
        getFilesRecursive(filePath, baseDir);
      } else {
        const stat = fs.statSync(filePath);
        stats.files[relativePath] = {
          size: stat.size,
          sizeKB: Math.round(stat.size / 1024 * 100) / 100
        };
      }
    }
  }
  
  getFilesRecursive(distDir);
  
  // Calculate total sizes by type
  const summary = {
    js: 0,
    css: 0,
    html: 0,
    images: 0,
    other: 0,
    total: 0
  };
  
  Object.entries(stats.files).forEach(([file, info]) => {
    const ext = path.extname(file);
    const size = info.size;
    
    if (ext === '.js') summary.js += size;
    else if (ext === '.css') summary.css += size;
    else if (ext === '.html') summary.html += size;
    else if (['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'].includes(ext)) summary.images += size;
    else summary.other += size;
    
    summary.total += size;
  });
  
  // Convert to KB
  Object.keys(summary).forEach(key => {
    summary[key] = Math.round(summary[key] / 1024 * 100) / 100;
  });
  
  console.log('📦 Build Summary:');
  console.log(`   JavaScript: ${summary.js} KB`);
  console.log(`   CSS: ${summary.css} KB`);  
  console.log(`   HTML: ${summary.html} KB`);
  console.log(`   Images: ${summary.images} KB`);
  console.log(`   Other: ${summary.other} KB`);
  console.log(`   Total: ${summary.total} KB`);
  
  // Write detailed report
  fs.writeFileSync(
    path.join(distDir, 'build-report.json'),
    JSON.stringify({ ...stats, summary }, null, 2)
  );
  
} catch (error) {
  console.warn('⚠️ Build report generation failed:', error.message);
}

console.log('✅ Post-build optimizations complete!');