## panda-vue-webpack
### vue项目模板

#### 使用说明

**1. 创建项目目录**
- [x] 前置任务：需求文档 && UI图
-  【@/views】新建文件夹以及空组件（通常与项目菜单对应）
-  【@/api】新建文件夹以及空js文件（通常与@/views对应）

**2. 路由**
- [x] 前置任务：先搭建好目录
- 【@/router/index.js】添加路由（asyncRouterMap）
- [x] 注意：Sidebar是依据路由自动生成的，因此需要使路由层次与项目的菜单相对应

**3. 基本配置**
- [x] 前置任务：先要有项目的mock地址（或后台地址）
- 【config/index.js】修改端口号
- 【config/dev.env.js】修改开发环境BASE_API（mock地址）
- 【config/prod.env.js】修改生产环境BASE_API

**4. 接口/mock**
- [x] 前置任务：接口文档
- [x] 注意：每次保存mock时注意选择是post还是get
- 【@/api/login.js】登入/登出/数据字典（注意检查url是否正确）
- 重要接口：
 >【/admin/menu/get-by-user】用户名获取权限数组（GET）  
  【/admin/menu/get-base】获取基本权限树（GET）  
  【/admin/user/name-login】用户登录（POST）  

**5. 登录/登出**
- [x] 注意：配api脚本时，注意检查是否正确填写接口地址、请求方式
- 【@/store/user.js】用户字段抓取是否正确、完整，并修改相关的vuex操作  
  （注意检查接口返回字段名称是否与代码一致）
- 【@/utils/stock.js】检查cookie封装字段是否正确、完整，并修改相关的字段、方法

**其他可选配置**
- [ ] 【.eslintignore】让eslint忽略对部分文件的检查
- [ ] 使用Iconfont： 
- 【@/assets/icon】导入Iconfont项目文件（【main.js】需import相应的iconfont.css和iconfont.js使其生效））