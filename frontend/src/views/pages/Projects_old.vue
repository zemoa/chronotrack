<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import {Greet} from '@wails/go/main/App'
import {useProjectsStore} from '@/stores/store.project'

const projectStore = useProjectsStore()

const data = reactive({
  name: "",
  resultText: "Please enter your name below 👇",
})

function greet() {
  Greet(data.name).then(result => {
    data.resultText = result
  })
}

onMounted(() => {
  projectStore.load()
})

</script>

<template>
  <main>
    <div id="result" class="result">{{ data.resultText }}</div>
    <div id="input" class="input-box">
      <input id="name" v-model="data.name" autocomplete="off" class="input" type="text"/>
      <button class="btn" @click="greet">Greet</button>
    </div>

    <el-scrollbar height="400px">
      <p v-for="project in projectStore.projects" :key="project.id" class="scrollbar-demo-item">{{ project.name }}</p>
    </el-scrollbar>

    <select v-model="projectStore.selectedProjectId">
      <option>Choose</option>
      <option v-for="project in projectStore.projects" :value="project.id">{{ project.name }}</option>
    </select>
    <div v-for="task in projectStore.projectTasks">{{ task.id }} - {{ task.name }}</div>
  </main>
</template>

<style scoped>
.result {
  height: 20px;
  line-height: 20px;
  margin: 1.5rem auto;
}

.input-box .btn {
  width: 60px;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  border: none;
  margin: 0 0 0 20px;
  padding: 0 8px;
  cursor: pointer;
}

.input-box .btn:hover {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  color: #333333;
}

.input-box .input {
  border: none;
  border-radius: 3px;
  outline: none;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  background-color: rgba(240, 240, 240, 1);
  -webkit-font-smoothing: antialiased;
}

.input-box .input:hover {
  border: none;
  background-color: rgba(255, 255, 255, 1);
}

.input-box .input:focus {
  border: none;
  background-color: rgba(255, 255, 255, 1);
}
</style>
