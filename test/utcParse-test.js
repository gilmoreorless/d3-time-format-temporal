var tape = require("tape"),
    timeFormat = require("../"),
    date = require("./date");

tape("utcParse(specifier) coerces the specified specifier to a string", function(test) {
  var p = timeFormat.utcParse({toString: function() { return "%c"; }});
  test.deepEqual(p("1/1/1990, 12:00:00 AM"), date.utc(1990, 0, 1));
  test.end();
});

tape("utcParse(\"\")(date) parses abbreviated weekday and numeric date", function(test) {
  var p = timeFormat.utcParse("%a %m/%d/%Y");
  test.deepEqual(p("Sun 01/01/1990"), date.utc(1990, 0, 1));
  test.deepEqual(p("Wed 02/03/1991"), date.utc(1991, 1, 3));
  test.equal(p("XXX 03/10/2010"), null);
  test.end();
});

tape("utcParse(\"\")(date) parses weekday and numeric date", function(test) {
  var p = timeFormat.utcParse("%A %m/%d/%Y");
  test.deepEqual(p("Sunday 01/01/1990"), date.utc(1990, 0, 1));
  test.deepEqual(p("Wednesday 02/03/1991"), date.utc(1991, 1, 3));
  test.equal(p("Caturday 03/10/2010"), null);
  test.end();
});

tape("utcParse(\"\")(date) parses numeric date", function(test) {
  var p = timeFormat.utcParse("%m/%d/%y");
  test.deepEqual(p("01/01/90"), date.utc(1990, 0, 1));
  test.deepEqual(p("02/03/91"), date.utc(1991, 1, 3));
  test.equal(p("03/10/2010"), null);
  test.end();
});

tape("utcParse(\"\")(date) parses locale date", function(test) {
  var p = timeFormat.utcParse("%x");
  test.deepEqual(p("01/01/1990"), date.utc(1990, 0, 1));
  test.deepEqual(p("02/03/1991"), date.utc(1991, 1, 3));
  test.deepEqual(p("03/10/2010"), date.utc(2010, 2, 10));
  test.end();
});

tape("utcParse(\"\")(date) parses abbreviated month, date and year", function(test) {
  var p = timeFormat.utcParse("%b %d, %Y");
  test.deepEqual(p("jan 01, 1990"), date.utc(1990, 0, 1));
  test.deepEqual(p("feb  2, 2010"), date.utc(2010, 1, 2));
  test.equal(p("jan. 1, 1990"), null);
  test.end();
});

tape("utcParse(\"\")(date) parses month, date and year", function(test) {
  var p = timeFormat.utcParse("%B %d, %Y");
  test.deepEqual(p("january 01, 1990"), date.utc(1990, 0, 1));
  test.deepEqual(p("February  2, 2010"), date.utc(2010, 1, 2));
  test.equal(p("jan 1, 1990"), null);
  test.end();
});

tape("utcParse(\"\")(date) parses locale date and time", function(test) {
  var p = timeFormat.utcParse("%c");
  test.deepEqual(p("1/1/1990, 12:00:00 AM"), date.utc(1990, 0, 1));
  test.end();
});

