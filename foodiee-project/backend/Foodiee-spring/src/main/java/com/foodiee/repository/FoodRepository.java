package com.foodiee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodiee.dao.Food;

public interface FoodRepository extends JpaRepository<Food,Integer>{
	
	List<Food> findByType(String type);
	
}
