module.exports=function(grunt){
	//配置
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
        //设置路径
        path:{
            src:"./wp-content/themes/twentytwelve/assets",
            dist:"./wp-content/themes/twentytwelve/build"
        },
        // 用来清除中间产生的文件
        clean:{
           main:{
                options:{
                    force:true
                },
                src:[
                    '<%= path.dist%>/'
                ]
            },
            dist:{
                options:{
                    force:true
                },
                src:['<%= path.dist%>/dist']
            },
            watch:{
                options:{
                    force:true
                },
                src:[
                    '<%= path.dist%>/css/**',
                    '<%= path.dist%>/js/**',
                    '<%= path.dist%>/vendor/**',
                    '<%= path.dist%>/img/**',
                ]
            },
            css:{
                options:{
                    force:true
                },
                src:[
                    '<%= path.dist%>/css/**',
                ]
            },
            js:{
                options:{
                    force:true
                },
                src:[
                    '<%= path.dist%>/js/**',
                ]
            },
            vendor:{
                options:{
                    force:true
                },
                src:[
                    '<%= path.dist%>/vendor/**',
                ]
            },
            img:{
                options:{
                    force:true
                },
                src:[
                    '<%= path.dist%>/img/**',
                ]
            }
        },
        // 复制文件
        copy:{
            img:{
                expand:true,
                cwd:'<%= path.src%>/img/',
                src:'**',
                dest:'<%= path.dist%>/img/'
            },
            js:{
                expand:true,
                cwd:'<%= path.src%>/js/view/',
                src:[
                    '*'
                ],
                dest:'<%= path.dist%>/js/view/',
                ext: '.js'
            },
            vendor:{
                expand:true,
                cwd:'<%= path.src%>/vendor/',
                src:[
                    '*.*',
                    '**/*.*'
                ],
                dest:'<%= path.dist%>/vendor/',
            },
            font:{
                expand:true,
                cwd:'<%= path.src%>/less/bootstrap/fonts',
                src:[
                    '*'
                ],
                dest:'<%= path.dist%>/fonts/',
            }
        },
        // 合并css和js
		concat:{
            //合并文件
            js:{
                options:{
                    separator:";\n"
            },
            files:[
                //bootstrap组件
                {
                    src: [
                        '<%= path.src%>/js/bootstrap/js/transition.js',
                        '<%= path.src%>/js/bootstrap/js/alert.js',
                        '<%= path.src%>/js/bootstrap/js/button.js',
                        '<%= path.src%>/js/bootstrap/js/carousel.js', 
                        '<%= path.src%>/js/bootstrap/js/collapse.js',
                        '<%= path.src%>/js/bootstrap/js/dropdown.js',
                        '<%= path.src%>/js/bootstrap/js/modal.js',
                        '<%= path.src%>/js/bootstrap/js/tooltip.js',
                        '<%= path.src%>/js/bootstrap/js/popover.js',
                        '<%= path.src%>/js/bootstrap/js/scrollspy.js',
                        '<%= path.src%>/js/bootstrap/js/tab.js',
                        '<%= path.src%>/js/bootstrap/js/affix.js'
                    ],
                    dest: '<%= path.dist%>/js/bootstrap.js'
                }
            ]
          },
            css:{
                files:[
                    //合并lib.css
                    // {
                    //     src:[
                    //     ],
                    //     dest:'<%= distPath%>/css/lib/lib.css'
                    // },
                    //合并ide.css
                    {
                        src:['<%= path.dist%>/dist/css/**/*.css'],
                        dest:'<%= path.dist%>/css/custom.css'
                    }
                ]
            }
		},
        // 压缩css
        cssmin:{
            //压缩build下CSS文件
           build:{
               expand:true,
               cwd:'<%= path.dist%>/css',
               src:['*.css'],
               dest:'<%= path.dist%>/css',
               ext:'.min.css'
           }
        },
        // 编译Less
        less:{
            build:{
                files:[
                    // bootstrap基础样式
                    {
                        src:['<%= path.src%>/less/bootstrap/less/bootstrap.less'],
                        dest:'<%= path.dist%>/css/bootstrap.css'
                    },
                    //颜色，小部件公共样式
                    {
                        expand:true,
                        cwd:'<%= path.src%>/less',
                        src:['module/*.less','view/*.less'],
                        dest:'<%= path.dist%>/dist/css',
                        ext: '.css'
                    }
                ]
            }
        },

        // 压缩js
        uglify:{
            build:{
                files:[
                    {
                        expand: true,
                        cwd:'<%= path.dist%>/js/',
                        src:['**/*.js','*.js'],
                        dest:'<%= path.dist%>/js/',
                        ext:'.min.js'
                    }
                ]
            }
        },
        // 监视
        watch:{
            less:{
                files:['<%= path.src%>/less/**/*.less'],
                tasks:['build:less']
            },
            js:{
                files:['<%= path.src%>/js/**/*.js'],
                tasks:['build:js']
            },
            vendor:{
                files:['<%= path.src%>/vendor/**/*.*,'],
                tasks:['build:vendor']
            },
            img:{
                files:['<%= path.src%>/img/*.*,'],
                tasks:['build:img']
            }

        }

	});

    require('load-grunt-tasks')(grunt);  //自动加载package.json中的模块
    //注册任务
    grunt.registerTask('default', ['clean:watch','copy','less','concat','cssmin','uglify','clean:dist']);
    grunt.registerTask('dev', 'watch');
    grunt.registerTask('build:clean', 'clean');
    grunt.registerTask('build:watch',['clean:watch','copy','less','concat','cssmin','uglify','clean:dist']);
    // grunt.registerTask('build:clean:dist', 'clean:dist');
    // grunt.registerTask('build:copy', 'copy');
    grunt.registerTask('build:less', ['clean:css','less','concat:css','cssmin']);
    grunt.registerTask('build:js', ['clean:js','copy:js','concat:js','uglify']);
    grunt.registerTask('build:vendor', ['clean:vendor','copy:vendor']);
    grunt.registerTask('build:img', ['clean:img','copy:img']);
    // grunt.registerTask('build:concat', 'concat');
    // grunt.registerTask('build:cssmin', 'cssmin');
    // grunt.registerTask('build:uglify', 'uglify');
    
};