package org.springboot.projects.employeemanagementsystem.exceptions;

public class EmployeeExistsException extends RuntimeException {
    public EmployeeExistsException(String message) {
        super(message);
    }
}
