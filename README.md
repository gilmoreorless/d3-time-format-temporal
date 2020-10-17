# d3-time-format-temporal

A conversion of [d3-time-format](https://github.com/d3/d3-time-format) to use the in-progress [Temporal proposal](https://github.com/tc39/proposal-temporal) instead of the legacy `Date` object.

:warning: **This is purely an experiment to test out the viability of the Temporal API. DO NOT USE THIS IN PRODUCTION.** :warning:

In most places I've attempted to make the minimum amount of changes to make it work, and preserve the d3 code style. This project also depends on a [Temporal-based fork of `d3-time`](https://github.com/gilmoreorless/d3-time-temporal).

## Differences from `d3-time-format`

- All `d3-time-format` methods have been altered to _only_ take or return `Temporal.DateTime` objects where applicable. These are abstract, immutable objects with no fixed time zone. No raw numbers representing milliseconds, no legacy `Date` objects.
- Due to the abstract nature of `Temporal.DateTime`, the `utc*` methods (`d3.utcFormat()`, `d3.utcParse()`) have been made aliases of the non-UTC versions. To use `Temporal.DateTime` with UTC or local time (or any other time zone), call the [`.toInstant(timeZone)` method](https://tc39.es/proposal-temporal/docs/datetime.html#toInstant).
  - Formatting a zone with `%Z` only ever returns `'Z'`, for the same reason.

See the [full list of commits](https://github.com/gilmoreorless/d3-time-format-temporal/compare/master...temporal-datetime) for step-by-step conversion details.
