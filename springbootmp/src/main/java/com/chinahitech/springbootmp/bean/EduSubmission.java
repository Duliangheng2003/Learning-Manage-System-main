package com.chinahitech.springbootmp.bean;

import lombok.Data;

//作业提交
@Data
public class EduSubmission {

    int id;
    // 关联作业id
    int assId;

    // 作业名
    String name;

    // 关联学生id
    int stuId;

    // 作业状态
    int status;

    // 学生提交
    String commit;
}
