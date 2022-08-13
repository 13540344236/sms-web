<template>
  <div>
    <h3 style="margin: 20px 0">会员管理</h3>
    <div style="display: flex;margin: 20px 0">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="会员号">
          <el-input v-model="formInline.phone" placeholder="请输入会员号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询会员</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:5px" type="primary" @click="add">添加会员</el-button>
      </el-form-item>
      </el-form>

      <!--      <el-button style="margin-left:20px" type="primary" @click="addNew">添加商品</el-button>-->
    </div>

    <div>
      <!--            <el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--              <el-breadcrumb-item :to="{ path: '/sms/goods/list' }">首页</el-breadcrumb-item>-->
      <!--              <el-breadcrumb-item>商品管理</el-breadcrumb-item>-->
      <!--            </el-breadcrumb>-->
      <el-table :data="tableData" border style="width: 100%;text-align: center">
        <el-table-column prop="id" label="会员ID" width="100"></el-table-column>
        <el-table-column prop="memberId" label="会员卡号" width="100"></el-table-column>
        <el-table-column prop="name" label="会员名称" width="140"></el-table-column>
        <el-table-column prop="phone" label="会员电话"></el-table-column>
        <el-table-column prop="integral" label="会员积分"></el-table-column>
        <el-table-column prop="money" label="会员余额"></el-table-column>
        <el-table-column prop="paymentMethod" label="支付方式" ></el-table-column>
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
      <el-dialog title="添加会员" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="会员姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="会员电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="会员积分" prop="integral">
            <el-input v-model="ruleForm.integral"></el-input>
          </el-form-item>

          <el-form-item label="会员余额" prop="money">
            <el-input v-model="ruleForm.money"></el-input>
          </el-form-item>

          <el-form-item label="支付方式" prop="paymentMethod">
            <el-input v-model="ruleForm.paymentMethod"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   编辑商品   -->
      <el-dialog title="编辑会员" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="会员ID" prop="id">
            <el-input v-model="ruleForm.id" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="会员名称" prop="gender">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="员工电话号码" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="支付方式" prop="idNumber">
            <el-input v-model="ruleForm.paymentMethod"></el-input>
          </el-form-item>

          <el-form-item label="购买商店地址" prop="email">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(ruleForm.id)">确 定</el-button>
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
      tableData: [],
      formInline: {
        phone: ''
      },
      input: '',
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleSelect: false,
      ruleForm: {
        id: "",
        memberId: "",
        name: "",
        phone: "",
        integral: "",
        money: "",
        paymentMethod: "",
        address: ""
      },
      rules: {
        supplierPhone: [
          {required: true, message: '电话号码', trigger: 'blur'},
          {pattern: /^1[3456789]\d{9}$/g, message: '请输入正确的电话号码', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '姓名', trigger: 'blur'},
          {min: 2, max: 20, message: '请输入正确的姓名', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    loadGoods: function () {
      console.log('loadGoods()');
      let url = 'http://localhost:9091/members';
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
    onSubmit() {
      this.axios.get('http://localhost:9091/members/' + this.formInline.phone + '/selectByPhone')
          .then((response) => {
            console.log("canshu", response)
            this.tableData = [response.data.data]
            console.log(this.tableData)
          })
    },
    openDeleteConfirm(id) {
      this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(id);
      }).catch(() => {
      });
    },
    handleDelete(id) {
      console.log('将删除id = ' + id + '的会员数据');
      let url = 'http://localhost:9091/members/' + id + '/delete'
      this.axios.post(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.$message({
            message: '删除会员成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.loadGoods();
      });
    },
//查询管理员
    select(input) {
      this.dialogFormVisibleSelect = true
      this.selects(input)
    },
    selects(phone) {
      console.log('将查询phone = ' + phone + '的会员数据');
      let url = 'http://localhost:9091/members/' + phone + '/selectByPhone'
      this.axios.get(url).then((response) => {
        let json = response.data;
        console.log(response)
        if (json.code === 20000) {
          this.selectData.push(response.data.data);
          this.$message({
            message: '查询会员成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.loadGoods();
      });
    },
// 添加管理员
    add() {
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let url = 'http://localhost:9091/members/add-new';
          console.log('url >>>' + url);
          console.log('data >>>');
          console.log("参数:" + this.ruleForm);
          this.axios.post(url, this.ruleForm).then((response) => {
            console.log(response.data);
            if (response.data.code === 20000) {
              this.$message({
                message: '添加会员成功！',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.loadGoods();
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
      Object.assign(this.ruleForm, val)
      this.dialogFormVisibleEdit = true;
    },
    handleEdit(id) {
      console.log('将编辑id = ' + id + '的会员数据');
      let url = 'http://localhost:9091/members/update'
      this.axios.post(url, this.ruleForm).then((response) => {
        let json = response.data;
        console.log(response.data.data)
        if (json.code === 20000) {
          this.$message({
            message: '编辑会员成功！',
            type: 'success'
          });
          this.dialogFormVisibleEdit = false;
          this.loadGoods();
        } else {
          this.$message.error(response.data.message);
        }
        this.loadGoods();
      });
    }
  },
  mounted() {
    console.log('vue mounted')
    this.loadGoods();
  }
}
</script>

<style scoped>

</style>