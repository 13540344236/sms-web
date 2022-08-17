<template>
  <div>
    <h3 style="margin: 20px 0">菜单管理</h3>
    <div style="display: flex">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="菜单名">
          <el-input v-model="formInline.name" placeholder="请输入菜单名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-button style="margin-left:20px" type="primary" @click="add">添加主菜单</el-button>
        <!--  批量删除  -->
        <el-button
            style="margin-left:20px"
            type="danger" @click="batchDelete"
            :disabled="this.multipleSelection.length === 0">批量删除</el-button>
      </el-form>
    </div>

    <div>
      <el-table :data="tableData" border
                style="width: 100%"
                row-key="id" default-expand-all
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="菜单ID" width="80"></el-table-column>
        <el-table-column prop="name" label="菜单名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="success"
                v-if="!scope.row.pid && !scope.row.path"
                @click="addChildren(scope.row.id)">添加子菜单
            </el-button>
            <el-button
                size="mini"
                type="primary"
                @click="edit(scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="openDeleteConfirm(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--  添加菜单  -->
      <el-dialog title="添加主菜单" :visible.sync="dialogFormVisible" width="40%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="路径" prop="path">
            <el-input v-model="ruleForm.path"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   编辑菜单   -->
      <el-dialog title="编辑菜单" :visible.sync="dialogFormVisibleEdit" width="40%">

        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>

          <el-form-item label="路径" prop="path">
            <el-input v-model="editForm.path"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input v-model="editForm.description"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(editForm.id)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   添加子菜单   -->
      <el-dialog title="添加子菜单" :visible.sync="dialogFormVisibleMenu" width="40%">

        <el-form :model="childForm" :rules="rules" ref="childForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="childForm.name"></el-input>
          </el-form-item>

          <el-form-item label="路径" prop="path">
            <el-input v-model="childForm.path"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input v-model="childForm.description"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleMenu = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // 勾选的数据
      multipleSelection: [],
      // 分页
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,

      tableData: [],//图片返回url需要使用
      filelist:[],//图片数组
      formInline:{
        name:''
      },
      input: '',
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleMenu: false,
      ruleForm: {
        id:'',name:'',path:'',icon:'',description:'',pid:'',pagePath:'',sortNum:''
      },
      editForm: {
        id:'',name:'',path:'',icon:'',description:'',pid:'',pagePath:'',sortNum:''
      },
      childForm:{
        id:'',name:'',path:'',icon:'',description:'',pid:'',pagePath:'',sortNum:''
      },
      rules: {
      }
    }
  },
  methods: {
    loadMenu: function () {
      console.log('loadMenu()');
      let url = 'http://localhost:9091/menu';
      console.log('url = ' + url);
      this.axios.get(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.tableData = json.data;
        } else {
          this.$message.error(response.data.message);
        }
      })
    },

//查询商品
    onSubmit() {
      this.axios.post('http://localhost:9091/menu/selectByName',this.formInline)
          .then((response) => {
            console.log("canshu", response)
            this.tableData = response.data.data
            console.log(this.tableData)
          })
    },

//删除商品
    openDeleteConfirm(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(id);
      }).catch(() => {
      });
    },
    handleDelete(id) {
      console.log('将删除id = ' + id + '的品牌数据');
      let url = 'http://localhost:9091/menu/' + id + '/delete'
      this.axios.post(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.$message({
            message: '删除品牌成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.loadMenu();
      });
    },

// 批量删除
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val
    },
    batchDelete() {
      this.$confirm('此操作将永久删除商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach((res, i) => {
          let url = 'http://localhost:9091/menu/' + res.id + '/delete'
          this.axios.post(url).then((response) => {
            if (response.data.code === 20000 && (i + 1) === this.multipleSelection.length) {
              this.$message({
                message: '删除品牌成功！',
                type: 'success'
              })
            }
            this.loadMenu();
          })
        })
      }).catch(() => {
      });
    },

// 添加商品
    add(){
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let url = 'http://localhost:9091/menu/add-new';
          console.log('url >>>' + url);
          console.log('data >>>');
          console.log("参数:" + this.ruleForm);
          this.axios.post(url, this.ruleForm).then((response) => {
            console.log(response.data);
            if (response.data.code === 20000) {
              this.$message({
                message: '添加商品成功！',
                type: 'success'
              });
              this.dialogFormVisible = false;
            } else {
              this.$message.error(response.data.message);
            }
            this.loadMenu()
          }).catch(function (error) {
            console.log('响应结果失败!')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

// 编辑商品
    edit(val) {
      Object.assign(this.editForm, val)
      this.dialogFormVisibleEdit = true;
    },
    handleEdit(id) {
      console.log('将编辑id = ' + id + '的品牌数据');
      let url = 'http://localhost:9091/menu/' + id + '/edit'
      this.axios.post(url,this.editForm).then((response) => {
        let json = response.data;
        console.log(response.data.data)
        if (json.code === 20000) {
          this.$message({
            message: '编辑品牌成功！',
            type: 'success'
          });
          this.dialogFormVisibleEdit = false;
        } else {
          this.$message.error(response.data.message);
        }
        this.loadMenu();
      });
    },

// 分页查询
    pageAll() {
      console.log('pageAll()')
      this.axios.get('http://localhost:9091/menu/page?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((response) => {
            console.log(response)
            this.tableData = response.data.data.list
            this.totalCount = response.data.data.totalCount
          })
    },
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
      this.pageSize = pageSize;
      this.pageAll()
    },
    handleCurrentChange(pageNum) {
      console.log(`当前页: ${pageNum}`);
      this.pageNum = pageNum;
      this.pageAll()
    },

// 菜单
    addChildren(pid) {
      this.dialogFormVisibleMenu = true
      this.childForm = {}
      if (pid) {
        this.childForm.pid = pid
      }
    },
    save() {
      this.axios.post("http://localhost:9091/menu/add-new", this.childForm).then(res => {
        console.log("参:",res)
        if (res.data.code === 20000) {
          this.$message.success("保存成功")
          this.dialogFormVisibleMenu = false
          this.loadMenu()
        } else {
          this.$message.error("保存失败")
        }
      })
    }
  },


  created() {
    this.loadMenu();
  },
  mounted() {
    console.log('vue mounted')
    this.loadMenu();
  }
}
</script>
