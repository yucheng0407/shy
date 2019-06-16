package web.plat.controller;


import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import web.plat.BaseController;
import web.plat.data.AjaxReturn;
import web.plat.shiro.ShiroUtils;

/**
 * 类的功能描述.
 * 登陆控制
 *
 * @Auther hxy
 * @Date 2017/4/28
 */
@Controller
@RequestMapping(value = "/index")
public class IndexController extends BaseController {
    @RequestMapping(value = "/user")
    public String login() {
        return "plat/user";
    }

    @RequestMapping(value = "/index")
    public String index() {
        SecurityUtils.getSubject();
        return "index";
    }
}
