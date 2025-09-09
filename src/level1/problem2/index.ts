let processRandom: Buffer | null = null;
let processCounter: number = Math.floor(Math.random() * 0xffffff);

export class ObjectId {
  private data: Buffer;

  constructor(type: number, timestamp: number) {
    if (processRandom === null) {
      processRandom = Buffer.allocUnsafe(4);
      processRandom.writeUInt32BE(Math.floor(Math.random() * 0xffffffff), 0);
    }

    this.data = Buffer.allocUnsafe(12);

    // type, 1 byte - at 0
    this.data.writeUInt8(type, 0);

    // timestamp, 6 bytes - at 1-6
    const timestampBytes = Buffer.allocUnsafe(6);
    timestampBytes.writeUIntBE(timestamp, 0, 6);
    this.data.set(timestampBytes, 1);

    // random, 4 bytes - at 7-10
    this.data.set(processRandom, 7);

    // counter, 3 bytes - at 9-11
    processCounter = (processCounter + 1) % 0x1000000;
    this.data.writeUIntBE(processCounter, 9, 3);
  }

  static generate(type?: number): ObjectId {
    return new ObjectId(type ?? 0, Date.now());
  }

  toString(encoding?: "hex" | "base64"): string {
    return this.data.toString(encoding ?? "hex");
  }
}
