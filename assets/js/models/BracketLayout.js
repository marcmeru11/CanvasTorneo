import LineShape from "../shapes/line.js";
import RectShape from "../shapes/rect.js";
import TextShape from "../shapes/text.js";

/**
 * BracketLayout.js
 * Logic for calculating positions of tournament elements.
 */
class BracketLayout {
  static CONFIG = {
    teamXsize: 100,
    teamYsize: 50,
    teamSpacingX: 20,
    teamSpacingY: 20,
    roundSpacingX: 100,
    roundSpacingY: 50,
  };

  /**
   * Generates an array of shapes based on tournament data.
   */
  generateShapes(tournament) {
    const shapes = [];
    const { rounds } = tournament;

    if (tournament.isEmpty) return shapes;

    const initialTeams = rounds[0].length;
    const bracketSize = 2 ** Math.ceil(Math.log2(initialTeams));
    const roundCount = rounds.length;

    const { teamXsize, teamYsize, teamSpacingY, roundSpacingX } = BracketLayout.CONFIG;
    const slotHeight = teamYsize + teamSpacingY;

    const getRoundX = (r) => r * (teamXsize + roundSpacingX);
    const getRoundStep = (r) => slotHeight * (2 ** r);

    const getTeamY = (r, index) => {
      const step = getRoundStep(r);
      const totalHeight = bracketSize * slotHeight;
      const usedHeight = (rounds[r].length - 1) * step + teamYsize;
      const topMargin = (totalHeight - usedHeight) / 2;

      return topMargin + index * step;
    };

    for (let r = 0; r < roundCount; r++) {
      const teams = rounds[r];
      const x = getRoundX(r);

      for (let t = 0; t < teams.length; t++) {
        const y = getTeamY(r, t);

        // Add Rect
        shapes.push(new RectShape(
          x, y, teamXsize, teamYsize, "#dbeafe", true, "#1e293b", 2
        ));

        // Add Text
        shapes.push(new TextShape(
          x + 12, y + teamYsize / 1.5, teams[t], "#111827", "Arial", 16
        ));

        // Add connecting lines
        if (r < roundCount - 1) {
          const nextX = getRoundX(r + 1);
          const nextY = getTeamY(r + 1, Math.floor(t / 2)) + teamYsize / 2;

          shapes.push(new LineShape(
            x + teamXsize, y + teamYsize / 2, nextX, nextY, "#0f172a", 3
          ));
        }
      }
    }

    return shapes;
  }
}

export default BracketLayout;
