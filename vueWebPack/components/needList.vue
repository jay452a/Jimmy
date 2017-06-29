<template>
	<div id="needList">
		<div class="searchBox">
			<label for="startTime">创建日期</label>
			<el-date-picker v-model="startTime" type="date" placeholder="选择开始日期">
			</el-date-picker>
			<span>-</span>
			<el-date-picker v-model="endTime" type="date" placeholder="选择结束日期">
			</el-date-picker>
			<label for="status" class="status">状态</label>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<label for="service" class="service">客户经理</label>
			<el-input v-model="service" placeholder="请输入内容" id="service"></el-input>
	        <br />
			<label for="needType">需求类型</label>
			<el-select v-model="needTypeValue" placeholder="请选择需求类型">
				<el-option v-for="need in needTypes" :label="need.label" :value="need.value">
				</el-option>
			</el-select>
	        
			<label for="needName" class="needName">需求名称</label>
			<el-input v-model="needName" placeholder="请输入内容" id="needName"></el-input>
			<el-button type="primary" v-on:click="search">查询</el-button>
        </div>
		<!--以下为列表数据渲染-->
		<div class="listContainer">
			<el-table :data="tableListData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="number" width="100" label="需求编号">
				</el-table-column>
				<el-table-column prop="serverManager" width="100" label="客户经理">
				</el-table-column>
				<el-table-column prop="needName" width="120" label="需求名称">
				</el-table-column>
				<el-table-column prop="needType" width="100" label="需求类型">
				</el-table-column>
				<el-table-column label="申请时间" width="120">
					<template scope="scope">{{ scope.row.date }}</template>
				</el-table-column>
				<el-table-column prop="status" label="状态" width="80">
				</el-table-column>
				<el-table-column label="审批历史" width="100">
					<template scope="scope">
						<a @click="lookHistory">审批历史</a>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
						<el-button size="small" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="pageBox">
			<el-pagination @size-change="changeSize" @current-change="changeCurrentPage" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
		</div>

	</div>
</template>
<script>
	import baseFn from "../src/js/public.js"; //引入公用方法
	//import list2 from "./solutionList.vue";
	const baseUrl = "http://10.0.0.170:9191/mockjsdata/33/";
	baseFn.getJSON({
		url: baseUrl + "tRequirementType/getList",
		type: "POST",
		data: JSON.stringify({
			name: "jimmy"
		})
	}).then(function(json) {
		console.log(json)
		return json
	}).catch(function (json) {
        console.log(json+2)
    })
	export default {
		data() {
			return {
				startTime: '',
				endTime: '',
				options: [{
						label: "全部",
						value: ""
					},
					{
						label: "处理中",
						value: 2
					},
					{
						label: "评价期",
						value: 3
					},
					{
						label: "已关闭",
						value: 4
					},
					{
						label: "已完成",
						value: 5
					},
				],
				value: "",
				needTypes: [{
					label: "全部",
					value: ""
				}],
				needTypeValue: '',
				service: "",
				needName: '',
				tableListData: [{
						id: "wedasda13123",
						date: '2016-05-03',
						address: '上海市普陀区金沙江路 1518 弄',
						number: 12121,
						serverManager: "老王",
						needName: '我需要',
						needType: '基础应用',
						status: '已完成'
					},
					{
						id: "aasew13123",
						date: '2016-05-03',
						address: '上海市普陀区金沙江路 1518 弄',
						number: 12121,
						serverManager: "老王",
						needName: '我需要',
						needType: '基础应用',
						status: '已完成'
					}
				],
				multipleSelection: [],
				currentPage: 1, //分页数据,初始页数
				pageSize: 10
			}
		},
		methods: {
			search: function() {
				let postData = {
					pageNumber: this.currentPage,
					pageSize: this.pageSize,
					startTime: baseFn.dateTranform(this.startTime, true),
					endTime: baseFn.dateTranform(this.endTime),
					queryType: this.value,
					reqParentType: this.needTypeValue,
					reqName: this.needName,
					createUserName: this.service
				}
				console.log(postData)
				alert(this.message)
			},
			lookHistory: function() {
				alert("lookHistory")
			},
			handleEdit: function(val, id) {
				console.log(id)
				window.location.href = "#/list/edit"
			},
			handleDelete: function(val, id) {
				console.log(id)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					alert("请求后端" + id)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => { // ()=>{} 表示function(){}
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleSelectionChange: function(val) {
				this.multipleSelection = val;

			},
			changeSize: function(size) {
				this.pageSize = size
				console.log(size, this.currentPage)
				//加上搜索条件请求后台
			},
			changeCurrentPage: function(cur) {
				this.currentPage = cur
				console.log(cur)
				console.log(this.pageSize, cur)
				//加上搜索条件请求后台
			}
		}
	}
</script>
<style scoped>

	#needList {
		padding: 15px 10px;
		border-radius: 2px;
	}
	
	.status {
		margin-left: 10px;
	}
	
	#service,
	#needName {
		width: 180px;
	}
	
	.listContainer {
		width: 100%;
		border-top: 1px solid #DCDCDC;
		margin-top: 10px;
	}
	
	.pageBox {
		margin-top: 15px;
		text-align: right;
	}
</style>