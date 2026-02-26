/**
 * Curve functions: normalized t in [0,1] -> [0,1].
 * Used for DecentSampler <binding translation="table"> translationTable attribute.
 */

export type FunctionId =
  | 'linear'
  | 'square'
  | 'cubic'
  | 'logarithmic'
  | 'exponential'
  | 'sigmoid'
  | 'tanh'
  | 'sineCosine'

export interface Point {
  x: number
  y: number
}

const SIGMOID_K = 10
const TANH_K = 3

function linear(t: number): number {
  return t
}

function square(t: number): number {
  return t * t
}

function cubic(t: number): number {
  return t * t * t
}

function logarithmic(t: number): number {
  if (t <= 0) return 0
  return Math.log(1 + 9 * t) / Math.log(10)
}

function exponential(t: number): number {
  return (Math.pow(10, t) - 1) / 9
}

function sigmoid(t: number, k?: number): number {
  const K = k ?? SIGMOID_K
  const y = 1 / (1 + Math.exp(-K * (t - 0.5)))
  const low = 1 / (1 + Math.exp(K * 0.5))
  const high = 1 / (1 + Math.exp(-K * 0.5))
  return (y - low) / (high - low)
}

function tanhCurve(t: number, k?: number): number {
  const K = k ?? TANH_K
  const y = (Math.tanh(K * (t - 0.5)) + 1) / 2
  return y
}

function sineCosine(t: number): number {
  return Math.sin(t * (Math.PI / 2))
}

const CURVES: Record<FunctionId, (t: number, k?: number) => number> = {
  linear,
  square,
  cubic,
  logarithmic,
  exponential,
  sigmoid,
  tanh: tanhCurve,
  sineCosine,
}

export function applyCurve(id: FunctionId, t: number, reversed: boolean, k?: number): number {
  const u = reversed ? 1 - t : t
  return CURVES[id](u, k)
}

/**
 * Build array of { x, y } with x = 0, 1/steps, ..., 1 and y = min + (max - min) * f(x).
 * steps >= 1 (at least 2 points).
 */
export function generateTable(
  functionId: FunctionId,
  min: number,
  max: number,
  steps: number,
  reversed: boolean,
  k?: number
): Point[] {
  const n = Math.max(1, Math.min(256, Math.floor(steps)))
  const points: Point[] = []
  const range = max - min
  for (let i = 0; i <= n; i++) {
    const x = i / n
    const normalized = applyCurve(functionId, x, reversed, k)
    const y = min + range * normalized
    points.push({ x, y })
  }
  return points
}

/**
 * Format points as DecentSampler translationTable: "x1,y1;x2,y2;..."
 */
export function formatForDecentSampler(points: Point[]): string {
  return points
    .map(({ x, y }) => `${round6(x)},${round6(y)}`)
    .join(';')
}

function round6(n: number): number {
  return Math.round(n * 1e6) / 1e6
}
