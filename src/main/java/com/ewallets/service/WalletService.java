package com.ewallets.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ewallets.dto.WalletDto;
import com.ewallets.dto.WalletTransferDto;
import com.ewallets.util.TransactionType;

@Service
public interface WalletService {

	WalletDto createWallet(WalletDto newWalletDto) throws SQLException;
	WalletDto getWallet(Long id);
	List<WalletDto> getAll() throws SQLException;
	WalletDto updateBalance(Long id, BigDecimal amount, TransactionType type) throws Exception;
	void transfer(WalletTransferDto transferDto) throws Exception;
}
