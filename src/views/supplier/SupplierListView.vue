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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
          {id:'1', supplier: '张兵调料批发', supplierName: '张兵',
            supplierPhone: '13344445555', supplierSite:'飞燕路199号', remark: '张三的叔叔'}
      ],
      input:'',
      ruleForm: {
        id:'', supplier: '', supplierName: '', supplierPhone: '', supplierSite:'', remark: ''
      },
      editForm: {
        id:'', supplier: '', supplierName: '', supplierPhone: '', supplierSite:'', remark: ''
      },
    }
  }
}
</script>