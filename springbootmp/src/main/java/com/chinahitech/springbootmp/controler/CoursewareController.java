package com.chinahitech.springbootmp.controler;

import com.chinahitech.springbootmp.bean.EduCourseware;
import com.chinahitech.springbootmp.mapper.CoursewareMapper;
import com.chinahitech.springbootmp.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("courseware")
@CrossOrigin
public class CoursewareController {
    @Autowired
    private CoursewareMapper coursewareMapper;

    @GetMapping("all")
    public R findAll() {
        List<EduCourseware> coursewares = coursewareMapper.selectList(null);
        return R.ok().data("items", coursewares);
    }

    @GetMapping("delete")
    public R deleteByID(@RequestParam int id) {
        System.out.println(id);
        int i = coursewareMapper.deleteById(id);
        if (i > 0) {
            return R.ok();
        } else {
            return R.error();
        }
    }

    @PostMapping("add")
    public R addCourseware(@RequestBody EduCourseware courseware) {
        int i = coursewareMapper.insert(courseware);
        if (i > 0) {
            return R.ok();
        } else {
            return R.error();
        }
    }

    @GetMapping("get")
    public R getCoursewareByID(@RequestParam int id) {
        EduCourseware courseware = coursewareMapper.selectById(id);
        return R.ok().data("courseware", courseware);
    }

    @PostMapping("update")
    public R updateCourseware(@RequestBody EduCourseware courseware) {
        int i = coursewareMapper.updateById(courseware);
        if (i > 0) {
            return R.ok();
        } else {
            return R.error();
        }
    }

    @GetMapping("search")
    public R search(@RequestParam String name) {
        System.out.println(name);
        List<EduCourseware> coursewares = coursewareMapper.selectList(null);
        List<EduCourseware> myCourseware = new ArrayList<>();
        for (EduCourseware a : coursewares) {
            if (a.getTitle().contains(name)) {
                myCourseware.add(a);
            }
        }
        return R.ok().data("items", myCourseware);
    }

    // 上传文件（文档、图片、视频）
    @PostMapping("upload")
    public String upload(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String newFileName = UUID.randomUUID().toString().replace("-", "") + originalFilename;
        String dirPath = System.getProperty("user.dir");
        String path = "/" + "uploadImg" + "/" + newFileName;
        File destFile = new File(dirPath + path);
        if (!destFile.getParentFile().exists()) {
            destFile.getParentFile().mkdirs();
        }
        try {
            file.transferTo(destFile);
            // 将相对路径返回给前端
            return path;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
