To run

## Kolejność tworzenia nowych rzeczy

- Model - Repository - Service - Controller

To wszystko zrobic w folderze /backend

1. Installed docker desktop

docker compose up -d

2. Maven

./mvnw clean install
./mvnw spring-boot:run

3. Backend na localhost:8080

```java
User user = (User) request.getSession().getAttribute("user");
System.out.println("Session in session: " + user);
```
