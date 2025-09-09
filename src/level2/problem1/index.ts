export class ExecutionCache<TInputs extends Array<unknown>, TOutput> {
  private cache = new Map<string, Promise<TOutput>>();

  constructor(
    private readonly handler: (...args: TInputs) => Promise<TOutput>
  ) {}

  async fire(key: string, ...args: TInputs): Promise<TOutput> {
    // if cache has item with this key, return it
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    // create a new promise for this execution
    const promise = this.handler(...args);

    // cache the promise immediately (before awaiting) to handle concurrent calls
    this.cache.set(key, promise);

    return promise;
  }
}
