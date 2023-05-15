package com.ewallets.dao;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ewallets.model.User;
import com.ewallets.model.Wallet;

@Repository
public class WalletDaoImpl implements WalletDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@PersistenceContext
    private EntityManager entityManger;
	
	@Override
	public Wallet createWallet(Wallet newWallet) throws SQLException {
		try{
			entityManger.persist(newWallet);
		}catch (Exception e) {
			throw new SQLException(e.getMessage());
		}
		return newWallet;
	}

	@SuppressWarnings("unchecked" )
	@Override
	public List<Wallet> getWallets() throws SQLException {
		String query = "from Wallet";
		try {
			List<Wallet> list = entityManger.createQuery(query, Wallet.class).getResultList();
			 return list;
		}catch (Exception e) {
			throw new SQLException(e.getMessage());
		}
	}

	@Override
	public Wallet getWalletById(Long id) {
		return entityManger.find(Wallet.class, id);
	}

	@Override
	public Wallet updateWallet(Wallet updatedWallet) {
		Transaction transaction = null;
		try(Session session = sessionFactory.openSession()){
			transaction = session.beginTransaction();
			session.saveOrUpdate(updatedWallet);
			transaction.commit();
		}catch (Exception e) {
			if(transaction != null)
				transaction.rollback();
		}
		return updatedWallet;
	}

	@Override
	public void saveOrUpdate(List<Wallet> wallets) {

		Transaction transaction = null;
		try(Session session = sessionFactory.openSession()){
			transaction = session.beginTransaction();
			for (Wallet wallet : wallets) {
				session.saveOrUpdate(wallet);
			}
			transaction.commit();
		}catch (Exception e) {
			if(transaction != null)
				transaction.rollback();
		}		
	}

}
