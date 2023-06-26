const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTests() {
// Create a new Selenium WebDriver instance
const driver = await new Builder().forBrowser('chrome').build();

try {
// Open the website
await driver.get('https://www.epam.com');

// Test Case 1: Validate the title of the page
const pageTitle = await driver.getTitle();
console.log('Page Title:', pageTitle);

// Test Case 2: Find the header logo image
const headerLogo = await driver.findElement(By.css('.header__logo'));
const logoImageUrl = await headerLogo.getAttribute('src');
console.log('Logo Image URL:', logoImageUrl);

// Test Case 3: Search for "automation" and validate the results
const searchTrigger = await driver.findElement(By.css('.header-search__button'));
await searchTrigger.click();

// Wait for the search input field to become visible
const searchInput = await driver.wait(until.elementIsVisible(driver.findElement(By.css('.header-search__input'))), 5000);

// Clear any existing value in the search input field
await searchInput.clear();

// Type "automation" into the search input field
await searchInput.sendKeys('automation');

// Submit the search by pressing Enter key
await searchInput.sendKeys(Key.ENTER);

// Wait for the results to load
const searchResults = await driver.wait(until.elementLocated(By.css('.search-results__counter')), 5000);
await driver.wait(until.elementIsVisible(searchResults), 10000);

// Get the search results text
const searchResultsTextElement = await driver.findElement(By.css('#main > div.content-container.parsys > div > section > div.section__wrapper.section--padding-no > div.search > section > h2'));
const searchResultsText = await searchResultsTextElement.getText();
console.log('Search Results Text:', searchResultsText);


} catch (error) {
console.error('An error occurred:', error);
} finally {
// Close the browser
await driver.quit();
}
}

// Run the tests
runTests();