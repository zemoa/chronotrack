<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { Greet } from '@wails/go/main/App'
import { useProjectsStore } from '@/stores/store.project'
import {
  Plus
} from '@element-plus/icons-vue'

const projectStore = useProjectsStore()

const newProjectName = ref<string>()

const addProject = function () {
  if (newProjectName.value) {
    projectStore.addProject(newProjectName.value)
    newProjectName.value = undefined
  }
}

onMounted(() => {
  projectStore.load()
})

</script>

<template>
  <el-row justify="center">
    <el-col :span="8">
      <el-input v-model="newProjectName" placeholder="Please input" />
    </el-col>
    <el-col :span="2">
      <el-button type="primary" :icon="Plus" circle @click="addProject" />
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-card v-for="project in projectStore.projects" :key="project.id" shadow="hover" class="project-item">
        {{ project.id }} - {{ project.name }}
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.project-item {
  margin-top: 5px;
  cursor: pointer;
}
</style>
