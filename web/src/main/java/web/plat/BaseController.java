package web.plat;

import web.plat.data.AjaxReturn;

/**
 * Created by yucheng on 2019/6/9.
 */
public class BaseController {
    public AjaxReturn success(){
        return new AjaxReturn();
    }
}
