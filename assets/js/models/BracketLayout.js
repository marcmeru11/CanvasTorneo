import LineShape from "../shapes/line.js";
import RectShape from "../shapes/rect.js";
import TextShape from "../shapes/text.js";

/**
 * BracketLayout.js
 * Logic for calculating positions of tournament elements.
 */
class BracketLayout {
  #theme;

  constructor(theme) {
    this.#theme = theme;
  }

  /**
   * Generates an array of shapes based on tournament data.
   * @param {Tournament} tournament - The tournament model.
   * @param {CanvasRenderingContext2D} ctx - Needed for text measurement.
   */
  generateShapes(tournament, ctx) {
    const shapes = [];
    const { rounds } = tournament;

    if (tournament.isEmpty) return shapes;

    // 1. Calculate per-round widths and X positions
    const roundMetrics = this.#calculateRoundMetrics(rounds, ctx);

    const initialTeams = rounds[0].length;
    const bracketSize = 2 ** Math.ceil(Math.log2(initialTeams));
    const roundCount = rounds.length;

    const { teamYsize, teamSpacingY } = this.#theme;
    const slotHeight = teamYsize + teamSpacingY;

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
      const { x, width } = roundMetrics[r];

      for (let t = 0; t < teams.length; t++) {
        const teamData = teams[t];
        const teamName = typeof teamData === "string" ? teamData : teamData.name;
        const score = teamData.score !== undefined ? teamData.score : null;
        
        const y = getTeamY(r, t);
        const hasScore = score !== null;
        const scoreWidth = hasScore ? this.#theme.scoreBoxWidth : 0;
        const effectiveNameWidth = width - scoreWidth;

        // Add Main Box
        shapes.push(new RectShape(
          x, 
          y, 
          width, 
          teamYsize, 
          this.#theme.boxFillColor, 
          true, 
          this.#theme.boxStrokeColor, 
          this.#theme.boxLineWidth,
          this.#theme.boxBorderRadius
        ));

        // Add Score Box (Optional)
        if (hasScore) {
          shapes.push(new RectShape(
            x + effectiveNameWidth,
            y,
            scoreWidth,
            teamYsize,
            this.#theme.scoreBoxFillColor,
            true,
            this.#theme.boxStrokeColor,
            this.#theme.boxLineWidth,
            [0, this.#theme.boxBorderRadius, this.#theme.boxBorderRadius, 0]
          ));

          // Score Text
          shapes.push(new TextShape(
            x + effectiveNameWidth + scoreWidth / 2,
            y + teamYsize / 2,
            score.toString(),
            this.#theme.scoreTextColor,
            this.#theme.fontFamily,
            this.#theme.fontSize
          ));
        }

        // Add Team Name Text (Centered in the remaining area)
        shapes.push(new TextShape(
          x + effectiveNameWidth / 2, 
          y + teamYsize / 2, 
          teamName, 
          this.#theme.textColor, 
          this.#theme.fontFamily, 
          this.#theme.fontSize
        ));

        // Add connecting lines (Orthogonal / Bracket Style)
        if (r < roundCount - 1) {
          const nextMetric = roundMetrics[r + 1];
          const nextY = getTeamY(r + 1, Math.floor(t / 2)) + teamYsize / 2;
          
          const xStart = x + width;
          const yStart = y + teamYsize / 2;
          const xEnd = nextMetric.x;
          const yEnd = nextY;
          
          // Midpoint for the "bracket" bend
          const midX = xStart + (this.#theme.roundSpacingX / 2);

          // 1. Horizontal out from current box
          shapes.push(new LineShape(
            xStart, yStart, midX, yStart, 
            this.#theme.lineColor, this.#theme.lineWidth
          ));

          // 2. Vertical segment to meet next round level
          shapes.push(new LineShape(
            midX, yStart, midX, yEnd, 
            this.#theme.lineColor, this.#theme.lineWidth
          ));

          // 3. Horizontal into next round box
          shapes.push(new LineShape(
            midX, yEnd, xEnd, yEnd, 
            this.#theme.lineColor, this.#theme.lineWidth
          ));
        }
      }
    }

    return shapes;
  }

  /**
   * Calculates width and X position for every round.
   */
  #calculateRoundMetrics(rounds, ctx) {
    const metrics = [];
    let currentX = 0;

    if (ctx) {
      ctx.font = `${this.#theme.fontSize}px ${this.#theme.fontFamily}`;
    }

    for (let r = 0; r < rounds.length; r++) {
      let maxTextWidth = this.#theme.minWidth;

      for (const teamData of rounds[r]) {
        const teamName = typeof teamData === "string" ? teamData : teamData.name;
        const measuredWidth = ctx ? ctx.measureText(teamName).width : teamName.length * 8;
        const requiredWidth = measuredWidth + this.#theme.paddingX;
        
        // Add score width if present
        const finalWidth = teamData.score !== undefined ? requiredWidth + this.#theme.scoreBoxWidth : requiredWidth;

        if (finalWidth > maxTextWidth) {
          maxTextWidth = finalWidth;
        }
      }

      metrics.push({
        x: currentX,
        width: maxTextWidth
      });

      // Accumulate X for next round
      currentX += maxTextWidth + this.#theme.roundSpacingX;
    }

    return metrics;
  }
}

export default BracketLayout;
