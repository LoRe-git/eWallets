package com.ewallets.controller;

import static com.ewallets.constants.Constants.API_PREFIX;
import static com.ewallets.constants.Constants.INVALID_CREDENTILAS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ewallets.config.JwtTokenUtil;
import com.ewallets.dto.JwtRequest;
import com.ewallets.dto.JwtResponse;
import com.ewallets.exception.BadRequestException;
import com.ewallets.service.JwtUserDetailsService;

import io.swagger.annotations.Api;


@RestController
@RequestMapping(API_PREFIX)
@CrossOrigin
@Api(tags = { "Authentication Endpoint"}, description = "REST APIs related to authentication. Note: use credentials user/password to get token and enter the token with \"Bearer TOKEN\" in Vaidate field after clicking on Authorize button to use try the end points")
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		if (StringUtils.hasLength(authenticationRequest.getUsername())
				&& StringUtils.hasLength(authenticationRequest.getUsername())) {

			authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

			final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

			final String token = jwtTokenUtil.generateToken(userDetails);
			return ResponseEntity.ok(new JwtResponse(token));

		} else {
			throw new BadRequestException(INVALID_CREDENTILAS);
		}

	}
	
	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new BadRequestException(INVALID_CREDENTILAS, e);
		}
	}
}