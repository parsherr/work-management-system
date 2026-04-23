# Technical Documentation: File Management System

This document explains the architecture and configuration of the File Management System built for WorkOS.

## Architecture

The system maps a local directory on the server to a virtual path in the web application.

- **Storage Location (ROOT_DIR)**: Currently mapped to the `data/` folder in the project root.
- **Web Mapping**: The `/files` route (and its nested paths) mirrors the contents of `ROOT_DIR`.

## Changing the Storage Location

If a developer needs to change the physical location of the files (e.g., to an external drive or a different project folder), they should modify the `ROOT_DIR` constant in the following files:

1.  **`lib/actions/files.ts`**:
    ```typescript
    const ROOT_DIR = path.join(process.cwd(), "data") // Change "data" to your desired path
    ```
2.  **`lib/actions/upload.ts`**:
    ```typescript
    const ROOT_DIR = path.join(process.cwd(), "data") // Must match files.ts
    ```

> [!TIP]
> For production environments, it is recommended to move `ROOT_DIR` to an environment variable (`process.env.STORAGE_PATH`) to allow flexible configuration without code changes.

## Security Considerations

The system includes a `getSafePath` utility function that:
- Normalizes paths.
- Strips any `../` (parent directory) references to prevent path traversal attacks.
- Ensures all operations stay within the defined `ROOT_DIR`.

## Key Components

- **`listFiles(relativePath)`**: Fetches metadata for files/folders.
- **`uploadFile(formData)`**: Handles multipart file uploads.
- **`FileExplorer`**: The main UI component responsible for rendering and user interactions.
