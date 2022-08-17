<template>
  <div>
    <h3 style="margin: 20px 0">角色管理</h3>
    <div style="display: flex;margin: 20px 0">
      <el-input style="width: 180px" v-model="input" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:20px" type="primary">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加角色</el-button>

    </div>


    <div>
      <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"
                style="width: 100%;text-align: center">
        <el-table-column prop="id" label="角色ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="300px"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="selectMenu(scope.row)">分配权限</el-button>
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="openDeleteConfirm(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--  添加商品  -->
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
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

      <!--  编辑角色  -->
      <el-dialog title="添加角色" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="editForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name"></el-input>
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

      <!--   分配权限   -->
      <el-dialog title="分配权限" :visible.sync="roleFormVisible" width="25%">
        <el-tree
            :props="props"
            :data="menuData"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="expends"
            :default-checked-keys="checks">
        </el-tree>

        <div slot="footer" class="dialog-footer">
          <el-button @click="roleFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!--  分页  -->
    <div class="block" style="margin: 20px">
      <el-pagination
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 菜单数据
      menuData: [],
      props:{
        label: 'name'
      },
      roleId:0,
      expends: [],
      checks: [],
      ids:[],
      // 分页
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,

      tableData: [],
      input: '',
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      roleFormVisible: false,
      ruleForm: {
        id: '',
        name: '',
        description: '',
        sort: '',
        gmtCreate: '',
        gmtModified: '',
      },
      editForm: {
        id: '',
        name: '',
        description: '',
        sort: '',
        gmtCreate: '',
        gmtModified: '',
      },
      rules: {}
    }
  },
  methods: {
/*    loadGoods: function () {
      console.log('loadGoods()');
      let url = 'http://localhost:9091/roles';
      console.log('url = ' + url);
      this.axios.get(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.tableData = json.data;
        } else {
          this.$message.error(response.data.message);
        }
      })
    },*/
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
      console.log('将删除id = ' + id + '的角色数据');
      let url = 'http://localhost:9091/roles/' + id + '/delete'
      this.axios.post(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.$message({
            message: '删除角色成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.pageAll();
      });
    },
// 添加角色
    add() {
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let url = 'http://localhost:9091/roles/addNew';
          console.log('url >>>' + url);
          console.log('data >>>');
          console.log("参数:" + this.ruleForm);
          this.axios.post(url, this.ruleForm).then((response) => {
            console.log(response.data);
            if (response.data.code === 20000) {
              this.$message({
                message: '添加角色成功！',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.pageAll();
            } else {
              this.$message.error(response.data.message);
            }
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
      console.log('将编辑id = ' + id + '的角色数据');
      let url = 'http://localhost:9091/roles/' + id + '/edit'
      this.axios.post(url, this.editForm).then((response) => {
        let json = response.data;
        console.log(response.data.data)
        if (json.code === 20000) {
          this.$message({
            message: '编辑角色成功！',
            type: 'success'
          });
          this.dialogFormVisibleEdit = false;
        } else {
          this.$message.error(response.data.message);
        }
        this.pageAll();
      });
    },

// 分页查询
    pageAll() {
      console.log('pageAll()')
      this.axios.get('http://localhost:9091/roles/page?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((response) => {
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

// 分配菜单
    selectMenu(role) {
      this.roleId = role.id
      console.log('roleId:',this.roleId)
      // 请求菜单数据
      this.axios.get('http://localhost:9091/menu').then(res => {
        this.menuData = res.data.data
        this.expends = this.menuData.map(v => v.id)
      })

      this.axios.get('http://localhost:9091/roles/roleMenu/' + this.roleId).then(res => {
        this.checks = res.data.data
        this.checks = this.checks.map(menu => menu.menuId)
        this.ids.forEach(id => {
          if (!this.checks.includes(id)) {
            this.$nextTick(() => {
              this.$refs.tree.setChecked(id,false)
            })
          }
        })
        this.roleFormVisible = true;
      })
    },
    // 保存分配的菜单
    save() {
      this.axios.post('http://localhost:9091/roles/roleMenu/' + this.roleId,this.$refs.tree.getCheckedKeys()).then(res => {
        if (res.data.code === 20000) {
          this.$message.success("分配成功")
          this.roleFormVisible = false
        } else {
          this.$message.error(res.data.message)
        }
      })
    }
  },

  created() {
    this.pageAll();
  },
  mounted() {
    console.log('vue mounted')
    this.pageAll();
  }
}
</script>

<style scoped>
</style>