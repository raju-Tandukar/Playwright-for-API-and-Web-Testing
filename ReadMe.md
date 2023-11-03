---
# Playwright API and Web Testing Setup Guide
---

This is a Playwright API and Web testing framework designed to demonstrate playwright testing example. For test perpose i have use test website https://www.automationexercise.com/.

## Features of this framework
* Playwright API Testing
* Playwright Web Testing

## Getting started

### Pre-requisites
* Download and install Node.js
* Download and install any Text Editor like Visual Code/Sublime/Brackets

### Setup Scripts 
* Go to Project root directory and install Dependency: `npm install`
* All the dependencies from package.json would be installed in node_modules folder.

### Install Visual Code Extension (Optional)
* <a href="https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright" target="_blank">Playwright Test for VSCode</a>


## How to Run API Test Locally
* Go to the Project root directory and run command: `npx playwright test tests/apiTest.spec.ts --workers=1 --reporter=html`

## How to Run Web Test Locally
* Go to the Project root directory and run command: `npx playwright test tests/webTesting.spec.ts --workers=1 --reporter=html`

## How to Run Web Test with Multiple Browser Locally
* Go to the Project root directory and run command: `npx playwright test tests/webTesting.spec.ts --reporter=html`

## How to view default Playwright HTML report
* Go to the Project root directory: `./playwright-report/index.html`
