FROM mcr.microsoft.com/openjdk/jdk:21-ubuntu
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]