# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-27

### 🚀 Major Release - Auth0 v5 + NestJS 11 Migration

This is a **breaking change** release that migrates the library from Auth0 v4 to v5 and NestJS 10 to 11.

### Added

- Full support for Auth0 v5
- Full support for NestJS 11
- Built-in TypeScript types (no more `@types/auth0` dependency)
- Enhanced test coverage with 22 comprehensive tests
- Improved error handling and type safety
- Better performance with Auth0 v5 optimizations
- Enhanced security features from Auth0 v5
- Updated peer dependencies for NestJS 11 compatibility

### Changed

- **BREAKING**: Updated from Auth0 v4.5.0 to v5.0.0
- **BREAKING**: Updated from NestJS 10 to 11
- **BREAKING**: Removed dependency on `@types/auth0` (Auth0 v5 includes built-in types)
- **BREAKING**: Updated TypeScript type definitions to match Auth0 v5 API
- **BREAKING**: Changed version from 0.3.3 to 1.0.0 to reflect breaking changes
- **BREAKING**: Updated peer dependencies to require NestJS 11+
- Updated all internal imports to use Auth0 v5 structure
- Improved JSDoc comments and type annotations
- Enhanced module configuration with better type safety

### Fixed

- Removed deprecated internal imports from Auth0 package
- Fixed TypeScript compilation errors
- Corrected type definitions for ManagementClient options
- Improved error handling in module initialization

### Migration Guide

#### For Users Upgrading from 0.x:

1. **Update dependencies**:

   ```bash
   npm uninstall @types/auth0
   npm install @twirelab/nestjs-auth0@^1.0.0 auth0@^5.0.0
   npm install @nestjs/common@^11.0.0 @nestjs/core@^11.0.0
   ```

2. **Update your code**:

   - Remove any imports of `@types/auth0`
   - Update method calls to match Auth0 v5 API
   - Update to NestJS 11 (see [NestJS Migration Guide](https://docs.nestjs.com/migration-guide))
   - The client injection and module configuration remain the same

3. **Test thoroughly**: Ensure all Auth0 API calls work with the new v5 client and NestJS 11

#### Breaking Changes:

- Auth0 v5 API changes may require updates to your Auth0 method calls
- NestJS 11 changes may require updates to your NestJS application
- TypeScript types are now built into Auth0 v5
- Some internal type names have changed (e.g., `ManagementClientOptionsWithClientCredentials`)
- Peer dependencies now require NestJS 11+

### Technical Details

#### Files Modified:

- `package.json` - Updated dependencies and version
- `src/auth0.options.ts` - Updated type imports and interfaces
- `src/clients/authentication.client.ts` - Updated imports and JSDoc
- `src/clients/management.client.ts` - Updated imports and JSDoc
- `src/providers/authentication.provider.ts` - Updated imports
- `src/providers/management.provider.ts` - Updated imports and types
- `src/modules/authentication-core.module.ts` - Updated imports
- `src/modules/management-core.module.ts` - Updated imports and types
- `src/modules/authentication.module.ts` - Updated imports
- `src/modules/management.module.ts` - Updated imports and types
- `test/` - Enhanced test coverage and updated test cases
- `README.md` - Updated documentation with migration guide

#### Dependencies:

- **Added**: `auth0@^5.0.0`
- **Updated**: `@nestjs/common@^11.1.6`, `@nestjs/core@^11.1.6`, `@nestjs/testing@^11.1.6`
- **Removed**: `@types/auth0@^3.3.10`
- **Updated peer dependencies**: `@nestjs/common@^11.0.0`, `@nestjs/core@^11.0.0`

### Testing

- All 22 tests pass successfully
- Comprehensive coverage of client creation, module initialization, and dependency injection
- Tests cover both authentication and management clients
- Edge cases and error scenarios are tested

---

## [0.3.3] - Previous Release

### Features

- Auth0 v4 support
- Authentication and Management client wrappers
- NestJS module integration
- TypeScript support with `@types/auth0`
