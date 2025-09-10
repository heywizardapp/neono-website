import { analytics } from './core';

interface HeatPoint {
  x: number;
  y: number;
  count: number;
}

class HeatmapCollector {
  private grid: Map<string, number> = new Map();
  private readonly GRID_WIDTH = 24;
  private readonly GRID_HEIGHT = 12;
  private enabled = false;
  private reducedData = false;

  constructor() {
    this.reducedData = this.checkReducedData();
    
    if (!this.reducedData) {
      this.setupEventListeners();
      
      // Enable when analytics consent given
      window.addEventListener('analytics:enabled', () => {
        this.enabled = true;
      });

      // Check initial consent
      this.checkInitialConsent();
    }
  }

  private checkReducedData(): boolean {
    return typeof window !== 'undefined' && 
           window.matchMedia && 
           window.matchMedia('(prefers-reduced-data: reduce)').matches;
  }

  private checkInitialConsent() {
    try {
      const consent = localStorage.getItem('neono-consent');
      if (consent) {
        const parsed = JSON.parse(consent);
        this.enabled = parsed.analytics === true;
      }
    } catch {
      // Ignore
    }
  }

  private setupEventListeners() {
    if (typeof window === 'undefined') return;

    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!this.enabled) return;

      let clientX: number, clientY: number;
      
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        const touch = e.touches[0] || e.changedTouches[0];
        if (!touch) return;
        clientX = touch.clientX;
        clientY = touch.clientY;
      }

      this.recordPoint(clientX, clientY);
    };

    // Listen for both mouse and touch events
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('touchend', handleClick, { passive: true });
  }

  private recordPoint(x: number, y: number) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Convert to grid coordinates
    const gridX = Math.floor((x / vw) * this.GRID_WIDTH);
    const gridY = Math.floor((y / vh) * this.GRID_HEIGHT);
    
    // Clamp to grid bounds
    const clampedX = Math.max(0, Math.min(this.GRID_WIDTH - 1, gridX));
    const clampedY = Math.max(0, Math.min(this.GRID_HEIGHT - 1, gridY));
    
    const key = `${clampedX},${clampedY}`;
    const current = this.grid.get(key) || 0;
    this.grid.set(key, current + 1);

    // Send analytics event
    analytics.track('tap_heat', {
      grid_x: clampedX,
      grid_y: clampedY,
      viewport_width: vw,
      viewport_height: vh,
    });

    // Periodically flush to localStorage in dev
    if (process.env.NODE_ENV === 'development' && Math.random() < 0.1) {
      this.flushToStorage();
    }
  }

  private flushToStorage() {
    if (process.env.NODE_ENV !== 'development') return;
    
    try {
      const heatData = Array.from(this.grid.entries()).map(([key, count]) => {
        const [x, y] = key.split(',').map(Number);
        return { x, y, count };
      });
      
      localStorage.setItem('neono-heatmap', JSON.stringify(heatData));
    } catch (err) {
      console.warn('Failed to save heatmap data:', err);
    }
  }

  // Debug method to show heatmap overlay
  showHeatmapOverlay() {
    if (process.env.NODE_ENV !== 'development') return;
    
    const overlay = document.getElementById('heatmap-overlay');
    if (overlay) overlay.remove();

    const div = document.createElement('div');
    div.id = 'heatmap-overlay';
    div.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
      display: grid;
      grid-template-columns: repeat(${this.GRID_WIDTH}, 1fr);
      grid-template-rows: repeat(${this.GRID_HEIGHT}, 1fr);
      gap: 1px;
    `;

    const maxCount = Math.max(...Array.from(this.grid.values()), 1);
    
    for (let y = 0; y < this.GRID_HEIGHT; y++) {
      for (let x = 0; x < this.GRID_WIDTH; x++) {
        const key = `${x},${y}`;
        const count = this.grid.get(key) || 0;
        const intensity = count / maxCount;
        
        const cell = document.createElement('div');
        cell.style.cssText = `
          background: rgba(255, 0, 0, ${intensity * 0.6});
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: white;
          text-shadow: 1px 1px 1px black;
        `;
        cell.textContent = count > 0 ? count.toString() : '';
        div.appendChild(cell);
      }
    }

    document.body.appendChild(div);
  }

  // Get heatmap data for analysis
  getHeatmapData(): HeatPoint[] {
    return Array.from(this.grid.entries()).map(([key, count]) => {
      const [x, y] = key.split(',').map(Number);
      return { x, y, count };
    });
  }
}

// Global heatmap collector
export const heatmap = new HeatmapCollector();

// Show heatmap overlay in dev when ?heatmap=1
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const url = new URL(window.location.href);
  if (url.searchParams.get('heatmap') === '1') {
    setTimeout(() => heatmap.showHeatmapOverlay(), 1000);
    setInterval(() => heatmap.showHeatmapOverlay(), 5000);
  }
}