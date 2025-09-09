# ObjectId
Create a utility for generating a universally unique identifier. The identifier should include the following components:
- `type` - a 1 byte value that identifies the type of object
- `timestamp` - a 6 byte value that represents the number of milliseconds since the Unix epoch
- `random` - a 4 byte random value that is generated once per process
- `counter` - a 3 byte incrementing value that is initialized to a random value
