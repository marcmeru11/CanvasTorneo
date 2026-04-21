import TournamentBracket from "./index.js";
import TournamentTheme from "./models/TournamentTheme.js";

/**
 * Demo Implementation
 * This file demonstrates how to use the TournamentBracket module
 * with the new TournamentTheme class.
 */

try {
  // 1. Initialize with a customized Dark Theme preset
  const customTheme = TournamentTheme.DARK.extend({
    boxBorderRadius: 15,
    roundSpacingX: 150
  });

  const bracket = new TournamentBracket("canvas", customTheme);
  
  const demoData = [
    [
      { name: "Equipo A", score: 3 }, 
      { name: "Team with an Extremely Long Name That Should Cause Boxes to Grow", score: 2 }, 
      { name: "Equipo C", score: 1 }, 
      "Equipo D", 
      "E"
    ],
    [
      { name: "Equipo A", score: 2 }, 
      { name: "Equipo C", score: 0 }, 
      "E"
    ],
    ["Equipo A", "E"],
    ["Equipo A"]
  ];

  bracket.setData(demoData);

  console.log("Tournament Bracket Module initialized successfully.");

} catch (error) {
  console.error("Failed to initialize Tournament Bracket:", error);
}