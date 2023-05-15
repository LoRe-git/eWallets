FROM maven:3.6.1-jdk-8-slim AS build
RUN mkdir -p workspace
WORKDIR workspace
COPY pom.xml /workspace
COPY src /workspace/src
COPY ewallet-ui /workspace/ewallet-ui
RUN mvn -f pom.xml clean install -DskipTests=true


FROM openjdk:8-alpine
COPY --from=build /workspace/target/*.jar ewallet.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=docker","-jar","ewallet.jar"]