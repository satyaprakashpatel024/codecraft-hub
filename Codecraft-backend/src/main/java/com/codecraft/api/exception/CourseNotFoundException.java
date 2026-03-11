package com.codecraft.api.exception;

public class CourseNotFoundException extends RuntimeException {

    public CourseNotFoundException(String id) {
        super("Course not found with id: " + id);
    }
}
