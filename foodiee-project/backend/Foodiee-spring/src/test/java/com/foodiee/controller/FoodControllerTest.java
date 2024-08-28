//package com.foodiee.controllertest;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//import org.junit.jupiter.api.Test;
//
//class FoodControllertest {
//
//	@Test
//	void test() {
//		fail("Not yet implemented");
//	}
//
//}

package com.foodiee.controller;

import com.foodiee.dao.Food;
import com.foodiee.repository.FoodRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class FoodControllerTest {

    @InjectMocks
    private FoodController foodController;

    @Mock
    private FoodRepository foodRepo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetFood() {
        // Arrange
        String type = "Vegetarian";
        List<Food> mockFoods = Arrays.asList(
            new Food(1, "Vegetable Salad", "A fresh vegetable salad", 4.5f, 10, "salad.png", type),
            new Food(2, "Vegetable Soup", "A hearty vegetable soup", 4.0f, 8, "soup.png", type)
        );

        when(foodRepo.findByType(type)).thenReturn(mockFoods);

        // Act
        List<Food> result = foodController.getFood(type);

        // Assert
        assertEquals(2, result.size());
        assertEquals("Vegetable Salad", result.get(0).getName());
        assertEquals("A fresh vegetable salad", result.get(0).getDescription());
        assertEquals(4.5f, result.get(0).getRating());
        assertEquals(10, result.get(0).getPrice());
        assertEquals("salad.png", result.get(0).getImage());
        assertEquals(type, result.get(0).getType());
        
        assertEquals("Vegetable Soup", result.get(1).getName());
        assertEquals("A hearty vegetable soup", result.get(1).getDescription());
        assertEquals(4.0f, result.get(1).getRating());
        assertEquals(8, result.get(1).getPrice());
        assertEquals("soup.png", result.get(1).getImage());
        assertEquals(type, result.get(1).getType());
    }
}
