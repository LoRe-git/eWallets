package com.ewallets.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel
public class UserDto {

	@ApiModelProperty( notes = "User id",name="User id",required=true, example = "1")
	private Long id;
	@ApiModelProperty(hidden=true)
	private String userName;

	public UserDto() {
		super();
	}

	public UserDto(Long id, String userName) {
		super();
		this.id = id;
		this.userName = userName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + "]";
	}


}
