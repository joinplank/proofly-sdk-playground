# Proofly SDK Playground App

This is a [Next.js](https://nextjs.org) example project demonstrating how to integrate and use the `@plank-proofly/api` SDK. It provides a web interface to interact with various Proofly API endpoints.

## Prerequisites

- Node.js 18+ 
- An API Key for the Proofly service

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd proofly-sdk-playground
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Usage

### Configuration

Upon opening the app, you will see a configuration section. You must enter your **API Key** to authenticate requests.

-   **X-API-Key**: Your Proofly API key.
-   **Base URL**: Defaults to the standard API endpoint, but can be configured if needed.

### SDK Integration Example

The core logic for interacting with the SDK is located in `src/app/actions.ts`. Here is how to initialize the client and make a request:

**1. Installation**

```bash
npm install @plank-proofly/api
```

**2. Initialization**

```typescript
import PlankProofly from '@plank-proofly/api';

const client = new PlankProofly({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://api.proofly.io/api' // Optional
});
```

**3. Making Requests**

```typescript
// Example: Health Check
const health = await client.health.check();

// Example: Compare Images
const comparison = await client.compareImages.compare({
  imageUrl1: 'https://example.com/image1.jpg',
  imageUrl2: 'https://example.com/image2.jpg',
  additionalInstructions: 'Check for facial similarities'
});

// Example: Search Profiles
const profiles = await client.profiles.search({
  name: 'John Doe',
  location: 'New York'
});
```

## Features

This application demonstrates the following Proofly SDK capabilities:

-   **Health Check**: Verify API availability.
-   **Compare Images**: Compare two images with optional instructions.
-   **Check Facebook Friends**: Verify friendship status between users.
-   **Find Mutual Friends**: Identify mutual connections between users.
-   **Search Profiles**: Search for people by name, location, and other criteria.
-   **Fuzzy Search**: Perform fuzzy matching on names, locations, etc.
-   **Verify Profile Photo**: Verify if a profile photo matches a user.
-   **Job Status**: Check the status of asynchronous jobs.

## Project Structure

-   `src/app/page.tsx`: Main UI component containing forms for each API endpoint.
-   `src/app/actions.ts`: Server Actions that handle SDK initialization and API calls.
