package web.plat.shiro;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * 类的功能描述.
 * shiro 认证
 * @Auther hxy
 * @Date 2017/4/27
 */

public class MyRealm extends AuthorizingRealm {

    private static final Logger logger = LoggerFactory.getLogger(MyRealm.class);

    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
//        UserEntity user = (UserEntity) principals.getPrimaryPrincipal();
//        if(user !=null){
//            //根据用户id查询该用户所有的角色,并加入到shiro的SimpleAuthorizationInfo
//            List<RoleEntity> roles = roleService.queryByUserId(user.getId(), Constant.YESNO.YES.getValue());
//            for (RoleEntity role:roles){
//                    info.addRole(role.getId());
//            }
//            //查询所有该用户授权菜单，并加到shiro的SimpleAuthorizationInfo 做菜单按钮权限控件
//
//            Set<String> permissions = new HashSet<>();
//            List<MenuEntity> menuEntities=null;
//            //超级管理员拥有最高权限
//            if(Constant.SUPERR_USER.equals(user.getId())){
//                menuEntities = menuService.queryList(new HashedMap());
//            }else{
//                //普通帐户权限查询
//               menuEntities = menuService.queryByUserId(user.getId());
//            }
//            for (MenuEntity menuEntity:menuEntities){
//                if(StringUtils.isNotEmpty(menuEntity.getPermission())){
//                    permissions.add(menuEntity.getPermission());
//                }
//            }
//            info.addStringPermissions(permissions);
//        }
        return info;
    }
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String userLoginName= (String) token.getPrincipal();
//        UserEntity user = userService.queryByLoginName(userLoginName);
//        if(user == null){
//            throw new AuthenticationException("帐号密码错误");
//        }
//        if(Constant.ABLE_STATUS.NO.getValue().equals(user.getStatus())){
//            throw new LockedAccountException("帐号被禁用,请联系管理员!");
//        }F
//        //用户对应的机构集合
//        List<String> baidList = userService.queryBapidByUserIdArray(user.getId());
//        //用户对应的部门集合
//        List<String> bapidList= userService.queryBaidByUserIdArray(user.getId());
//        user.setBapidList(bapidList);
//        user.setBaidList(baidList);
        Map user=new HashMap();
        user.put("name","admin");
        user.put("passWord","111");

        SimpleAuthenticationInfo sainfo=new SimpleAuthenticationInfo(user,ShiroUtils.DecodeSalt(user.get("passWord").toString()) ,getName());
        return sainfo;
    }

    /**
     * MD5加密
     * @param credentialsMatcher
     */
    @Override
    public void setCredentialsMatcher(CredentialsMatcher credentialsMatcher) {
        HashedCredentialsMatcher md5CredentialsMatcher = new HashedCredentialsMatcher();
        md5CredentialsMatcher.setHashAlgorithmName(ShiroUtils.algorithmName);
        md5CredentialsMatcher.setHashIterations(ShiroUtils.hashIterations);
        super.setCredentialsMatcher(md5CredentialsMatcher);
    }

}
