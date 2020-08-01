const { Temporal } = require("proposal-temporal");

export default function parseIso(string) {
  try {
   return Temporal.DateTime.from(string);
  } catch (err) {
    return null;
  }
}
