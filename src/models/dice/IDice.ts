interface IDice<T> {
  last: T;
  value: number;

  roll(): T;
}

export type { IDice };
