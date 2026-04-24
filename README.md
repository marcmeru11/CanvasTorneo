# Tournament Visualizer

A standalone, modular tournament bracket renderer for HTML5 Canvas. This library provides a highly customizable and performance-oriented engine for displaying tournament progression with support for interactive camera controls, movement constraints, and comprehensive visual themes.

## Features

*   **Modular Architecture**: Decoupled core engine, camera management, and layout strategies using the Facade pattern.
*   **Interactive Viewport**: Full support for **Zoom (Scroll)** and **Pan (Drag)** to navigate large tournament structures.
*   **Smart Constraints**: Built-in camera limits (30% margin logic) to prevent losing the bracket off-screen.
*   **Optional UI Components**: Built-in "Center View" button with customizable styling and automatic DOM placement.
*   **Dynamic Layouts**: Supports both standard single-sided brackets and symmetric split (dual-sided) brackets.
*   **Theme System**: Dedicated theme class with built-in presets (LIGHT, DARK, BLUE) and granular customization.
*   **Scoring Support**: Optional match result display with adaptive box sizing.
*   **Zero Dependencies**: Built with vanilla JavaScript and the native Canvas 2D API.

## Installation

```bash
npm install tournament-visualizer
```

## Quick Start

Initialize a tournament bracket by providing a target canvas element and an optional theme configuration.

```javascript
import TournamentBracket from './assets/js/index.js';
import TournamentTheme from './assets/js/models/TournamentTheme.js';

// Initialize with a premium dark theme and a center button
const customTheme = TournamentTheme.DARK.extend({
  showCenterButton: true,
  boxBorderRadius: 10
});

const bracket = new TournamentBracket('canvas-id', customTheme);

const data = [
  ['Team A', { name: 'Team B', score: 2 }, 'Team C', 'Team D'],
  ['Team B', 'Team C'],
  ['Team B']
];

bracket.setData(data);
```

## Documentation

### TournamentBracket

The main facade for the library.

*   **`constructor(canvasElement, themeOrOptions)`**: Initializes the visualizer. Accepts a canvas ID or DOM element.
*   **`setData(rounds)`**: Updates the bracket with new data. The input should be an array of rounds, each containing an array of teams.
*   **`centerCamera()`**: Recalculates the optimal zoom and position to fit the current bracket in the viewport.
*   **`render()`**: Triggers a manual re-render of the scene.
*   **`resize()`**: Updates the internal canvas dimensions to match the client container.

### TournamentTheme

The configuration class for visual styling and behavior.

*   **Presets**: `TournamentTheme.LIGHT`, `TournamentTheme.DARK`, `TournamentTheme.BLUE`.
*   **`extend(overrides)`**: Creates a new theme instance with specific overrides.

#### Configuration Options

| Property | Description | Default |
| :--- | :--- | :--- |
| `layoutType` | `single` or `split` layout | `single` |
| `backgroundColor` | Canvas background color | `null` (transparent) |
| `boxFillColor` | Team box background color | `#dbeafe` |
| `boxStrokeColor` | Team box border color | `#1e293b` |
| `boxBorderRadius` | Corner radius for team boxes | `0` |
| `textColor` | Team name text color | `#111827` |
| `lineColor` | Connector line color | `#0f172a` |
| `lineWidth` | Thickness of connector lines | `3` |
| `showCenterButton` | Enable the "Center View" UI button | `false` |
| `centerButtonText` | Text for the center button | `"Center View"` |
| `centerButtonStyle` | CSS object for button customization | (Premium Defaults) |
| `roundSpacingX` | Horizontal gap between rounds | `100` |
| `teamSpacingY` | Vertical gap between teams | `20` |

## Camera Controls

The visualizer includes an integrated `InputManager` that provides:

*   **Pan**: Click and drag anywhere on the canvas to move the view.
*   **Zoom**: Use the mouse wheel to zoom in/out at the cursor position.
*   **Constraints**: The camera is automatically restricted so you can't pan more than 30% of the canvas size away from the bracket bounds.

## Data Format

The visualizer accepts a hierarchical array of rounds. Each team can be a string or an object:

```javascript
[
  [ // Round 1
    { name: "Alpha", score: 3 },
    { name: "Beta", score: 1 }
  ],
  [ // Round 2 (Finals)
    { name: "Alpha" }
  ]
]
```

## Contributing

1.  Fork the repository.
2.  Create a feature branch: `git checkout -b feature/your-feature`.
3.  Follow the modular patterns in `assets/js/core`.
4.  Submit a pull request.

## License

MIT License.

