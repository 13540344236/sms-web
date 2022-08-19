<template>
  <div>
    <h3 style="margin: 20px 0">类别管理</h3>
    <div style="display: flex">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="类别名">
          <el-input v-model="formInline.name" placeholder="请输入类别名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-button style="margin-left:20px" type="primary" @click="add">添加类别</el-button>
        <el-button
            style="margin-left:20px"
            type="danger" @click="batchDelete"
            :disabled="this.multipleSelection.length === 0">批量删除</el-button>
      </el-form>
    </div>

    <div>

      <el-table :data="tableData" border
                style="width: 100%;horiz-align: center" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="类别" width="140"></el-table-column>
        <el-table-column prop="parentId" label="父级类别" width="140"></el-table-column>
        <el-table-column prop="depth" label="深度" width="140"></el-table-column>
        <el-table-column prop="category" label="商品类别" width="140"></el-table-column>
        <el-table-column prop="sort" label="自定义排序号" width="140"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
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

      <!--  添加商品  -->
      <el-dialog title="添加商品" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="类别" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="父级类别" prop="parentId">
            <el-input v-model="ruleForm.parentId"></el-input>
          </el-form-item>

          <el-form-item label="深度" prop="depth">
            <el-input v-model="ruleForm.depth"></el-input>
          </el-form-item>

          <el-form-item label="自定义排序号" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   编辑商品   -->
      <el-dialog title="编辑商品" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="editForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="ID" prop="id">
            <el-input v-model="editForm.id"></el-input>
          </el-form-item>

          <el-form-item label="类别" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>

          <el-form-item label="父级类别" prop="parentId">
            <el-input v-model="editForm.parentId"></el-input>
          </el-form-item>


          <el-form-item label="深度" prop="depth">
            <el-input v-model="editForm.depth"></el-input>
          </el-form-item>

          <el-form-item label="自定义排序号" prop="sort">
            <el-input v-model="editForm.sort"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(editForm.id)">确 定</el-button>
          </el-form-item>
        </el-form>
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
        name:'',
      },
      input: '',
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      ruleForm: {
        id:'',
        name:'',
        parentId:'',
        depth:'',
        keywords:'',
        sort:'',
        icon:'',
        enable:'',
        isParent:'',
        isDisplay:'',
        gmtCreate:'',
        gmtModified:''
      },
      editForm: {
        id:'',
        name:'',
        parentId:'',
        depth:'',
        keywords:'',
        sort:'',
        icon:'',
        enable:'',
        isParent:'',
        isDisplay:'',
        gmtCreate:'',
        gmtModified:''
      },
      rules: {

      }
    }
  },
  methods: {
//查询商品
    onSubmit() {
      this.axios.post('http://localhost:9091/category/selectByName',this.formInline)
          .then((response) => {
            console.log("canshu", response)
            this.tableData = [response.data.data]
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
      let url = 'http://localhost:9091/category/' + id + '/delete'
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
        this.pageAll();
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
          let url = 'http://localhost:9091/category/' + res.id + '/delete'
          this.axios.post(url).then((response) => {
            if (response.data.code === 20000 && (i + 1) === this.multipleSelection.length) {
              this.$message({
                message: '删除品牌成功！',
                type: 'success'
              })
            }
            this.pageAll();
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
          let url = 'http://localhost:9091/category/add-new';
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
            this.pageAll()
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
      let url = 'http://localhost:9091/category/update'
      this.axios.post(url, this.editForm).then((response) => {
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
        this.pageAll();
      });
    },

// 分页查询
    pageAll() {
      console.log('pageAll()')
      this.axios.get('http://localhost:9091/category/page?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
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

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
