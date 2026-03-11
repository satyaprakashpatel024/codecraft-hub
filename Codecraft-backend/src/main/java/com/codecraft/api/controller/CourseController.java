package com.codecraft.api.controller;

import com.codecraft.api.dto.ApiResponse;
import com.codecraft.api.dto.CourseRequest;
import com.codecraft.api.exception.CourseNotFoundException;
import com.codecraft.api.model.Course;
import com.codecraft.api.model.CourseStatus;
import com.codecraft.api.repository.CourseRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Course>>> getAllCourses(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category) {

        List<Course> courses = courseRepository.findAll();

        if (status != null && !status.isBlank()) {
            CourseStatus filterStatus = CourseStatus.fromValue(status);
            courses = courses.stream()
                    .filter(c -> c.getStatus() == filterStatus)
                    .toList();
        }

        if (category != null && !category.isBlank()) {
            courses = courses.stream()
                    .filter(c -> c.getCategory().equalsIgnoreCase(category))
                    .toList();
        }

        return ResponseEntity.ok(
                ApiResponse.ok("Retrieved " + courses.size() + " course(s) successfully", courses)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Course>> getCourseById(@PathVariable String id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException(id));
        return ResponseEntity.ok(ApiResponse.ok("Course retrieved successfully", course));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Course>> createCourse(@Valid @RequestBody CourseRequest request) {
        LocalDateTime now = LocalDateTime.now();
        Course course = new Course(
                UUID.randomUUID().toString(),
                request.getTitle(),
                request.getDescription(),
                request.getInstructor(),
                request.getCategory(),
                request.getPrice(),
                request.getDurationHours(),
                request.getStatus() != null ? request.getStatus() : CourseStatus.DRAFT,
                now,
                now
        );
        Course saved = courseRepository.save(course);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Course created successfully", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Course>> updateCourse(
            @PathVariable String id,
            @Valid @RequestBody CourseRequest request) {

        Course existing = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException(id));

        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        existing.setInstructor(request.getInstructor());
        existing.setCategory(request.getCategory());
        existing.setPrice(request.getPrice());
        existing.setDurationHours(request.getDurationHours());
        existing.setStatus(request.getStatus() != null ? request.getStatus() : existing.getStatus());
        existing.setUpdatedAt(LocalDateTime.now());

        Course updated = courseRepository.save(existing);
        return ResponseEntity.ok(ApiResponse.ok("Course updated successfully", updated));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Course>> updateCourseStatus(
            @PathVariable String id,
            @RequestParam String status) {

        Course existing = courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException(id));

        CourseStatus newStatus = CourseStatus.fromValue(status);
        existing.setStatus(newStatus);
        existing.setUpdatedAt(LocalDateTime.now());

        Course updated = courseRepository.save(existing);
        return ResponseEntity.ok(ApiResponse.ok("Course status updated to " + newStatus.getValue(), updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable String id) {
        boolean deleted = courseRepository.deleteById(id);
        if (!deleted) {
            throw new CourseNotFoundException(id);
        }
        return ResponseEntity.ok(ApiResponse.ok("Course deleted successfully", null));
    }
}
