package com.chinahitech.springbootmp.bean;

import lombok.Data;

@Data
public class EduCourseware {
    private int id;
    private String title;
    private String type; // 文档, 图片, 视频
    private String description;
    private String content; // 内容路径或URL
}
