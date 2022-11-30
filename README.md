# Node-TypeScript-FilmsAPI

Example Project on how to build and develop a Films List Endpoint with pagination using TypeScript, MongoDB and Docker.

## Development server setup

### Requirements

    + Docker
    + Visual Studio Code
    + vscode-dev-containers
    
### Steps

1. Open project in a remote container on VSCode
2. In VSCode "Run and Debug" bar run "Install Dependencies" configuration
3. Create your .env file in the project root, you can use the .env.example as an example
4. After having dependencies installed, you can run "Start debug server"
 
### Info

Doing these steps it will run an instance of MongoDB in a Docker Container for development and an instance of NodeJS running under linux who will be used to install the dependencies of the project and run the development server.

Running everything under docker containers make the development and production workflows faster and easier for anyone who will work in the project.

## About the project

### Goals

The main goal of the project is to consume the https://ghibliapi.herokuapp.com Films API, store 200 films in a database and create an endpoint to consume it, the endpoint also should have limit and offset parameters.

## People

The original author of this project is [João Amorim](https://github.com/jpamorimdev)

## License

[MIT](LICENSE)