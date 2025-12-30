# Year Visualizer

A high-precision, real-time temporal dashboard that visualizes the progress of the current year. Designed for minimalist aesthetics and extreme performance.

## Features

- **High-Precision Progress**: Tracks the completion of the year down to 7 decimal places, updated in real-time every second.
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

The app calculates progress using the millisecond delta between the start of the current year and the present moment, divided by the total duration of the year (automatically accounting for leap years). The UI is built using a CSS Grid where each node is a memoized component that only re-renders if its status (past/present/future) changes.
