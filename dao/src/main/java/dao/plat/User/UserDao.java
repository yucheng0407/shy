package dao.plat.User;

import daomain.plat.User;
import org.springframework.stereotype.Repository;

/**
 * Created by yucheng on 2019/6/13.
 */
@Repository
public interface UserDao extends BaseDao {
     User queryByLoginName(String userLoginName);
}
