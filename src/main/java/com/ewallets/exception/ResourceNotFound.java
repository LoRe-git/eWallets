package com.ewallets.exception;

@SuppressWarnings("unused")
public class ResourceNotFound extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long entityId;

	public ResourceNotFound() {
		super();
	}

	public ResourceNotFound(long entityId) {
		super(String.format("Resource with id %s not found", entityId));
		this.entityId = entityId;
	}

	public ResourceNotFound(String msg, Class<? extends Object> type) {
		super(msg);
	}

}
