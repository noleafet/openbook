# ==========================================
# Stage 1: Build and Cache Dependencies
# ==========================================
FROM maven:3.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Define a build argument with a default value
ARG SPRING_PROFILE=prod

# Convert the build-arg into an environment variable inside the image
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILE}

# Copy only the build configuration to cache dependency layers
COPY pom.xml .

# Download dependencies offline (helps speed up subsequent builds)
RUN mvn dependency:go-offline -B

# Copy application source code
COPY src ./src

# Pack the application into a lightweight, non-extracted execution state
RUN mvn clean package -DskipTests

# ADD THIS LINE TO DEBUG THE PATHS:
RUN find . -name "*.jar"

# ==========================================
# Stage 2: Production Minimal JRE Runtime
# ==========================================
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Create a non-root system user for security compliance
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# FIX: Copy the built WAR/JAR file matching any web artifact extension
COPY --from=builder /app/target/openbook-0.0.1-SNAPSHOT.war app.war 

# Expose Spring Boot's default port
EXPOSE 8080

# Environment variables for performance tuning (Perfect for Spring Boot 4 Virtual Threads)
ENV JAVA_OPTS="-XX:+UseG1GC -XX:+UseStringDeduplication"

# Execute the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.war"]
