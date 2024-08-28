package com.foodiee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodiee.dao.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	List<Orders> findByUsername(String username);

}
