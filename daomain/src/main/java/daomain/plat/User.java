package daomain.plat;

import java.sql.Date;

public class User {

  private long id;
  private String userName;
  private String loginName;
  private String passWord;
  private Date cjsj;
  private String zt;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getLoginName() {
    return loginName;
  }

  public void setLoginName(String loginName) {
    this.loginName = loginName;
  }

  public String getPassWord() {
    return passWord;
  }

  public void setPassWord(String passWord) {
    this.passWord = passWord;
  }

  public Date getCjsj() {
    return cjsj;
  }

  public void setCjsj(Date cjsj) {
    this.cjsj = cjsj;
  }

  public String getZt() {
    return zt;
  }

  public void setZt(String zt) {
    this.zt = zt;
  }
}
