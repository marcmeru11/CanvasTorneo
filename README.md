# Tournament Visualizer

A standalone, modular tournament bracket renderer for HTML5 Canvas. This library provides a highly customizable and performance-oriented engine for displaying tournament progression with support for various layout types, real-time data updates, and comprehensive visual themes.

## Features

*   **Modular Architecture**: Decoupled core engine, camera management, and layout strategies.
*   **Dynamic Layouts**: Supports both standard single-sided brackets and symmetric split (dual-sided) brackets.
*   **Intuitive Connectors**: Professional orthogonal paths that clearly illustrate match pairings and progression.
*   **Theme System**: Dedicated theme class with built-in presets (Light, Dark, Blue) and granular customization.
*   **Scoring Support**: Optional match result display with adaptive box sizing and centering.
*   **Viewport Management**: Support for zooming and panning across large tournament structures.
*   **Zero Dependencies**: Built with vanilla JavaScript and the native Canvas 2D API.

## Installation

```bash
npm install tournament-visualizer
```

## Quick Start

Initialize a tournament bracket by providing a target canvas element and an optional theme configuration.

```javascript
import { TournamentBracket, TournamentTheme } from 'tournament-visualizer';

const bracket = new TournamentBracket('canvas-id', TournamentTheme.DARK);

const data = [
  ['Team A', { name: 'Team B', score: 2 }, 'Team C', 'Team D'],
  ['Team B', 'Team C'],
  ['Team B']
];

bracket.setData(data);
```

## Documentation

### TournamentBracket

The main entry point for the library.

*   **`constructor(canvasElement, themeOrOptions)`**: Initializes the visualizer. Accepts a canvas ID or DOM element.
*   **`setData(rounds)`**: Updates the bracket with new data. The input should be an array of rounds, each containing an array of teams (strings or objects with `name` and `score`).
*   **`render()`**: Manually triggers a re-render.
*   **`resize()`**: Updates the internal canvas dimensions.

### TournamentTheme

The configuration class for visual styling.

*   **Presets**: `TournamentTheme.LIGHT`, `TournamentTheme.DARK`, `TournamentTheme.BLUE`.
*   **`extend(overrides)`**: Creates a new theme instance based on an existing one with specific overrides.

#### Configuration Options

| Property | Description | Default |
| :--- | :--- | :--- |
| `layoutType` | `single` or `split` | `single` |
| `backgroundColor` | Background fill color | `null` |
| `boxFillColor` | Team box fill color | `#dbeafe` |
| `boxBorderRadius` | Radius for box corners | `0` |
| `textColor` | Alignment-ready text color | `#111827` |
| `lineColor` | Connector line color | `#0f172a` |
| `roundSpacingX` | Horizontal gap between rounds | `100` |
| `centerGap` | Mid-point gap for split layouts | `200` |

## Data Format

The visualizer accepts a hierarchical array of rounds. Each team can be represented as a simple string or an object for match results:

```javascript
// Example with scores
[
  [
    { name: "Alpha", score: 3 },
    { name: "Beta", score: 1 }
  ],
  [
    { name: "Alpha" }
  ]
]
```

## Contributing

We welcome contributions to improve the Tournament Visualizer. To contribute, please follow these steps:

1.  Fork the repository.
2.  Create a feature branch: `git checkout -b feature/your-feature-name`.
3.  Implement your changes following the existing modular patterns and design principles.
4.  Ensure your code is well-documented and adheres to the project's aesthetic standards.
5.  Submit a pull request with a detailed description of your changes.

### Development Setup

To run the project locally for development purposes:

1.  Install the dependencies: `npm install`.
2.  Run the development script: `npm run dev`.
3.  Access the library demonstration at the provided local address.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
