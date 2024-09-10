# Angulympique

![Node.js Badge](https://img.shields.io/badge/Node.js-v16.x+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Angular CLI Badge](https://img.shields.io/badge/Angular%20CLI-v18.0.3-red?style=for-the-badge&logo=angular&logoColor=white)
![Angular Badge](https://img.shields.io/badge/Angular-v18.0.3-red?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-v5.4.2-blue?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS Badge](https://img.shields.io/badge/RxJS-v7.8.0-9900FF?style=for-the-badge&logo=reactivex&logoColor=white)

## Description

This project is an Angular application for visualizing data related to the Olympic Games.

## Getting Started

### Prerequisites

- Angular (v18.0.3)
- Node.js (v16.x or later)
- Angular CLI (v18.0.3)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Honayme/AngularLimpique.git
   ```
2. Navigate to the project directory:
   ```sh
   cd olympic-games-starter
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the development server:
```sh
npm start
```

The application will be accessible at `http://localhost:4200`.

## Documentation

### Generating Documentation with Compodoc

This project uses [Compodoc](https://compodoc.app/) to generate documentation.

1. To generate and serve the documentation, run:
   ```sh
   npm run compodoc
   ```

2. Access the documentation at:
   ```
   http://localhost:4000/documentation
   ```

### Scripts

- `ng`: Runs Angular CLI commands
- `start`: Starts the development server
- `build`: Builds the project
- `watch`: Builds the project in watch mode
- `test`: Runs tests
- `compodoc`: Generates and serves the documentation using Compodoc

## Contributing

If you wish to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.


### Notes

- Assurez-vous que `compodoc.json` est bien créé à la racine de votre projet pour que les configurations personnalisées soient prises en compte.
- Le script `compodoc` dans votre `package.json` est déjà correctement configuré pour démarrer le serveur de documentation sur le port 4000 et générer les fichiers de documentation dans le répertoire `documentation`.

Avec ces instructions, vous devriez pouvoir générer automatiquement une documentation technique pour votre projet Angular et la rendre accessible via une URL spécifique.


```
    src/
    └── app/
        ├── core/
        │   └── models/
        │       ├── Charts/
        │       │   └── (Fichiers relatifs aux graphiques)
        │       ├── Olympic.ts
        │       └── Participation.ts
        ├── services/
        │   ├── medals.service.ts
        │   ├── olympic.service.ts
        │   ├── shared.service.ts
        │   ├── statistics.service.ts
        │   └── *.spec.ts (Tests unitaires pour chaque service)
        ├── pages/
        │   ├── dashboard/
        │   │   ├── pie-chart/
        │   │   │   └── (Composants pour les graphiques en camembert)
        │   │   ├── dashboard.component.html
        │   │   ├── dashboard.component.scss
        │   │   ├── dashboard.component.ts
        │   │   └── *.spec.ts (Tests unitaires pour le composant dashboard)
        │   └── not-found/
        │       └── (Composants pour la page 404)
        ├── app.component.*
        │   └── (Fichiers relatifs au composant racine de l'application)
        ├── app.module.ts
        ├── app-routing.module.ts
        ├── assets/
        │   ├── mock/
        │   │   └── (Données simulées pour les tests)
        │   └── .gitkeep
        └── environments/
            ├── environment.prod.ts
            └── environment.ts
```
