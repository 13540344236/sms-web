<template>
  <div>

    <div style="float: left;margin: 11px 0">
      <el-input style="width: 200px"  placeholder="请输入商品名称" @keydown.native.enter="search()" v-model="wd" class="input-with-select"></el-input>
      <el-button style="margin-left:20px" type="primary">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加商品</el-button>
      <el-button style="margin-left:20px" type="primary" @click="exportExcel">导出商品详情</el-button>
      <!--  批量删除  -->
      <el-button style="margin-left:20px" type="danger" @click="batchDelete">批量删除</el-button>

    </div>

    <div>
      <el-table :data="tableData" border
                style="width: 100%;horiz-align: center" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="140"></el-table-column>
        <el-table-column prop="goodsCategory" label="商品类别" width="140"></el-table-column>
        <el-table-column prop="goodsSpecification" label="商品规格" width="100"></el-table-column>
        <el-table-column prop="warehousingQuantity" label="入库数量" header-align="center" width="100"></el-table-column>
        <el-table-column prop="supplier" label="供应商" header-align="center" width="140"></el-table-column>
        <el-table-column prop="operator" label="经办人" header-align="center" width="140"></el-table-column>
        <el-table-column prop="gmtCreate" label="操作时间" header-align="center"></el-table-column>
        <el-table-column prop="purchaseDocumentPicture" label="进货单据" header-align="center" width="140"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary"
                @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger"
                       @click="openDeleteConfirm(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--  添加商品  -->
      <el-dialog title="添加商品" :visible.sync="dialogFormVisible" width="50%">
        <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品类别" prop="goodsCategory">
            <el-input v-model="ruleForm.goodsCategory"></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="goodsSpecification">
            <el-input v-model="ruleForm.goodsSpecification"></el-input>
          </el-form-item>
          <el-form-item label="入库数量" prop="warehousingQuantity">
            <el-input v-model="ruleForm.warehousingQuantity"></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="supplier">
            <el-input v-model="ruleForm.supplier"></el-input>
          </el-form-item>
          <el-form-item label="经办人" prop="operator">
            <el-input v-model="ruleForm.operator"></el-input>
          </el-form-item>
          <el-form-item label="进货单据图片" prop="purchaseDocumentPicture">
            <el-input v-model="ruleForm.purchaseDocumentPicture"></el-input>
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

          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品类别" prop="goodsCategory">
            <el-input v-model="editForm.goodsCategory"></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="goodsSpecification">
            <el-input v-model="editForm.goodsSpecification"></el-input>
          </el-form-item>
          <el-form-item label="入库数量" prop="warehousingQuantity">
            <el-input v-model="editForm.warehousingQuantity"></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="supplier">
            <el-input v-model="editForm.supplier"></el-input>
          </el-form-item>
          <el-form-item label="经办人" prop="operator">
            <el-input v-model="editForm.operator"></el-input>
          </el-form-item>
          <el-form-item label="进货单据图片" prop="purchaseDocumentPicture">
            <el-input v-model="editForm.purchaseDocumentPicture"></el-input>
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
      //勾选要删除的数据
      multipleSelection: [],
      // 分页
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,

      tableData: [],
      wd:'',
      value:'',
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      ruleForm: {
        id:'',
        logo: '',
        name: '',
        goodsCategory: '',
        goodsSpecification: '',
        warehousingQuantity: '',
        supplier: '',
        operator: '',
        purchaseDocumentPicture: ''
      },
      editForm: {
        id:'',
        logo: '',
        name: '',
        goodsCategory: '',
        goodsSpecification: '',
        warehousingQuantity: '',
        supplier: '',
        operator: '',
        purchaseDocumentPicture: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        supplier: [
          {required: true, message: '请输入供应商名字', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        operator: [
          {required: true, message: '请输入供应商名字', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
/*    loadPurchases: function () {
      console.log('loadPurchases');
      let url = 'http://localhost:9091/purchases';
      console.log('url = ' + url);
      this.axios.get(url).then((response) => {
        let json = response.data;
        if (json.code == 20000) {
          this.tableData = json.data;
        } else {
          this.$message.error(response.data.message);
        }
      })
    },*/

// 删除库存
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
      console.log('将删除id = ' + id + '的库存数据');
      let url = 'http://localhost:9091/purchases/' + id + '/delete';
      this.axios.post(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.$message({
            message: '删除库存成功！',
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
      this.$confirm('此操作将永久删除库存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach((res,i) => {
          let url = 'http://localhost:9091/purchases/' + res.id + '/delete'
          this.axios.post(url).then((response) => {
            if (response.data.code === 20000 && (i+1) ===this.multipleSelection.length) {
              this.$message({
                message: '删除库存成功！',
                type: 'success'
              })
            }
            this.pageAll();
          })
        })
      }).catch(() => {
      });
    },

// 添加库存
    add(){
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let url = 'http://localhost:9091/purchases/add-new';
          console.log('url >>>'+url);
          console.log('data >>>');
          console.log("参数:" + this.ruleForm);
          this.axios.post(url,this.ruleForm).then((response) => {
            console.log(response.data);
            if (response.data.code === 20000){
              this.$message({
                message: '添加库存成功！',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.pageAll();
            }else {
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

//编辑库存
    edit(val){
      Object.assign(this.editForm,val)
      this.dialogFormVisibleEdit = true;
    },
    handleEdit(id) {
      console.log('将编辑id = ' + id + '的库存数据');
      let url = 'http://localhost:9091/purchases/' + id + '/edit'
      this.axios.post(url,this.editForm).then((response) => {
        let json = response.data;
        console.log(response.data.data)
        if (json.code === 20000) {
          this.$message({
            message: '编辑库存成功！',
            type: 'success'
          });
          this.dialogFormVisibleEdit = false;
        } else {
          this.$message.error(response.data.message);
        }
        this.pageAll();
      });
    },

// 导出报表
    exportExcel(){
      location.href = "http://localhost:9091/purchases/exportExcel"
    },

// 分页查询
    pageAll() {
      console.log('pageAll()')
      this.axios.get('http://localhost:9091/purchases/page?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
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
