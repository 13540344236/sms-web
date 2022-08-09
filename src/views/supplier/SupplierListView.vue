<template>
  <div>
    <h3 style="margin: 20px 0">供货商管理</h3>
    <div style="display: flex;margin: 20px 0">
      <el-input style="width: 180px" v-model="input" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:20px" type="primary">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加供货商</el-button>
    </div>

    <div>
<!--   供货商列表   -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="供应商ID" width="80"></el-table-column>
        <el-table-column prop="supplier" label="供应商" width="150"></el-table-column>
        <el-table-column prop="supplierName" label="供应商姓名" width="140"></el-table-column>
        <el-table-column prop="supplierPhone" label="供应商电话" width="140"></el-table-column>
        <el-table-column prop="supplierSite" label="供应商地址"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="180">
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

      <!--   添加供应商   -->
      <el-dialog title="添加供应商" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="供应商" prop="supplier">
            <el-input v-model="ruleForm.supplier"></el-input>
          </el-form-item>

          <el-form-item label="供应商姓名" prop="supplierName">
            <el-input v-model="ruleForm.supplierName"></el-input>
          </el-form-item>

          <el-form-item label="供应商电话" prop="supplierPhone">
            <el-input v-model="ruleForm.supplierPhone"></el-input>
          </el-form-item>

          <el-form-item label="供应商地址" prop="supplierSite">
            <el-input v-model="ruleForm.supplierSite"></el-input>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   编辑供应商   -->
      <el-dialog title="编辑供应商" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="供应商" prop="supplier">
            <el-input v-model="editForm.supplier"></el-input>
          </el-form-item>

          <el-form-item label="供应商姓名" prop="supplierName">
            <el-input v-model="editForm.supplierName"></el-input>
          </el-form-item>

          <el-form-item label="供应商电话" prop="supplierPhone">
            <el-input v-model="editForm.supplierPhone"></el-input>
          </el-form-item>

          <el-form-item label="供应商地址" prop="supplierSite">
            <el-input v-model="editForm.supplierSite"></el-input>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input v-model="editForm.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(editForm.id)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!--  分页(暂未完成)  -->
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
      tableData:[
          {id:'1', supplier: '张兵调料批发', supplierName: '张兵',
            supplierPhone: '13344445555', supplierSite:'飞燕路199号', remark: '张三的叔叔'}
      ],
      input:'',
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      ruleForm: {
        id:'', supplier: '', supplierName: '', supplierPhone: '', supplierSite:'', remark: ''
      },
      editForm: {
        id:'', supplier: '', supplierName: '', supplierPhone: '', supplierSite:'', remark: ''
      },
      rules: {
        supplier: [
          { required: true, message: '请输入供应商', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        supplierName: [
          { required: true, message: '请输入供应商姓名', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        supplierPhone: [
          { required: true, message: '请输入供应商电话', trigger: 'blur' },
          { pattern:/^1[3|4|5|7|8][0-9]\d{4,8}$/, message: '请输入数字', trigger: 'blur' }
        ],
        supplierSite: [
          { required: true, message: '请输入供应商地址', trigger: 'blur' },
          { min: 2, max: 30, message: '请输入数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
// 供应商列表
    loadGoods: function () {
      console.log('loadGoods()');
    },
// 添加供应商
    add(){
      this.dialogFormVisible = true
    },
    submitForm(formName) {

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

// 删除供应商
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
    handleDelete(id){

    },

// 编辑供应商
    edit(val) {
      Object.assign(this.editForm,val)
      this.dialogFormVisibleEdit = true;
    },
    handleEdit(id) {

    },

    created() {
      console.log('vue created')
    },
    mounted() {
      console.log('vue mounted')
      this.loadGoods();
    }
  }
}
</script>