import { describe, it, expect } from "vitest";
import { Color } from "../types";
import { Store } from "./game";

describe("game", () => {
  const { A: blue, B: brown, C: pink, D: green, E: yellow, F: red } = Color;

  describe("without duplicates", () => {
    it("handles case 1a", () => {
      // Player Guess: pink-green-purple-red
      // Expected hint(pegs):  { black:1, white: 1  }
      const code = [red, green, yellow, blue];
      const guess = [pink, green, brown, red];
      const store = new Store();

      store.actions.start(code);
      expect(store.props.code).toEqual(code);

      guess.forEach((color) => {
        store.actions.guess(color);
      });

      expect(store.props.rounds[0]?.code).toEqual(guess);
      expect(store.props.rounds[0]?.correctPositionCount).toEqual(1);
      expect(store.props.rounds[0]?.incorrectPositionCount).toEqual(1);
    });

    it("handles case 1b", () => {
      // Player Guess: pink-yellow-blue-purple
      // Expected hint(pegs):  { black: 0, white: 2  }
      const code = [red, green, yellow, blue];
      const guess = [pink, yellow, blue, brown];
      const store = new Store();

      store.actions.start(code);
      expect(store.props.code).toEqual(code);

      guess.forEach((color) => {
        store.actions.guess(color);
      });

      expect(store.props.rounds[0]?.code).toEqual(guess);
      expect(store.props.rounds[0]?.correctPositionCount).toEqual(0);
      expect(store.props.rounds[0]?.incorrectPositionCount).toEqual(2);
    });

    it("handles case 1c", () => {
      // Player Guess: purple-pink-purple-pink
      // Expected hint(pegs):  { black: 0, white: 0  }
      const code = [red, green, yellow, blue];
      const guess = [brown, pink, brown, pink];
      const store = new Store();

      store.actions.start(code);
      expect(store.props.code).toEqual(code);

      guess.forEach((color) => {
        store.actions.guess(color);
      });

      expect(store.props.rounds[0]?.code).toEqual(guess);
      expect(store.props.rounds[0]?.correctPositionCount).toEqual(0);
      expect(store.props.rounds[0]?.incorrectPositionCount).toEqual(0);
    });

    it("handles case 13", () => {
      // Player Guess: red-red-red-red
      // Expected hint(pegs):  { black: 1, white: 0  }
      const code = [red, green, yellow, blue];
      const guess = [red, red, red, red];
      const store = new Store();

      store.actions.start(code);
      expect(store.props.code).toEqual(code);

      guess.forEach((color) => {
        store.actions.guess(color);
      });

      expect(store.props.rounds[0]?.code).toEqual(guess);
      expect(store.props.rounds[0]?.correctPositionCount).toEqual(1);
      expect(store.props.rounds[0]?.incorrectPositionCount).toEqual(0);
    });
  });

  describe("without duplicates", () => {
    it("handles case 2a", () => {
      // Player Guess: red-red-red-green
      // Expected feedback(pegs):  { black: 3, white: 0  }
      const code = [red, red, green, green];
      const store = new Store();

      store.actions.start(code);
      expect(store.props.code).toEqual(code);

      store.actions.guess(red);
      expect(store.props.rounds[0]?.code).toEqual([red]);
      expect(store.props.rounds[0]?.correctPositionCount).toEqual(1);
      expect(store.props.rounds[0]?.incorrectPositionCount).toEqual(0);

      store.actions.guess(red);
      expect(store.props.rounds[0]?.code).toEqual([red, red]);
      expect(store.props.rounds[0]?.correctPositionCount).toEqual(2);
      expect(store.props.rounds[0]?.incorrectPositionCount).toEqual(0);

      store.actions.guess(red);
      expect(store.props.rounds[0]?.code).toEqual([red, red, red]);
      expect(store.props.rounds[0]?.correctPositionCount).toEqual(2);
      expect(store.props.rounds[0]?.incorrectPositionCount).toEqual(0);

      store.actions.guess(green);
      expect(store.props.rounds[0]?.code).toEqual([red, red, red, green]);
      expect(store.props.rounds[0]?.correctPositionCount).toEqual(3);
      expect(store.props.rounds[0]?.incorrectPositionCount).toEqual(0);
    });

    it("handles case 2b", () => {
      // Code: brown-pink-blue-orange
      // Player Guess: brown-blue-pink-pink
      // Expected feedback(pegs):  { black: 3, white: 0  }
      const code = [brown, pink, blue, yellow];
      const guess = [brown, blue, pink, pink];
      const store = new Store();

      store.actions.start(code);
      expect(store.props.code).toEqual(code);

      guess.forEach((color) => {
        store.actions.guess(color);
      });

      expect(store.props.rounds[0]?.code).toEqual(guess);
      expect(store.props.rounds[0]?.correctPositionCount).toEqual(1);
      expect(store.props.rounds[0]?.incorrectPositionCount).toEqual(2);
    });
  });
});
