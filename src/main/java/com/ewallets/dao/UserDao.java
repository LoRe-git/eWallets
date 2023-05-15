package com.ewallets.dao;

import org.springframework.stereotype.Component;

import com.ewallets.model.User;

@Component
public interface UserDao {

	User getUserById(long id);
	User findByUsername(String username);
}
