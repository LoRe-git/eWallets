package com.ewallets.controller;


import java.math.BigDecimal;
import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ewallets.constants.Constants;
import com.ewallets.dto.WalletDto;
import com.ewallets.dto.WalletTransferDto;
import com.ewallets.service.WalletService;
import com.ewallets.util.TransactionType;
import com.ewallets.util.WalletUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping(Constants.API_PREFIX + "/wallet")
@CrossOrigin(origins = {"http://localhost:3000"})
@SecurityRequirement(name = "kuehnenagelapi")
@Api(tags = { "Wallet Endpoints"}, description = "REST APIs related to wallet operations.")
public class WalletController {
	
	@Autowired
	private WalletService walletService;

	@ApiOperation(value = "Get Wallet by Wallet id")
	@GetMapping("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public WalletDto getWallet(@PathVariable("id") Long id) throws Exception {
		return walletService.getWallet(id);
	}

	@ApiOperation(value = "Create a Wallet for a using User id as 1.")
	@PostMapping("/create")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public WalletDto create(@RequestBody @Valid WalletDto newWalletDto) throws Exception {
		WalletUtil.validateWallet(newWalletDto);
		return walletService.createWallet(newWalletDto);
	}

	@ApiOperation(value = "TopUp / Withdraw from a Wallet")
	@PutMapping("/update/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public WalletDto updateBalance(@PathVariable("id") Long id, @RequestParam TransactionType type, @RequestParam BigDecimal amount) throws Exception {
		return walletService.updateBalance(id, amount, type);
	}

	@ApiOperation(value = "Get all Wallets")
	@GetMapping("/list")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<WalletDto> getAll() throws Exception {
		return walletService.getAll();
	}
	
	
	@ApiOperation(value = "Transfer amount between wallets")
	@PostMapping("/transfer")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public int transfer(@RequestBody @Valid WalletTransferDto transferDto) throws Exception {
		WalletUtil.validateWalletTransferReq(transferDto);
		walletService.transfer(transferDto);
		return Response.SC_OK;
	}
}
