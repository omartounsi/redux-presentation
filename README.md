# Redux Presentation with React + Vite

This project is a presentation template built using **React**, **Vite**, and **Redux**. It demonstrates the core concepts of Redux, including state management, actions, reducers, and middleware, while showcasing a practical example of a theme switcher.

## Features

- **React with Vite**: A fast and modern development environment.
- **Redux Integration**: Centralized state management for predictable behavior.
- **Framer Motion**: Smooth animations and transitions.
- **Theme Switcher**: Toggle between light and dark themes using Redux.
- **Hot Module Replacement (HMR)**: Instant updates without refreshing the browser.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ESLint Integration**: Ensures code quality and consistency.

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd redux-presentation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/`: Contains the React components, Redux logic, and styles.
  - `redux/`: Redux store and slices.
  - `assets/`: Static assets like images and icons.
- `public/`: Public assets served directly.
- `vite.config.js`: Configuration file for Vite.
- `styles.css`: Tailwind CSS configuration and global styles.

## Key Concepts

### Redux Flow

- **Store**: Centralized state container.
- **Actions**: Plain objects describing what happened.
- **Reducers**: Pure functions that update the state based on actions.
- **Middleware**: Extends Redux with custom functionality.

### Theme Switcher Example

The project includes a theme switcher that demonstrates how to use Redux for managing UI state. The current theme is stored in the Redux store and updated via dispatched actions.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.

## License

This project is licensed under the MIT License.
