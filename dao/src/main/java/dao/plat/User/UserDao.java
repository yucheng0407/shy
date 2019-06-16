package dao.plat.User;

import daomain.plat.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by yucheng on 2019/6/13.
 */
@Repository
public interface UserDao extends BaseDao {
     User queryByLoginName(String userLoginName);
}
