# OpenBook Backend

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.7-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21%2B-ED8B00?logo=openjdk&logoColor=white)](https://www.oracle.com/java/technologies/downloads/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-supported-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-Swagger-85EA2D?logo=swagger&logoColor=black)](https://swagger.io/specification/)

OpenBook is a Spring Boot backend for managing a structured personal library. Its domain model represents books as a hierarchy of chapters, pages, and lines, with users, user-book relationships, and bookmarks. The application exposes a JSON REST API, persists data in PostgreSQL through Spring Data JPA, and applies schema changes with Flyway.

The service is packaged as a WAR and includes JWT-based stateless authentication, request validation, OpenAPI documentation, Actuator metrics, and Prometheus export.

## Contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Database setup](#database-setup)
- [Build and run](#build-and-run)
- [API documentation](#api-documentation)
- [REST API](#rest-api)
- [Authentication](#authentication)
- [Project structure](#project-structure)
- [Testing and quality](#testing-and-quality)
- [Deployment](#deployment)

## Features

| Area | Description |
| --- | --- |
| Book hierarchy | Create and manage books, chapters, pages, and lines. |
| Users | Register, retrieve, update, and delete users. |
| Authentication | Authenticate credentials and issue JWT bearer tokens. |
| User libraries | Associate users with books and list books by user. |
| Bookmarks | Create, list, and delete bookmarks; authenticated users see bookmarks for their books. |
| Persistence | PostgreSQL database access through JPA and Hibernate. |
| Database migrations | Flyway migrations under `src/main/resources/db/migration`. |
| API documentation | OpenAPI JSON and Swagger UI through springdoc. |
| Observability | Spring Boot Actuator and Prometheus metrics. |

## Technology stack

| Category | Technology |
| --- | --- |
| Runtime | Java 21 or newer |
| Framework | Spring Boot 4.0.7, Spring MVC, Spring Security |
| Persistence | Spring Data JPA, Hibernate, PostgreSQL |
| Schema management | Flyway |
| Authentication | JWT with JJWT 0.13.0 |
| API documentation | springdoc OpenAPI 3.0.3 and Swagger UI |
| Mapping and validation | MapStruct, Lombok, Jakarta Validation |
| Build | Maven Wrapper (`mvnw`) |
| Testing | Spring Boot Test, Spring MVC Test, JUnit |
| Metrics | Spring Boot Actuator, Micrometer Prometheus registry |

## Prerequisites

Install the following tools before starting the service:

| Tool | Version | Purpose |
| --- | --- | --- |
| JDK | 21 or newer | Compiles and runs the application. |
| PostgreSQL | A supported recent version | Stores application data. |
| Git | Recent version | Checks out the repository. |
| Maven | Optional | The Maven Wrapper is included, so a separate Maven installation is not required. |
| Gradle | Optional | Required only if the project is converted to or supplied with a Gradle build. |

Verify Java and PostgreSQL client installations:

```bash
java --version
psql --version
```

## Configuration

The default configuration is stored in `src/main/resources/application.yml`. The development profile is stored in `src/main/resources/application-dev.yml`; it uses the same database settings but increases root logging from `info` to `debug`.

### Database properties

The YAML uses a custom `vars.db` section to build the PostgreSQL JDBC URL:

| Property | Default | Description |
| --- | --- | --- |
| `vars.db.host` | `localhost` | PostgreSQL host. |
| `vars.db.name` | `openbook` | PostgreSQL database name. |
| `vars.db.user` | `leafnote` | PostgreSQL username. |
| `vars.db.pass` | `leafnote` | PostgreSQL password. |
| `spring.datasource.url` | `jdbc:postgresql://${vars.db.host}:5432/${vars.db.name}?sslmode=disable` | JDBC connection URL assembled from the database variables. |
| `spring.datasource.username` | `${vars.db.user}` | Datasource username. |
| `spring.datasource.password` | `${vars.db.pass}` | Datasource password. |

For a non-local environment, override these values through Spring configuration or environment variables. Do not commit production credentials to configuration files.

### Application properties

| Property | Default | Description |
| --- | --- | --- |
| `spring.application.name` | `openbook` | Application name. |
| `spring.jackson.default-property-inclusion` | `non_null` | Omits null properties from JSON responses. |
| `spring.jpa.properties.hibernate.ddl-auto` | `validate` | Validates the schema without creating or modifying tables. |
| `spring.jpa.properties.hibernate.dialect` | `org.hibernate.dialect.PostgreSQLDialect` | Hibernate PostgreSQL dialect. |
| `spring.jpa.show-sql` | `false` | Controls SQL statement logging. |
| `logging.level.root` | `info` (`debug` in dev) | Root logging level. |
| `spring.flyway.enabled` | enabled by default | Runs Flyway migrations at startup. |

### API, security, and observability properties

| Property | Default | Description |
| --- | --- | --- |
| `jwt.secret` | Built-in development fallback | Secret used to sign JWTs. Set `JWT_SECRET` outside local development. |
| `jwt.expiration` | `86400000` | Token lifetime in milliseconds, currently 24 hours. |
| `springdoc.swagger-ui.path` | `/api-docs.html` | Swagger UI path. |
| `springdoc.swagger-ui.syntaxHighlight.theme` | `light` | Swagger UI syntax highlighting theme. |
| `management.endpoints.web.exposure.include` | `prometheus` | Exposes the Prometheus Actuator endpoint. |
| `management.prometheus.metrics.export.enabled` | `true` | Enables Prometheus metrics export. |

The JWT secret supports the environment variable form below:

```bash
export JWT_SECRET='replace-with-a-long-random-secret'
```

### Profiles

Run with the development profile when more verbose logging is useful:

```bash
SPRING_PROFILES_ACTIVE=dev ./mvnw spring-boot:run
```

The profile file is named `application-dev.yml`, so the profile name is `dev`.

## Database setup

Create a PostgreSQL database and user matching the defaults, or provide equivalent overrides:

```sql

```

Flyway applies versioned migrations from `src/main/resources/db/migration` when the application starts. Hibernate is configured with `ddl-auto: validate`, so the database schema must be compatible with the migrations before the application can start successfully.

For a new environment, start with a clean `openbook` database. For an existing database, review the Flyway baseline settings in `application.yml` before enabling the application.

## Build and run

### Maven Wrapper

The repository includes Maven Wrapper scripts. On Linux or macOS:

```bash
./mvnw clean verify
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd clean verify
.\mvnw.cmd spring-boot:run
```

Run the packaged WAR with:

```bash
java -jar target/openbook-0.0.1-SNAPSHOT.war
```

Start with an explicit profile or configuration override:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
./mvnw spring-boot:run -Dspring-boot.run.arguments="--vars.db.host=localhost"
```

The application uses Spring Boot's default HTTP port, `8080`, unless `server.port` is supplied as an override.

### Maven installation

If Maven is installed globally, the equivalent commands are:

```bash
mvn clean verify
mvn spring-boot:run
```

### Gradle equivalent

This repository currently contains a Maven build (`pom.xml`) and does not include `build.gradle` or a Gradle Wrapper. If a Gradle build is added, the conventional equivalents are:

```bash
./gradlew clean build
./gradlew bootRun
java -jar build/libs/openbook-0.0.1-SNAPSHOT.war
```

Use the Gradle commands only after a compatible Gradle build has been supplied; Maven Wrapper commands are the supported commands for the current repository.

## API documentation

With the application running, open:

- [Swagger UI](http://localhost:8080/api-docs.html)
- [OpenAPI JSON](http://localhost:8080/v3/api-docs)
- [Prometheus metrics](http://localhost:8080/actuator/prometheus)

The OpenAPI endpoints and `/api/**` endpoints are permitted by the current security configuration. Other application routes require authentication.

## REST API

The controllers return a project `ApiResponse` wrapper rather than returning DTOs directly. Successful create operations use `201 Created`; successful reads and updates use `200 OK`; deletes use the status defined by the response payload. Request bodies marked as validated are checked with Jakarta Validation.

### Users and authentication

| Method | Endpoint | Purpose | Body |
| --- | --- | --- | --- |
| `GET` | `/api/users` | List users. | None |
| `GET` | `/api/users/{id}` | Get a user by ID. | None |
| `POST` | `/api/users` | Create a user. | `UserDTO` |
| `PUT` | `/api/users/{id}` | Update a user. | `UserDTO` |
| `DELETE` | `/api/users/{id}` | Delete a user. | None |
| `POST` | `/api/users/authenticate` | Validate credentials and return a JWT plus user data. | `AuthRequest` |

The controller also contains a username lookup method, but it currently has no mapping annotation and therefore is not exposed as a REST endpoint.

### Books

| Method | Endpoint | Purpose | Body |
| --- | --- | --- | --- |
| `GET` | `/api/books` | List all books. | None |
| `GET` | `/api/books/{id}` | Get a book by ID. | None |
| `POST` | `/api/books` | Create a book. | `BookDTO` |
| `PUT` | `/api/books/{id}` | Update a book. | `BookDTO` |
| `DELETE` | `/api/books/{id}` | Delete a book. | None |

### Chapters, pages, and lines

| Method | Endpoint | Purpose | Body |
| --- | --- | --- | --- |
| `GET` | `/api/chapters` | List all chapters. | None |
| `GET` | `/api/chapters/{id}` | Get a chapter by ID. | None |
| `POST` | `/api/chapters` | Create a chapter. | `ChapterRequestDTO` |
| `PUT` | `/api/chapters/{id}` | Update a chapter. | `ChapterRequestDTO` |
| `DELETE` | `/api/chapters/{id}` | Delete a chapter. | None |
| `GET` | `/api/pages` | List all pages. | None |
| `GET` | `/api/pages/{id}` | Get a page by ID. | None |
| `POST` | `/api/pages` | Create a page. | `PageRequestDTO` |
| `PUT` | `/api/pages/{id}` | Update a page. | `PageRequestDTO` |
| `DELETE` | `/api/pages/{id}` | Delete a page. | None |
| `GET` | `/api/lines` | List all lines. | None |
| `GET` | `/api/lines/{id}` | Get a line by ID. | None |
| `POST` | `/api/lines` | Create a line. | `LineRequestDTO` |
| `PUT` | `/api/lines/{id}` | Update a line. | `LineRequestDTO` |
| `DELETE` | `/api/lines/{id}` | Delete a line. | None |

### User-book relationships

| Method | Endpoint | Purpose | Body |
| --- | --- | --- | --- |
| `GET` | `/api/userbooks/users/{userId}/books` | List books associated with a user. | None |
| `POST` | `/api/userbooks` | Create a user-book relationship. | `UserBookRequestDTO` |
| `DELETE` | `/api/userbooks/{id}` | Delete a user-book relationship. | None |

### Bookmarks

| Method | Endpoint | Purpose | Body |
| --- | --- | --- | --- |
| `GET` | `/api/bookmarks` | List bookmarks. Authenticated users receive bookmarks for their books; unauthenticated requests use the general service path. | None |
| `POST` | `/api/bookmarks` | Create a bookmark. | `BookmarkRequestDTO` |
| `DELETE` | `/api/bookmarks/{id}` | Delete a bookmark. | None |

### Example authentication request

```bash
curl -X POST http://localhost:8080/api/users/authenticate \
  -H 'Content-Type: application/json' \
  -d '{"username":"your-username","password":"your-password"}'
```

Use the returned token for protected application endpoints:

```bash
curl http://localhost:8080/some-protected-route \
  -H 'Authorization: Bearer <token>'
```

## Authentication

Authentication is stateless and JWT-based:

1. Submit credentials to `POST /api/users/authenticate`.
2. Store the returned token securely on the client.
3. Send it in the `Authorization: Bearer <token>` header for protected requests.
4. The JWT filter validates the token before the request reaches the controller.

CSRF is disabled because the configured security model is stateless. The current security rules explicitly permit `/api/**`, `/swagger-ui/**`, and `/v3/api-docs/**`; review these rules before exposing the service publicly.

## Project structure

```text
backend/
├── src/main/java/com/leafnote/openbook/
│   ├── aspect/              # Controller logging and book-chain aspects
│   ├── annotation/          # Custom method and validation annotations
│   ├── config/              # Security, CORS, JPA, and password configuration
│   ├── controller/          # REST controllers and endpoint mappings
│   ├── dto/                 # Request and response data transfer objects
│   ├── exception/           # Domain exceptions and global error handling
│   ├── mapper/              # MapStruct entity/DTO mappers
│   ├── model/               # JPA entities and domain models
│   ├── repository/          # Spring Data JPA repositories
│   ├── security/            # JWT filter and authenticated-user support
│   ├── service/              # Service interfaces and implementations
│   └── util/                # Response, role, and conversion utilities
├── src/main/resources/
│   ├── db/migration/        # Flyway SQL migrations
│   ├── application.yml      # Default configuration
│   └── application-dev.yml  # Development profile configuration
├── src/test/java/           # Unit and integration tests
├── .mvn/                    # Maven Wrapper support files
├── mvnw                     # Maven Wrapper for Unix-like systems
├── mvnw.cmd                 # Maven Wrapper for Windows
├── pom.xml                  # Maven project definition
└── sonar-project.properties # SonarQube analysis configuration
```

## Testing and quality

Run the test suite and verification lifecycle with:

```bash
./mvnw test
./mvnw verify
```

Run static analysis configured for the repository with:

```bash
./mvnw clean verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar "-Dsonar.projectKey=openbook_backend" "-Dsonar.projectName=openbook_backend" "-Dsonar.host.url=http://localhost:9000" "-Dsonar.token=<token>"
```

SonarQube connectivity and project credentials must be configured in the environment or in the SonarQube scanner configuration before running analysis.

## Deployment

Build the WAR and deploy it to a compatible servlet container, or run it directly with Spring Boot:

```bash
./mvnw clean package
java -jar target/openbook-0.0.1-SNAPSHOT.war
```

Before deployment, provide an external `JWT_SECRET`, production PostgreSQL credentials, a non-development logging configuration, and an appropriate strategy for exposing or restricting Actuator and Swagger endpoints. Never use the development JWT fallback or default database credentials in production.

## Further reading

- [Spring Boot documentation](https://docs.spring.io/spring-boot/index.html)
- [Spring Security documentation](https://docs.spring.io/spring-security/reference/)
- [Spring Data JPA documentation](https://spring.io/projects/spring-data-jpa)
- [Flyway documentation](https://documentation.red-gate.com/flyway)
- [OpenAPI Specification](https://swagger.io/specification/)
