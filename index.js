const plays = require("./chapter1/plays.json");
const invoice = require("./chapter1/invoice.json");
const { statement } = require("./chapter1/statement");

const result = statement(invoice, plays);
