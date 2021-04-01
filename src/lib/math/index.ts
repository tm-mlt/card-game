export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function loopIndices(index: number, length: number) {
  return Math.abs(index + length) % Math.max(length, 1);
}
