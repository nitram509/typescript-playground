
# Typescript Playground & Showcase

**...for REST, Spring Boot and HAL+JSON Hypermedia Documents**

**Everything in an example app called "Minecraft Mob Tournament"**


## Typescript - using namespaces

This example uses Typescript compile feature 'namespaces'.

### Requirements

* Typescript compiler (http://www.typescriptlang.org/)

### Build manually

````
npm install -g tsc
cd browser-namespaces
for FileName in minecraft*.ts; do tsc --sourcemap "$FileName" -t ES5 --out "$(basename "$FileName" .ts).js"; done
# OR
tsc -p tsconfig.json
````

### Build via IntelliJ IDEA

There is an official plugin and documentation from Jetbrains, the vendor of IntelliJ IDEA and Web-Storm.
I highly recommend to have a look at these great tools.
http://www.jetbrains.com/idea/webhelp/transpiling-typescript-to-javascript.html

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