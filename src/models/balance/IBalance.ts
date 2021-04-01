export interface IBalance {
  value: number;

  give(value: number): void;
  take(value: number): number;
  clear(): void;
}
