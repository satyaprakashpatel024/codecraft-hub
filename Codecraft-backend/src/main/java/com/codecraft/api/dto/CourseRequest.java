package com.codecraft.api.dto;

import com.codecraft.api.model.CourseStatus;
import jakarta.validation.constraints.*;

public class CourseRequest {

    @NotBlank(message = "Title is required and must not be blank")
    @Size(min = 3, max = 200, message = "Title must be between 3 and 200 characters")
    private String title;

    @NotBlank(message = "Description is required and must not be blank")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    private String description;

    @NotBlank(message = "Instructor name is required")
    private String instructor;

    @NotBlank(message = "Category is required")
    private String category;

    @Min(value = 0, message = "Price must be zero or greater")
    private double price;

    @Min(value = 1, message = "Duration must be at least 1 hour")
    @Max(value = 1000, message = "Duration cannot exceed 1000 hours")
    private int durationHours;

    private CourseStatus status = CourseStatus.DRAFT;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getDurationHours() { return durationHours; }
    public void setDurationHours(int durationHours) { this.durationHours = durationHours; }

    public CourseStatus getStatus() { return status; }
    public void setStatus(CourseStatus status) { this.status = status; }
}
