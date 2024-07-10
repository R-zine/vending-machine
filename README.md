# Welcome to my Vending machine app repository!

## About

This is a simple demo app for simulating vending machine interactions. It's built on React 18, Zustand for state management, ExpressJS with FakerJS for mocking an API, and MUI / emotion/styled for styling.

## Installation

To install both the frontend and the backend dependencies, run

```sh
npm run install:all
```

Note: this is a custom install script that will cd into both parts of the project and run npm install.

## Running the project

To run the full project:

```sh
npm run dev
```

This will start both the ExpressJS server and the Vite/React frontend. Running the project through Concurrently comes with a slight performance penalty, so you can also run the backend and the frontend in two separate terminal instances.

## Notes

### Why Zustand?

Zustand is a very flexible state management library with basically zero boilerplate. For large and complex projects I strongly favor Redux Toolkit, since it offers more structured state managment and also comes with its robust query manager.

### Styling

Material UI is among the largest UI libraries for React and it delivers great results efficiently. The bundled styled component library removes the need to manage class names and CSS files and also enables us to programmatically change styling by passing props to the styled component (see the Controls.tsx component). In a bigger project, I'd definitely recommend moving the UI components into their own files and importing them as needed, but for this project it's just faster and more intuitive to just have them in the same file.

### Data setup

I decided to use FakerJS to generate random "products", so that the FE is fully agnostic. It looks a bit weird with the random pictures and names, but I hope it shows that the app will work with any random data, as long as it follows the general interface. The currency is also randomly generated.

### State management

Most data that could conceivably be useful in multiple components is handled in the global store. The API response is also cached in the global store. In a bigger project (and if we are not using something integrated like RTK), I'd suggest creating a separate store for the API, with a factory which creates new endpoint entries, the functionality to invalidate data, etc.

## Contact

Feel free to message me here or on [linkedIn](https://www.linkedin.com/in/ivan-radev/)
