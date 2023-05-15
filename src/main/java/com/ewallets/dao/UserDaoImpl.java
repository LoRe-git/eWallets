package com.ewallets.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import com.ewallets.model.User;

@Repository
public class UserDaoImpl implements UserDao {

	@PersistenceContext
    private EntityManager entityManger;
	
	@Override
	public User getUserById(long id) {
		String query = "from User u where u.id = :user_id";
		List<User> users = entityManger.createQuery(query.toString(), User.class).setParameter("user_id", id).getResultList();
		return CollectionUtils.isEmpty(users) ? null : users.get(0);
	}

	@Override
	public User findByUsername(String username) {
		String query = "from User u where u.userName = :user_name";
		List<User> users = entityManger.createQuery(query, User.class).setParameter("user_name", username).getResultList();
		return CollectionUtils.isEmpty(users) ? null : users.get(0);
	}

}
