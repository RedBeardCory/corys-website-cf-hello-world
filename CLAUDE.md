# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cloudflare Workers project for a personal website. It uses TypeScript and is designed to run on Cloudflare's edge network.

## Development Commands

### Local Development
```bash
npm run dev
# or
npm start
```
Both commands start a local development server using Wrangler at http://localhost:8787/

### Deployment
```bash
npm run deploy
```
Deploys the worker to Cloudflare's network.

### Testing
```bash
npm test
```
Runs tests using Vitest with the Cloudflare Workers pool.

### Type Generation
```bash
npm run cf-typegen
```
Regenerates TypeScript types from wrangler.jsonc configuration. Run this after adding bindings (KV, R2, D1, etc.) to wrangler.jsonc.

## Architecture

### Entry Point
- **src/index.ts**: Main worker entry point. Exports a default object with a `fetch` handler that processes incoming requests.

### Worker Pattern
This project uses the ES modules syntax with `ExportedHandler`:
```typescript
export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Handle requests
  },
} satisfies ExportedHandler<Env>;
```

### Environment Bindings
The `Env` interface is auto-generated in `worker-configuration.d.ts` by running `npm run cf-typegen`. When adding bindings in `wrangler.jsonc` (KV namespaces, R2 buckets, D1 databases, Durable Objects, etc.), regenerate types to get proper TypeScript support.

### Configuration
- **wrangler.jsonc**: Worker configuration including name, compatibility date, and bindings
- **tsconfig.json**: TypeScript configuration with strict mode enabled, targeting ES2021
- **vitest.config.mts**: Test configuration using @cloudflare/vitest-pool-workers for testing in Workers environment

### Testing Strategy
Tests are located in `test/` directory. The project uses:
- **Vitest** for test runner
- **@cloudflare/vitest-pool-workers** for Workers-specific testing
- Two testing styles available:
  - Unit style: Direct invocation of worker.fetch() with mock env
  - Integration style: Using SELF.fetch() for more realistic testing

Test files use a separate tsconfig at `test/tsconfig.json` that includes Cloudflare test types.

## TypeScript Configuration

- Strict mode is enabled
- Target: ES2021
- Module: ES2022 with Bundler resolution
- JSX: react-jsx (if React is added later)
- The main tsconfig excludes test files; tests have their own configuration

## Key Conventions

- Use ES modules syntax (import/export)
- Worker handlers receive (request, env, ctx) parameters
- Access environment variables and bindings through the `env` parameter
- Use `ctx.waitUntil()` for background tasks that shouldn't block the response
- Use `ctx.passThroughOnException()` to fall through to origin on unhandled errors (if needed)
