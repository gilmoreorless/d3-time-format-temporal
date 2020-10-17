export default function formatIso(dateTime) {
  return dateTime.toInstant('UTC').toString();
}
