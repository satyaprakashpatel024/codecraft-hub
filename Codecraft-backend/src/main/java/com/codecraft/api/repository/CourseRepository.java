package com.codecraft.api.repository;

import com.codecraft.api.model.Course;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class CourseRepository {

    private final File storageFile;
    private final ObjectMapper mapper;

    public CourseRepository(@Value("${app.storage.file}") String storagePath) {
        this.storageFile = new File(storagePath);
        this.mapper = new ObjectMapper();
        this.mapper.registerModule(new JavaTimeModule());
        this.mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        this.mapper.enable(SerializationFeature.INDENT_OUTPUT);
        ensureFileExists();
    }

    private void ensureFileExists() {
        try {
            if (!storageFile.getParentFile().exists()) {
                storageFile.getParentFile().mkdirs();
            }
            if (!storageFile.exists()) {
                mapper.writeValue(storageFile, new ArrayList<>());
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize JSON storage file: " + e.getMessage(), e);
        }
    }

    public List<Course> findAll() {
        try {
            return mapper.readValue(storageFile, new TypeReference<List<Course>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Failed to read courses from storage: " + e.getMessage(), e);
        }
    }

    public Optional<Course> findById(String id) {
        return findAll().stream()
                .filter(c -> c.getId().equals(id))
                .findFirst();
    }

    public Course save(Course course) {
        List<Course> courses = findAll();
        courses.removeIf(c -> c.getId().equals(course.getId()));
        courses.add(course);
        writeAll(courses);
        return course;
    }

    public boolean deleteById(String id) {
        List<Course> courses = findAll();
        boolean removed = courses.removeIf(c -> c.getId().equals(id));
        if (removed) {
            writeAll(courses);
        }
        return removed;
    }

    private void writeAll(List<Course> courses) {
        try {
            mapper.writeValue(storageFile, courses);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save courses to storage: " + e.getMessage(), e);
        }
    }
}
