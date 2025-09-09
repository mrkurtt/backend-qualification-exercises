export type Value =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | Buffer
  | Map<unknown, unknown>
  | Set<unknown>
  | Array<Value>
  | { [key: string]: Value };

/**
 * Transforms JavaScript scalars and objects into JSON
 * compatible objects.
 */
export function serialize(value: Value): unknown {
  // null and undefined
  if (value === null || value === undefined) {
    return value;
  }

  // primitive types
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  // Date objects
  if (value instanceof Date) {
    return { __t: "Date", __v: value.getTime() };
  }

  // Buffer objects
  if (Buffer.isBuffer(value)) {
    return { __t: "Buffer", __v: Array.from(value) };
  }

  // Map objects
  if (value instanceof Map) {
    return { __t: "Map", __v: Array.from(value.entries()) };
  }

  // Set objects
  if (value instanceof Set) {
    return { __t: "Set", __v: Array.from(value) };
  }

  // arrays
  if (Array.isArray(value)) {
    return value.map((item) => serialize(item));
  }

  // plain objects
  if (typeof value === "object") {
    const result: { [key: string]: unknown } = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = serialize(val);
    }
    return result;
  }

  return value;
}

/**
 * Transforms JSON compatible scalars and objects into JavaScript
 * scalar and objects.
 */
export function deserialize<T = unknown>(value: unknown): T {
  // null and undefined
  if (value === null || value === undefined) {
    return value as T;
  }

  // primitive types
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value as T;
  }

  // special object types with __t and __v structure
  if (
    typeof value === "object" &&
    value !== null &&
    "__t" in value &&
    "__v" in value
  ) {
    const obj = value as { __t: string; __v: unknown };

    switch (obj.__t) {
      case "Date":
        return new Date(obj.__v as number) as T;
      case "Buffer":
        return Buffer.from(obj.__v as number[]) as T;
      case "Map":
        return new Map(obj.__v as [unknown, unknown][]) as T;
      case "Set":
        return new Set(obj.__v as unknown[]) as T;
      default:
        return value as T;
    }
  }

  // arrays
  if (Array.isArray(value)) {
    return value.map((item) => deserialize(item)) as T;
  }

  // plain objects
  if (typeof value === "object" && value !== null) {
    const result: { [key: string]: unknown } = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = deserialize(val);
    }
    return result as T;
  }

  return value as T;
}
