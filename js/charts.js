/* ============================================
   CHARTS.JS — Stackly AI Analytics
   Chart.js initializations for dashboard pages
   ============================================ */

const CHART_COLORS = {
  primary: '#1B3A2D',
  primaryLight: '#2D5A3D',
  accent: '#4A8C5E',
  accentLight: '#6BAF7B',
  sage: '#6B8F71',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#8b5cf6',
  pink: '#ec4899',
  gray: '#6b7280'
};

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 16,
        font: { size: 11, family: "'Inter', sans-serif" }
      }
    }
  }
};

function initDashboardCharts() {
  // Trend Line Chart
  const trendCtx = document.getElementById('trendChart');
  if (trendCtx) {
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Page Views',
            data: [12400, 15800, 14200, 18600, 22100, 19800, 24500, 28200],
            borderColor: CHART_COLORS.primary,
            backgroundColor: 'rgba(27, 58, 45, 0.08)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: CHART_COLORS.primary
          },
          {
            label: 'Unique Visitors',
            data: [8200, 10400, 9800, 13200, 15600, 14100, 17800, 20500],
            borderColor: CHART_COLORS.accent,
            backgroundColor: 'rgba(74, 140, 94, 0.06)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: CHART_COLORS.accent
          }
        ]
      },
      options: {
        ...CHART_DEFAULTS,
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { font: { size: 10 } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 } }
          }
        }
      }
    });
  }

  // Traffic Sources Doughnut
  const sourceCtx = document.getElementById('sourceChart');
  if (sourceCtx) {
    new Chart(sourceCtx, {
      type: 'doughnut',
      data: {
        labels: ['Organic Search', 'Direct', 'Referral', 'Social', 'Email', 'Paid'],
        datasets: [{
          data: [38, 22, 16, 12, 7, 5],
          backgroundColor: [
            CHART_COLORS.primary,
            CHART_COLORS.accent,
            CHART_COLORS.info,
            CHART_COLORS.purple,
            CHART_COLORS.warning,
            CHART_COLORS.pink
          ],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        cutout: '68%',
      }
    });
  }

  // Conversion Bar Chart
  const convCtx = document.getElementById('conversionChart');
  if (convCtx) {
    new Chart(convCtx, {
      type: 'bar',
      data: {
        labels: ['Landing', 'Sign Up', 'Onboarding', 'Active', 'Subscribed', 'Retained'],
        datasets: [{
          label: 'Conversion %',
          data: [100, 68, 52, 41, 28, 22],
          backgroundColor: CHART_COLORS.primary,
          borderRadius: 6,
          barThickness: 28
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { callback: v => v + '%', font: { size: 10 } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 } }
          }
        }
      }
    });
  }

  // Revenue Area Chart
  const revCtx = document.getElementById('revenueChart');
  if (revCtx) {
    new Chart(revCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Revenue ($)',
          data: [42000, 48500, 45200, 52000, 61000, 58200, 67500, 72000],
          borderColor: CHART_COLORS.success,
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: CHART_COLORS.success
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { callback: v => '$' + (v/1000) + 'k', font: { size: 10 } }
          },
          x: { grid: { display: false }, ticks: { font: { size: 10 } } }
        }
      }
    });
  }
}

/* ---- Reports Page Charts ---- */
function initReportCharts() {
  // Monthly Overview
  const monthlyCtx = document.getElementById('monthlyChart');
  if (monthlyCtx) {
    new Chart(monthlyCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Sessions',
            data: [18200, 22400, 19800, 26100, 31500, 28700, 34200, 38600],
            backgroundColor: CHART_COLORS.primary,
            borderRadius: 4,
            barPercentage: 0.6
          },
          {
            label: 'Conversions',
            data: [1820, 2688, 2376, 3654, 4410, 4018, 5130, 5404],
            backgroundColor: CHART_COLORS.accent,
            borderRadius: 4,
            barPercentage: 0.6
          }
        ]
      },
      options: {
        ...CHART_DEFAULTS,
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 } } },
          x: { grid: { display: false }, ticks: { font: { size: 10 } } }
        }
      }
    });
  }

  // Device Breakdown Pie
  const deviceCtx = document.getElementById('deviceChart');
  if (deviceCtx) {
    new Chart(deviceCtx, {
      type: 'pie',
      data: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [{
          data: [58, 34, 8],
          backgroundColor: [CHART_COLORS.primary, CHART_COLORS.accent, CHART_COLORS.sage],
          borderWidth: 0
        }]
      },
      options: { ...CHART_DEFAULTS }
    });
  }

  // Bounce Rate Line
  const bounceCtx = document.getElementById('bounceChart');
  if (bounceCtx) {
    new Chart(bounceCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        datasets: [{
          label: 'Bounce Rate %',
          data: [45, 42, 38, 35, 33, 31, 29, 27],
          borderColor: CHART_COLORS.warning,
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: CHART_COLORS.warning
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 20, max: 50, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { callback: v => v + '%', font: { size: 10 } } },
          x: { grid: { display: false }, ticks: { font: { size: 10 } } }
        }
      }
    });
  }

  // Geo Horizontal Bar
  const geoCtx = document.getElementById('geoChart');
  if (geoCtx) {
    new Chart(geoCtx, {
      type: 'bar',
      data: {
        labels: ['United States', 'India', 'United Kingdom', 'Germany', 'Canada', 'Australia', 'France'],
        datasets: [{
          label: 'Visitors',
          data: [12400, 9800, 5600, 4200, 3800, 3100, 2900],
          backgroundColor: CHART_COLORS.primary,
          borderRadius: 4
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 } } },
          y: { grid: { display: false }, ticks: { font: { size: 10 } } }
        }
      }
    });
  }
}
