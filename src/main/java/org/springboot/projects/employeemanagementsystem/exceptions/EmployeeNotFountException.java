package org.springboot.projects.employeemanagementsystem.exceptions;

import org.springboot.projects.employeemanagementsystem.model.Employee;

public class EmployeeNotFountException extends RuntimeException {
    public EmployeeNotFountException(String message) {
        super(message);
    }
}
