const plays = require("../plays.json");
const invoice = require("../invoice.json");
const { statement, htmlStatement } = require("../statement");

test("generates a statement", () => {
  expect(statement(invoice, plays)).toMatchSnapshot();
});

test("generates a HTML statement", () => {
  expect(htmlStatement(invoice, plays)).toMatchSnapshot();
});
