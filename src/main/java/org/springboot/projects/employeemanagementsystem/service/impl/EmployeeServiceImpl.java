package org.springboot.projects.employeemanagementsystem.service.impl;

import lombok.RequiredArgsConstructor;
import org.springboot.projects.employeemanagementsystem.exceptions.EmployeeExistsException;
import org.springboot.projects.employeemanagementsystem.exceptions.EmployeeNotFountException;
import org.springboot.projects.employeemanagementsystem.model.Employee;
import org.springboot.projects.employeemanagementsystem.repository.EmployeeRepository;
import org.springboot.projects.employeemanagementsystem.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    @Override
    public Employee saveEmployee(Employee employee) {
        if(existsByEmailId(employee.getEmail())){
            throw new EmployeeExistsException("Employee with email " + employee.getEmail() + " already exists");
        }
        return employeeRepository.save(employee);
    }

    private boolean existsByEmailId(String email) {
        return employeeRepository.existsByEmail(email);
    }

    @Override
    public Employee updateEmployee(Employee employee, Long id) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        if(existingEmployee == null){
            throw new EmployeeNotFountException("Employee not found : " + id );
        }
        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setDepartment(employee.getDepartment());
        return employeeRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        if(!employeeRepository.existsById(id)) {
            throw new EmployeeNotFountException("Employee not found : " + id);
        }
         employeeRepository.deleteById(id);
    }

    @Override
    public Employee findEmployeeById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFountException("Employee not found : " + id));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
