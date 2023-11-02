const currencyFormatter = require("currency-formatter");

// Define a function to format a price
function formatPrice(amount, currencyCode = "MAD") {
    // Format the price using the currency-formatter library
    return currencyFormatter.format(amount, { code: currencyCode });
}

module.exports = {
    formatPrice,
};
