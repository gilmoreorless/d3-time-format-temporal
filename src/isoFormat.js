export default function formatIso(dateTime) {
  return dateTime.toAbsolute('UTC').toString();
}
