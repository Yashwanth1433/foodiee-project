package com.foodiee.controller;

import com.foodiee.dao.User;
import com.foodiee.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserRepository userRepo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCheck() {
        // Act
        String response = userController.check();

        // Assert
        assertEquals("Yes i am working fine", response);
    }

    @Test
    public void testInsertUser() {
        // Arrange
        User user = new User(1, "John Doe", "john.doe@example.com", "password123", 1234567890L);

        // Act
        ResponseEntity<String> response = userController.insertUser(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User registered.", response.getBody());

        // Verify save method was called once
        verify(userRepo, times(1)).save(user);
    }

    @Test
    public void testValidatePasswordUserExists() {
        // Arrange
        User user = new User(1, "John Doe", "john.doe@example.com", "password123", 1234567890L);
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);

        // Act
        ResponseEntity<String> response = userController.getPassword(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("granted", response.getBody());
    }

    @Test
    public void testValidatePasswordUserNotFound() {
        // Arrange
        User user = new User(1, "John Doe", "john.doe@example.com", "password123", 1234567890L);
        when(userRepo.findByEmail(user.getEmail())).thenReturn(null);

        // Act
        ResponseEntity<String> response = userController.getPassword(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("email", response.getBody());
    }

    @Test
    public void testValidatePasswordWrongPassword() {
        // Arrange
        User user = new User(1, "John Doe", "john.doe@example.com", "wrongpassword", 1234567890L);
        User existingUser = new User(1, "John Doe", "john.doe@example.com", "password123", 1234567890L);
        when(userRepo.findByEmail(user.getEmail())).thenReturn(existingUser);

        // Act
        ResponseEntity<String> response = userController.getPassword(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("password", response.getBody());
    }

    @Test
    public void testEmailOrPhoneExists() {
        // Arrange
        User user = new User(1, "John Doe", "john.doe@example.com", "password123", 1234567890L);
        when(userRepo.existsByEmail(user.getEmail())).thenReturn(true);
        when(userRepo.existsByPhone(user.getPhone())).thenReturn(false);

        // Act
        ResponseEntity<Boolean> response = userController.eamilOrPhoneExcists(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(true, response.getBody());
    }

    @Test
    public void testEmailOrPhoneNotExists() {
        // Arrange
        User user = new User(1, "John Doe", "john.doe@example.com", "password123", 1234567890L);
        when(userRepo.existsByEmail(user.getEmail())).thenReturn(false);
        when(userRepo.existsByPhone(user.getPhone())).thenReturn(false);

        // Act
        ResponseEntity<Boolean> response = userController.eamilOrPhoneExcists(user);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(false, response.getBody());
    }
}
