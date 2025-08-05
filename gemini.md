# Gemini CLI Development Guide

This document provides a comprehensive guide for developing this project using a command-line interface (CLI). It covers the project's architecture, key features, and development workflows to ensure efficient and consistent development.

## Project Overview

This is a personal blog and portfolio website built with Next.js and TypeScript. The site is designed to showcase blog posts, project information, and personal interests. It features a clean, modern design with a focus on readability and user experience.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) 14.2.5 (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with `tailwind-variants` for component styling.
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) for accessible component primitives, with custom components built on top.
*   **Content:** [MDX](https://mdxjs.com/) for blog posts, enabling the use of React components within Markdown.
*   **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) for managing server state, particularly for financial product data.
*   **Syntax Highlighting:** [Shiki](https://shiki.matsu.io/) for code block syntax highlighting in blog posts.
*   **Comments:** [Giscus](https://giscus.app/) for a GitHub-based commenting system.
*   **Theming:** [next-themes](https://github.com/pacocoursey/next-themes) for light and dark mode support.
*   **Linting:** [ESLint](https://eslint.org/)
*   **Formatting:** [Prettier](https://prettier.io/)
*   **Deployment:** [Docker](https://www.docker.com/) and [GitHub Actions](https://github.com/features/actions) for CI/CD.

## Project Structure

```
/
├── app/                # Next.js App Router directory
│   ├── (main)/           # Main layout and pages
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── posts/          # Blog pages
│   │       ├── [category]/
│   │       │   └── [slug]/
│   │       │       └── page.tsx  # Individual post page
│   │       └── page.tsx      # Post list page
│   ├── globals.css       # Global styles
│   └── mdx-components.tsx  # Custom components for MDX
├── components/         # Reusable React components
│   ├── ui/               # Shadcn/UI components
│   ├── post/             # Components related to blog posts
│   └── financial/        # Components for the financials page
├── constants/          # Project-wide constants (e.g., metadata)
├── lib/                # Utility functions and libraries
│   ├── posts.ts          # Functions for fetching and processing blog posts
│   └── utils.ts          # General utility functions
├── posts/              # MDX files for blog posts, organized by category
├── public/             # Static assets (images, fonts, etc.)
└── types/              # TypeScript type definitions
```

## Core Features & Implementation

### Blog

*   **Content:** Blog posts are written in MDX and stored in the `posts/` directory, organized by category.
*   **Data Fetching:** The `lib/posts.ts` file contains functions to read the MDX files from the filesystem, parse the frontmatter, and retrieve post data. `getSortedPostsData` is the primary function for fetching and paginating posts.
*   **Rendering:**
    *   The main posts page (`app/posts/page.tsx`) and category pages (`app/posts/[category]/page.tsx`) use the `Posts` component to display a paginated list of post cards.
    *   Individual post pages (`app/posts/[category]/[slug]/page.tsx`) render the MDX content using `next-mdx-remote`.
*   **Search:** A search function is implemented to filter posts by title and content. The `Search.tsx` component handles user input, and the `getSortedPostsData` function in `lib/posts.ts` filters the posts based on the search query.
*   **Table of Contents:** A `CustomTOC` component dynamically generates a table of contents for each post based on the headings in the MDX content.

### Financials Page

*   **Data Fetching:** The `HomeFinancials` component uses TanStack Query (`useQuery`) to fetch financial product data from an external API.
*   **UI:** The page features a tabbed interface to switch between different financial product types (e.g., savings, installment savings). A `DataTable` component is used to display the data in a sortable and searchable table.
*   **Interactivity:** Users can search for products and view detailed information in a modal window.

### Theming

*   **Implementation:** Theming is handled by `next-themes` and the `ThemeProvider` component in `components/ThemeProvider.tsx`.
*   **Switching:** The theme can be switched between light, dark, and system default using a toggle button in the header.

## Data Flow

1.  **Blog Posts:**
    *   User navigates to a posts page.
    *   The `getSortedPostsData` function in `lib/posts.ts` reads MDX files from the `posts/` directory.
    *   The function parses the frontmatter and content, sorts the posts by date, and returns the data for the current page.
    *   The `Posts` component receives the data and renders the post cards.
2.  **Financial Products:**
    *   User navigates to the home page.
    *   The `HomeFinancials` component fetches data from the API using TanStack Query.
    *   The data is cached and displayed in the `DataTable`.
    *   When the user interacts with the table (e.g., sorting, searching), the component re-renders with the updated data.

## Styling and UI

*   **Tailwind CSS:** The project uses Tailwind CSS for utility-first styling. The `tailwind.config.ts` file is configured with custom colors, fonts, and animations.
*   **Radix UI:** Radix UI provides the foundation for accessible UI components.
*   **Custom Components:** The `components/` directory contains custom components that are built using Radix UI and styled with Tailwind CSS. The `cn` utility from `lib/utils.ts` is used to conditionally apply classes.

## Deployment

*   **CI/CD:** The project is configured with a GitHub Actions workflow (`.github/workflows/docker-image.yml`) that builds and pushes a Docker image to a container registry.
*   **Dockerfile:** The `Dockerfile` defines a multi-stage build process to create an optimized production image.

## CLI Development Guide

### Common Commands

*   `npm install`: Install dependencies.
*   `npm run dev`: Start the development server.
*   `npm run build`: Build the application for production.
*   `npm run start`: Start the production server.
*   `npm run lint`: Lint the codebase.
*   `npm run dep:gen`: Generate a `licenses.json` file from the project's dependencies.

### Development Workflow

1.  **Create a new component:**
    *   Create a new file in the `components/` directory (e.g., `components/ui/MyComponent.tsx`).
    *   Use existing components as a reference for styling and structure.
2.  **Add a new blog post:**
    *   Create a new directory in `posts/` with the category and slug (e.g., `posts/new-category/new-post/`).
    *   Create a `content.mdx` file in the new directory with the post content and frontmatter.
3.  **Modify existing functionality:**
    *   Identify the relevant files using the project structure guide.
    *   Use the `read_file` and `read_many_files` tools to understand the existing code.
    *   Use the `replace` or `write_file` tools to make changes.
    *   Run `npm run lint` to check for any new issues.
    *   Run `npm run build` to ensure the changes haven't introduced any build errors.