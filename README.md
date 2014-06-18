
# Typescript Playground & Showcase

**...for REST, Spring Boot and HAL+JSON Hypermedia Documents**

**Everything in an example app called "Minecraft Mob Tournament"**


## Typescript - using namespaces

This example uses Typescript compile feature 'namespaces'.

### Requirements

* Typescript compiler (http://www.typescriptlang.org/)

### Build

````
cd browser-namespaces
for FileName in *.ts; do tsc --sourcemap "$FileName" -t ES5 --out "$(basename "$FileName" .ts).js"; done
````

## Playground server

### Requirements

* Java 8 (http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* Maven 3.0.5+ (http://maven.apache.org/download.cgi)

### Build and Run with Maven on Command Line

```
mvn package
java -jar target/playground-server.jar --spring.profiles.active=local
curl -s localhost:8082 | jq  .
```

### Build and Run with IntelliJ IDEA

1. Menu | Run | Edit Configurations...
2. \+ | "Application"
3. Name: Playground Server
4. Main-Class: com.github.nitram509.playground.Application
5. Program-Arguments: --spring.profiles.active=local
6. OK