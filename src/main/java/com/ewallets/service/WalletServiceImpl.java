package com.ewallets.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ewallets.dao.UserDao;
import com.ewallets.dao.WalletDao;
import com.ewallets.dto.WalletDto;
import com.ewallets.dto.WalletTransferDto;
import com.ewallets.exception.BadRequestException;
import com.ewallets.exception.ResourceNotFound;
import com.ewallets.exception.ValidationException;
import com.ewallets.model.User;
import com.ewallets.model.Wallet;
import com.ewallets.util.TransactionType;
import com.ewallets.util.WalletUtil;

@Service
@Transactional
public class WalletServiceImpl implements WalletService	{
	
	
	@Autowired
	private WalletDao walletDao;
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public WalletDto createWallet(WalletDto newWalletDto) throws SQLException {
		Wallet wallet = WalletUtil.convertToModel(newWalletDto);
		if (newWalletDto.getUser() != null) {
			User user = userDao.getUserById(newWalletDto.getUser().getId());
			if (user != null)
				wallet.setUser(user);
		}
		wallet = walletDao.createWallet(wallet);
		return WalletUtil.convertModelToDto(wallet);
	}

	@Override
	public WalletDto getWallet(Long id) {
		Wallet wallet = walletDao.getWalletById(id);
		return WalletUtil.convertModelToDto(wallet);
	}

	@Override
	public List<WalletDto> getAll() throws SQLException {
		List<Wallet> wallets = walletDao.getWallets();
		List<WalletDto> dtos = new ArrayList<>();
		for (Wallet wallet : wallets) {
			dtos.add(WalletUtil.convertModelToDto(wallet));
		}
		return dtos;
	}

	@Override
	public WalletDto updateBalance(Long id, BigDecimal amount, TransactionType type) throws Exception {
		if(amount != null && amount.compareTo(new BigDecimal(9223372036854775807l)) ==1) {
			throw new BadRequestException("Amount is too big!");
		}
		Wallet updatedWallet = walletDao.getWalletById(id);

		if(updatedWallet == null) {
			throw new ResourceNotFound(id);
		}
		if(TransactionType.DEBIT.equals(type)) {
			// Making the negative value to positive to get deviate functionally
			//When negative is passed for debit type, negating it to debit amount instead of adding. 
			if(amount.compareTo(BigDecimal.ZERO) == -1) {
				amount = amount.negate();
			}
			checkWalletBalance(amount, updatedWallet);
		}

		updatedWallet.setBalance(
				updatedWallet.getBalance().add(TransactionType.CREDIT.equals(type) ? amount : amount.negate()));
		updatedWallet = walletDao.updateWallet(updatedWallet);
		return WalletUtil.convertModelToDto(updatedWallet);
	}

	@Override
	public void transfer(WalletTransferDto transferDto) throws Exception {
		Wallet toWallet;
		Wallet fromWallet;
		if (transferDto.getFromWalletId() > transferDto.getToWalletId()) {
			toWallet = walletDao.getWalletById(transferDto.getToWalletId());
			fromWallet = walletDao.getWalletById(transferDto.getFromWalletId());
		} else {
			fromWallet = walletDao.getWalletById(transferDto.getFromWalletId());
			toWallet = walletDao.getWalletById(transferDto.getToWalletId());
		}

		if (toWallet == null) {
			throw new ResourceNotFound(transferDto.getToWalletId());
		} else if (fromWallet == null) {
			throw new ResourceNotFound(transferDto.getFromWalletId());
		}

		checkWalletBalance(transferDto.getAmount(), fromWallet);

		fromWallet.setBalance(fromWallet.getBalance().add(transferDto.getAmount().negate()));
		toWallet.setBalance(toWallet.getBalance().add(transferDto.getAmount()));

		walletDao.saveOrUpdate(Arrays.asList(fromWallet, toWallet));
	}

	private void checkWalletBalance(BigDecimal amountToDeduct, Wallet wallet) throws Exception {
		if (wallet.getBalance().compareTo(amountToDeduct) < 0) {
			throw new ValidationException("Insufficient wallet balance, available amount: " + wallet.getBalance());
		}
	}
}
