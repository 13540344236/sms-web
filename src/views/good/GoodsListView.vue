<template>
  <div>
    <h3 style="margin: 20px 0">商品管理</h3>
    <div style="display: flex;margin: 20px 0">
      <el-input style="width: 180px" v-model="input" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:20px" type="primary" @click="select(id)">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加商品</el-button>
      <el-button style="margin-left:20px" type="primary" @click="exportExcel">导出商品详情</el-button>
      <!--  批量删除  -->
      <el-button type="danger" @click="batchDelete" :disabled="this.multipleSelection.length === 0">批量删除</el-button>

    </div>

    <div>
      <!--            <el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--              <el-breadcrumb-item :to="{ path: '/sms/goods/list' }">首页</el-breadcrumb-item>-->
      <!--              <el-breadcrumb-item>商品管理</el-breadcrumb-item>-->
      <!--            </el-breadcrumb>-->

      <el-table :data="tableData" border
                style="width: 100%;horiz-align: center" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
             <el-table-column  label="商品图片"width="80">
          <template slot-scope="scope">
            <el-image
                style="width: 60px; height: 60px"
                :src="scope.row.url"/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="140"></el-table-column>
        <el-table-column prop="salePrice" label="销售价格" width="140"></el-table-column>
        <el-table-column prop="purchasePrice" label="采购价格" width="140"></el-table-column>
        <el-table-column prop="category" label="商品类别" width="140"></el-table-column>
        <el-table-column prop="categoryId" label="商品类别Id" width="140"></el-table-column>
        <el-table-column prop="goodsSpecification" label="商品规格" width="140"></el-table-column>
        <el-table-column prop="currentStock" label="当前库存" width="140"></el-table-column>
        <el-table-column prop="lowLimitStock" label="库存下限" width="140"></el-table-column>
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
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="商品类别" prop="category">
            <el-input v-model="ruleForm.category"></el-input>
          </el-form-item>

          <el-form-item label="采购价格" prop="purchasePrice">
            <el-input v-model="ruleForm.purchasePrice"></el-input>
          </el-form-item>

          <el-form-item label="销售价格" prop="salePrice">
            <el-input v-model="ruleForm.salePrice"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" prop="goodsSpecification">
            <el-input v-model="ruleForm.goodsSpecification"></el-input>
          </el-form-item>

          <el-form-item label="当前库存" prop="currentStock">
            <el-input v-model="ruleForm.currentStock"></el-input>
          </el-form-item>

          <el-form-item label="库存下限" prop="lowLimitStock">
            <el-input v-model="ruleForm.lowLimitStock"></el-input>
          </el-form-item>

<!--     上传图片     -->
          <el-form-item label="商品图片" prop="url">
            <el-upload
                action="http://localhost:9091/goods/upload"
                name="picFile"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
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

          <el-form-item label="商品类别" prop="category">
            <el-input v-model="editForm.category"></el-input>
          </el-form-item>

          <el-form-item label="商品名称" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>

          <el-form-item label="商品图片的url" prop="url">
            <el-input v-model="editForm.url"></el-input>
          </el-form-item>

          <el-form-item label="销售价格" prop="salePrice">
            <el-input v-model="editForm.salePrice"></el-input>
          </el-form-item>

          <el-form-item label="采购价格" prop="purchasePrice">
            <el-input v-model="editForm.purchasePrice"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" prop="goodsSpecification">
            <el-input v-model="editForm.goodsSpecification"></el-input>
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
      input: '',
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      ruleForm: {
        id:'',
        url: '',
        name: '',
        salePrice: '',
        purchasePrice:'',
        category: '',
        lowLimitStock: '',
        currentStock:'',
        goodsSpecification:''
      },
      editForm: {
        id:'',
        url: '',
        name: '',
        salePrice: '',
        purchasePrice:'',
        category: '',
        lowLimitStock: '',
        currentStock:'',
        goodsSpecification:''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请输入商品类别', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        salePrice: [
          { required: true, message: '请输入销售价格', trigger: 'blur' },
          { pattern:/([1-9]\d*\.?\d*)|(0\.\d*[1-9])/, message: '请输入数字', trigger: 'blur' }
        ],
        purchasePrice: [
          { required: true, message: '请输入采购价格', trigger: 'blur' },
          { pattern:/([1-9]\d*\.?\d*)|(0\.\d*[1-9])/, message: '请输入数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
/*    loadGoods: function () {
      console.log('loadGoods()');
      let url = 'http://localhost:9091/goods';
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
      console.log('将删除id = ' + id + '的品牌数据');
      let url = 'http://localhost:9091/goods/' + id + '/delete'
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
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach((res, i) => {
          let url = 'http://localhost:9091/goods/' + res.id + '/delete'
          this.axios.post(url).then((response) => {
            if (response.data.code === 20000 && (i + 1) === this.multipleSelection.length) {
              this.$message({
                message: '删除品牌成功！',
                type: 'success'
              })
            }
            this.loadGoods();
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
          let url = 'http://localhost:9091/goods/add-new';
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
      let url = 'http://localhost:9091/goods/' + id + '/edit'
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
    exportExcel(){
      location.href = "http://localhost:9091/goods/exportExcel"
    },

    // 分页查询
    pageAll() {
      console.log('pageAll()')
      this.axios.get('http://localhost:9091/goods/page?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
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

    select(id){

    },

// 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      //发请求告诉服务器删除文件夹里面的文件
      //得到要删除的文件名
      let fileName= file.response;
      console.log("文件名:"+fileName);
      axios.get("/remove?fileName="+fileName).then(function (response) {
        console.log("服务器文件删除完成!");
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },


  created() {
    console.log('vue created')
    this.pageAll();
  },
  mounted() {
    console.log('vue mounted')
    this.pageAll();
  }
}
</script>
