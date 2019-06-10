package web.plat.controller;


import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
public class LoginController extends BaseController {
    /**
     * 登录
     */
//    @ResponseBody
//    @RequestMapping(value = "/login/login", method = RequestMethod.POST)
//    public AjaxReturn login(String username, String password, String captcha, boolean isRememberMe)throws IOException {
//        return null;
//    }
    @RequestMapping(value = "/login")
    public String login() {
        return "login";
    }

    @RequestMapping(value = "/index")
    public String index() {
        SecurityUtils.getSubject();
        return "index";
    }

    @ResponseBody
    @RequestMapping(value = "/loginVli")
    public AjaxReturn loginVli(String userName,String passWord) {
        Subject subject = ShiroUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(userName, passWord, false);
        try {
            subject.login(token);
        } catch (UnknownAccountException e) {
            return success().setMsg(e.getMessage());
        } catch (IncorrectCredentialsException e) {
            return success().setMsg("账号或密码不正确");
        } catch (LockedAccountException e) {
            return success().setMsg("账号已被锁定,请联系管理员");
        } catch (AuthenticationException e) {
            return success().setMsg(e.getMessage());
        }
        return success();
    }

}
