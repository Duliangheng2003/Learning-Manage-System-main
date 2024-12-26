package com.chinahitech.springbootmp.controler;

import com.alibaba.fastjson.JSON;
import com.chinahitech.springbootmp.bean.Admin;
import com.chinahitech.springbootmp.bean.EleUser;
import com.chinahitech.springbootmp.bean.Stu;
import com.chinahitech.springbootmp.mapper.AdminMapper;
import com.chinahitech.springbootmp.mapper.StuMapper;
import com.chinahitech.springbootmp.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class AdminController {
    @Autowired
    private StuMapper stuMapper;
    @Autowired
    private AdminMapper adminMapper;
//   {username:zhangsan,password:123}
    @PostMapping("login")
//  前端传入的数据是JSON格式时，需要使用@RequestBody，并使用对象接收
    public String login(@RequestBody EleUser user){
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());

            HashMap map = new HashMap<>();
            map.put("code",20000);
            HashMap token = new HashMap();
            token.put("token",user.getUsername());
            map.put("data",token);
            return JSON.toJSONString(map);

    }
    @PostMapping("logout")
//  前端传入的数据是JSON格式时，需要使用@RequestParam，并使用对象接收
    public String logout(@RequestParam  String token){
        HashMap map = new HashMap<>();
        map.put("code",20000);
        HashMap data = new HashMap<>();
        data.put("name","登出");
        map.put("code",20000);
        map.put("data",data);
        System.out.println(token);
        return JSON.toJSONString(map);
    }



    //@RequestParam 只能接收  &符号连接的数据  name=zhangsan&age=lisi
    @GetMapping("info")
    public String getUserInfo(@RequestParam  String token){
        HashMap map = new HashMap<>();
        map.put("code",20000);

        HashMap data = new HashMap<>();
        if (token.equals("guest")){
            data.put("roles", new String[]{"guest"});
            data.put("name","游客");
            data.put("introduction","这里是游客页面");
            data.put("avatar","http://localhost:8080/uploadImg/fba6ae58de8d450ab0d22a77a568bceeuser.jpg");
        }
        else if (token.equals("admin"))
        {
            data.put("roles","admin");
            data.put("name","管理员");
            data.put("introduction","管理员 欢迎来到后台管理系统");
            data.put("avatar","http://localhost:8080/uploadImg/fba6ae58de8d450ab0d22a77a568bceeuser.jpg");

        }
        else
        {
            Stu stu = stuMapper.selectById(token);
            if (stu.getType() == 0) {
                data.put("roles", new String[]{"student"});
                data.put("name",stu.getSname());
                data.put("sid", stu.getSid());
                data.put("introduction","欢迎, " + stu.getSname() + ", 这里是学生端主页");
                data.put("avatar",stu.getAvatar());
            } else {
                data.put("roles", new String[]{"teacher"});
                data.put("name",stu.getSname());
                data.put("introduction","欢迎, " + stu.getSname() + ", 这里是教师端主页");
                data.put("avatar",stu.getAvatar());
            }

        }
        map.put("code",20000);
        map.put("data",data);
        return JSON.toJSONString(map);
    }



}
