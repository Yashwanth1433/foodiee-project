package com.foodiee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodiee.dao.User;
import com.foodiee.repository.UserRepository;

@CrossOrigin("*")
@RequestMapping("/user")
@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/")
	public String check() {
		return "Yes i am working fine";
	}
	
	@PostMapping("/insert")
	public ResponseEntity<String> insertUser(@RequestBody User user){
		userRepo.save(user);
		return new ResponseEntity<>("User registered.",HttpStatus.OK);
	}
	
	@PostMapping("/validate")
	public ResponseEntity<String> getPassword(@RequestBody User user){
		
		User userExists = userRepo.findByEmail(user.getEmail());
		
		String password = null;
		
		if(userExists != null) {
			password = userExists.getPassword();
		}
		
		if(password == null) {
			return new ResponseEntity<>("email",HttpStatus.OK);
		} else if(user.getPassword().equals(password)) {
			return new ResponseEntity<>("granted",HttpStatus.OK);
		} else {
			return new ResponseEntity<>("password",HttpStatus.OK);
		}
		
	}
	
	@PostMapping("/isExcists")
	public ResponseEntity<Boolean> eamilOrPhoneExcists(@RequestBody User user){
		
		Boolean isExcists = userRepo.existsByEmail(user.getEmail()) || userRepo.existsByPhone(user.getPhone());
		
		return new ResponseEntity<>(isExcists,HttpStatus.OK);
	}
	
	

}
