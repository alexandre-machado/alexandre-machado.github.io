# alexandre-machado.github.io

Site: https://alexandre.machado.cc/

# tests

## Run/Updating Playwright
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
nvm install --latest-npm 20.0.0
nvm use 20.0.0
npm install -D @playwright/test@latest
npx playwright install --with-deps
npx playwright test
```