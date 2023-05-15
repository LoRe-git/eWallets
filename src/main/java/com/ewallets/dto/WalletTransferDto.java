package com.ewallets.dto;

import java.math.BigDecimal;

public class WalletTransferDto {
	private Long fromWalletId;
	private Long toWalletId;
	private BigDecimal amount;
	
	public Long getFromWalletId() {
		return fromWalletId;
	}
	public void setFromWalletId(Long fromWalletId) {
		this.fromWalletId = fromWalletId;
	}
	public Long getToWalletId() {
		return toWalletId;
	}
	public void setToWalletId(Long toWalletId) {
		this.toWalletId = toWalletId;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "WalletTransferDto [fromWalletId=" + fromWalletId + ", toWalletId=" + toWalletId + ", amount=" + amount
				+ "]";
	}
	
}
