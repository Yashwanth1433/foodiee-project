package com.foodiee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodiee.dao.Food;
import com.foodiee.repository.FoodRepository;
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin("*")
@RequestMapping("/food")
@RestController
public class FoodController {
	
	@Autowired
	FoodRepository foodRepo;
	
	@GetMapping("/{type}")
	List<Food> getFood(@PathVariable String type){
		List<Food> foodItems = foodRepo.findByType(type);
		
		return foodItems;
	}
	
}
