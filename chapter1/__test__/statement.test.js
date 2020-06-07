const plays = require("../plays.json");
const invoice = require("../invoice.json");
const statement = require("../statement");

test("generates a statement", () => {
  expect(statement(invoice, plays)).toMatchSnapshot();
});
