package web.plat.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.plat.UserService;
import web.plat.BaseController;
import web.plat.data.AjaxReturn;
import web.plat.resolver.JsonModel;
import java.util.Map;

/**
 * 类的功能描述.
 * 登陆控制
 *
 * @Auther hxy
 * @Date 2017/4/28
 */
@Controller
@RequestMapping(value = "/user")
public class UsersController extends BaseController {
    @Autowired
    UserService userService;
    @ResponseBody
    @RequestMapping(value = "/getUserList")
    public AjaxReturn getUserList(@JsonModel Object map) {
        return success().setData(userService.getUserList((Map)map));
    }

}
