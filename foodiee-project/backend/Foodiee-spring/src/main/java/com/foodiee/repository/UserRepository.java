package com.foodiee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodiee.dao.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	User findByEmail(String email);
	
	boolean existsByEmail(String email);

    boolean existsByPhone(Long phone);

}
