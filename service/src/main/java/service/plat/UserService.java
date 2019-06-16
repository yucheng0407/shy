package service.plat;

import dao.plat.User.UserDao;
import daomain.plat.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2019/6/13.
 */
@Service
public class UserService {
    @Autowired
    UserDao userDao;
    public User queryByLoginName(String userLoginName) {
        return userDao.queryByLoginName(userLoginName);
    }

    public List getUserList(Map map) {
        return userDao.queryList(map);
    }
}
