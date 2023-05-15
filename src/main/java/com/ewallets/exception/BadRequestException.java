package com.ewallets.exception;

public class BadRequestException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BadRequestException() {
		super();
	}

	public BadRequestException(String msg) {
		super(msg);
	}

	public BadRequestException(String msg, Throwable t) {
		super(msg, t);
	}
}
