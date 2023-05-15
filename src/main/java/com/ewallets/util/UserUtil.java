package com.ewallets.util;

import com.ewallets.dto.UserDto;
import com.ewallets.model.User;

public class UserUtil {

	public static UserDto convertUserModelToDto(User user) {
		UserDto dto = new UserDto();
		dto.setId(user.getId());
		dto.setUserName(user.getUserName());
		return dto;
	}
	
	public static User convertUserDtoToModel(UserDto userDto) {
		User userMdoel = new User();
		userMdoel.setId(userDto.getId());
		userMdoel.setUserName(userDto.getUserName());
		return userMdoel;
	}
}
