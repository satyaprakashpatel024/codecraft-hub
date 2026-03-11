# Codecraft Backend

A Spring Boot REST API for managing courses, built with Java 21 and Maven.

## 🚀 Features

- **Course Management**: Create, read, update, and delete courses
- **JSON File Storage**: Lightweight file-based data persistence
- **Java 8+ Date/Time Support**: Proper handling of modern Java time types
- **Validation**: Input validation for course data
- **RESTful API**: Standard REST endpoints with proper HTTP methods
- **CORS Support**: Configured for frontend integration

## 📋 Prerequisites

- **Java 21** or higher
- **Maven 3.8** or higher
- **Git** for cloning the repository

## 🛠️ Technology Stack

- **Framework**: Spring Boot 4.0.3
- **Language**: Java 21
- **Build Tool**: Maven
- **JSON Processing**: Jackson (with JSR310 support)
- **Validation**: Spring Boot Validation
- **Storage**: JSON file-based persistence

## 📁 Project Structure

```
Codecraft-backend/
├── src/
│   ├── main/
│   │   ├── java/com/codecraft/api/
│   │   │   ├── CodecraftBackendApplication.java  # Main application class
│   │   │   ├── controller/                        # REST controllers
│   │   │   ├── model/                           # Domain models
│   │   │   ├── repository/                      # Data access layer
│   │   │   └── service/                         # Business logic
│   │   └── resources/
│   │       ├── application.properties            # Application configuration
│   │       └── data/                            # Data storage directory
│   └── test/                                    # Test classes
├── data/
│   └── courses.json                             # Course data file
├── pom.xml                                      # Maven configuration
└── README.md                                    # This file
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Codecraft-backend
```

### 2. Build the Application

```bash
mvn clean install
```

### 3. Run the Application

```bash
# Using Maven
mvn spring-boot:run

# Or run the JAR directly
java -jar target/Codecraft-backend-0.0.1-SNAPSHOT.jar
```

### 4. Access the API

The application will start on `http://localhost:8080`

## 📡 API Endpoints

### Course Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/courses` | Get all courses |
| `GET` | `/api/courses/{id}` | Get course by ID |
| `POST` | `/api/courses` | Create a new course |
| `PUT` | `/api/courses/{id}` | Update an existing course |
| `DELETE` | `/api/courses/{id}` | Delete a course |

### Example Requests

#### Get All Courses
```bash
curl -X GET http://localhost:8080/api/courses
```

#### Create a New Course
```bash
curl -X POST http://localhost:8080/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spring Boot Mastery",
    "description": "Learn Spring Boot from scratch",
    "instructor": "John Doe",
    "category": "Backend",
    "price": 299.99,
    "durationHours": 24,
    "status": "PUBLISHED"
  }'
```

#### Update a Course
```bash
curl -X PUT http://localhost:8080/api/courses/{course-id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Course Title",
    "description": "Updated description",
    "instructor": "Jane Doe",
    "category": "Full Stack",
    "price": 399.99,
    "durationHours": 30,
    "status": "PUBLISHED"
  }'
```

#### Delete a Course
```bash
curl -X DELETE http://localhost:8080/api/courses/{course-id}
```

## 📊 Data Model

### Course Entity

```json
{
  "id": "uuid-string",
  "title": "Course Title",
  "description": "Course Description",
  "instructor": "Instructor Name",
  "category": "Category",
  "price": 199.99,
  "durationHours": 24,
  "status": "PUBLISHED|DRAFT|ARCHIVED",
  "createdAt": "2024-01-01T12:00:00",
  "updatedAt": "2024-01-01T12:00:00"
}
```

### Field Validation

| Field | Constraints |
|-------|-------------|
| `title` | Required, max 100 characters |
| `description` | Required, max 500 characters |
| `instructor` | Required, max 100 characters |
| `category` | Required |
| `price` | Required, positive value |
| `durationHours` | Required, positive value |
| `status` | Required, enum values |

## ⚙️ Configuration

### Application Properties

Key configuration options in `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
spring.application.name=Codecraft-backend

# Data Storage
app.storage.file=./Codecraft-backend/data/courses.json

# Jackson JSON Configuration
spring.jackson.date-format=yyyy-MM-dd'T'HH:mm:ss
spring.jackson.serialization.WRITE_DATE_TIMESTAMPS=false

# Logging
logging.level.com.codecrafthub=INFO
logging.level.org.springframework.web=INFO
```

### Environment Variables

You can override configuration using environment variables:

```bash
export SERVER_PORT=8081
export APP_STORAGE_FILE=/path/to/custom/courses.json
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
mvn test

# Run tests with coverage
mvn clean test jacoco:report
```

### Test Structure

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test API endpoints and data flow
- **Repository Tests**: Test data access layer

## 🔧 Development

### Code Style

The project follows Java code conventions:
- Use meaningful variable and method names
- Add Javadoc comments for public APIs
- Follow Spring Boot best practices

### Adding New Features

1. **Model**: Define domain entities in `model/` package
2. **Repository**: Implement data access in `repository/` package
3. **Service**: Add business logic in `service/` package
4. **Controller**: Create REST endpoints in `controller/` package

### Data Storage

The application uses JSON file-based storage:
- Data is stored in `data/courses.json`
- Automatic file creation on first run
- Atomic write operations for data consistency

## 🚀 Deployment

### Build for Production

```bash
mvn clean package -Pprod
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM openjdk:21-jdk-slim
COPY target/Codecraft-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

Build and run:

```bash
docker build -t codecraft-backend .
docker run -p 8080:8080 codecraft-backend
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port 8080
   lsof -i :8080
   # Kill the process
   kill -9 <PID>
   ```

2. **File Permission Issues**
   ```bash
   # Ensure data directory is writable
   chmod 755 data/
   ```

3. **Java Version Issues**
   ```bash
   # Check Java version
   java -version
   # Should be Java 21 or higher
   ```

### Logging

Check application logs for detailed error information:
- Console output during development
- Log files in production environment

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review the troubleshooting section

---

**Built with ❤️ using Spring Boot**
