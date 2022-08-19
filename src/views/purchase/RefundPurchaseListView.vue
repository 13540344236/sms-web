<template>
  <div>

    <div style="display: flex;margin: 20px 0">
      <el-input style="width: 180px" v-model="input" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:20px" type="primary">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加退货</el-button>
      <el-button style="margin-left:20px" type="primary" @click="exportExcel">导出退货详情</el-button>
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
        <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="140"></el-table-column>
        <el-table-column prop="category" label="商品类别" width="140"></el-table-column>
        <el-table-column prop="goodsSpecification" label="商品规格" width="140"></el-table-column>
        <el-table-column prop="warehousingQuantity" label="退货出库数量" width="140"></el-table-column>
        <el-table-column prop="amountPayable" label="金额" width="140"></el-table-column>
        <el-table-column prop="supplier" label="供应商" width="140"></el-table-column>
        <el-table-column prop="operator" label="经办人" width="140"></el-table-column>
        <el-table-column prop="returnDocumentPicture" label="退货单据"  width="140"></el-table-column>
        <el-table-column prop="logo" label="商品logo"></el-table-column>
        <el-table-column prop="gmtCreatePurchase" label="进货时间"  width="140"></el-table-column>
        <el-table-column prop="gmtCreateReturn" label="退货时间"  width="140"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="edit(scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="openDeleteConfirm(scope.row.id)">退货</el-button>
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

          <el-form-item label="商品规格" prop="goodsSpecification">
            <el-input v-model="ruleForm.goodsSpecification"></el-input>
          </el-form-item>

          <el-form-item label="退货出库数量" prop="warehousingQuantity">
            <el-input v-model="ruleForm.warehousingQuantity"></el-input>
          </el-form-item>

          <el-form-item label="金额" prop="amountPayable">
            <el-input v-model="ruleForm.amountPayable"></el-input>
          </el-form-item>

          <el-form-item label="供应商" prop="supplier">
            <el-input v-model="ruleForm.supplier"></el-input>
          </el-form-item>

          <el-form-item label="经办人" prop="operator">
            <el-input v-model="ruleForm.operator"></el-input>
          </el-form-item>

          <el-form-item label="退货单据图片" prop="returnDocumentPicture">
            <el-input v-model="ruleForm.returnDocumentPicture"></el-input>
          </el-form-item>

          <el-form-item label="商品图片的logo" prop="logo">
            <el-input v-model="ruleForm.logo"></el-input>
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

          <el-form-item label="商品名称" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>

          <el-form-item label="商品类别" prop="category">
            <el-input v-model="editForm.category"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" prop="goodsSpecification">
            <el-input v-model="editForm.goodsSpecification"></el-input>
          </el-form-item>

          <el-form-item label="退货出库数量" prop="warehousingQuantity">
            <el-input v-model="editForm.warehousingQuantity"></el-input>
          </el-form-item>

          <el-form-item label="金额" prop="amountPayable">
            <el-input v-model="editForm.amountPayable"></el-input>
          </el-form-item>

          <el-form-item label="供应商" prop="supplier">
            <el-input v-model="editForm.supplier"></el-input>
          </el-form-item>

          <el-form-item label="经办人" prop="operator">
            <el-input v-model="editForm.operator"></el-input>
          </el-form-item>

          <el-form-item label="退货单据图片" prop="returnDocumentPicture">
            <el-input v-model="editForm.returnDocumentPicture"></el-input>
          </el-form-item>

          <el-form-item label="商品图片的logo" prop="logo">
            <el-input v-model="editForm.logo"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(editForm.id)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>



    <!--  分页  -->
    <div style="text-align: center;margin: 20px">
      <el-pagination background layout="total,prev, pager, next, jumper"
                     :total="total" :page-size="pageSize"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 10
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      // 勾选的数据
      multipleSelection: [],
      tableData: [],
      input:'',
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      ruleForm: {
        id:'',
        name: '',
        category: '',
        goodsSpecification:'',
        warehousingQuantity:'',
        amountPayable:'',
        isPay:'',
        supplier:'',
        operator:'',
        returnDocumentPicture:'',
        logo:'',

      },
      editForm: {
        id:'',
        name: '',
        category: '',
        goodsSpecification:'',
        warehousingQuantity:'',
        amountPayable:'',
        isPay:'',
        supplier:'',
        operator:'',
        returnDocumentPicture:'',
        logo:'',
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
    loadGoods: function () {
      console.log('loadGoods()');
      let url = 'http://localhost:9091/refunds';
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
      let url = 'http://localhost:9091/refunds/' + id + '/delete'
      this.axios.post(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.$message({
            message: '退货成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.loadGoods();
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
        this.multipleSelection.forEach((res,i) => {
          let url = 'http://localhost:9091/refunds/' + res.id + '/delete'
          this.axios.post(url).then((response) => {
            if (response.data.code === 20000 && (i+1) ===this.multipleSelection.length) {
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
          let url = 'http://localhost:9091/refunds/add-new';
          console.log('url >>>'+url);
          console.log('data >>>');
          console.log("参数:" + this.ruleForm);
          this.axios.post(url,this.ruleForm).then((response) => {
            console.log(response.data);
            if (response.data.code === 20000){
              this.$message({
                message: '添加商品成功！',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.loadGoods();
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

// 编辑商品
    edit(val){
      Object.assign(this.editForm,val)
      this.dialogFormVisibleEdit = true;
    },
    handleEdit(id) {
      console.log('将编辑id = ' + id + '的品牌数据');
      let url = 'http://localhost:9091/refunds/' + id + '/edit'
      this.axios.post(url,this.editForm).then((response) => {
        let json = response.data;
        console.log(response.data.data)
        if (json.code === 20000) {
          this.$message({
            message: '编辑品牌成功！',
            type: 'success'
          });
          this.dialogFormVisibleEdit = false;
          this.loadGoods();
        } else {
          this.$message.error(response.data.message);
        }
        this.loadGoods();
      });
    },
    exportExcel(){
      location.href = "http://localhost:9091/refunds/exportExcel"
    }
  },
  created() {
    console.log('vue created')
  },
  mounted() {
    console.log('vue mounted')
    this.loadGoods();
  }
}
</script>
