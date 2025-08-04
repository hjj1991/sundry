
# Project Overview

This is a personal blog and portfolio website built with Next.js and TypeScript. The site is designed to showcase blog posts, project information, and personal interests. It features a clean, modern design with a focus on readability and user experience.

## Key Features

*   **Blog:** The core of the site is a blog with posts written in MDX.
*   **Syntax Highlighting:** Code blocks in blog posts are highlighted using `shiki`.
*   **Table of Contents:** Automatically generated table of contents for each blog post.
*   **Comments:** Giscus is used for comments on blog posts.
*   **Theming:** Light and dark mode support using `next-themes`.
*   **Financials Page:** A page to display financial product information.
*   **License Page:** A page to display open source license information.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) and custom components.
*   **Content:** [MDX](https://mdxjs.com/) for blog posts.
*   **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
*   **Linting:** [ESLint](https://eslint.org/)
*   **Formatting:** [Prettier](https://prettier.io/)

## Project Structure

*   `app/`: Contains the main application logic, including page routes and layouts.
*   `components/`: Reusable React components.
*   `constants/`: Project-wide constants.
*   `lib/`: Utility functions and libraries.
*   `posts/`: MDX files for blog posts.
*   `public/`: Static assets like images and fonts.
*   `types/`: TypeScript type definitions.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```
3.  **Build for production:**
    ```bash
    npm run build
    ```
4.  **Start the production server:**
    ```bash
    npm run start
    ```

## Scripts

*   `dev`: Starts the development server.
*   `build`: Builds the application for production.
*   `start`: Starts the production server.
*   `lint`: Lints the codebase using ESLint.
*   `dep:gen`: Generates a `licenses.json` file from the project's dependencies.
