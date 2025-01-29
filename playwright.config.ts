import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',  
  use: {
    browserName: 'chromium', 
    headless: false,       
    viewport: { width: 1280, height: 720 }
  },
});