<template>
  <div>
    <h3 style="margin: 20px 0">会员管理</h3>
    <div style="display: flex;margin: 20px 0">
      <el-input style="width: 180px" v-model="input" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:20px" type="primary">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加会员</el-button>
    </div>

    <div>
<!--   会员列表   -->
      <el-table :data="tableData" border style="width: 100%;text-align: center">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="会员ID" width="100"></el-table-column>
        <el-table-column prop="url" label="会员卡号"></el-table-column>
        <el-table-column prop="name" label="会员姓名" width="140"></el-table-column>
        <el-table-column prop="salePrice" label="会员生日" width="140"></el-table-column>
        <el-table-column prop="purchasePrice" label="手机号码" width="140"></el-table-column>
        <el-table-column prop="category" label="可用积分" width="140"></el-table-column>
        <el-table-column prop="goodsSpecification" label="开卡金额" width="140"></el-table-column>
        <el-table-column prop="currentStock" label="支付类型" width="140"></el-table-column>
        <el-table-column prop="lowLimitStock" label="会员地址"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="edit(scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="openDeleteConfirm(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--  添加会员  -->
      <el-dialog title="添加会员" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="会员姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="会员卡号" prop="url">
            <el-input v-model="ruleForm.url"></el-input>
          </el-form-item>

          <el-form-item label="会员生日" prop="category">
            <el-input v-model="ruleForm.category"></el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="purchasePrice">
            <el-input v-model="ruleForm.purchasePrice"></el-input>
          </el-form-item>

          <el-form-item label="可用积分" prop="salePrice">
            <el-input v-model="ruleForm.salePrice"></el-input>
          </el-form-item>

          <el-form-item label="开卡金额" prop="goodsSpecification">
            <el-input v-model="ruleForm.goodsSpecification"></el-input>
          </el-form-item>

          <el-form-item label="支付类型" prop="currentStock">
            <el-input v-model="ruleForm.currentStock"></el-input>
          </el-form-item>

          <el-form-item label="会员地址" prop="lowLimitStock">
            <el-input v-model="ruleForm.lowLimitStock"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   编辑会员   -->
      <el-dialog title="编辑会员" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="editForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="会员姓名" prop="category">
            <el-input v-model="editForm.category"></el-input>
          </el-form-item>

          <el-form-item label="会员卡号" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>

          <el-form-item label="会员生日" prop="url">
            <el-input v-model="editForm.url"></el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="salePrice">
            <el-input v-model="editForm.salePrice"></el-input>
          </el-form-item>

          <el-form-item label="可用积分" prop="purchasePrice">
            <el-input v-model="editForm.purchasePrice"></el-input>
          </el-form-item>

          <el-form-item label="会员地址" prop="goodsSpecification">
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
      tableData: [{
        id:'1',
        url: '12255555',
        name: '刘翠花',
        salePrice: '1977-4-15',
        purchasePrice:'13254847778',
        category: '1358',
        lowLimitStock: '新华街花园小区',
        currentStock:'现金',
        goodsSpecification:'2000'
      }
      ],
      input:'',
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      ruleForm: {
        id:'', url: '', name: '', salePrice: '', purchasePrice:'', category: '',
        lowLimitStock: '', currentStock:'', goodsSpecification:''
      },
      editForm: {
        id:'', url: '', name: '', salePrice: '', purchasePrice:'', category: '',
        lowLimitStock: '', currentStock:'', goodsSpecification:''
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
    loadMembers: function () {
      console.log('loadGoods()');
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

    },

// 添加商品
    add(){
      this.dialogFormVisible = true
    },
    submitForm(formName) {

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

    }
  },
  created() {
    console.log('vue created')
  },
  mounted() {
    console.log('vue mounted')
    this.loadMembers();
  }
}
</script>
