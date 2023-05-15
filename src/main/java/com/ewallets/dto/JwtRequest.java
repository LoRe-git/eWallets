package com.ewallets.dto;

import java.io.Serializable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel
public class JwtRequest implements Serializable {

	private static final long serialVersionUID = 5926468583005150707L;
	
	@ApiModelProperty( notes = "Login user name",name="User Name",required=true, example = "user")
	private String username;
	@ApiModelProperty(notes = "Login password",name="Password",required=true,example="password")
	private String password;
	
	//need default constructor for JSON Parsing
	public JwtRequest()
	{
		
	}

	public JwtRequest(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}