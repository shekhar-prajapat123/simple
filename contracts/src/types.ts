/**
 * src/types.ts
 *
 * This file contains the shared TypeScript types and interfaces used across the
 * frontend, backend, and test suites. It is the single source of truth for the
 * application's data structures, ensuring consistency.
 */

/**
 * Represents the public details of a user entity.
 * This is the data returned upon a successful search.
 */
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  registeredAt: string; // ISO 8601 date string, e.g., "2023-10-27T10:00:00Z"
}

/**
 * A type alias for the successful user search response payload.
 * As per the API contract, a successful search returns a User object directly.
 */
export type SearchUserResponseDto = User;

/**
 * Defines the standardized structure for API error responses.
 * This ensures that the frontend can consistently handle errors from any endpoint,
 * allowing for a clear distinction between successful and error states as required.
 */
export interface ErrorResponseDto {
  /** A user-friendly error message to be displayed in the UI. */
  message: string;

  /** An optional application-specific error code for programmatic handling. */
  errorCode?: 'USER_NOT_FOUND' | 'INTERNAL_ERROR' | 'INVALID_INPUT';

  /** The ISO 8601 timestamp of when the error occurred on the server. */
  timestamp: string;
}
