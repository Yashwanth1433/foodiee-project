package com.foodiee.controller;

import com.foodiee.dao.Orders;
import com.foodiee.repository.OrdersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

public class OrdersControllerTest {

    @InjectMocks
    private OrdersController ordersController;

    @Mock
    private OrdersRepository ordersRepo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testInsertAllOrders() {
        // Arrange
        List<Orders> ordersList = Arrays.asList(
            new Orders(1, "user1", "Pizza", 2, 20),
            new Orders(2, "user2", "Burger", 1, 15)
        );

        // Act
        ResponseEntity<String> response = ordersController.insertAllOrders(ordersList);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Multiple orders inserted successfully.", response.getBody());

        // Verify that the save method was called for each order
        verify(ordersRepo, times(1)).save(ordersList.get(0)); // Verifies `save` was called once for the first order
        verify(ordersRepo, times(1)).save(ordersList.get(1)); // Verifies `save` was called once for the second order
    }
}