tape("utcParse(\"\")(date) parses twenty-four hour, minute and second", function(test) {
  var p = timeFormat.utcParse("%H:%M:%S");
  test.deepEqual(p("00:00:00"), date.utc(1900, 0, 1, 0, 0, 0));
  test.deepEqual(p("11:59:59"), date.utc(1900, 0, 1, 11, 59, 59));
  test.deepEqual(p("12:00:00"), date.utc(1900, 0, 1, 12, 0, 0));
  test.deepEqual(p("12:00:01"), date.utc(1900, 0, 1, 12, 0, 1));
  test.deepEqual(p("23:59:59"), date.utc(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("utcParse(\"\")(date) parses locale time", function(test) {
  var p = timeFormat.utcParse("%X");
  test.deepEqual(p("12:00:00 AM"), date.utc(1900, 0, 1, 0, 0, 0));
  test.deepEqual(p("11:59:59 AM"), date.utc(1900, 0, 1, 11, 59, 59));
  test.deepEqual(p("12:00:00 PM"), date.utc(1900, 0, 1, 12, 0, 0));
  test.deepEqual(p("12:00:01 PM"), date.utc(1900, 0, 1, 12, 0, 1));
  test.deepEqual(p("11:59:59 PM"), date.utc(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("utcParse(\"%L\")(date) parses milliseconds", function(test) {
  var p = timeFormat.utcParse("%L");
  test.deepEqual(p("432"), date.utc(1900, 0, 1, 0, 0, 0, 432));
  test.end();
});

tape("utcParse(\"%f\")(date) parses microseconds", function(test) {
  var p = timeFormat.utcParse("%f");
  test.deepEqual(p("432000"), date.utc(1900, 0, 1, 0, 0, 0, 432));
  test.end();
});

tape("utcParse(\"\")(date) parses twelve hour, minute and second", function(test) {
  var p = timeFormat.utcParse("%I:%M:%S %p");
  test.deepEqual(p("12:00:00 am"), date.utc(1900, 0, 1, 0, 0, 0));
  test.deepEqual(p("11:59:59 AM"), date.utc(1900, 0, 1, 11, 59, 59));
  test.deepEqual(p("12:00:00 pm"), date.utc(1900, 0, 1, 12, 0, 0));
  test.deepEqual(p("12:00:01 pm"), date.utc(1900, 0, 1, 12, 0, 1));
  test.deepEqual(p("11:59:59 PM"), date.utc(1900, 0, 1, 23, 59, 59));
  test.end();
});

tape("utcParse(\"\")(date) parses timezone offset", function(test) {
  var p = timeFormat.utcParse("%m/%d/%Y %Z");
  test.deepEqual(p("01/02/1990 +0000"), date.utc(1990, 0, 2));
  test.deepEqual(p("01/02/1990 +0100"), date.utc(1990, 0, 1, 23));
  test.deepEqual(p("01/02/1990 -0100"), date.utc(1990, 0, 2, 1));
  test.deepEqual(p("01/02/1990 -0800"), date.utc(1990, 0, 2, 8));
  test.end();
});

tape("utcParse(\"\")(date) parses timezone offset (in the form '+-hh:mm')", function(test) {
  var p = timeFormat.utcParse("%m/%d/%Y %Z");
  test.deepEqual(p("01/02/1990 +01:30"), date.utc(1990, 0, 1, 22, 30));
  test.deepEqual(p("01/02/1990 -01:30"), date.utc(1990, 0, 2, 1, 30));
  test.end();
});

tape("utcParse(\"\")(date) parses timezone offset (in the form '+-hh')", function(test) {
  var p = timeFormat.utcParse("%m/%d/%Y %Z");
  test.deepEqual(p("01/02/1990 +01"), date.utc(1990, 0, 1, 23));
  test.deepEqual(p("01/02/1990 -01"), date.utc(1990, 0, 2, 1));
  test.end();
});

tape("utcParse(\"\")(date) parses timezone offset (in the form 'Z')", function(test) {
  var p = timeFormat.utcParse("%m/%d/%Y %Z");
  test.deepEqual(p("01/02/1990 Z"), date.utc(1990, 0, 2));
  test.end();
});

tape("utcParse(\"%Y %U %w\")(date) handles a year that starts on Sunday", function(test) {
  var p = timeFormat.utcParse("%Y %U %w");
  test.deepEqual(p("2012 01 0"), date.utc(2012,  0,  1));
  test.end();
});

tape("utcParse(\"%w %V %Y\")(date) parses numeric weekday, week number (ISO) and year", function(test) {
  var p = timeFormat.utcParse("%w %V %Y");
  test.deepEqual(p("1 01 1990"), date.utc(1990,  0,  1));
  test.deepEqual(p("0 05 1991"), date.utc(1991,  1,  3));
  test.deepEqual(p("4 53 1992"), date.utc(1992, 11, 31));
  test.deepEqual(p("0 52 1994"), date.utc(1995,  0,  1));
  test.deepEqual(p("0 01 1995"), date.utc(1995,  0,  8));
  test.equal(p("X 03 2010"), null);
  test.end();
});

tape("utcParse(\"%V %Y\")(date) week number (ISO) and year", function(test) {
  var p = timeFormat.utcParse("%V %Y");
  test.deepEqual(p("01 1990"), date.utc(1990,  0,  1));
  test.deepEqual(p("05 1991"), date.utc(1991,  0, 28));
  test.deepEqual(p("53 1992"), date.utc(1992, 11, 28));
  test.deepEqual(p("01 1993"), date.utc(1993,  0,  4));
  test.deepEqual(p("01 1995"), date.utc(1995,  0,  2));
  test.deepEqual(p("00 1995"), null);
  test.deepEqual(p("54 1995"), null);
  test.deepEqual(p("X 1995"), null);
  test.end();
});

tape("utcParse(\"%Q\")(date) parses UNIX timestamps", function(test) {
  var p = timeFormat.utcParse("%Q");
  test.deepEqual(p("0"), date.utc(1970, 0, 1));
  test.deepEqual(p("631152000000"), date.utc(1990, 0, 1));
  test.end();
});

tape("utcParse(\"%s\")(date) parses UNIX timestamps in seconds", function(test) {
  var p = timeFormat.utcParse("%s");
  test.deepEqual(p("0"), date.utc(1970, 0, 1));
  test.deepEqual(p("631152000"), date.utc(1990, 0, 1));
  test.end();
});

tape("utcParse(\"%s.%L\")(date) parses UNIX timetamps in seconds and milliseconds", function(test) {
  var p = timeFormat.utcParse("%s.%L");
  test.deepEqual(p("631152000.123"), date.utc(1990, 0, 1,  0,  0,  0, 123));
  test.deepEqual(p("631197296.789"), date.utc(1990, 0, 1, 12, 34, 56, 789));
  test.end();
});

tape("utcParse(\"%s.%f\")(date) parses UNIX timetamps in seconds and microseconds", function(test) {
  var p = timeFormat.utcParse("%s.%f");
  test.deepEqual(p("631152000.123000"), date.utc(1990, 0, 1,  0,  0,  0, 123));
  test.deepEqual(p("631197296.789000"), date.utc(1990, 0, 1, 12, 34, 56, 789));
  test.end();
});
