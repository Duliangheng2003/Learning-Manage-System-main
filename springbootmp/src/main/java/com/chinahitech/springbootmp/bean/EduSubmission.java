package com.chinahitech.springbootmp.bean;

import lombok.Data;

import java.util.Date;

//作业提交
@Data
public class EduSubmission {

    int id;
    // 关联作业id
    int assId;


    // 关联学生id
    int stuId;

    // 作业状态
    int status;

    // 作业名
    String name;

    // 学生提交
    String commit;

    // 提交类型 0为文本 1为文件
    int type;

    Date dueDate;
}
