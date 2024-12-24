package com.chinahitech.springbootmp.bean;

import lombok.Data;
import java.util.Date;

// 课程作业
@Data
public class EduAssignment {
    int id;
    // 作业名
    String name;
    // 描述
    String description;
    // 截止时间
    Date dueDate;
    // 关联课程id
    int courseId;

}
