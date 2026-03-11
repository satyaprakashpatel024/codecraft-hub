package com.codecraft.api.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum CourseStatus {
    DRAFT("DRAFT"),
    PUBLISHED("PUBLISHED"),
    ARCHIVED("ARCHIVED");

    private final String value;

    CourseStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static CourseStatus fromValue(String value) {
        for (CourseStatus status : CourseStatus.values()) {
            if (status.value.equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException(
            "Invalid status: '" + value + "'. Allowed values: DRAFT, PUBLISHED, ARCHIVED"
        );
    }
}
