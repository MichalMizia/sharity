## Kolejność tworzenia nowych rzeczy

- Model - Repository - Service - Controller

To wszystko zrobic w folderze /backend

## Jak odpalić lokalnie?

1. Installed docker desktop

docker compose up -d

2. Maven

./mvnw clean install
./mvnw spring-boot:run

3. Backend działa na localhost:8080

4. Żeby przetestować backend: http://localhost:8080/home

## Porady podczas developmentu

### Dokumentacja api http://localhost:8080/swagger-ui.html

### Czyszczenie bazy danych

W application.properties odkomentować linię

```yaml
spring.jpa.hibernate.ddl-auto=create-drop
# i zakomentować
# spring.jpa.hibernate.ddl-auto=update
```

### Uzyskanie zalogowanego użytkownika wewnątrz

```java
User userSession = (User) request.getSession().getAttribute("user");
System.out.println("Session: " + userSession);
```

### Zapisanie pliku używając LocalStorageService

Najlepszy przykład płynie z UserController.java i endpointu {id}/profile-image

```java
// to idzie z application.properties
@Value("${img.base-url}")
    private String baseUrl;

@PostMapping("/{id}/profile-image")
    public ResponseEntity<User> updateUserProfileImage(HttpServletRequest request, @PathVariable Long id,
            @RequestParam("image") MultipartFile image) {
        // id wyciągnięte jest ze sciezki np /users/1/profile-image
        User user = (User) request.getSession().getAttribute("user");

        // sprawdzenie czy user jest zalogowany i czy id ze sciezki jest zgodne z tym zalogowanego
        if (user != null && user.getId().equals(id)) {
            try {
                // local storage service zwraca nazwę pliku, plik jest zachowany w folderz public/uploads
                String filename = storageService.storeFile(image);
                user.setImageSrc(baseUrl + filename);
                // update usera w bazie danych
                User updatedUser = userService.saveUser(user);

                // zamiana wewnatrz obecnej sesji
                request.getSession().setAttribute("user", updatedUser);
                return ResponseEntity.ok(updatedUser);
            } catch (Exception e) {
                return ResponseEntity.status(500).body(null);
            }
        } else {
            // not authorized - 403
            return ResponseEntity.status(403).body(null);
        }
    }
```
