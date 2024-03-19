package org.springboot.projects.employeemanagementsystem.service;

import org.springboot.projects.employeemanagementsystem.exceptions.EmployeeNotFountException;
import org.springboot.projects.employeemanagementsystem.model.Employee;

import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    Employee updateEmployee(Employee employee, Long id);
    void deleteEmployee(Long id);
    Employee findEmployeeById(Long id);
    List<Employee> getAllEmployees();
}
