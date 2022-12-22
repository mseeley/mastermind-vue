import { computed, reactive, ref } from "vue";
import { Color } from "../types";

export enum GameState {
  None,
  Playing,
  Finished,
}

export interface GameRound {
  code: Color[];
  guessCount: number;
  correctPositionCount: number;
  incorrectPositionCount: number;
}

export interface Props {
  code: Color[];
  maxColorsPerRound: number;
  maxRounds: number;
  palette: Color[];
  round?: GameRound;
  rounds: GameRound[];
  state: GameState;
}

export interface Actions {
  guess: (color: Color) => void;
  finish: () => void;
  next: () => void;
  reset: () => void;
  start: (code?: Color[]) => void;
}

export interface GameStore {
  readonly actions: Actions;
  readonly props: Props;
}

let store: Store | undefined;

export default function useGameStore(): GameStore {
  if (!store) {
    store = new Store();
  }
  return store;
}

export class Store implements GameStore {
  readonly props: Props = reactive<Props>({
    code: [],
    maxColorsPerRound: 4,
    maxRounds: 10,
    palette: [Color.A, Color.B, Color.C, Color.D, Color.E, Color.F],
    // Type 'ComputedRef<GameRound | undefined>' is missing the following
    // properties from type 'GameRound':...
    // @ts-ignore
    round: computed<GameRound | undefined>(() => this.props.rounds.at(-1)),
    rounds: [],
    state: GameState.None,
  });

  readonly actions: Actions = {
    guess: (color: Color) => {
      if (!this.props.round) {
        return;
      }

      this.props.round.code.push(color);

      if (this.props.round.code.length === this.props.maxColorsPerRound) {
        if (
          this.props.round.correctPositionCount === this.props.maxColorsPerRound
        ) {
          this.actions.finish();
        } else {
          this.actions.next();
        }
      }
    },
    finish: () => {
      this.props.state = GameState.Finished;
    },
    next: () => {
      const round: GameRound = reactive({
        code: ref([]),
        correctPositionCount: computed(() =>
          round.code.reduce(
            (acc, color, index) =>
              acc + (color === this.props.code[index] ? 1 : 0),
            0
          )
        ),
        guessCount: 0,
        incorrectPositionCount: computed(() => {
          const occurences = new Map<Color, number[]>();

          // Identify each code index which matches a guessed color.
          for (const guess of round.code) {
            if (!occurences.has(guess)) {
              occurences.set(
                guess,
                this.props.code.reduce<number[]>(
                  (acc, color, index) =>
                    acc.concat(guess === color ? index : []),
                  []
                )
              );
            }
          }

          // Then eliminate correct position and color matches and count the
          // accumulate remaining indices.
          return round.code.reduce((acc, color, index) => {
            const guess = round.code[index];
            const foundIndices = occurences.get(guess);

            if (!foundIndices?.includes(index) && foundIndices?.length) {
              acc++;
            }
            foundIndices?.shift();

            return acc;
          }, 0);
        }),
      });

      this.props.rounds.push(round);
    },
    reset: () => {
      this.props.code.length = 0;
      this.props.rounds.length = 0;
      this.props.state = GameState.None;
    },
    start: (code?: Color[]) => {
      this.actions.reset();

      this.props.state = GameState.Playing;
      this.props.code =
        code ?? generateCode(this.props.palette, this.props.maxColorsPerRound);

      this.actions.next();
    },
  };
}

function generateCode(palette: Color[], maxColors: number): Color[] {
  const selectedColors: Color[] = [];

  for (let i = 0; i < maxColors; i++) {
    const j = Math.round(Math.random() * (palette.length - 1));
    selectedColors.push(palette[j]);
  }

  return selectedColors;
}
