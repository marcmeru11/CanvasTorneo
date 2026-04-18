import LineShape from "./shapes/line.js";
import RectShape from "./shapes/rect.js";
import TextShape from "./shapes/text.js";

const teamXsize = 100;
const teamYsize = 50;
const teamSpacingX = 20;
const teamSpacingY = 20;
const roundSpacingX = 100;
const roundSpacingY = 50;

class Torneo {
  #renderer;
  #camera;
  #rounds = [];
  #shapes = [];

  constructor(renderer, camera) {
    this.#renderer = renderer;
    this.#camera = camera;
  }

  addRound(teams) {
    this.#rounds.push(teams);
  }

  addLine(x1, y1, x2, y2, color, lineWidth) {
    this.#shapes.push(new LineShape(x1, y1, x2, y2, color, lineWidth));
  }

  addRect(x, y, width, height, color, filled, stroke, lineWidth) {
    this.#shapes.push(
      new RectShape(x, y, width, height, color, filled, stroke, lineWidth),
    );
  }

  addText(x, y, text, color, font, fontSize) {
    this.#shapes.push(new TextShape(x, y, text, color, font, fontSize));
  }

  generate() {
  this.#shapes = [];

  if (this.#rounds.length === 0 || this.#rounds[0].length === 0) return;

  const initialTeams = this.#rounds[0].length;
  const bracketSize = 2 ** Math.ceil(Math.log2(initialTeams));
  const roundCount = this.#rounds.length;

  const slotHeight = teamYsize + teamSpacingY;

  const getRoundX = (r) => r * (teamXsize + roundSpacingX);

  const getRoundStep = (r) => slotHeight * (2 ** r);

  const getRoundOffset = (r) => {
    const step = getRoundStep(r);
    return ((step - teamYsize) / 2);
  };

  const getTeamY = (r, index) => {
    const step = getRoundStep(r);
    const totalHeight = bracketSize * slotHeight;
    const usedHeight = (this.#rounds[r].length - 1) * step + teamYsize;
    const topMargin = (totalHeight - usedHeight) / 2;

    return topMargin + index * step;
  };

  for (let r = 0; r < roundCount; r++) {
    const teams = this.#rounds[r];
    const x = getRoundX(r);

    for (let t = 0; t < teams.length; t++) {
      const y = getTeamY(r, t);

      this.addRect(
        x,
        y,
        teamXsize,
        teamYsize,
        "#dbeafe",
        true,
        "#1e293b",
        2
      );

      this.addText(
        x + 12,
        y + teamYsize / 1.5,
        teams[t],
        "#111827",
        "Arial",
        16
      );

      if (r < roundCount - 1) {
        const nextX = getRoundX(r + 1);
        const nextY = getTeamY(r + 1, Math.floor(t / 2)) + teamYsize / 2;

        this.addLine(
          x + teamXsize,
          y + teamYsize / 2,
          nextX,
          nextY,
          "#0f172a",
          3
        );
      }
    }
  }
}

  render(canvas) {
    this.generate();
    this.#camera.reset(this.#renderer);
    this.#renderer.clearRect(0, 0, canvas.width, canvas.height);

    this.#camera.apply(this.#renderer);

    for (const shape of this.#shapes) {
      shape.draw(this.#renderer, this.#camera);
    }
  }
}

export default Torneo;
console.log("Torneo loaded");
