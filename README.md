# Year Visualizer

A high-precision, real-time temporal dashboard that visualizes the progress of the current year. Designed for minimalist aesthetics and extreme performance.

## Features

- **Balanced Progress Tracking**:
  - **Visuals**: The current day's dot fills vertically in real-time every second.
  - **Data**: The completion percentage updates hourly (with 2 decimal precision) to provide a stable, dashboard-like feel.
- **Micro-Fill Visualization**: Each day is represented by a dot that fills vertically as the 24-hour day passes.
- **Performance Optimized**:
  - Uses specialized React memoization logic to skip rendering for 364/365 dots every second.
  - GPU-accelerated transforms for smooth resizing and transitions.
  - Minimal DOM weight through shared component architecture (e.g., singleton tooltips).
- **Responsive Design**:
  - **Mobile**: 18-column portrait layout matching native mobile mockup aesthetics.
  - **Desktop**: 40-column landscape layout that scales fluidly with viewport height (`vh`).
- **Zero-Scroll UI**: Fixed-viewport design that prevents both X and Y scrolling for an "app-like" feel.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: Bun

## Getting Started

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

### Production Build

```bash
bun run build
```

## How It Works

The app calculates year completion based on hours elapsed to ensure a stable and meaningful percentage update. It automatically accounts for leap years and dynamically pivots its layout between mobile portrait and desktop landscape orientations.
