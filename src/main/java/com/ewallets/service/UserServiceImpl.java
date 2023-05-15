package com.ewallets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ewallets.dao.UserDao;
import com.ewallets.dto.UserDto;
import com.ewallets.model.User;
import com.ewallets.util.UserUtil;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Override
	public UserDto getUserById(long id) {
		User user = userDao.getUserById(id);
		return UserUtil.convertUserModelToDto(user);
	}

}
