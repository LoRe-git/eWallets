package com.ewallets.util;

import java.math.BigDecimal;

import org.springframework.util.StringUtils;

import com.ewallets.dto.WalletDto;
import com.ewallets.dto.WalletTransferDto;
import com.ewallets.exception.BadRequestException;
import com.ewallets.exception.ValidationException;
import com.ewallets.model.Wallet;

public class WalletUtil {

	public static WalletDto convertModelToDto(Wallet wallet) {
		WalletDto dto =new WalletDto(); 
		if(wallet != null) {
			dto.setId(wallet.getId());
			dto.setBalance(wallet.getBalance());
			dto.setUser(UserUtil.convertUserModelToDto(wallet.getUser()));
			dto.setWalletName(wallet.getWalletName());
		}
		return dto;
	}
	
	public static Wallet convertToModel(WalletDto dtoWallet) {
		Wallet model =new Wallet(); 
		if(dtoWallet != null) {
			model.setId(dtoWallet.getId());
			model.setBalance(dtoWallet.getBalance());
			model.setWalletName(dtoWallet.getWalletName());
		}
		return model;
	}
	
	public static void validateWallet(WalletDto walletDto) throws BadRequestException {
		if (walletDto.getUser() == null || walletDto.getUser().getId() == null) {
			throw new BadRequestException("User id cannot be null");
		}
		if(!StringUtils.hasLength(walletDto.getWalletName())) {
			throw new BadRequestException("Wallet Name cannot be null");
		}
		if(walletDto.getBalance() != null && walletDto.getBalance().compareTo(new BigDecimal(9223372036854775807l)) ==1) {
			throw new BadRequestException("Amount is too big!");
		}
	}

	public static void validateWalletTransferReq(WalletTransferDto walletDto)
			throws BadRequestException, ValidationException {
		if (walletDto.getFromWalletId() == null || walletDto.getToWalletId() == null) {
			throw new BadRequestException("From/To Wallet id required!");
		} else if (walletDto.getAmount() == null || walletDto.getAmount().compareTo(BigDecimal.ZERO) != 1) {
			throw new ValidationException("Transfer amount should be positive!");
		} else if (walletDto.getFromWalletId().equals(walletDto.getToWalletId())) {
			throw new ValidationException("Wallets should not be same!");
		}
	}
}
