# Aplicación base Angular 11 para BCC Cajamar

## Indice

[Introducción](#Introducción)

[Requisitos](#Requisitos)

[Instalación](#Instalación)

[Estructura del proyecto](#estructura-del-proyecto)

[Ficheros más destacables](#ficheros-mas-destacables)

[Package.json](#package.json)

[Testing](#Testing)

[Paquetizado](#Paquetizado)

[Servidor de desarrollo](#servidor-de-desarrollo)

[Construir documentación con Compodoc](#Compodoc)

[Verificación de código con Prettier](#Prettier)

[Versionado package.json](#Versionado)

[Webpack](#Webpack)

[Jest](#Jest)

[pruebas DoD](#DoD)

## Introducción

Código base de una aplicación basada en Angular 11 creada con @angular/cli.

Este código sirve de base para las aplicaciones generadas a partir del generador basado en Yeoman.

## Requisitos

Los requisitos mínimos y obligatorios para ejecutar correctamente el generador son:

- NPM

- [Git](https://git-scm.com/)

- Yarn

La recomendación es tener todos instalados en sus últimas versiones LTS.

## Instalación

Es importante entender que debido al uso de las librerías angular en su versión `11.0.0-next.5`, es necesario la instalación mediante `yarn`. Esto es debido a que `npm` no reconoce, a fecha de escribir el `README.md`, el atributo `resolutions` que se encuentra en el `package.json`.

```json
  "resolutions": {
    "webpack": "5.0.0-beta.28"
  },
```

Una vez hecha la instalación de dependencias con `yarn`, ya se puede proceder para la ejecución de scripts con `npm`

Aunque no es recomendable usar directamente el código de esta aplicación, ya que para ello deberiamos generar una nueva con el generador de proyectos, los pasos a seguir para usar este código base son los siguientes:

- Clonado del código del repositorio donde se aloje el proyecto base.

- Ejecución de script de instalación.

  ```javascript
  npm install
  npm audit fix --force

  ```

## Estructura del proyecto

La estructura del proyecto base es la siguiente:

```
./
|----/config
|     ├── test
|     │   └── jest.js
|     └── webpack
|         ├── analyze.js
|         ├── base.js
|         ├── common.js
|         └── helpers.js
|----/e2e
|      |---/src
|      |-----|----app.e2e-spec.ts
|      |-----|----app.po.ts
|      |----protractor.conf.js
|      |----tsconfig.e2e.json
|----/src
│       ├── app
│       │   ├── app-routing.module.ts
│       │   ├── app.component.html
│       │   ├── app.component.scss
│       │   ├── app.component.spec.ts
│       │   ├── app.component.ts
│       │   ├── app.module.ts
|       │   ├── dummy
|       │   │   ├── dummy.component.html
|       │   │   ├── dummy.component.spec.ts
|       │   │   └── dummy.component.ts
|       │   └── empty-route
|       │       └── empty-route.component.ts
|       ├── assets
|       │   ├── angular.png
|       │   └── config
|       │       └── appConfig.ts
|       ├── decl.d.ts
|       ├── environments
|       │   ├── environment.prod.ts
|       │   └── environment.ts
|       ├── favicon.ico
|       ├── index.ejs
|       ├── main.single-spa.ts
|       ├── main.ts
|       ├── polyfills.ts
|       ├── single-spa
|       │   ├── asset-url.ts
|       │   └── single-spa-props.ts
|       └── styles.scss
|----.editorconfig
|----.eslintrc.js
|----.gitignore
|----.prettierignore
|----.prettier
|----angular.json
|----browserlist
|----CHANGELOG.md
|----commitlint.config.js
|----custom.root.json
|----Jenkinsfile
|----package.json
|----README.md
|----tsconfig.json
|----tsconfig.app.json
|----tsconfig.spec.json

```

## Ficheros más destacables

Como ficheros a destacar dentro del proyecto base tenemos los siguientes:

| Ficheros/Carpeta         | Descripción                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| protractor.conf.js       | Fichero de configuración para nuestros test end-to-end.                                                                         |
| /environments            | Carpeta donde se encuentran nuestros ficheros de propiedades por entornos.                                                      |
| karma.conf.js            | Fichero de configuración para nuestros test unitarios.                                                                          |
| tsconfig.app.json        | Fichero que extiende la configuración general de Typescript para añadir nuevas reglas que solo afectan a la aplicación Angular. |
| angular.json             | Fichero de configuración de Angular                                                                                             |
| Jenkinsfile              | Fichero declarativo de nuestro pipeline como código.                                                                            |
| package.json             | Fichero que describe la totalidad de nuestra aplicación NPM (ver apartado propio).                                              |
| sonar-project.properties | Fichero de propiedades de Sonar                                                                                                 |
| tsconfig.json            | Fichero de configuración de Typescript                                                                                          |

## Package.json

El fichero package.json es el fichero que define la totalidad del proyecto en el que estamos trabajando.

La definición del fichero que existe en nuestro proyecto base es el siguiente:

```json
{
  "name": "cajamar-base-app",
  "version": "0.1.0",
  "description": "Frontend Scaffolding BCC",
  "files": [
    "dist"
  ],
  "scripts": {
    "analyzed": "webpack-bundle-analyzer dist/cajamarbaseapp/stats.json",
    "prebuild": "rimraf dist",
    "build": "ng build",
    "build:prod": "cross-env NODE_ENV=production ng build --prod",
    "build:single-spa": "cross-env NODE_ENV=production ng build --prod --deploy-url https://localhost:10443 --output-hashing none",
    "build:stats": "cross-env NODE_ENV=production ng build --stats-json",
    "bundleAnalyzed": "run-s prebuild build:stats analyzed",
    "ci:e2e": "ng e2e --protractor-config=./e2e/protractor-ci.conf.js --webdriver-update false",
    "ci:pack": "npm pack",
    "ci:test": "ng test",
    "precommit": "run-s format:fix lint",
    "commit": "npx cz",
    "compodoc": "./node_modules/.bin/compodoc -p tsconfig.app.json -n \"bccfront app documentation for version 0.1.0\"",
    "pree2e": "node ./node_modules/protractor/bin/webdriver-manager update --gecko false --standalone false --ignore_ssl",
    "e2e": "ng e2e",
    "format:fix": "pretty-quick --staged",
    "postinstall": "ngcc",
    "lint": "eslint -c .eslintrc.js --ext .ts ./src",
    "ng": "ng",
    "prepublishOnly": "npm run build:prod",
    "prettier": "npx prettier --write ./src",
    "release": "standard-version",
    "serve": "ng serve",
    "serve:dist": "serve dist/cajamar-base-app -l 3009 -s",
    "serve:single-spa": "ng serve --port 4205 --deploy-url http://localhost:4205 --serve-path / --live-reload false",
    "sonar": "node node_modules/.bin/sonar-scanner",
    "start": "echo Make sure to build bef re calling start && npm run serve:dist",
    "test": "ng test",
    "test:coverage": "ng test --coverage",
    "test:watch": "ng test --watch"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "**/*.ts": [
      "eslint -c .eslintrc.js --ext .ts ./src --fix",
      "prettier --write  ./src"
    ],
    "package.json": [
      "npx sort-package-json"
    ]
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "resolutions": {
    "webpack": "5.1.3"
  },
  "dependencies": {
    "@angular/animations": "11.0.0-next.5",
    "@angular/cdk": "10.2.5",
    "@angular/common": "11.0.0-next.5",
    "@angular/compiler": "11.0.0-next.5",
    "@angular/compiler-cli": "11.0.0-next.5",
    "@angular/core": "11.0.0-next.5",
    "@angular/forms": "11.0.0-next.5",
    "@angular/material": "10.2.5",
    "@angular/platform-browser": "11.0.0-next.5",
    "@angular/platform-browser-dynamic": "11.0.0-next.5",
    "@angular/router": "11.0.0-next.5",
    "@bcc/facade": "latest",
    "core-js": "3.6.5",
    "intersection-observer": "0.5.0",
    "json-stringify": "^1.0.0",
    "rxjs": "6.6.3",
    "single-spa": "5.6.0",
    "single-spa-angular": "4.5.0",
    "tslib": "1.14.1",
    "yarn": "1.22.10",
    "zone.js": "~0.10.1"
  },
  "devDependencies": {
    "@angular-builders/jest": "^9.0.0",
    "@angular-devkit/build-angular": "0.1100.0-next.5",
    "@angular-eslint/builder": "0.5.0-beta.4",
    "@angular-eslint/eslint-plugin": "0.5.0-beta.4",
    "@angular-eslint/eslint-plugin-template": "0.5.0-beta.4",
    "@angular-eslint/schematics": "0.5.0-beta.4",
    "@angular-eslint/template-parser": "0.5.0-beta.4",
    "@angular/cli": "11.0.0-next.5",
    "@angular/compiler-cli": "11.0.0-next.5",
    "@angular/language-service": "11.0.0-next.5",
    "@commitlint/cli": "11.0.0",
    "@commitlint/config-conventional": "11.0.0",
    "@compodoc/compodoc": "1.1.11",
    "@types/eslint": "7.2.0",
    "@types/eslint-scope": "3.7.0",
    "@types/jasmine": "3.5.14",
    "@types/jasminewd2": "2.0.8",
    "@types/jest": "26.0.15",
    "@types/node": "14.14.0",
    "@typescript-eslint/eslint-plugin": "4.5.0",
    "@typescript-eslint/eslint-plugin-tslint": "~4.5.0",
    "@typescript-eslint/parser": "4.5.0",
    "codelyzer": "5.1.2",
    "cz-conventional-changelog": "3.3.0",
    "eslint": "7.11.0",
    "eslint-config-prettier": "6.13.0",
    "eslint-plugin-prettier": "3.1.4",
    "husky": "4.3.0",
    "jasmine-core": "3.5.0",
    "jasmine-reporters": "2.3.2",
    "jasmine-spec-reporter": "4.2.1",
    "jest": "26.6.0",
    "lint-staged": "10.4.0",
    "lodash.merge": "4.6.2",
    "ngx-build-plus": "10.1.1",
    "npm-run-all": "4.1.5",
    "prettier": "2.1.2",
    "prettier-eslint": "11.0.0",
    "pretty-quick": "3.1.0",
    "protractor": "7.0.0",
    "protractor-cucumber-framework": "6.2.1",
    "protractor-html-reporter-2": "1.0.4",
    "rimraf": "3.0.2",
    "serve": "11.3.0",
    "sonarqube-scanner": "2.7.0",
    "standard-version": "9.0.0",
    "ts-node": "9.0.0",
    "typescript": "4.0.3",
    "webpack-bundle-analyzer": "3.9.0",
    "webpack-cli": "4.1.0",
    "webpack-dev-server": "3.11.0"
  }
}

```

| Sección del fichero | Descripción                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| name                | Nombre del proyecto.                                                                                              |
| version             | Versión del proyecto que estamos desarrollando.                                                                   |
| scripts             | Conjunto de scripts NPM que ejecutan ciertas tareas asociadas.                                                    |
| Dependencies        | Dependencias que son requeridas para la correcta ejecución de nuestra aplicación.                                 |
| DevDepencies        | Dependencias que son requeridas solo en tiempo de desarrollo. No estarán incluidas dentro del distribuible final. |

## Testing

Dentro del proyecto base se crearán por defecto configuraciones para dos tipos de testing distintos, tendremos test tanto unitarios como ebd-to-end.

Los test unitarios se ejecutaran bajo Karma JS y los test end-to-end serán ejecutados con protractor.

Para la ejecución de los test tenemos disponibles dos scripts distintos

Ejecución de test unitarios:

```bash
npm run test
npm run test:coverage
```

Ejecución de test end-to-end:

```bash
ng e2e
```

Ambas ejecuciones crearán diversas carpetas al ejecutarse y ejecutar los test correctamente.

Los test unitarios crearán una carpeta "coverage", en la cual tendremos disponibles los reportes de cobertura de nuestros test unitarios

Los test end-to-end crearán una carpeta "protractorReports", en la cual tendremos disponibles los informes sobre la ejecución de nuestros test end-to-end.

## Paquetizado

Dentro de nuestra aplicación base tenemos disponibles dos modos distintos de paquetizado, dependientes del entorno donde se quiera ejecutar la aplicación

En caso de que se quiera generar un paquetizado para un entorno de desarrollo usaremos el siguiente comando

```bash
ng build
```

Si lo que queremos es generar el distribuible que debería ser desplegado en producción, ejecutaremos el comando

```bash
npm run build:prod
```

Ambos comandos nos generarán una carpeta "dist" dentro del raíz de nuestro proyecto, en la que encontraremos la aplicación preparada para desplegar en un servidor.

Nótese de que la ejecución de estos comandos generará una aplicación con las propiedades determinadas por cada entorno, es decir, si ejecutamos el script para generar la aplicación de desarrollo, usaremos el environments de desarrollo, pero si ejecutamos el script para producción, usaremos el fichero de propiedades de producción.

## Servidor de desarrollo

Dentro de la aplicación base tenemos un script que lanzará un servidor en local para usar en tiempo de desarrollo.

Para lanzar el servidor de desarrollo tenemos que ejecutar el siguiente comando, el cual nos abrirá automáticamente una pestaña dentro de nuestro navegador con nuestra aplicación ejecutándose.

```bash
ng serve -o
```

En caso de que queramos abrir la URL manualmente en otro navegador, la URL por defecto que se expone al ejecutar el servidor de desarrollo es la siguiente:

```
http://localhost:4200
```

## Construir documentación con Compodoc

Podemos construir documentación con Compodoc con la siguiente instrucción:

```bash
npm run compodoc
```

## Verificación de código con Prettier

Primero incluya en el archivo .prettierignore los ficheros que deberán de ser obviados por prettier.
Seguidamente lance la siguiente instrucción:

```bash
npm run prettier
```

## Versionado package.json

| install         | Libreria                                | Version                                                         |
| --------------- | --------------------------------------- | --------------------------------------------------------------- |
| dependencies    | @angular/animations                     | 11.0.0-next.5                                                   |
| dependencies    | @angular/cdk                            | 10.2.5                                                          |
| dependencies    | @angular/common                         | 11.0.0-next.5                                                   |
| dependencies    | @angular/compiler                       | 11.0.0-next.5                                                   |
| dependencies    | @angular/compiler-cli                   | 11.0.0-next.5                                                   |
| dependencies    | @angular/core                           | 11.0.0-next.5                                                   |
| dependencies    | @angular/forms                          | 11.0.0-next.5                                                   |
| dependencies    | @angular/material                       | 10.2.5                                                          |
| dependencies    | @angular/platform-browser               | 11.0.0-next.5                                                   |
| dependencies    | @angular/platform-browser-dynamic       | 11.0.0-next.5                                                   |
| dependencies    | @angular/router                         | 11.0.0-next.5                                                   |
| dependencies    | @bcc/facade                             | latest                                                          |
| dependencies    | core-js                                 | 3.6.5                                                           |
| dependencies    | intersection-observer                   | 0.5.0                                                           |
| dependencies    | json-stringify                          | 1.0.0                                                          |
| dependencies    | rxjs                                    | 6.6.3                                                           |
| dependencies    | single-spa                              | 5.6.0                                                           |
| dependencies    | single-spa-angular                      | 4.4.3                                                           |
| dependencies    | tslib                                   | 1.14.1                                                          |
| dependencies    | yarn                                    | 1.22.10                                                         |
| dependencies    | zone.js                                 | ~0.10.1                                                         |
| devDependencies | @angular-builders/jest                  | 9.0.0                                                          |
| devDependencies | @angular-devkit/build-angular           | 0.1100.0-next.5                                                 |
| devDependencies | @angular-eslint/builder                 | 0.5.0-beta.4                                                    |
| devDependencies | @angular-eslint/eslint-plugin           | 0.5.0-beta.4                                                    |
| devDependencies | @angular-eslint/eslint-plugin-template  | 0.5.0-beta.4                                                    |
| devDependencies | @angular-eslint/schematics              | 0.5.0-beta.4                                                    |
| devDependencies | @angular-eslint/template-parser         | 0.5.0-beta.4                                                    |
| devDependencies | @angular/cli                            | 11.0.0-next.5                                                   |
| devDependencies | @angular/compiler-cli                   | 11.0.0-next.5                                                   |
| devDependencies | @angular/language-service               | 11.0.0-next.5                                                   |
| devDependencies | @commitlint/cli                         | 11.0.0                                                          |
| devDependencies | @commitlint/config-conventional         | 11.0.0                                                          |
| devDependencies | @compodoc/compodoc                      | 1.1.11                                                          |
| devDependencies | @types/eslint                           | 7.2.0                                                           |
| devDependencies | @types/eslint-scope                     | 3.7.0                                                           |
| devDependencies | @types/jasmine                          | 3.5.14                                                          |
| devDependencies | @types/jasminewd2                       | 2.0.8                                                           |
| devDependencies | @types/jest                             | 26.0.15                                                         |
| devDependencies | @types/node                             | 14.14.0                                                         |
| devDependencies | @typescript-eslint/eslint-plugin        | 4.5.0                                                           |
| devDependencies | @typescript-eslint/eslint-plugin-tslint | ~4.5.0                                                          |
| devDependencies | @typescript-eslint/parser               | 4.5.0                                                           |
| devDependencies | codelyzer                               | 5.1.2                                                           |
| devDependencies | cz-conventional-changelog               | 3.3.0                                                           |
| devDependencies | eslint                                  | 7.11.0                                                          |
| devDependencies | eslint-config-prettier                  | 3.1.4                                                           |
| devDependencies | eslint-config-prettier                  | 6.13.0                                                          |
| devDependencies | husky                                   | 4.3.0                                                           |
| devDependencies | jasmine-core                            | 3.5.0                                                           |
| devDependencies | jasmine-reporters                       | 2.3.2                                                           |
| devDependencies | jasmine-spec-reporter                   | 4.2.1                                                           |
| devDependencies | jest                                    | 26.6.0                                                          |
| devDependencies | lint-staged                             | 10.4.0                                                         |
| devDependencies | lodash.merge                            | 4.6.2                                                          |
| devDependencies | ngx-build-plus                          | 10.1.1                                                         |
| devDependencies | npm-run-all                             | 4.1.5                                                           |
| devDependencies | prettier                                | 2.1.2                                                           |
| devDependencies | prettier-eslint                         | 11.0.0                                                          |
| devDependencies | pretty-quick                            | 3.1.0                                                           |
| devDependencies | protractor                              | 7.0.0                                                           |
| devDependencies | protractor-cucumber-framework           | 6.2.1                                                           |
| devDependencies | protractor-html-reporter-2              | 1.0.4                                                           |
| devDependencies | rimraf                                  | 3.0.2                                                           |
| devDependencies | serve                                   | 11.3.0                                                         |
| devDependencies | sonarqube-scanner                       | 2.7.0                                                           |
| devDependencies | standard-version                        | 9.0.0                                                           |
| devDependencies | ts-node                                 | 9.0.0                                                           |
| devDependencies | typescript                              | 4.0.3                                                           |
| devDependencies | webpack-bundle-analyzer                 | 3.9.0                                                           |
| devDependencies | webpack-virtual-modules                 | 0.2.1                                                          |


## Pruebas DoD

El proyecto ha pasado unas pruebas DoD, la siguiente tabla las resume:

| Prueba/script         | Action                              | APTO |
| --------------------- | ----------------------------------- | ---- |
| npm i                 | Se instala correctamente            | OK   |
| npm audit fix --force | Lanza el auditor de dependencias    | OK   |
| ng serve              | El proyecto se lanza                | OK   |
| ng build              | El proyecto compila para desarrollo | OK   |
| ng build --prod       | El proyecto compila para produccion | OK   |
| npm run test          | Pasa los test                       | OK   |
| npm run test:coverage | Crea carpeta coverage con jest      | OK   |
| npm run lint          | Pasa los linters                    | OK   |
| npm run compodoc      | Crea documentacion con compodoc     | OK   |
| npm run prettier      | Pasa el lintado de prettier         | OK   |
| npm run release       | Crea release                        | OK   |
| npm run sonar         | Lanza pruebas sonar                 | OK   |
| ng e2e                | Lanza pruebas e2e con protractor    | OK   |
| ng e2e                | Crea reporte con protractor         | OK   |

## Webpack

La construcción de proyecto se realiza mediante webpack 5.0.0-beta.28. No se puede subir de versión, ya que la librería `single-spa-angular` tiene una dependencia con webpack, que una versión superior, le afecta un breaking-change, por lo que habrá que esperar a que esta librería actualice su versión de webpack para poder actualizar nuestra versión de webpack.

Se ha instalado la librería `ngx-build-plus` para poder extender de la configuración de `angular-cli`, lo que hace que la configuración sea más sencilla y lo menos intrusiva para el FW. De esta manera, conseguimos evitar descargarnos plugins de webpack, sólo extendemos para la parte que realmente necesitamos, podemos construir diferentes bundles y no necesitamos hacer un `eject` de la configuración de `angular`.

Gracias a esta libreria, se ha podido simplificar la configuración, como se ha dicho, a un sólo archivo, ya que para produccion se usa la configuración del propio `angular-cli`. En versiones previas, dentro de la carpeta `webpack` teníamos un fichero de `analyzed`, el cual ya no se encuentra. Mas adelante, veremos cómo ejecutarlo desde un script de node. Descripción del árbol de directorio:

> Árbol de directorio:

```tree
config
├── test
│   └── jest.js
└── webpack
    ├── base.js
    ├── common.js
    └── helpers.js

2 directories, 4 files

```

El fichero `base.js` es el fichero que tiene la configuración que necesitamos extender para integrarla en el `angular-cli` de nuestra aplicación.
El fichero `common` es el encargado de hacer el merge entre distintas opciones de configuración, y llamar a la función `singleSpaAngularWebpack`, para generar el bundelizado necesario para nuestro aplicativo.
El fichero `helper,js` son simples funciones de ayuda, esta preparado por si hubiera que agregar más variables necesarias para `webpack` y de ese modo, que la configuración de `webpack` quede lo más limpia posible para su posterior modificación.

> *Importante*
  Para paquetizar en producción hay que cambiar el dominio de la propiedad `eventBus` de `webpack/base.js` para que apunte al dominio donde esté desplegado en producción.
  
  ```javascript
  remotes: {
      eventBus:
        env.NODE_ENV === 'production'
          ? 'eventBus@http://myDomain.org/remoteEntry.js'
          : 'eventBus@http://localhost:3003/remoteEntry.js',
    },
  ```

### Análisis de Archivos

Se tienen los siguientes archivos dentro de `config/webpack`:

| Archivo    | Descripción                                      | Ejecución |
| ---------- | ------------------------------------------------ | --------- |
| base.js    | configuracion base para todas las construcciones |           |
| common.js  | configuracion de arranque de webpack             |           |
| helpers.js | helpers para webpack                             |           |

Se ha modificado el builder del `angular.json` para que pueda extender, como se explica más abajo, para que se pueda extender la configuración de `webpack` propia de `angular.json`, de tal manera que nuestro `custom webpack` se integra en el ciclo de construcción de angular.

Lo único que se debe de modificar es el punto de entrada del módulo a consumir:

```js
  remotes: {
    env.NODE_ENV === 'production'
      ? 'eventBus@http://myDomain.org/remoteEntry.js'
      : 'eventBus@http://localhost:3003/remoteEntry.js',
  },
```

Ya que este paquetizado se usará tanto para la construcción de desarrollo como la de producción. Es importante no obviar este punto a la hora de construir la App.

Distintos Ejemplos de construcción:

Development:

```bash
 $ npm run build
```

Production:

```bash
 $ npm run build --prod
```


### Dependencias

Se han agregado las siguientes dependencias para poder realizar la configuración del proyecto:

- lodash.merge
- single-spa-angular
- Webpack 5.0.0.beta.28
- ngx-build-plus
- webpack-bundle-analyzer

### Upgrade

Por motivos restrictivos de versiones de `webpack`, no se ha podido utilizar una versión de webpack superior.El uso que se hace de las librerías externas que tienen diferentes versiones del bundelizador, no nos lo permiten, no obstante, se ha llevado al límite de la actualización posible. El principal problema que hay, es que en las versiones que se usan, hay objetos que o se ha cambiado su funcionalidad, se ha agregado funcionalidad, o simplemente ha dejado de existir o se ha renombrado, lo que hace que no se pueda "ir un paso más adelante". Por tanto, **no cambiar la versión de webpack ni el atributo de `resolutions`, si no se es consciente de lo que esto implica**

### Scripts

Se han agregado los siguientes `scripts` en el `package.json` del proyecto:

- `build`: Genera el paquetizado de la aplicación por defecto.
- `build:prod`: Genera el paquetizado de la aplicación en modo producción.
- `prepublishOnly`: ejecuta previamente el script comando `npm run build:prod` cuando se llama al comando `npm publish`.
- `serve`: Usa `angular-cli` para levantar la aplicación en modo desarrollo
- `analyze`: Levanta el proyecto de analizar el bundle.
- `build:stats`: Generación del bundle de analizado,
- `bundleAnalyzed`: Script que ejecuta los dos anteriores secuencialmente,

## Angular.json

Se ha agregado un nuevo kit de construcción por uno que permita extender o agregar más configuración a la hora de la construcción (`extraWebpackConfig`):

```json
"build": {
  "builder": "ngx-build-plus:browser",
  "options": {
    "allowedCommonJsDependencies": [
      "single-spa-angular/internals"
    ],
    [...]
    "scripts": [],
    "extraWebpackConfig": "config/webpack/common.js"
  },
  [...]
}
```

Se ha agregado un nuevo builder para la construcción de test, que se verá en el siguiente punto.

## Jest

Se ha cambiado el runner de testing y de test unitarios (no e2e) por `Jest`. Para ello se ha configurado angular
para que pueda seguir usando el comando propio de `ng test`.

En la configuración de angular (`angular.json`) se ha modificado la parte de `test` por esta:

```json
{
  [...],
  "projects": {
    "MI_PROYECTO": {
      [...],
      "architect": {
        [...],
        "test": {
          "builder": "@angular-builders/jest:run",
          "options": {
            "configPath": "./config/test/jest.js",
            "tsConfig": "./tsconfig.spec.json",
            "no-cache": true,
            "verbose": true,
            "watch": false
          },
          "configurations": {}
        },
        [...],
      }
    }
  }
}
```

### Configuración

Para poder instalar `Jest` en Angular, primero, desinstalamos `karma` y sus `plugins`, y borramos los ficheros de configuración de `karma`.

```bash
$ npm remove karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter
  Done!
$ rm ./karma.conf.js ./src/test.ts
  Done!
```

Instalamos Jest y el builder de Jest para Angular;

```bash
$ npm i -D jest @types/jest @angular-builders/jest
  Done!
```

Actualizamos el `tsconfig.spec.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest", "node"],
    "emitDecoratorMetadata": true,
    "esModuleInterop": true
  },
  "files": ["src/polyfills.ts"],
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

Aunque se ejecuten las pruebas unitarias con `Jest`, `Protractor` (test e2e) todavía tiene que usar `Jasmine`. Debido a este hecho, es posible que el IDE se confunda y proponga tipos de `Jasmine` en pruebas unitarias (`Jest`). Para ello, editamos el `tsconfig.json`, que es el archivo de configuración que usa el IDE, indicando que se usen los tipos de `Jest`. Por contrapartida, es que el IDE propondrá tipos `Jest` en tus pruebas `e2e`.

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "ES2020",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": ["node_modules/@types"],
    "lib": ["es2018", "dom"],
    "types": ["jest"]
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true
  }
}
```

### Agregar a ng-cli

Para poder usar el comando `ng test`, hay que modificar el `angular.json` de tal manera:

```json
"projects": {
    ...
    "[mi-proyecto]": {
         ...
         "architect": {
                ...
                "test": {
                          "builder": "@angular-builders/jest:run"
                          "options": {
                                ...
                          }
                }
         }
    }
}
```

La librería `@angular-builder/jest` usa el preset de `jest-preset-angular`, por lo que no es necesario la instalación del mismo,
y ya se encuentra preconfigurada para que pueda funcionar. De todos modos, se ha agregado una pequeña configuración que se encuentra en
`config/test/jest.js`.

> Árbol de directorio:

```tree
    config
    ├── test
    │   └── jest.js
    └── webpack
        ├── analyze.js
        ├── base.js
        ├── common.js
        ├── dev.js
        ├── helpers.js
        └── prod.js

    2 directories, 7 files
```

En el caso de que se quiera agregar nueva configuración al proyecto, se deberá de agregar en el fichero de configuración `jest.js`,
o directamente en el `angular.json`

### Solución de problemas

Los problemas más comunes de trabajar con `Jest` en Angular, están descritos [aquí](https://github.com/just-jeb/angular-builders/tree/9.x.x/packages/jest#troubleshooting)