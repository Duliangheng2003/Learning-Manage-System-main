package com.chinahitech.springbootmp.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import java.util.Date;

// 课程作业
@Data
public class EduAssignment {
    @TableId(type = IdType.AUTO)
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
