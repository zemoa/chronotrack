<script lang="ts" setup>
import { Task } from '@/stores/models/model.task';
import { useWorkloadStore } from '@/stores/store.workload';
import { ref } from 'vue';
import {
    CaretRight
} from '@element-plus/icons-vue'

const workloadStore = useWorkloadStore()

const querySearch = (queryString: string, cb: any) => {
    const results = workloadStore.searchTask(queryString)
    // call callback function to return suggestions
    cb(results)
}

const selectedValue = ref('')
const selectedTask = ref<Task>()

const handleSelect = (task: Task) => {
    selectedTask.value = task
}

const startWorking = () => {
    if(selectedValue.value === selectedTask.value?.name) {
        workloadStore.workOnTask(selectedTask.value.name, selectedTask.value.id)
    } else {
        workloadStore.workOnTask(selectedValue.value, undefined)
    }
    
}
</script>

<template>
    <el-row justify="center">
        <el-col :span="20">
            <el-autocomplete v-model="selectedValue" :fetch-suggestions="querySearch" :fit-input-width="true"
                class="inline-input input-task" placeholder="Please Input" @select="handleSelect" :value-key="'name'">
                <template #default="{ item }">
                    <div>{{ item?.name }}</div>
                </template>
            </el-autocomplete>
        </el-col>
        <el-col :span="4">
            <el-button type="primary" :icon="CaretRight" circle @click="startWorking"/>
        </el-col>
    </el-row>

    <label for="selectedDate">Select a date</label>
    <input type="date" name="selectedDate" v-model="workloadStore.selectedDate">
    <button @click="workloadStore.selectedDate = undefined">Clear</button>

    <div v-for="workload in workloadStore.allExceptWorking">{{ workload.date }} - {{ workload.running }}</div>

    <div style="background-color: aquamarine;" v-if="workloadStore.workingTask">{{ workloadStore.workingTask.date }} - {{
        workloadStore.workingTask.running }}</div>
</template>

<style lang="scss">
.input-task {
    width: 100%;
}
</style>