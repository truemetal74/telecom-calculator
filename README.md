# Telecom Calculator

A web-based calculator for telecom engineers and project managers to calculate technical parameters based on subscriber counts or concurrent calls.

## Features

- **Transaction Load by Subscribers**: Calculate system load based on subscriber count and usage patterns
- **Transaction Load by Concurrent Calls**: Calculate charging requests based on concurrent call capacity
- **Share Results**: Generate shareable links with all calculator parameters
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management
- Docker for containerization

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your Google Tag Manager ID to .env
VITE_GTM_ID=GTM-XXXXXXX

# Start development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run lint
```

### Google Tag Manager Integration

The application includes Google Tag Manager support for analytics tracking.

**Setup:**
1. Create a GTM container at https://tagmanager.google.com
2. Copy your GTM ID (format: GTM-XXXXXXX)
3. Set the `VITE_GTM_ID` environment variable

**Events Tracked:**
- `calculator_usage` - Page views, parameter changes, result sharing
- `share_link` - When users share calculator results
- `calculator_navigation` - Navigation between different calculators

**Data Layer Variables:**
- `calculator_type` - Type of calculator (mvno_mno, voip, concurrent_calls)
- `action` - User action (page_view, share_results, landing_page_click)
- `subscriber_count` - Number of subscribers in calculation
- `tps` / `cps` - Calculated transactions/charging per second
- `concurrent_calls` - Number of concurrent calls

## Deployment

### Docker

```bash
# Build Docker image
docker build -t telecom-calculator .

# Run container
docker run -p 8080:80 telecom-calculator
```

### Google Cloud Platform

1. Set your GCP project ID:
   ```bash
   export GCP_PROJECT_ID="your-project-id"
   ```

2. Run the deployment script:
   ```bash
   ./deploy-gcp.sh
   ```

The script will:
- Build a Docker image
- Push it to Google Container Registry
- Deploy to Cloud Run
- Provide you with the public URL

## Calculators

### Transaction Load by Subscribers

Calculate system load based on:
- Number of subscribers
- Services enabled (voice, SMS, data)
- Usage patterns (calls/SMS per month)
- Peak hour distribution

### Transaction Load by Concurrent Calls

Calculate charging requests per second based on:
- Number of concurrent calls
- Average call length
- Success rate
- Additional features (authorization, call start events)

## Usage

1. Select a calculator type from the navigation tabs
2. Enter your main input parameters
3. Adjust optional parameters as needed
4. View calculated results in real-time
5. Click "Share Results" to copy a link with all parameters